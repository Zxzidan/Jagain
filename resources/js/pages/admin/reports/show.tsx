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
    FileText,
    History,
    MapPin,
    Send,
    Shield,
    User as UserIcon,
    X,
    XCircle,
    ZoomIn,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/reports/status-badge';
import {
    assign as reportAssign,
    index as reportsIndex,
    show as reportShow,
    transition as reportTransition,
} from '@/routes/admin/reports';
import type { Agency, Evidence, Report, ReportStatus } from '@/types';

type ReportShowProps = {
    report: Report;
    activeAgencies: Agency[];
    allowedTransitions: string[];
    potentialDuplicates: Pick<
        Report,
        'id' | 'title' | 'report_status' | 'created_at' | 'location_description'
    >[];
};

const assignmentStatusLabels: Record<string, string> = {
    ASSIGNED: 'Menunggu Konfirmasi OPD',
    RECEIVED_BY_AGENCY: 'Diterima OPD',
    DECLINED_BY_AGENCY: 'Ditolak OPD',
    IN_PROGRESS: 'Sedang Ditangani',
    SUBMITTED_FOR_REVIEW: 'Menunggu Review Selesai',
    COMPLETED: 'Penanganan Selesai',
};

export default function ReportShow({
    report,
    activeAgencies,
    allowedTransitions,
    potentialDuplicates = [],
}: ReportShowProps) {
    const page = usePage();
    const flash = (page.props as any).flash;

    const [selectedEvidence, setSelectedEvidence] = useState<{
        url: string;
        filename: string;
    } | null>(null);
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

    const getEvidenceUrl = (ev: Evidence) => {
        if (ev.url) return ev.url;
        if (ev.file_path) return `/storage/${ev.file_path}`;
        if (ev.storage_key) return `/storage/${ev.storage_key}`;
        return '';
    };

    const isImageFile = (ev: Evidence) => {
        if (ev.media_type && ev.media_type.startsWith('image/')) return true;
        const name = ev.original_filename || ev.file_path || ev.storage_key || '';
        return /\.(jpe?g|png|webp|gif|svg)$/i.test(name);
    };

    return (
        <>
            <Head title={`Review Laporan #${report.id} - JAGAIN Admin`} />

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
                {/* Flash Messages */}
                {flash?.success && (
                    <div
                        role="status"
                        className="flex items-center gap-3 rounded-2xl border border-leaf-green/30 bg-soft-green/70 p-4 text-sm text-forest-green shadow-xs transition-all duration-200"
                    >
                        <CheckCircle2 className="size-5 shrink-0 text-primary-green" />
                        <span className="font-medium">{flash.success}</span>
                    </div>
                )}
                {flash?.error && (
                    <div
                        role="alert"
                        className="flex items-center gap-3 rounded-2xl border border-border-neutral bg-white p-4 text-sm text-dark-neutral shadow-xs transition-all duration-200"
                    >
                        <AlertCircle className="size-5 shrink-0 text-primary-green" />
                        <span className="font-medium">{flash.error}</span>
                    </div>
                )}

                {/* Back button & Header Bar */}
                <header className="flex flex-col justify-between gap-4 rounded-2xl border border-border-neutral bg-white p-5 shadow-xs sm:flex-row sm:items-center sm:p-6">
                    <div className="flex items-start gap-3.5">
                        <Link
                            href={reportsIndex().url}
                            className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-border-neutral bg-white text-dark-neutral shadow-xs transition hover:border-gray-neutral/40 hover:bg-pale-green"
                            title="Kembali ke antrean laporan"
                        >
                            <ArrowLeft className="size-4" />
                        </Link>
                        <div className="space-y-1.5">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="badge badge-light font-mono font-bold">
                                    #{report.id}
                                </span>
                                <StatusBadge status={report.report_status} variant="neutral" />
                                {report.is_simulated && (
                                    <span className="badge badge-light border border-amber-200 bg-amber-50 text-amber-700">
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
                            className="rounded-xl border-border-neutral bg-white text-xs font-semibold text-dark-neutral hover:bg-pale-green"
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
                            <div className="rounded-2xl border border-amber-200 bg-amber-50/90 p-5 shadow-xs">
                                <div className="flex items-start gap-3">
                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                                        <AlertTriangle className="size-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-sm font-bold text-amber-950">
                                            Perhatian: Ditemukan {potentialDuplicates.length} Laporan di Area Berdekatan
                                        </h3>
                                        <p className="mt-0.5 text-xs text-amber-900/80">
                                            Laporan di bawah ini memiliki kategori atau koordinat berdekatan (&plusmn;10 km). Cek potensi duplikat sebelum validasi:
                                        </p>
                                        <div className="mt-3 divide-y divide-amber-200/60 overflow-hidden rounded-xl border border-amber-200/80 bg-white/80">
                                            {potentialDuplicates.map((dup) => (
                                                <div
                                                    key={dup.id}
                                                    className="flex flex-col justify-between gap-2 p-3 transition hover:bg-amber-100/40 sm:flex-row sm:items-center"
                                                >
                                                    <div className="flex min-w-0 items-center gap-2">
                                                        <span className="shrink-0 font-mono text-xs font-bold text-amber-900">
                                                            #{dup.id}
                                                        </span>
                                                        <Link
                                                            href={reportShow(dup.id).url}
                                                            className="truncate text-xs font-semibold text-dark-neutral hover:text-forest-green hover:underline"
                                                        >
                                                            {dup.title}
                                                        </Link>
                                                    </div>
                                                    <div className="flex shrink-0 items-center gap-2">
                                                        <StatusBadge
                                                            status={dup.report_status}
                                                            variant="neutral"
                                                            className="text-[11px]"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Report Core Information Card */}
                        <div className="rounded-2xl border border-border-neutral bg-white p-5 shadow-xs sm:p-6">
                            <h2 className="text-base font-bold tracking-tight text-dark-neutral">
                                Deskripsi Kejadian & Lokasi
                            </h2>

                            <div className="mt-3 whitespace-pre-wrap text-xs leading-relaxed text-dark-neutral sm:text-sm">
                                {report.description}
                            </div>

                            <div className="mt-5 grid gap-4 border-t border-border-neutral pt-4 sm:grid-cols-2">
                                <div>
                                    <span className="text-xs font-semibold text-gray-neutral">
                                        Kategori Laporan
                                    </span>
                                    <div className="mt-1 text-xs font-medium text-dark-neutral sm:text-sm">
                                        {report.category?.name ?? 'Umum'}
                                    </div>
                                </div>

                                <div>
                                    <span className="text-xs font-semibold text-gray-neutral">
                                        Identitas Pelapor
                                    </span>
                                    <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-dark-neutral sm:text-sm">
                                        <UserIcon className="size-4 text-primary-green" />
                                        <span>{report.creator?.name ?? 'Anonim'}</span>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-xs font-semibold text-gray-neutral">
                                        Waktu Kejadian Dilaporkan
                                    </span>
                                    <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-dark-neutral sm:text-sm">
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
                                    <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-dark-neutral sm:text-sm">
                                        <Clock className="size-4 text-primary-green" />
                                        <span>
                                            {formatDate(report.created_at)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Location Box */}
                            <div className="mt-5 rounded-xl border border-border-neutral bg-pale-green/60 p-4">
                                <div className="flex items-start justify-between gap-3">
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
                                        className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-border-neutral bg-white px-3.5 py-2 text-xs font-semibold text-forest-green shadow-xs transition hover:border-gray-neutral/40 hover:bg-pale-green"
                                    >
                                        <span>Buka Peta</span>
                                        <ExternalLink className="size-3.5" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Evidence Gallery Card */}
                        <div className="rounded-2xl border border-border-neutral bg-white p-5 shadow-xs sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-base font-bold tracking-tight text-dark-neutral">
                                        Berkas Bukti Lapangan ({report.evidence?.length ?? 0})
                                    </h2>
                                    <p className="mt-0.5 text-xs text-gray-neutral">
                                        Foto atau dokumentasi lapangan yang diunggah pelapor
                                    </p>
                                </div>
                            </div>

                            {!report.evidence || report.evidence.length === 0 ? (
                                <div className="mt-4 rounded-xl border border-dashed border-border-neutral bg-pale-green/30 p-6 text-center text-xs text-gray-neutral">
                                    Tidak ada berkas bukti yang disertakan pada laporan ini.
                                </div>
                            ) : (
                                <div className="mt-4 grid gap-3.5 sm:grid-cols-2 md:grid-cols-3">
                                    {report.evidence.map((ev) => {
                                        const imageUrl = getEvidenceUrl(ev);
                                        const isImg = isImageFile(ev);

                                        return (
                                            <div
                                                key={ev.id}
                                                onClick={() => {
                                                    if (isImg && imageUrl) {
                                                        setSelectedEvidence({
                                                            url: imageUrl,
                                                            filename: ev.original_filename,
                                                        });
                                                    }
                                                }}
                                                className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border-neutral bg-white p-3 shadow-2xs transition-all duration-200 hover:border-primary-green hover:shadow-xs ${
                                                    isImg ? 'cursor-pointer' : ''
                                                }`}
                                            >
                                                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border-neutral/60 bg-zinc-100">
                                                    {isImg && imageUrl ? (
                                                        <>
                                                            <img
                                                                src={imageUrl}
                                                                alt={ev.original_filename}
                                                                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                                onError={(e) => {
                                                                    const target = e.currentTarget;
                                                                    target.style.display = 'none';
                                                                    const fallback = target.nextElementSibling as HTMLElement;
                                                                    if (fallback) {
                                                                        fallback.classList.remove('hidden');
                                                                        fallback.classList.add('flex');
                                                                    }
                                                                }}
                                                            />
                                                            <div className="fallback-icon hidden absolute inset-0 flex-col items-center justify-center bg-pale-green/40 p-2 text-center text-forest-green">
                                                                <FileImage className="mb-1 size-7 text-primary-green" />
                                                                <span className="max-w-full truncate text-[10px] text-gray-neutral">
                                                                    {ev.original_filename}
                                                                </span>
                                                            </div>
                                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-dark-neutral shadow-sm backdrop-blur-xs">
                                                                    <ZoomIn className="size-3.5 text-primary-green" />
                                                                    <span>Lihat Foto</span>
                                                                </span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="flex size-full flex-col items-center justify-center bg-pale-green/40 p-3 text-center">
                                                            <FileText className="mb-1 size-7 text-primary-green" />
                                                            <span className="max-w-full truncate text-[11px] font-medium text-dark-neutral">
                                                                {ev.original_filename}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mt-2.5">
                                                    <div
                                                        className="truncate text-xs font-semibold text-dark-neutral"
                                                        title={ev.original_filename}
                                                    >
                                                        {ev.original_filename}
                                                    </div>
                                                    <div className="mt-1 flex items-center justify-between text-[11px] text-gray-neutral">
                                                        <span>
                                                            {(ev.size_bytes / 1024).toFixed(0)} KB &bull;{' '}
                                                            {ev.media_type || 'image'}
                                                        </span>
                                                        {isImg && (
                                                            <span className="font-medium text-forest-green group-hover:underline">
                                                                Perbesar
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Chronology / Status History Timeline */}
                        <div className="rounded-2xl border border-border-neutral bg-white p-5 shadow-xs sm:p-6">
                            <div className="flex items-center gap-2">
                                <History className="size-4 text-primary-green" />
                                <h2 className="text-base font-bold tracking-tight text-dark-neutral">
                                    Kronologi & Riwayat Perubahan Status
                                </h2>
                            </div>
                            <p className="mt-0.5 text-xs text-gray-neutral">
                                Jejak audit transisi status yang tercatat permanen sesuai standar akuntabilitas JAGAIN
                            </p>

                            <ol className="relative mt-6 ml-3.5 border-l-2 border-primary-green/20">
                                {report.status_histories?.map((history) => (
                                    <li key={history.id} className="mb-6 ml-6 last:mb-0">
                                        <span className="absolute -left-4 flex size-7 items-center justify-center rounded-full bg-soft-green text-primary-green ring-4 ring-white shadow-2xs">
                                            <CheckCircle2 className="size-4" />
                                        </span>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <StatusBadge status={history.to_status} variant="neutral" />
                                            <span className="text-xs text-gray-neutral">
                                                {formatDate(history.created_at)}
                                            </span>
                                        </div>
                                        <div className="mt-1.5 text-xs text-dark-neutral">
                                            Aktor:{' '}
                                            <span className="font-semibold text-forest-green">
                                                {history.actor?.name ?? 'Sistem'}
                                            </span>
                                        </div>
                                        {history.reason && (
                                            <div className="mt-2 rounded-xl border border-border-neutral bg-pale-green/60 p-2.5 text-xs text-dark-neutral">
                                                <span className="font-semibold text-forest-green">
                                                    Alasan:
                                                </span>{' '}
                                                {history.reason}
                                            </div>
                                        )}
                                        {history.note && (
                                            <p className="mt-1.5 text-xs leading-relaxed text-gray-neutral">
                                                {history.note}
                                            </p>
                                        )}
                                        {history.public_note && (
                                            <div className="mt-2 rounded-xl border border-leaf-green/40 bg-soft-green/80 p-3 text-xs text-forest-green">
                                                <span className="font-semibold">
                                                    Instruksi ke Pelapor:
                                                </span>{' '}
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
                        <div className="rounded-2xl border border-border-neutral bg-white p-5 shadow-xs sm:p-6">
                            <div className="flex items-center gap-2">
                                <Shield className="size-4 text-primary-green" />
                                <h3 className="text-base font-bold tracking-tight text-dark-neutral">
                                    Keputusan & Transisi Status
                                </h3>
                            </div>

                            <div className="mt-3 flex items-center justify-between rounded-xl border border-border-neutral bg-pale-green/40 p-3">
                                <span className="text-xs font-medium text-gray-neutral">Status saat ini:</span>
                                <StatusBadge status={report.report_status} variant="neutral" />
                            </div>

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
                                        className="w-full rounded-xl bg-primary-green px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-forest-green"
                                    >
                                        <Clock className="mr-1.5 size-4" />
                                        <span>Mulai Telaah Laporan</span>
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
                                            className="w-full rounded-xl bg-primary-green px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-forest-green"
                                        >
                                            <CheckCircle2 className="mr-1.5 size-4" />
                                            <span>Verifikasi Laporan Valid</span>
                                        </Button>

                                        <button
                                            type="button"
                                            onClick={() => setIsNeedsInfoModalOpen(true)}
                                            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-center text-xs font-semibold text-amber-900 transition hover:bg-amber-100"
                                        >
                                            <FileQuestion className="size-4 text-amber-700" />
                                            <span>Minta Informasi Tambahan</span>
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
                                        className="w-full rounded-xl bg-primary-green px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-forest-green"
                                    >
                                        <Clock className="mr-1.5 size-4" />
                                        <span>Kembalikan ke Pemeriksaan</span>
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
                                        className="w-full rounded-xl bg-forest-green px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-primary-green"
                                    >
                                        <CheckCircle2 className="mr-1.5 size-4" />
                                        <span>Sahkan Selesai Terverifikasi</span>
                                    </Button>
                                )}

                                {/* Destructive Close action */}
                                {['SUBMITTED', 'UNDER_REVIEW', 'NEEDS_INFORMATION', 'VERIFIED'].includes(
                                    report.report_status
                                ) && (
                                    <button
                                        type="button"
                                        onClick={() => setIsCloseModalOpen(true)}
                                        className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-center text-xs font-semibold text-rose-800 transition hover:bg-rose-100"
                                    >
                                        <XCircle className="size-3.5 text-rose-600" />
                                        <span>Tutup Laporan dengan Alasan</span>
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
                        <div className="rounded-2xl border border-border-neutral bg-white p-5 shadow-xs sm:p-6">
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
                                            className="mt-1 w-full rounded-xl border border-border-neutral bg-pale-green/40 px-3 py-2 text-xs text-dark-neutral transition-colors focus:border-primary-green focus:bg-white focus:outline-hidden"
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
                                            className="mt-1 w-full rounded-xl border border-border-neutral bg-pale-green/40 p-2.5 text-xs text-dark-neutral transition-colors focus:border-primary-green focus:bg-white focus:outline-hidden"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={assignmentForm.processing}
                                        className="rounded-xl bg-primary-green px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-forest-green"
                                    >
                                        <Send className="mr-1.5 size-3.5" />
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
                                <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-border-neutral bg-pale-green/40 p-3.5 text-xs text-dark-neutral">
                                    <AlertCircle className="size-4 shrink-0 text-forest-green/80" />
                                    <span>
                                        Laporan harus berstatus Terverifikasi Valid sebelum dapat didisposisikan ke instansi penanganan.
                                    </span>
                                </div>
                            )}

                            {/* Active assignment details if present */}
                            {report.latest_assignment && (
                                <div className="mt-4 border-t border-border-neutral pt-4">
                                    <span className="text-xs font-semibold text-dark-neutral">
                                        Penugasan Aktif Saat Ini:
                                    </span>
                                    <div className="mt-2 rounded-xl border border-border-neutral bg-pale-green/40 p-3 text-xs">
                                        <div className="font-semibold text-dark-neutral">
                                            {report.latest_assignment.agency?.name}
                                        </div>
                                        <div className="mt-1.5 flex items-center gap-1.5">
                                            <span className="badge badge-light">
                                                {assignmentStatusLabels[report.latest_assignment.assignment_status] ??
                                                    report.latest_assignment.assignment_status}
                                            </span>
                                        </div>
                                        {report.latest_assignment.decline_reason && (
                                            <div className="mt-2 rounded-lg border border-rose-200 bg-rose-50 p-2 text-rose-900">
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

            {/* Modal: Interactive Evidence Image Preview */}
            {selectedEvidence && (
                <div
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs"
                    onClick={() => setSelectedEvidence(null)}
                >
                    <div
                        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-border-neutral bg-white px-5 py-3.5">
                            <div className="flex min-w-0 items-center gap-2">
                                <FileImage className="size-4 shrink-0 text-primary-green" />
                                <h3 className="truncate text-sm font-bold text-dark-neutral">
                                    {selectedEvidence.filename}
                                </h3>
                            </div>
                            <div className="flex shrink-0 items-center gap-2">
                                <a
                                    href={selectedEvidence.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-xl border border-border-neutral bg-white px-3 py-1.5 text-xs font-semibold text-dark-neutral shadow-2xs transition hover:bg-pale-green"
                                >
                                    <span>Buka Tab Baru</span>
                                    <ExternalLink className="size-3.5" />
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setSelectedEvidence(null)}
                                    className="rounded-lg p-1.5 text-gray-neutral transition hover:bg-pale-green hover:text-dark-neutral"
                                    title="Tutup pratinjau"
                                >
                                    <X className="size-4" />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-1 items-center justify-center overflow-auto bg-zinc-950 p-4">
                            <img
                                src={selectedEvidence.url}
                                alt={selectedEvidence.filename}
                                className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain shadow-md"
                            />
                        </div>
                    </div>
                </div>
            )}

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
                                className="rounded-lg p-1 text-gray-neutral hover:bg-pale-green"
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
                                className="mt-1 w-full rounded-xl border border-border-neutral bg-pale-green/40 p-2.5 text-xs text-dark-neutral focus:border-primary-green focus:bg-white focus:outline-hidden"
                            />
                            {transitionForm.errors.note && (
                                <p className="mt-1 text-xs text-rose-600">{transitionForm.errors.note}</p>
                            )}
                        </div>

                        <div className="mt-5 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setIsNeedsInfoModalOpen(false)}
                                className="rounded-xl border border-border-neutral px-3.5 py-2 text-xs font-semibold text-dark-neutral hover:bg-pale-green"
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
                                className="rounded-xl bg-primary-green px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-forest-green"
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
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
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
                                className="mt-1 w-full rounded-xl border border-border-neutral bg-white p-2.5 text-xs text-dark-neutral focus:border-rose-500 focus:outline-hidden"
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
                                className="mt-1 w-full rounded-xl border border-border-neutral p-2 text-xs text-dark-neutral focus:border-rose-500 focus:outline-hidden"
                            />
                        </div>

                        <div className="mt-5 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setIsCloseModalOpen(false)}
                                className="rounded-xl border border-border-neutral px-3.5 py-2 text-xs font-semibold text-dark-neutral hover:bg-pale-green"
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
                                className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-rose-700"
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
