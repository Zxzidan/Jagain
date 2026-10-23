import React, { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
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
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/reports/status-badge';
import { dashboard as adminDashboard } from '@/routes/admin';
import {
    assign as reportAssign,
    index as reportsIndex,
    show as reportShow,
    transition as reportTransition,
} from '@/routes/admin/reports';
import type { Agency, Report, ReportStatus } from '@/types';

type ReportShowProps = {
    report: Report;
    activeAgencies: Agency[];
    allowedTransitions: string[];
    potentialDuplicates: Pick<
        Report,
        'id' | 'title' | 'report_status' | 'created_at' | 'location_description'
    >[];
};

export default function ReportShow({
    report,
    activeAgencies,
    allowedTransitions,
    potentialDuplicates = [],
}: ReportShowProps) {
    const page = usePage();
    const flash = (page.props as any).flash;

    const [selectedEvidence, setSelectedEvidence] = useState<string | null>(null);
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

    const formatDate = (isoString?: string | null) => {
        if (!isoString) return '-';
        try {
            const date = new Date(isoString);
            return (
                new Intl.DateTimeFormat('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                }).format(date) + ' WIB'
            );
        } catch {
            return isoString;
        }
    };

    return (
        <>
            <Head title={`Review Laporan #${report.id} - JAGAIN Admin`} />

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
                {/* Flash Messages */}
                {flash?.success && (
                    <div
                        role="status"
                        className="flex items-center gap-3 rounded-xl border border-leaf-green/30 bg-soft-green/70 p-4 text-sm text-forest-green shadow-xs transition-all duration-200"
                    >
                        <CheckCircle2 className="size-5 shrink-0 text-primary-green" />
                        <span className="font-medium">{flash.success}</span>
                    </div>
                )}
                {flash?.error && (
                    <div
                        role="alert"
                        className="flex items-center gap-3 rounded-xl border border-border-neutral bg-white p-4 text-sm text-dark-neutral shadow-xs transition-all duration-200"
                    >
                        <AlertCircle className="size-5 shrink-0 text-primary-green" />
                        <span className="font-medium">{flash.error}</span>
                    </div>
                )}

                {/* Back button & Header Bar */}
                <header className="flex flex-col justify-between gap-4 rounded-xl border border-border-neutral bg-white p-5 shadow-xs sm:flex-row sm:items-center sm:p-6">
                    <div className="flex items-start gap-3.5">
                        <Link
                            href={reportsIndex().url}
                            className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border-neutral bg-white text-dark-neutral shadow-xs transition hover:bg-pale-green hover:border-gray-neutral/40"
                            title="Kembali ke antrean"
                        >
                            <ArrowLeft className="size-4" />
                        </Link>
                        <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="badge badge-light font-mono font-bold">
                                    #{report.id}
                                </span>
                                <StatusBadge status={report.report_status} variant="neutral" />
                                {report.is_simulated && (
                                    <span className="badge badge-light text-amber-700 bg-amber-50 border border-amber-200">
                                        SIMULASI
                                    </span>
                                )}
                            </div>
                            <h1 className="text-xl font-bold tracking-tight text-dark-neutral sm:text-2xl">
                                {report.title}
                            </h1>
                        </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="border-border-neutral bg-white text-xs font-semibold text-dark-neutral hover:bg-pale-green"
                        >
                            <Link href={reportsIndex().url}>
                                <span>Antrean Laporan</span>
                            </Link>
                        </Button>
                    </div>
                </header>

                {/* Main 2-column layout */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left Column: Report Details, Evidence, Chronology (2 cols) */}
                    <div className="flex flex-col gap-6 lg:col-span-2">
                        {/* Potential Duplicates Warning Alert */}
                        {potentialDuplicates.length > 0 && (
                            <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-xs shadow-xs">
                                <div className="flex items-start gap-2.5">
                                    <AlertTriangle className="size-5 shrink-0 text-amber-600 mt-0.5" />
                                    <div>
                                        <h3 className="text-sm font-semibold text-amber-900">
                                            Perhatian: Ditemukan {potentialDuplicates.length} Laporan di Area Berdekatan
                                        </h3>
                                        <p className="mt-0.5 text-amber-800">
                                            Laporan di bawah ini memiliki kategori dan koordinat berdekatan (&plusmn;10 km). Cek potensi duplikat sebelum validasi:
                                        </p>
                                        <ul className="mt-2 list-inside list-disc space-y-1 text-amber-900">
                                            {potentialDuplicates.map((dup) => (
                                                <li key={dup.id}>
                                                    <Link
                                                        href={reportShow(dup.id).url}
                                                        className="font-medium underline hover:text-amber-950"
                                                    >
                                                        #{dup.id} &mdash; {dup.title}
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
                        <div className="rounded-xl border border-border-neutral bg-white p-5 shadow-xs sm:p-6">
                            <h2 className="text-base font-bold tracking-tight text-dark-neutral">
                                Deskripsi Kejadian & Lokasi
                            </h2>

                            <div className="mt-3 text-xs leading-relaxed text-dark-neutral whitespace-pre-wrap sm:text-sm">
                                {report.description}
                            </div>

                            <div className="mt-5 grid gap-4 border-t border-border-neutral pt-4 sm:grid-cols-2">
                                <div>
                                    <span className="text-xs font-semibold text-gray-neutral">
                                        Kategori Laporan
                                    </span>
                                    <div className="mt-1 font-medium text-dark-neutral text-xs sm:text-sm">
                                        {report.category?.name ?? 'Umum'}
                                    </div>
                                </div>

                                <div>
                                    <span className="text-xs font-semibold text-gray-neutral">
                                        Identitas Pelapor
                                    </span>
                                    <div className="mt-1 flex items-center gap-1.5 font-medium text-dark-neutral text-xs sm:text-sm">
                                        <UserIcon className="size-4 text-primary-green" />
                                        <span>{report.creator?.name ?? 'Anonim'}</span>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-xs font-semibold text-gray-neutral">
                                        Waktu Kejadian Dilaporkan
                                    </span>
                                    <div className="mt-1 flex items-center gap-1.5 font-medium text-dark-neutral text-xs sm:text-sm">
                                        <Calendar className="size-4 text-primary-green" />
                                        <span>
                                            {formatDate(report.reported_occurrence_at)}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-xs font-semibold text-gray-neutral">
                                        Waktu Masuk Sistem
                                    </span>
                                    <div className="mt-1 flex items-center gap-1.5 font-medium text-dark-neutral text-xs sm:text-sm">
                                        <Clock className="size-4 text-primary-green" />
                                        <span>
                                            {formatDate(report.created_at)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Location Box */}
                            <div className="mt-5 rounded-lg border border-border-neutral bg-pale-green/60 p-4">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1.5 text-xs font-semibold text-forest-green">
                                            <MapPin className="size-4 text-primary-green" />
                                            <span>Titik Lokasi Karhutla</span>
                                        </div>
                                        <p className="text-xs font-medium text-dark-neutral sm:text-sm">
                                            {report.location_description ?? 'Tidak ada deskripsi detail alamat.'}
                                        </p>
                                        <p className="font-mono text-xs text-gray-neutral">
                                            Koordinat: {report.latitude}, {report.longitude}
                                        </p>
                                    </div>

                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${report.latitude},${report.longitude}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border-neutral bg-white px-3 py-1.5 text-xs font-semibold text-primary-green shadow-xs hover:bg-pale-green"
                                    >
                                        <span>Buka Peta</span>
                                        <ExternalLink className="size-3.5" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Evidence Gallery Card */}
                        <div className="rounded-xl border border-border-neutral bg-white p-5 shadow-xs sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-base font-bold tracking-tight text-dark-neutral">
                                        Berkas Bukti Lapangan ({report.evidence?.length ?? 0})
                                    </h2>
                                    <p className="text-xs text-gray-neutral">
                                        Foto atau dokumentasi lapangan yang diunggah pelapor
                                    </p>
                                </div>
                            </div>

                            {!report.evidence || report.evidence.length === 0 ? (
                                <div className="mt-4 rounded-xl border border-dashed border-border-neutral bg-pale-green/30 p-6 text-center text-xs text-gray-neutral">
                                    Tidak ada berkas bukti yang disertakan pada laporan ini.
                                </div>
                            ) : (
                                <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                                    {report.evidence.map((ev) => (
                                        <div
                                            key={ev.id}
                                            className="group relative overflow-hidden rounded-lg border border-border-neutral bg-pale-green/40 p-3 transition hover:border-primary-green hover:bg-soft-green/30"
                                        >
                                            <div className="flex aspect-video items-center justify-center rounded-md bg-white border border-border-neutral/60 text-primary-green shadow-2xs">
                                                <FileImage className="size-8 text-primary-green" />
                                            </div>
                                            <div
                                                className="mt-2 truncate text-xs font-semibold text-dark-neutral"
                                                title={ev.original_filename}
                                            >
                                                {ev.original_filename}
                                            </div>
                                            <div className="text-[11px] text-gray-neutral">
                                                {(ev.size_bytes / 1024).toFixed(0)} KB &bull; {ev.media_type}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Chronology / Status History Timeline */}
                        <div className="rounded-xl border border-border-neutral bg-white p-5 shadow-xs sm:p-6">
                            <div className="flex items-center gap-2">
                                <History className="size-4 text-primary-green" />
                                <h2 className="text-base font-bold tracking-tight text-dark-neutral">
                                    Kronologi & Riwayat Perubahan Status
                                </h2>
                            </div>
                            <p className="text-xs text-gray-neutral">
                                Jejak audit transisi status yang tercatat permanen sesuai standar akuntabilitas JAGAIN
                            </p>

                            <ol className="relative mt-5 ml-3 border-l border-border-neutral">
                                {report.status_histories?.map((history) => (
                                    <li key={history.id} className="mb-5 ml-6 last:mb-0">
                                        <span className="absolute -left-3 flex size-6 items-center justify-center rounded-full bg-soft-green text-primary-green ring-4 ring-white">
                                            <CheckCircle2 className="size-3.5" />
                                        </span>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <StatusBadge status={history.to_status} variant="neutral" />
                                            <span className="text-xs text-gray-neutral">
                                                {formatDate(history.created_at)}
                                            </span>
                                        </div>
                                        <div className="mt-1 text-xs text-dark-neutral">
                                            Aktor:{' '}
                                            <span className="font-semibold text-forest-green">
                                                {history.actor?.name ?? 'Sistem'}
                                            </span>
                                        </div>
                                        {history.reason && (
                                            <div className="mt-1.5 rounded-lg border border-border-neutral bg-pale-green/60 p-2 text-xs text-dark-neutral">
                                                <span className="font-semibold text-forest-green">Alasan:</span> {history.reason}
                                            </div>
                                        )}
                                        {history.note && (
                                            <p className="mt-1 text-xs text-gray-neutral">
                                                {history.note}
                                            </p>
                                        )}
                                        {history.public_note && (
                                            <div className="mt-1.5 rounded-lg border border-leaf-green/40 bg-soft-green/80 p-2.5 text-xs text-forest-green">
                                                <span className="font-semibold">Instruksi ke Pelapor:</span>{' '}
                                                {history.public_note}
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>

                    {/* Right Column: Actions & OPD Dispatch */}
                    <div className="flex flex-col gap-6">
                        {/* Status Transition Action Card */}
                        <div className="rounded-xl border border-border-neutral bg-white p-5 shadow-xs sm:p-6">
                            <div className="flex items-center gap-2">
                                <Shield className="size-4 text-primary-green" />
                                <h3 className="text-base font-bold tracking-tight text-dark-neutral">
                                    Keputusan & Transisi Status
                                </h3>
                            </div>
                            <p className="mt-1 text-xs text-gray-neutral">
                                Status saat ini:{' '}
                                <strong className="font-bold text-forest-green">
                                    {report.report_status}
                                </strong>
                            </p>

                            <div className="mt-4 flex flex-col gap-2.5">
                                {report.report_status === 'SUBMITTED' && (
                                    <Button
                                        type="button"
                                        disabled={transitionForm.processing}
                                        onClick={() =>
                                            executeTransition(
                                                'UNDER_REVIEW',
                                                '',
                                                'Admin memulai pemeriksaan kelengkapan berkas.'
                                            )
                                        }
                                        className="w-full bg-primary-green px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-forest-green"
                                    >
                                        Mulai Telaah Laporan (UNDER_REVIEW)
                                    </Button>
                                )}

                                {report.report_status === 'UNDER_REVIEW' && (
                                    <>
                                        <Button
                                            type="button"
                                            disabled={transitionForm.processing}
                                            onClick={() =>
                                                executeTransition(
                                                    'VERIFIED',
                                                    '',
                                                    'Laporan telah diperiksa dan dinilai memenuhi kriteria verifikasi JAGAIN.'
                                                )
                                            }
                                            className="w-full bg-primary-green px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-forest-green"
                                        >
                                            Verifikasi Laporan Valid (VERIFIED)
                                        </Button>

                                        <button
                                            type="button"
                                            onClick={() => setIsNeedsInfoModalOpen(true)}
                                            className="w-full rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-center text-xs font-semibold text-amber-900 transition hover:bg-amber-100"
                                        >
                                            Minta Informasi Tambahan (NEEDS_INFORMATION)
                                        </button>
                                    </>
                                )}

                                {report.report_status === 'NEEDS_INFORMATION' && (
                                    <Button
                                        type="button"
                                        disabled={transitionForm.processing}
                                        onClick={() =>
                                            executeTransition(
                                                'UNDER_REVIEW',
                                                '',
                                                'Melanjutkan pemeriksaan laporan setelah informasi diperbarui.'
                                            )
                                        }
                                        className="w-full bg-primary-green px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-forest-green"
                                    >
                                        Kembalikan ke Pemeriksaan (UNDER_REVIEW)
                                    </Button>
                                )}

                                {report.report_status === 'RESOLUTION_REVIEW' && (
                                    <Button
                                        type="button"
                                        disabled={transitionForm.processing}
                                        onClick={() =>
                                            executeTransition(
                                                'RESOLVED_VERIFIED',
                                                '',
                                                'Admin telah memeriksa bukti penanganan OPD dan menetapkan status administratif selesai.'
                                            )
                                        }
                                        className="w-full bg-forest-green px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-primary-green"
                                    >
                                        Sahkan Selesai Terverifikasi (RESOLVED_VERIFIED)
                                    </Button>
                                )}

                                {/* Destructive Close action */}
                                {['SUBMITTED', 'UNDER_REVIEW', 'NEEDS_INFORMATION', 'VERIFIED'].includes(
                                    report.report_status
                                ) && (
                                    <button
                                        type="button"
                                        onClick={() => setIsCloseModalOpen(true)}
                                        className="mt-1 w-full rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-center text-xs font-semibold text-rose-800 transition hover:bg-rose-100"
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
                        <div className="rounded-xl border border-border-neutral bg-white p-5 shadow-xs sm:p-6">
                            <div className="flex items-center gap-2">
                                <Building2 className="size-4 text-primary-green" />
                                <h3 className="text-base font-bold tracking-tight text-dark-neutral">
                                    Penugasan ke Instansi (OPD)
                                </h3>
                            </div>
                            <p className="mt-1 text-xs text-gray-neutral">
                                Teruskan laporan terverifikasi kepada instansi penanganan wilayah Kalimantan
                            </p>

                            {report.report_status === 'VERIFIED' || report.report_status === 'DISPATCHED' ? (
                                <form onSubmit={handleAssignSubmit} className="mt-4 flex flex-col gap-3">
                                    <div>
                                        <label
                                            htmlFor="agency_id"
                                            className="block text-xs font-semibold text-dark-neutral"
                                        >
                                            Pilih Instansi / OPD Berwenang
                                        </label>
                                        <select
                                            id="agency_id"
                                            value={assignmentForm.data.agency_id}
                                            onChange={(e) => assignmentForm.setData('agency_id', e.target.value)}
                                            className="mt-1 w-full rounded-lg border border-border-neutral bg-pale-green/40 px-3 py-2 text-xs text-dark-neutral transition-colors focus:border-primary-green focus:bg-white focus:outline-hidden"
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
                                            className="block text-xs font-semibold text-dark-neutral"
                                        >
                                            Catatan Instruksi Penanganan (Opsional)
                                        </label>
                                        <textarea
                                            id="note"
                                            rows={3}
                                            value={assignmentForm.data.note}
                                            onChange={(e) => assignmentForm.setData('note', e.target.value)}
                                            placeholder="Contoh: Mohon koordinasi dengan pos damkar terdekat..."
                                            className="mt-1 w-full rounded-lg border border-border-neutral bg-pale-green/40 p-2.5 text-xs text-dark-neutral transition-colors focus:border-primary-green focus:bg-white focus:outline-hidden"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={assignmentForm.processing}
                                        className="bg-primary-green px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-forest-green"
                                    >
                                        <Send className="size-3.5 mr-1.5" />
                                        <span>
                                            {report.report_status === 'DISPATCHED'
                                                ? 'Tugaskan Ulang (Reassign)'
                                                : 'Kirim Penugasan ke OPD'}
                                        </span>
                                    </Button>

                                    {(assignmentForm.errors as Record<string, string | undefined>).report && (
                                        <p className="text-xs text-rose-600">
                                            {(assignmentForm.errors as Record<string, string | undefined>).report}
                                        </p>
                                    )}
                                </form>
                            ) : (
                                <div className="mt-4 rounded-lg border border-border-neutral bg-pale-green/40 p-3 text-xs text-gray-neutral">
                                    Laporan harus diverifikasi valid (status VERIFIED) sebelum dapat ditugaskan ke instansi.
                                </div>
                            )}

                            {/* Active assignment details if present */}
                            {report.latest_assignment && (
                                <div className="mt-4 border-t border-border-neutral pt-4">
                                    <span className="text-xs font-semibold text-dark-neutral">
                                        Penugasan Aktif Saat Ini:
                                    </span>
                                    <div className="mt-2 rounded-lg border border-border-neutral bg-pale-green/40 p-3 text-xs">
                                        <div className="font-semibold text-dark-neutral">
                                            {report.latest_assignment.agency?.name}
                                        </div>
                                        <div className="mt-1 flex items-center gap-1.5">
                                            <span className="badge badge-light">
                                                {report.latest_assignment.assignment_status}
                                            </span>
                                        </div>
                                        {report.latest_assignment.decline_reason && (
                                            <div className="mt-2 rounded bg-rose-50 p-2 text-rose-900 border border-rose-200">
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
                    <div className="w-full max-w-md rounded-2xl border border-border-neutral bg-white p-6 shadow-xl">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-dark-neutral">
                                Minta Informasi Tambahan
                            </h3>
                            <button
                                type="button"
                                onClick={() => setIsNeedsInfoModalOpen(false)}
                                className="rounded p-1 text-gray-neutral hover:bg-pale-green"
                            >
                                <X className="size-4" />
                            </button>
                        </div>
                        <p className="mt-1 text-xs text-gray-neutral">
                            Pesan ini akan terlihat oleh pelapor pada halaman detail dan pelacakan status.
                        </p>

                        <div className="mt-4">
                            <label className="block text-xs font-semibold text-dark-neutral">
                                Instruksi yang Perlu Dilengkapi Pelapor *
                            </label>
                            <textarea
                                rows={4}
                                value={transitionForm.data.public_note}
                                onChange={(e) => transitionForm.setData('public_note', e.target.value)}
                                placeholder="Contoh: Mohon sebutkan patok batas desa atau titik acuan terdekat..."
                                className="mt-1 w-full rounded-lg border border-border-neutral bg-pale-green/40 p-2.5 text-xs text-dark-neutral focus:border-primary-green focus:bg-white focus:outline-hidden"
                            />
                            {transitionForm.errors.note && (
                                <p className="mt-1 text-xs text-rose-600">{transitionForm.errors.note}</p>
                            )}
                        </div>

                        <div className="mt-5 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setIsNeedsInfoModalOpen(false)}
                                className="rounded-lg border border-border-neutral px-3.5 py-2 text-xs font-semibold text-dark-neutral hover:bg-pale-green"
                            >
                                Batal
                            </button>
                            <Button
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
                                className="bg-primary-green px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-forest-green"
                            >
                                Kirim Permintaan
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal: Tutup Laporan (Destructive Action) */}
            {isCloseModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
                    <div className="w-full max-w-md rounded-2xl border border-border-neutral bg-white p-6 shadow-xl">
                        <div className="flex items-start gap-3">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                                <XCircle className="size-5" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-rose-900">
                                    Konfirmasi Penutupan Laporan
                                </h3>
                                <p className="mt-1 text-xs text-rose-700">
                                    Aksi ini akan menghentikan proses verifikasi laporan. Alasan penutupan wajib dicatat dalam audit trail.
                                </p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-xs font-semibold text-dark-neutral">
                                Alasan Penutupan Laporan *
                            </label>
                            <select
                                value={transitionForm.data.reason}
                                onChange={(e) => transitionForm.setData('reason', e.target.value)}
                                className="mt-1 w-full rounded-lg border border-border-neutral bg-white p-2.5 text-xs text-dark-neutral focus:border-rose-500 focus:outline-hidden"
                            >
                                <option value="">-- Pilih Alasan Penutupan --</option>
                                <option value="Laporan Duplikat dari Titik yang Sama">Laporan Duplikat dari Titik yang Sama</option>
                                <option value="Bukan Kebakaran Hutan atau Lahan">Bukan Kebakaran Hutan atau Lahan (Di luar cakupan)</option>
                                <option value="Informasi Palsu atau Tidak Dapat Diverifikasi">Informasi Palsu atau Tidak Dapat Diverifikasi</option>
                                <option value="Lokasi Berada di Luar Wilayah Operasional">Lokasi Berada di Luar Wilayah Operasional</option>
                            </select>
                            {transitionForm.errors.reason && (
                                <p className="mt-1 text-xs text-rose-600">{transitionForm.errors.reason}</p>
                            )}
                        </div>

                        <div className="mt-3">
                            <label className="block text-xs font-semibold text-dark-neutral">
                                Catatan Penjelasan Tambahan (Opsional)
                            </label>
                            <textarea
                                rows={2}
                                value={transitionForm.data.note}
                                onChange={(e) => transitionForm.setData('note', e.target.value)}
                                placeholder="Jelaskan detail pertimbangan penutupan..."
                                className="mt-1 w-full rounded-lg border border-border-neutral p-2 text-xs text-dark-neutral focus:border-rose-500 focus:outline-hidden"
                            />
                        </div>

                        <div className="mt-5 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setIsCloseModalOpen(false)}
                                className="rounded-lg border border-border-neutral px-3.5 py-2 text-xs font-semibold text-dark-neutral hover:bg-pale-green"
                            >
                                Batal
                            </button>
                            <Button
                                type="button"
                                disabled={transitionForm.processing || !transitionForm.data.reason}
                                onClick={() =>
                                    executeTransition(
                                        'CLOSED_WITH_REASON',
                                        transitionForm.data.reason,
                                        transitionForm.data.note
                                    )
                                }
                                className="bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-rose-700"
                            >
                                Ya, Tutup Laporan Ini
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
