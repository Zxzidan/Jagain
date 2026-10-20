import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import EmergencyBanner from '@/components/emergency-banner';
import StatusBadge from '@/components/status-badge';
import FireConditionBadge from '@/components/fire-condition-badge';
import KarhutlaMap from '@/components/karhutla-map';
import { ArrowLeft, Clock, MapPin, Building, AlertCircle, Send, CheckCircle2, FileText, Info } from 'lucide-react';

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
    const { data, setData, post, processing, errors, reset } = useForm({
        supplementary_info: '',
    });

    const handleSendInfo = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/laporan-saya/${report.tracking_code}/tambah-informasi`, {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F3F7F4] text-[#171C19]">
            <Head title={`Pelacakan Laporan ${report.tracking_code} — JAGAIN`} />
            <EmergencyBanner />
            <Navbar />

            {/* Breadcrumb Top */}
            <div className="bg-white border-b border-[#DDE3DE] py-3 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <Link
                        href="/laporan-saya"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#216B49] hover:text-[#174B35]"
                    >
                        <ArrowLeft className="size-4" />
                        Kembali ke Daftar Laporan Saya
                    </Link>
                    <span className="font-mono text-xs font-bold text-[#68716B]">
                        {report.tracking_code}
                    </span>
                </div>
            </div>

            <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                {/* Header Card */}
                <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6 sm:p-8 shadow-xs">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <StatusBadge status={report.report_status} label={report.status_label} />
                        {report.category && (
                            <span className="text-xs bg-[#F3F7F4] text-[#343B36] px-2.5 py-1 rounded-full border border-[#DDE3DE]">
                                {report.category.name}
                            </span>
                        )}
                    </div>

                    <h1 className="text-2xl font-bold text-[#171C19] leading-tight mb-2">
                        {report.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#68716B] pt-2 border-t border-[#DDE3DE]">
                        <div className="flex items-center gap-1">
                            <MapPin className="size-3.5 text-[#216B49]" />
                            <span>{report.regency_city}, {report.province}</span>
                        </div>
                        <div>
                            Dibuat: {report.created_at ? new Date(report.created_at).toLocaleString('id-ID') : '-'}
                        </div>
                    </div>
                </div>

                {/* ACTION REQUIRED: If NEEDS_INFORMATION */}
                {report.report_status === 'NEEDS_INFORMATION' && (
                    <div className="bg-white border-2 border-[#174B35] rounded-2xl p-6 sm:p-8 shadow-sm">
                        <div className="flex items-center gap-2 font-bold text-sm text-[#174B35] mb-2">
                            <AlertCircle className="size-5 text-[#216B49]" />
                            Petugas Membutuhkan Informasi Tambahan untuk Memverifikasi Laporan
                        </div>

                        <div className="bg-[#E8F1EB] p-4 rounded-xl text-xs text-[#174B35] mb-5 border border-[#216B49]/30">
                            <strong>Catatan dari Petugas Admin:</strong>
                            <p className="mt-1 text-sm font-medium text-[#171C19]">
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
                                    placeholder="Tuliskan keterangan detail patok lokasi, akses jalan, atau informasi yang diminta..."
                                    className="w-full text-xs p-3 rounded-xl border border-[#DDE3DE] focus:outline-none focus:ring-2 focus:ring-[#216B49]"
                                    required
                                />
                                {errors.supplementary_info && (
                                    <p className="text-[11px] text-red-600 mt-1">{errors.supplementary_info}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#216B49] text-white font-semibold text-xs hover:bg-[#174B35] transition-colors disabled:opacity-50"
                            >
                                <Send className="size-3.5" />
                                {processing ? 'Mengirim...' : 'Kirim Informasi Tambahan'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Closed Reason Notice if CLOSED_WITH_REASON */}
                {report.report_status === 'CLOSED_WITH_REASON' && (
                    <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6">
                        <h3 className="font-bold text-sm text-[#171C19] mb-1">
                            Laporan Ditutup dengan Catatan Alasan
                        </h3>
                        <p className="text-xs text-[#68716B] leading-relaxed">
                            Alasan: {report.close_reason || 'Laporan telah ditutup sesuai tinjauan administratif.'}
                        </p>
                    </div>
                )}

                {/* Ground Fire Condition & Assigned Agency Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-[#DDE3DE] rounded-xl p-5 space-y-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#174B35]">
                            Kondisi Lapangan Terkini
                        </div>
                        <FireConditionBadge
                            condition={report.fire_condition}
                            source={report.fire_condition_source}
                            observedAt={report.fire_condition_observed_at}
                        />
                        <p className="text-[11px] text-[#68716B] pt-1">
                            Atribut kondisi kebakaran dicatat terpisah dan diverifikasi langsung oleh petugas operasional.
                        </p>
                    </div>

                    <div className="bg-white border border-[#DDE3DE] rounded-xl p-5 space-y-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#174B35]">
                            Instansi Penugasan
                        </div>
                        {report.assignments.length > 0 ? (
                            <div>
                                <div className="font-bold text-sm text-[#171C19]">
                                    {report.assignments[0].agency_name}
                                </div>
                                <div className="text-xs text-[#68716B]">
                                    Status Tugas: {report.assignments[0].status_label}
                                </div>
                            </div>
                        ) : (
                            <p className="text-xs text-[#68716B]">
                                Laporan sedang dalam tahap pemeriksaan administratif admin sebelum ditugaskan ke OPD.
                            </p>
                        )}
                    </div>
                </div>

                {/* Chronology & Updates */}
                <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                    <h2 className="text-sm font-bold text-[#171C19] uppercase tracking-wider flex items-center gap-2">
                        <Clock className="size-4 text-[#216B49]" />
                        Kronologi Perubahan Status & Perkembangan Lapangan
                    </h2>

                    <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DDE3DE]">
                        {report.status_history.map((hist) => (
                            <div key={hist.id} className="relative">
                                <span className="absolute -left-6 top-1 size-4 rounded-full bg-[#216B49] border-2 border-white" />
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <StatusBadge status={hist.to_status} size="sm" />
                                        <span className="text-[11px] text-[#68716B]">
                                            {hist.created_at ? new Date(hist.created_at).toLocaleString('id-ID') : ''}
                                        </span>
                                    </div>
                                    {hist.note && (
                                        <p className="text-xs text-[#343B36] bg-[#F3F7F4] p-3 rounded-lg border border-[#DDE3DE]">
                                            {hist.note}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Operational Updates from OPD */}
                    {report.assignments.some((a) => a.operational_updates.length > 0) && (
                        <div className="mt-8 pt-6 border-t border-[#DDE3DE]">
                            <h3 className="text-xs font-bold text-[#171C19] uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Building className="size-4 text-[#174B35]" />
                                Catatan Progres Tindak Lanjut dari Petugas Lapangan
                            </h3>
                            <div className="space-y-3">
                                {report.assignments.map((assignment) =>
                                    assignment.operational_updates.map((update) => (
                                        <div
                                            key={update.id}
                                            className="bg-[#E8F1EB]/60 border border-[#216B49]/30 rounded-xl p-4 text-xs space-y-1"
                                        >
                                            <div className="flex items-center justify-between text-[11px] text-[#174B35] font-semibold">
                                                <span>Jenis Tindakan: {update.update_type}</span>
                                                <span>
                                                    {update.created_at ? new Date(update.created_at).toLocaleString('id-ID') : ''}
                                                </span>
                                            </div>
                                            <p className="text-[#171C19] text-xs pt-1">{update.note}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Location Map */}
                <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6 shadow-xs">
                    <h3 className="text-xs font-bold text-[#171C19] uppercase tracking-wider mb-3">
                        Peta Posisi Kejadian
                    </h3>
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
                        height="260px"
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
}
