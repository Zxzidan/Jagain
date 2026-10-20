import { Head, Link, useForm } from '@inertiajs/react';
import {
    AlertCircle,
    AlertTriangle,
    ArrowLeft,
    Building2,
    Calendar,
    CheckCircle2,
    Clock,
    ExternalLink,
    FileImage,
    FileQuestion,
    Flame,
    History,
    MapPin,
    Send,
    Shield,
    User as UserIcon,
    X,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';
import { FlashMessage } from '@/components/jagain/flash-message';
import { StatusBadge } from '@/components/jagain/status-badge';
import AppLayout from '@/layouts/app-layout';
import { dashboard as adminDashboard } from '@/routes/admin';
import {
    assign as reportAssign,
    index as reportsIndex,
    show as reportShow,
    transition as reportTransition,
} from '@/routes/admin/reports';
import type { Agency, BreadcrumbItem, Report, ReportStatus } from '@/types';

type ReportShowProps = {
    report: Report;
    activeAgencies: Agency[];
    allowedTransitions: string[];
    potentialDuplicates: Pick<Report, 'id' | 'title' | 'report_status' | 'created_at' | 'location_description'>[];
};

export default function ReportShow({
    report,
    activeAgencies,
    allowedTransitions,
    potentialDuplicates,
}: ReportShowProps) {
    const [selectedEvidence, setSelectedEvidence] = useState<string | null>(null);

    // Modals
    const [isNeedsInfoModalOpen, setIsNeedsInfoModalOpen] = useState(false);
    const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);

    // Transition Form
    const transitionForm = useForm({
        target_status: '',
        reason: '',
        note: '',
        public_note: '',
        lock_version: report.lock_version,
    });

    // Assignment Form
    const assignmentForm = useForm({
        agency_id: activeAgencies[0]?.id ? String(activeAgencies[0].id) : '',
        note: '',
        lock_version: report.lock_version,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Admin JAGAIN',
            href: adminDashboard(),
        },
        {
            title: 'Antrean Laporan',
            href: reportsIndex(),
        },
        {
            title: `#${report.id} ${report.title.slice(0, 24)}...`,
            href: reportsIndex(),
        },
    ];

    const executeTransition = (
        targetStatus: ReportStatus,
        reason = '',
        note = '',
        publicNote = ''
    ) => {
        transitionForm.setData({
            target_status: targetStatus,
            reason,
            note,
            public_note: publicNote,
            lock_version: report.lock_version,
        });

        transitionForm.post(reportTransition.url(report.id), {
            preserveScroll: true,
            onSuccess: () => {
                setIsNeedsInfoModalOpen(false);
                setIsCloseModalOpen(false);
            },
        });
    };

    const handleAssignSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        assignmentForm.post(reportAssign.url(report.id), {
            preserveScroll: true,
            onSuccess: () => {
                assignmentForm.reset('note');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Review Laporan #${report.id} - JAGAIN Admin`} />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-8">
                <FlashMessage />

                {/* Back button & Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                        <Link
                            href={reportsIndex()}
                            className="inline-flex size-9 items-center justify-center rounded-lg border border-[#DDE3DE] bg-white text-[#343B36] transition hover:bg-[#F3F7F4] dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
                            title="Kembali ke antrean"
                        >
                            <ArrowLeft className="size-4" />
                        </Link>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-sm font-bold text-[#216B49] dark:text-emerald-400">
                                    #{report.id}
                                </span>
                                <StatusBadge status={report.report_status} />
                                {report.is_simulated && (
                                    <span className="rounded bg-neutral-200 px-2 py-0.5 text-[10px] font-bold text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300">
                                        DATA SIMULASI
                                    </span>
                                )}
                            </div>
                            <h1 className="mt-1 text-xl font-bold tracking-tight text-[#171C19] sm:text-2xl dark:text-white">
                                {report.title}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Main 2-column layout */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left Column: Report Details, Evidence, Chronology (2 cols) */}
                    <div className="flex flex-col gap-6 lg:col-span-2">
                        {/* Potential Duplicates Warning Alert */}
                        {potentialDuplicates.length > 0 && (
                            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
                                <div className="flex items-start gap-2.5">
                                    <AlertTriangle className="size-5 shrink-0 text-amber-600 dark:text-amber-400" />
                                    <div>
                                        <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                                            Perhatian: Ditemukan {potentialDuplicates.length} Laporan di Area Berdekatan
                                        </h3>
                                        <p className="mt-0.5 text-xs text-amber-800 dark:text-amber-300">
                                            Laporan di bawah ini memiliki kategori dan koordinat berdekatan (&plusmn;10 km). Periksa apakah laporan ini merupakan duplikat sebelum verifikasi:
                                        </p>
                                        <ul className="mt-2 list-inside list-disc text-xs text-amber-900 dark:text-amber-200">
                                            {potentialDuplicates.map((dup) => (
                                                <li key={dup.id}>
                                                    <Link
                                                        href={reportShow(dup.id)}
                                                        className="font-medium underline hover:text-amber-950"
                                                    >
                                                        #{dup.id} — {dup.title}
                                                    </Link>{' '}
                                                    ({dup.report_status})
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Report Core Information Card */}
                        <div className="rounded-xl border border-[#DDE3DE] bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                            <h2 className="text-base font-semibold text-[#171C19] dark:text-white">
                                Deskripsi Kejadian & Lokasi
                            </h2>

                            <div className="mt-4 text-sm leading-relaxed text-[#343B36] whitespace-pre-wrap dark:text-neutral-300">
                                {report.description}
                            </div>

                            <div className="mt-6 grid gap-4 border-t border-[#DDE3DE] pt-4 sm:grid-cols-2 dark:border-neutral-800">
                                <div>
                                    <span className="text-xs text-[#68716B] dark:text-neutral-400">
                                        Kategori Laporan
                                    </span>
                                    <div className="mt-0.5 font-medium text-[#171C19] dark:text-white">
                                        {report.category?.name ?? 'Umum'}
                                    </div>
                                </div>

                                <div>
                                    <span className="text-xs text-[#68716B] dark:text-neutral-400">
                                        Identitas Pelapor
                                    </span>
                                    <div className="mt-0.5 flex items-center gap-1.5 font-medium text-[#171C19] dark:text-white">
                                        <UserIcon className="size-4 text-[#216B49]" />
                                        <span>{report.creator?.name ?? 'Anonim'}</span>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-xs text-[#68716B] dark:text-neutral-400">
                                        Waktu Kejadian Dilaporkan
                                    </span>
                                    <div className="mt-0.5 flex items-center gap-1.5 font-medium text-[#171C19] dark:text-white">
                                        <Calendar className="size-4 text-[#216B49]" />
                                        <span>
                                            {report.reported_occurrence_at
                                                ? new Date(report.reported_occurrence_at).toLocaleString('id-ID', {
                                                      day: 'numeric',
                                                      month: 'long',
                                                      year: 'numeric',
                                                      hour: '2-digit',
                                                      minute: '2-digit',
                                                  }) + ' WIB'
                                                : 'Tidak disebutkan'}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-xs text-[#68716B] dark:text-neutral-400">
                                        Waktu Masuk Sistem
                                    </span>
                                    <div className="mt-0.5 flex items-center gap-1.5 font-medium text-[#171C19] dark:text-white">
                                        <Clock className="size-4 text-[#216B49]" />
                                        <span>
                                            {new Date(report.created_at).toLocaleString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}{' '}
                                            WIB
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Location Section */}
                            <div className="mt-4 rounded-lg bg-[#F3F7F4] p-4 dark:bg-neutral-800/50">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#174B35] dark:text-emerald-400">
                                            <MapPin className="size-4" />
                                            <span>Lokasi Karhutla</span>
                                        </div>
                                        <p className="mt-1 text-sm font-medium text-[#171C19] dark:text-white">
                                            {report.location_description ?? 'Tidak ada deskripsi alamat.'}
                                        </p>
                                        <p className="mt-0.5 font-mono text-xs text-[#68716B] dark:text-neutral-400">
                                            Koordinat: {report.latitude}, {report.longitude}
                                        </p>
                                    </div>

                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${report.latitude},${report.longitude}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex shrink-0 items-center gap-1 rounded-md border border-[#DDE3DE] bg-white px-2.5 py-1 text-xs font-semibold text-[#216B49] shadow-2xs hover:bg-[#E8F1EB] dark:border-neutral-700 dark:bg-neutral-800 dark:text-emerald-400"
                                    >
                                        <span>Buka di Peta</span>
                                        <ExternalLink className="size-3" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Evidence Gallery Card */}
                        <div className="rounded-xl border border-[#DDE3DE] bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                            <h2 className="text-base font-semibold text-[#171C19] dark:text-white">
                                Berkas Bukti Lapangan ({report.evidence?.length ?? 0})
                            </h2>
                            <p className="text-xs text-[#68716B] dark:text-neutral-400">
                                Foto atau dokumentasi yang diunggah pelapor untuk memvalidasi insiden.
                            </p>

                            {!report.evidence || report.evidence.length === 0 ? (
                                <div className="mt-4 rounded-lg border border-dashed border-[#DDE3DE] p-6 text-center text-xs text-[#68716B] dark:border-neutral-800">
                                    Tidak ada berkas bukti yang disertakan pada laporan ini.
                                </div>
                            ) : (
                                <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                                    {report.evidence.map((ev) => (
                                        <div
                                            key={ev.id}
                                            className="group relative overflow-hidden rounded-lg border border-[#DDE3DE] bg-[#F3F7F4] p-3 transition hover:border-[#216B49] dark:border-neutral-800 dark:bg-neutral-800/40"
                                        >
                                            <div className="flex aspect-video items-center justify-center rounded bg-[#E8F1EB] text-[#216B49] dark:bg-neutral-800">
                                                <FileImage className="size-8" />
                                            </div>
                                            <div className="mt-2 truncate text-xs font-medium text-[#171C19] dark:text-white" title={ev.original_filename}>
                                                {ev.original_filename}
                                            </div>
                                            <div className="text-[11px] text-[#68716B] dark:text-neutral-400">
                                                {(ev.size_bytes / 1024).toFixed(0)} KB &bull; {ev.media_type}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Chronology / Status History Timeline */}
                        <div className="rounded-xl border border-[#DDE3DE] bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                            <div className="flex items-center gap-2">
                                <History className="size-4 text-[#216B49]" />
                                <h2 className="text-base font-semibold text-[#171C19] dark:text-white">
                                    Kronologi & Riwayat Perubahan Status
                                </h2>
                            </div>
                            <p className="text-xs text-[#68716B] dark:text-neutral-400">
                                Jejak audit transisi status yang tercatat secara permanen sesuai FR-09.
                            </p>

                            <ol className="relative mt-6 border-l border-[#DDE3DE] ml-3 dark:border-neutral-800">
                                {report.status_histories?.map((history, idx) => (
                                    <li key={history.id} className="mb-6 ml-6 last:mb-0">
                                        <span className="absolute -left-3 flex size-6 items-center justify-center rounded-full bg-[#E8F1EB] text-[#216B49] ring-4 ring-white dark:bg-emerald-950 dark:text-emerald-400 dark:ring-neutral-900">
                                            <CheckCircle2 className="size-3.5" />
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <StatusBadge status={history.to_status} />
                                            <span className="text-xs text-[#68716B] dark:text-neutral-400">
                                                {new Date(history.created_at).toLocaleString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}{' '}
                                                WIB
                                            </span>
                                        </div>
                                        <div className="mt-1 text-xs text-[#343B36] dark:text-neutral-300">
                                            Oleh:{' '}
                                            <span className="font-semibold text-[#171C19] dark:text-white">
                                                {history.actor?.name ?? 'Sistem'}
                                            </span>
                                        </div>
                                        {history.reason && (
                                            <div className="mt-1 rounded bg-neutral-100 p-2 text-xs text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                                                <span className="font-semibold">Alasan:</span> {history.reason}
                                            </div>
                                        )}
                                        {history.note && (
                                            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                                                {history.note}
                                            </p>
                                        )}
                                        {history.public_note && (
                                            <div className="mt-1 rounded border border-amber-200 bg-amber-50 p-2 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
                                                <span className="font-semibold">Instruksi ke Pelapor:</span>{' '}
                                                {history.public_note}
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>

                    {/* Right Column: Actions & OPD Dispatch (1 col) */}
                    <div className="flex flex-col gap-6">
                        {/* Status Transition Action Card */}
                        <div className="rounded-xl border border-[#216B49]/30 bg-white p-6 shadow-xs dark:border-emerald-800/40 dark:bg-neutral-900">
                            <div className="flex items-center gap-2">
                                <Shield className="size-4 text-[#216B49]" />
                                <h3 className="text-base font-semibold text-[#171C19] dark:text-white">
                                    Keputusan & Transisi Status
                                </h3>
                            </div>
                            <p className="mt-1 text-xs text-[#68716B] dark:text-neutral-400">
                                Status saat ini:{' '}
                                <span className="font-bold text-[#171C19] dark:text-white">
                                    {report.report_status}
                                </span>
                            </p>

                            {/* Transition options based on current status */}
                            <div className="mt-4 flex flex-col gap-2.5">
                                {report.report_status === 'SUBMITTED' && (
                                    <button
                                        type="button"
                                        disabled={transitionForm.processing}
                                        onClick={() =>
                                            executeTransition(
                                                'UNDER_REVIEW',
                                                '',
                                                'Admin memulai pemeriksaan kelengkapan berkas.'
                                            )
                                        }
                                        className="w-full rounded-lg bg-[#216B49] px-4 py-2.5 text-center text-xs font-semibold text-white transition hover:bg-[#174B35]"
                                    >
                                        Mulai Pemeriksaan Laporan (UNDER_REVIEW)
                                    </button>
                                )}

                                {report.report_status === 'UNDER_REVIEW' && (
                                    <>
                                        <button
                                            type="button"
                                            disabled={transitionForm.processing}
                                            onClick={() =>
                                                executeTransition(
                                                    'VERIFIED',
                                                    '',
                                                    'Laporan telah diperiksa dan dinilai memenuhi kriteria verifikasi JAGAIN.'
                                                )
                                            }
                                            className="w-full rounded-lg bg-[#216B49] px-4 py-2.5 text-center text-xs font-semibold text-white transition hover:bg-[#174B35]"
                                        >
                                            Verifikasi Laporan Valid (VERIFIED)
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setIsNeedsInfoModalOpen(true)}
                                            className="w-full rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-center text-xs font-semibold text-amber-900 transition hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200"
                                        >
                                            Minta Informasi Tambahan (NEEDS_INFORMATION)
                                        </button>
                                    </>
                                )}

                                {report.report_status === 'NEEDS_INFORMATION' && (
                                    <button
                                        type="button"
                                        disabled={transitionForm.processing}
                                        onClick={() =>
                                            executeTransition(
                                                'UNDER_REVIEW',
                                                '',
                                                'Melanjutkan pemeriksaan laporan setelah informasi diperbarui.'
                                            )
                                        }
                                        className="w-full rounded-lg bg-[#216B49] px-4 py-2.5 text-center text-xs font-semibold text-white transition hover:bg-[#174B35]"
                                    >
                                        Kembalikan ke Pemeriksaan (UNDER_REVIEW)
                                    </button>
                                )}

                                {report.report_status === 'RESOLUTION_REVIEW' && (
                                    <button
                                        type="button"
                                        disabled={transitionForm.processing}
                                        onClick={() =>
                                            executeTransition(
                                                'RESOLVED_VERIFIED',
                                                '',
                                                'Admin telah memeriksa bukti penanganan OPD dan menetapkan status administratif selesai.'
                                            )
                                        }
                                        className="w-full rounded-lg bg-[#174B35] px-4 py-2.5 text-center text-xs font-semibold text-white transition hover:bg-[#216B49]"
                                    >
                                        Sahkan Selesai Terverifikasi (RESOLVED_VERIFIED)
                                    </button>
                                )}

                                {/* Destructive Close action allowed in active stages */}
                                {['SUBMITTED', 'UNDER_REVIEW', 'NEEDS_INFORMATION', 'VERIFIED'].includes(
                                    report.report_status
                                ) && (
                                    <button
                                        type="button"
                                        onClick={() => setIsCloseModalOpen(true)}
                                        className="mt-2 w-full rounded-lg border border-rose-300 bg-rose-50 px-4 py-2 text-center text-xs font-semibold text-rose-800 transition hover:bg-rose-100 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-300"
                                    >
                                        Tutup Laporan dengan Alasan (CLOSED_WITH_REASON)
                                    </button>
                                )}
                            </div>

                            {transitionForm.errors.target_status && (
                                <p className="mt-2 text-xs text-rose-600">
                                    {transitionForm.errors.target_status}
                                </p>
                            )}
                            {transitionForm.errors.lock_version && (
                                <p className="mt-2 text-xs text-rose-600">
                                    {transitionForm.errors.lock_version}
                                </p>
                            )}
                        </div>

                        {/* Agency Dispatch Card */}
                        <div className="rounded-xl border border-[#DDE3DE] bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                            <div className="flex items-center gap-2">
                                <Building2 className="size-4 text-[#216B49]" />
                                <h3 className="text-base font-semibold text-[#171C19] dark:text-white">
                                    Penugasan ke Instansi (OPD)
                                </h3>
                            </div>
                            <p className="mt-1 text-xs text-[#68716B] dark:text-neutral-400">
                                Teruskan laporan terverifikasi kepada instansi penanganan wilayah Kalimantan.
                            </p>

                            {report.report_status === 'VERIFIED' || report.report_status === 'DISPATCHED' ? (
                                <form onSubmit={handleAssignSubmit} className="mt-4 flex flex-col gap-3">
                                    <div>
                                        <label
                                            htmlFor="agency_id"
                                            className="block text-xs font-semibold text-[#343B36] dark:text-neutral-300"
                                        >
                                            Pilih Instansi / OPD Berwenang
                                        </label>
                                        <select
                                            id="agency_id"
                                            value={assignmentForm.data.agency_id}
                                            onChange={(e) => assignmentForm.setData('agency_id', e.target.value)}
                                            className="mt-1 w-full rounded-lg border border-[#DDE3DE] bg-[#F3F7F4]/50 px-3 py-2 text-xs text-[#171C19] focus:border-[#216B49] focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-800 dark:text-white"
                                        >
                                            {activeAgencies.map((agency) => (
                                                <option key={agency.id} value={agency.id}>
                                                    {agency.name} ({agency.jurisdiction})
                                                </option>
                                            ))}
                                        </select>
                                        {assignmentForm.errors.agency_id && (
                                            <p className="mt-1 text-xs text-rose-600">
                                                {assignmentForm.errors.agency_id}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="note"
                                            className="block text-xs font-semibold text-[#343B36] dark:text-neutral-300"
                                        >
                                            Catatan Instruksi Penanganan (Opsional)
                                        </label>
                                        <textarea
                                            id="note"
                                            rows={3}
                                            value={assignmentForm.data.note}
                                            onChange={(e) => assignmentForm.setData('note', e.target.value)}
                                            placeholder="Contoh: Mohon koordinasi dengan pos damkar terdekat..."
                                            className="mt-1 w-full rounded-lg border border-[#DDE3DE] bg-[#F3F7F4]/50 p-2.5 text-xs text-[#171C19] focus:border-[#216B49] focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-800 dark:text-white"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={assignmentForm.processing}
                                        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#216B49] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#174B35] disabled:opacity-60"
                                    >
                                        <Send className="size-3.5" />
                                        <span>
                                            {report.report_status === 'DISPATCHED'
                                                ? 'Tugaskan Ulang (Reassign)'
                                                : 'Kirim Penugasan ke OPD'}
                                        </span>
                                    </button>

                                    {(assignmentForm.errors as Record<string, string | undefined>).report && (
                                        <p className="text-xs text-rose-600">
                                            {(assignmentForm.errors as Record<string, string | undefined>).report}
                                        </p>
                                    )}
                                </form>
                            ) : (
                                <div className="mt-4 rounded-lg bg-[#F3F7F4] p-3 text-xs text-[#68716B] dark:bg-neutral-800/40 dark:text-neutral-400">
                                    Laporan harus diverifikasi valid (status VERIFIED) sebelum dapat ditugaskan ke instansi.
                                </div>
                            )}

                            {/* Active assignment details if present */}
                            {report.latest_assignment && (
                                <div className="mt-4 border-t border-[#DDE3DE] pt-4 dark:border-neutral-800">
                                    <span className="text-xs font-semibold text-[#343B36] dark:text-neutral-300">
                                        Penugasan Aktif Saat Ini:
                                    </span>
                                    <div className="mt-2 rounded-lg border border-[#DDE3DE] bg-[#F3F7F4]/50 p-3 text-xs dark:border-neutral-800 dark:bg-neutral-800/50">
                                        <div className="font-semibold text-[#171C19] dark:text-white">
                                            {report.latest_assignment.agency?.name}
                                        </div>
                                        <div className="mt-1 flex items-center gap-1.5">
                                            <StatusBadge status={report.latest_assignment.assignment_status} />
                                        </div>
                                        {report.latest_assignment.decline_reason && (
                                            <div className="mt-2 rounded bg-rose-50 p-2 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200">
                                                <span className="font-semibold">Alasan Penolakan:</span>{' '}
                                                {report.latest_assignment.decline_reason}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal: Minta Informasi Tambahan */}
            {isNeedsInfoModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-neutral-900">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-[#171C19] dark:text-white">
                                Minta Informasi Tambahan
                            </h3>
                            <button
                                type="button"
                                onClick={() => setIsNeedsInfoModalOpen(false)}
                                className="rounded p-1 text-[#68716B] hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            >
                                <X className="size-4" />
                            </button>
                        </div>
                        <p className="mt-1 text-xs text-[#68716B] dark:text-neutral-400">
                            Pesan ini akan terlihat oleh pelapor pada halaman pelacakan status JAGAIN.
                        </p>

                        <div className="mt-4">
                            <label className="block text-xs font-semibold text-[#343B36] dark:text-neutral-300">
                                Instruksi yang Perlu Dilengkapi Pelapor *
                            </label>
                            <textarea
                                rows={4}
                                value={transitionForm.data.public_note}
                                onChange={(e) => transitionForm.setData('public_note', e.target.value)}
                                placeholder="Contoh: Mohon sebutkan patok batas desa atau arah angin di lokasi..."
                                className="mt-1 w-full rounded-lg border border-[#DDE3DE] p-2.5 text-xs text-[#171C19] focus:border-[#216B49] focus:outline-none dark:border-neutral-800 dark:bg-neutral-800 dark:text-white"
                            />
                            {transitionForm.errors.note && (
                                <p className="mt-1 text-xs text-rose-600">{transitionForm.errors.note}</p>
                            )}
                        </div>

                        <div className="mt-5 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setIsNeedsInfoModalOpen(false)}
                                className="rounded-lg border border-[#DDE3DE] px-3.5 py-2 text-xs font-semibold text-[#343B36] hover:bg-[#F3F7F4] dark:border-neutral-700 dark:text-neutral-300"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                disabled={transitionForm.processing || !transitionForm.data.public_note.trim()}
                                onClick={() =>
                                    executeTransition(
                                        'NEEDS_INFORMATION',
                                        '',
                                        'Meminta kelengkapan informasi pelapor.',
                                        transitionForm.data.public_note
                                    )
                                }
                                className="rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-amber-700 disabled:opacity-50"
                            >
                                Kirim Permintaan Info
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal: Tutup Laporan (Destructive Action) */}
            {isCloseModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-neutral-900">
                        <div className="flex items-start gap-3">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
                                <XCircle className="size-5" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-rose-900 dark:text-rose-200">
                                    Konfirmasi Penutupan Laporan
                                </h3>
                                <p className="mt-1 text-xs text-rose-700 dark:text-rose-300">
                                    Aksi ini akan menghentikan proses verifikasi laporan. Alasan penutupan wajib dicatat dalam audit trail permanen.
                                </p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-xs font-semibold text-[#343B36] dark:text-neutral-300">
                                Alasan Penutupan Laporan *
                            </label>
                            <select
                                value={transitionForm.data.reason}
                                onChange={(e) => transitionForm.setData('reason', e.target.value)}
                                className="mt-1 w-full rounded-lg border border-[#DDE3DE] bg-white p-2.5 text-xs text-[#171C19] focus:border-rose-500 focus:outline-none dark:border-neutral-800 dark:bg-neutral-800 dark:text-white"
                            >
                                <option value="">-- Pilih Alasan Penutupan --</option>
                                <option value="Laporan Duplikat dari Titik yang Sama">Laporan Duplikat dari Titik yang Sama</option>
                                <option value="Bukan Kebakaran Hutan atau Lahan">Bukan Kebakaran Hutan atau Lahan (Di luar cakupan JAGAIN)</option>
                                <option value="Informasi Palsu atau Tidak Dapat Diverifikasi">Informasi Palsu atau Tidak Dapat Diverifikasi</option>
                                <option value="Lokasi Berada di Luar Wilayah Operasional">Lokasi Berada di Luar Wilayah Operasional</option>
                            </select>
                            {transitionForm.errors.reason && (
                                <p className="mt-1 text-xs text-rose-600">{transitionForm.errors.reason}</p>
                            )}
                        </div>

                        <div className="mt-3">
                            <label className="block text-xs font-semibold text-[#343B36] dark:text-neutral-300">
                                Catatan Penjelasan Tambahan (Opsional)
                            </label>
                            <textarea
                                rows={2}
                                value={transitionForm.data.note}
                                onChange={(e) => transitionForm.setData('note', e.target.value)}
                                placeholder="Jelaskan detail pertimbangan penutupan..."
                                className="mt-1 w-full rounded-lg border border-[#DDE3DE] p-2 text-xs text-[#171C19] focus:border-rose-500 focus:outline-none dark:border-neutral-800 dark:bg-neutral-800 dark:text-white"
                            />
                        </div>

                        <div className="mt-5 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setIsCloseModalOpen(false)}
                                className="rounded-lg border border-[#DDE3DE] px-3.5 py-2 text-xs font-semibold text-[#343B36] hover:bg-[#F3F7F4] dark:border-neutral-700 dark:text-neutral-300"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                disabled={transitionForm.processing || !transitionForm.data.reason}
                                onClick={() =>
                                    executeTransition(
                                        'CLOSED_WITH_REASON',
                                        transitionForm.data.reason,
                                        transitionForm.data.note
                                    )
                                }
                                className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-rose-700 disabled:opacity-50"
                            >
                                Ya, Tutup Laporan Ini
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
