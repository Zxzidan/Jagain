import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import StatusBadge from '@/components/status-badge';
import FireConditionBadge from '@/components/fire-condition-badge';
import KarhutlaMap from '@/components/karhutla-map';
import {
    ArrowLeft,
    Clock,
    MapPin,
    Building,
    AlertCircle,
    Send,
    CheckCircle2,
    FileText,
    Info,
    Copy,
    Check,
    Shield,
} from 'lucide-react';

interface ReportTrackerProps {
    report: {
        id: number;
        tracking_code: string;
        title: string;
        description: string;
        category?: { name: string } | null;
        latitude: number;
        longitude: number;
        province: string;
        regency_city: string;
        location_description: string;
        reported_occurrence_at?: string | null;
        report_status: string;
        status_label: string;
        fire_condition: string;
        fire_condition_label: string;
        fire_condition_source?: string | null;
        fire_condition_observed_at?: string | null;
        information_requested?: string | null;
        close_reason?: string | null;
        created_at?: string | null;
        evidence: Array<{
            id: number;
            file_path: string;
            caption?: string | null;
        }>;
        status_history: Array<{
            id: number;
            from_status?: string | null;
            to_status: string;
            reason?: string | null;
            note?: string | null;
            created_at?: string | null;
        }>;
        assignments: Array<{
            id: number;
            agency_name: string;
            jurisdiction: string;
            status: string;
            status_label: string;
            assigned_at: string;
            operational_updates: Array<{
                id: number;
                update_type: string;
                note: string;
                fire_condition_observed?: string | null;
                created_at?: string | null;
            }>;
        }>;
    };
}

export default function ReportTracker({ report }: ReportTrackerProps) {
    const [copied, setCopied] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        supplementary_info: '',
    });

    const handleCopyCode = () => {
        navigator.clipboard.writeText(report.tracking_code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSendInfo = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/laporan-saya/${report.tracking_code}/tambah-informasi`, {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-[#F3F7F4] min-h-screen text-[#171C19]">
            <Head title={`Pelacakan Laporan ${report.tracking_code} — JAGAIN`} />

            {/* Top Navigation Bar */}
            <div className="bg-white border border-[#DDE3DE] rounded-2xl p-4 sm:px-6 shadow-xs flex items-center justify-between">
                <Link
                    href="/laporan-saya"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#174B35] hover:underline"
                >
                    <ArrowLeft className="size-4" />
                    Kembali ke Daftar Laporan Saya
                </Link>

                <div className="flex items-center gap-2">
                    <span className="text-xs text-[#68716B]">Kode Lacak Warga:</span>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#E8F1EB] border border-[#216B49]/20 font-mono text-xs font-bold text-[#174B35]">
                        <span>{report.tracking_code}</span>
                        <button
                            type="button"
                            onClick={handleCopyCode}
                            className="p-0.5 hover:text-[#216B49] transition-colors"
                            title="Salin Kode Lacak"
                        >
                            {copied ? <Check className="size-3 text-[#216B49]" /> : <Copy className="size-3" />}
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {/* Header Card */}
                <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge status={report.report_status} label={report.status_label} />
                        {report.category && (
                            <span className="text-xs bg-[#F3F7F4] text-[#343B36] px-2.5 py-1 rounded-full border border-[#DDE3DE]">
                                {report.category.name}
                            </span>
                        )}
                    </div>

                    <h1 className="text-xl sm:text-2xl font-bold text-[#171C19] leading-tight">
                        {report.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#68716B] pt-3 border-t border-[#DDE3DE]">
                        <div className="flex items-center gap-1.5">
                            <MapPin className="size-3.5 text-[#216B49]" />
                            <span className="font-medium text-[#171C19]">{report.regency_city}, {report.province}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="size-3.5 text-[#68716B]" />
                            <span>
                                Dikirim: {report.created_at ? new Date(report.created_at).toLocaleString('id-ID') : '-'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ACTION REQUIRED: If NEEDS_INFORMATION */}
                {report.report_status === 'NEEDS_INFORMATION' && (
                    <div className="bg-white border-2 border-[#174B35] rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
                        <div className="flex items-center gap-2.5 pb-3 border-b border-[#DDE3DE]">
                            <div className="size-8 rounded-lg bg-[#FFFBEB] text-[#D97706] flex items-center justify-center">
                                <AlertCircle className="size-5" />
                            </div>
                            <div>
                                <h2 className="font-bold text-sm text-[#174B35]">
                                    Petugas Membutuhkan Informasi Tambahan untuk Memverifikasi Laporan
                                </h2>
                                <p className="text-[11px] text-[#68716B]">Tanggapi catatan di bawah agar laporan dapat diproses segera.</p>
                            </div>
                        </div>

                        <div className="bg-[#E8F1EB] p-4 rounded-xl text-xs text-[#174B35] border border-[#216B49]/30 space-y-1">
                            <strong className="block text-[#174B35] text-[11px] uppercase tracking-wider">Catatan Klarifikasi dari Admin:</strong>
                            <p className="text-sm font-medium text-[#171C19] italic">
                                "{report.information_requested}"
                            </p>
                        </div>

                        <form onSubmit={handleSendInfo} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-[#171C19] mb-1.5">
                                    Lengkapi Keterangan Tambahan:
                                </label>
                                <textarea
                                    rows={3}
                                    value={data.supplementary_info}
                                    onChange={(e) => setData('supplementary_info', e.target.value)}
                                    placeholder="Tuliskan keterangan detail patok lokasi, akses jalan kendaraan pemadam, atau informasi tambahan yang diminta..."
                                    className="w-full text-xs p-3 rounded-xl border border-[#DDE3DE] focus:outline-none focus:ring-2 focus:ring-[#216B49] bg-white"
                                    required
                                />
                                {errors.supplementary_info && (
                                    <p className="text-[11px] text-red-600 mt-1">{errors.supplementary_info}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#216B49] text-white font-bold text-xs hover:bg-[#174B35] transition-all shadow-xs active:scale-[0.98] disabled:opacity-50"
                            >
                                <Send className="size-3.5" />
                                {processing ? 'Mengirim Data...' : 'Kirim Informasi Tambahan'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Closed Reason Notice if CLOSED_WITH_REASON */}
                {report.report_status === 'CLOSED_WITH_REASON' && (
                    <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6 shadow-xs space-y-2">
                        <h3 className="font-bold text-sm text-[#171C19]">
                            Laporan Ditutup dengan Catatan Alasan
                        </h3>
                        <p className="text-xs text-[#68716B] leading-relaxed">
                            Alasan: {report.close_reason || 'Laporan telah ditutup sesuai tinjauan administratif.'}
                        </p>
                    </div>
                )}

                {/* Ground Fire Condition & Assigned Agency Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6 shadow-xs space-y-3">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#174B35]">
                            Kondisi Lapangan Terkini
                        </div>
                        <FireConditionBadge
                            condition={report.fire_condition}
                            source={report.fire_condition_source}
                            observedAt={report.fire_condition_observed_at}
                        />
                        <p className="text-[11px] text-[#68716B] pt-2 border-t border-[#DDE3DE] leading-relaxed">
                            Atribut kondisi kebakaran dicatat terpisah dan diverifikasi langsung oleh petugas operasional.
                        </p>
                    </div>

                    <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6 shadow-xs space-y-3">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#174B35]">
                            Instansi Penugasan
                        </div>
                        {report.assignments.length > 0 ? (
                            <div className="bg-[#E8F1EB] p-4 rounded-xl border border-[#216B49]/30 space-y-1">
                                <div className="font-bold text-sm text-[#174B35]">
                                    {report.assignments[0].agency_name}
                                </div>
                                <div className="text-xs text-[#343B36]">
                                    Wilayah: {report.assignments[0].jurisdiction}
                                </div>
                                <div className="text-[11px] font-semibold text-[#216B49] pt-1 border-t border-[#216B49]/20">
                                    Status Tugas: {report.assignments[0].status_label}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-[#F3F7F4] p-4 rounded-xl border border-[#DDE3DE] text-xs text-[#68716B] leading-relaxed">
                                Laporan sedang dalam tahap pemeriksaan administratif admin sebelum ditugaskan ke OPD.
                            </div>
                        )}
                    </div>
                </div>

                {/* Chronology & Operational Updates */}
                <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                    <div className="flex items-center justify-between pb-3 border-b border-[#DDE3DE]">
                        <h2 className="text-xs font-bold text-[#171C19] uppercase tracking-wider flex items-center gap-2">
                            <Clock className="size-4 text-[#216B49]" />
                            Kronologi Perjalanan Laporan & Respon OPD
                        </h2>
                        <span className="text-[11px] text-[#68716B] font-mono">Riwayat Nyata</span>
                    </div>

                    <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DDE3DE]">
                        {report.status_history.map((hist) => (
                            <div key={hist.id} className="relative">
                                <span className="absolute -left-6 top-1 size-4 rounded-full bg-[#216B49] border-2 border-white ring-2 ring-[#E8F1EB]" />
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <StatusBadge status={hist.to_status} size="sm" />
                                        <span className="text-[11px] font-mono text-[#68716B]">
                                            {hist.created_at ? new Date(hist.created_at).toLocaleString('id-ID') : ''}
                                        </span>
                                    </div>
                                    {hist.note && (
                                        <p className="text-xs text-[#343B36] bg-[#F3F7F4] p-3 rounded-xl border border-[#DDE3DE] mt-1">
                                            {hist.note}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Operational Updates from OPD */}
                    {report.assignments.some((a) => a.operational_updates.length > 0) && (
                        <div className="mt-8 pt-6 border-t border-[#DDE3DE] space-y-4">
                            <h3 className="text-xs font-bold text-[#171C19] uppercase tracking-wider flex items-center gap-2">
                                <Building className="size-4 text-[#174B35]" />
                                Catatan Progres Tindak Lanjut dari Petugas Lapangan
                            </h3>
                            <div className="space-y-3">
                                {report.assignments.map((assignment) =>
                                    assignment.operational_updates.map((update) => (
                                        <div
                                            key={update.id}
                                            className="bg-[#E8F1EB]/60 border border-[#216B49]/30 rounded-xl p-4 text-xs space-y-1.5"
                                        >
                                            <div className="flex items-center justify-between text-[11px] text-[#174B35] font-bold">
                                                <span>Jenis Tindakan: {update.update_type}</span>
                                                <span className="font-mono">
                                                    {update.created_at ? new Date(update.created_at).toLocaleString('id-ID') : ''}
                                                </span>
                                            </div>
                                            <p className="text-[#171C19] text-xs leading-relaxed">{update.note}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Location Map */}
                <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6 sm:p-8 shadow-xs space-y-3">
                    <h3 className="text-xs font-bold text-[#171C19] uppercase tracking-wider">
                        Peta Posisi Kejadian Terlapor
                    </h3>
                    <div className="border border-[#DDE3DE] rounded-xl overflow-hidden">
                        <KarhutlaMap
                            reports={[
                                {
                                    id: report.id,
                                    tracking_code: report.tracking_code,
                                    title: report.title,
                                    category: report.category,
                                    latitude: report.latitude,
                                    longitude: report.longitude,
                                    province: report.province,
                                    regency_city: report.regency_city,
                                    location_description: report.location_description,
                                    report_status: report.report_status,
                                    status_label: report.status_label,
                                },
                            ]}
                            height="280px"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
