import React from 'react';
import {
    CheckCircle2,
    Clock,
    AlertCircle,
    Send,
    ShieldCheck,
    Flame,
    XCircle,
    Search,
    Building2,
} from 'lucide-react';

interface ReportStageStepperProps {
    reportStatus: string;
    reportStatusLabel?: string;
    assignmentStatus?: string | null;
    assignmentStatusLabel?: string | null;
    agencyName?: string | null;
    fireCondition: string;
    fireConditionLabel?: string;
    updatedAt?: string | null;
}

const STAGES = [
    {
        key: 'SUBMITTED',
        title: 'Menunggu Verifikasi',
        desc: 'Laporan warga diterima sistem',
    },
    {
        key: 'UNDER_REVIEW',
        title: 'Dalam Peninjauan',
        desc: 'Pemeriksaan bukti & koordinat',
    },
    {
        key: 'VERIFIED',
        title: 'Terverifikasi',
        desc: 'Validasi awal terpenuhi',
    },
    {
        key: 'DISPATCHED',
        title: 'Diteruskan ke Instansi',
        desc: 'Disposisi tugas ke OPD/BPBD',
    },
    {
        key: 'IN_PROGRESS',
        title: 'Dalam Penanganan',
        desc: 'Tindak lanjut regu lapangan',
    },
    {
        key: 'RESOLUTION_REVIEW',
        title: 'Menunggu Validasi Penyelesaian',
        desc: 'Evaluasi bukti pemadaman',
    },
    {
        key: 'RESOLVED_VERIFIED',
        title: 'Selesai Terverifikasi',
        desc: 'Penanganan tuntas tervalidasi',
    },
];

function computeActiveStageIndex(
    reportStatus: string,
    assignmentStatus?: string | null
): number {
    if (reportStatus === 'RESOLVED_VERIFIED') return 6;
    if (
        reportStatus === 'RESOLUTION_REVIEW' ||
        assignmentStatus === 'SUBMITTED_FOR_REVIEW'
    ) {
        return 5;
    }
    if (reportStatus === 'DISPATCHED') {
        if (
            assignmentStatus === 'IN_PROGRESS' ||
            assignmentStatus === 'COMPLETED'
        ) {
            return 4;
        }
        return 3;
    }
    if (reportStatus === 'VERIFIED') return 2;
    if (
        reportStatus === 'UNDER_REVIEW' ||
        reportStatus === 'NEEDS_INFORMATION'
    ) {
        return 1;
    }
    return 0;
}

export default function ReportStageStepper({
    reportStatus,
    reportStatusLabel,
    assignmentStatus,
    assignmentStatusLabel,
    agencyName,
    fireCondition,
    fireConditionLabel,
    updatedAt,
}: ReportStageStepperProps) {
    const isClosed = reportStatus === 'CLOSED_WITH_REASON';
    const needsInfo = reportStatus === 'NEEDS_INFORMATION';
    const activeIndex = computeActiveStageIndex(reportStatus, assignmentStatus);

    return (
        <div className="rounded-3xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-xs space-y-5 font-sans">
            {/* Header & Timestamp */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-4">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                            Indikator Progres Penanganan Laporan (Real-Time)
                        </h2>
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5">
                        Tahapan verifikasi berjenjang dari pelaporan masyarakat hingga validasi penyelesaian lapangan.
                    </p>
                </div>
                {updatedAt && (
                    <span className="font-mono text-[11px] text-neutral-500 bg-neutral-50 px-3 py-1 rounded-full border border-neutral-200 shrink-0">
                        Pembaruan Terakhir:{' '}
                        {new Date(updatedAt).toLocaleString('id-ID', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </span>
                )}
            </div>

            {/* Special Alert for CLOSED_WITH_REASON or NEEDS_INFORMATION */}
            {isClosed ? (
                <div className="flex items-start gap-3 rounded-2xl border border-neutral-300 bg-neutral-100 p-4 text-xs text-neutral-800">
                    <XCircle className="size-5 text-neutral-600 shrink-0 mt-0.5" />
                    <div>
                        <strong className="font-bold text-neutral-900 block">
                            Tahap Akhir: Ditutup dengan Alasan (CLOSED_WITH_REASON)
                        </strong>
                        <span className="text-neutral-600">
                            Laporan ini telah ditutup secara administratif dengan alasan tercatat pada riwayat audit di bawah.
                        </span>
                    </div>
                </div>
            ) : needsInfo ? (
                <div className="flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50/80 p-4 text-xs text-amber-900">
                    <AlertCircle className="size-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                        <strong className="font-bold text-amber-950 block">
                            Status Saat Ini: Membutuhkan Informasi Tambahan (NEEDS_INFORMATION)
                        </strong>
                        <span className="text-amber-800">
                            Tim verifikator membutuhkan klarifikasi atau bukti tambahan dari pelapor sebelum meneruskan penugasan ke instansi.
                        </span>
                    </div>
                </div>
            ) : null}

            {/* 7-Stage Stepper Grid */}
            {!isClosed && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2.5">
                    {STAGES.map((stage, idx) => {
                        const isCompleted = idx < activeIndex || reportStatus === 'RESOLVED_VERIFIED';
                        const isCurrent = idx === activeIndex && reportStatus !== 'RESOLVED_VERIFIED';

                        return (
                            <div
                                key={stage.key}
                                className={`relative rounded-2xl border p-3 transition-all flex flex-col justify-between ${
                                    isCurrent
                                        ? 'border-emerald-500 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-500/30'
                                        : isCompleted
                                        ? 'border-emerald-200 bg-emerald-50/30 text-neutral-800'
                                        : 'border-neutral-200/80 bg-neutral-50/60 text-neutral-400'
                                }`}
                            >
                                <div className="flex items-center justify-between gap-1.5 mb-2">
                                    <span
                                        className={`inline-flex size-5 items-center justify-center rounded-full font-mono text-[10px] font-bold ${
                                            isCurrent
                                                ? 'bg-[#0c4e33] text-white'
                                                : isCompleted
                                                ? 'bg-emerald-600 text-white'
                                                : 'bg-neutral-200 text-neutral-500'
                                        }`}
                                    >
                                        {isCompleted ? '✓' : idx + 1}
                                    </span>
                                    {isCurrent && (
                                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#10e57a] text-black">
                                            Tahap Aktif
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <div
                                        className={`text-xs font-bold leading-snug ${
                                            isCurrent
                                                ? 'text-neutral-950'
                                                : isCompleted
                                                ? 'text-neutral-800'
                                                : 'text-neutral-400'
                                        }`}
                                    >
                                        {idx === 1 && needsInfo
                                            ? 'Membutuhkan Informasi Tambahan'
                                            : stage.title}
                                    </div>
                                    <div className="text-[10px] leading-tight mt-1 text-neutral-500">
                                        {stage.desc}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Separation of 3 Status Dimensions (ReportStatus vs AssignmentStatus vs FireCondition) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t border-neutral-100">
                {/* 1. Status Laporan */}
                <div className="rounded-2xl bg-neutral-50 border border-neutral-200/80 p-3.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-bold">
                        <Search className="size-3.5 text-emerald-700" />
                        <span>1. Status Administratif Laporan</span>
                    </div>
                    <div className="text-xs font-bold text-neutral-900">
                        {reportStatusLabel || reportStatus}
                    </div>
                    <div className="text-[11px] text-neutral-500">
                        Kode Status: <code className="font-mono text-[10px]">{reportStatus}</code>
                    </div>
                </div>

                {/* 2. Status Penugasan Instansi / OPD */}
                <div className="rounded-2xl bg-neutral-50 border border-neutral-200/80 p-3.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-bold">
                        <Building2 className="size-3.5 text-emerald-700" />
                        <span>2. Status Penugasan Instansi (OPD)</span>
                    </div>
                    <div className="text-xs font-bold text-neutral-900">
                        {assignmentStatusLabel || 'Belum Ditugaskan ke OPD'}
                    </div>
                    <div className="text-[11px] text-neutral-500 truncate">
                        {agencyName ? `Unit: ${agencyName}` : 'Menunggu disposisi verifikator'}
                    </div>
                </div>

                {/* 3. Kondisi Fisik Api Lapangan */}
                <div className="rounded-2xl bg-neutral-50 border border-neutral-200/80 p-3.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-bold">
                        <Flame className="size-3.5 text-orange-600" />
                        <span>3. Kondisi Fisik Kebakaran</span>
                    </div>
                    <div className="text-xs font-bold text-neutral-900">
                        {fireConditionLabel || fireCondition}
                    </div>
                    <div className="text-[11px] text-neutral-500">
                        Kode Fisik: <code className="font-mono text-[10px]">{fireCondition}</code>
                    </div>
                </div>
            </div>
        </div>
    );
}

