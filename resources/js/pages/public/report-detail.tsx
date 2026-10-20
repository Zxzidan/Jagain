import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import EmergencyBanner from '@/components/emergency-banner';
import KarhutlaMap from '@/components/karhutla-map';
import StatusBadge from '@/components/status-badge';
import FireConditionBadge from '@/components/fire-condition-badge';
import {
    ArrowLeft,
    MapPin,
    Calendar,
    Building,
    Clock,
    FileText,
    Shield,
    Copy,
    Check,
    AlertTriangle,
    Eye,
} from 'lucide-react';

interface ReportDetailProps {
    report: {
        id: number;
        tracking_code: string;
        title: string;
        description: string;
        category?: { id: number; name: string; slug: string } | null;
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
        is_simulated: boolean;
        created_at?: string | null;
        updated_at?: string | null;
        evidence: Array<{
            id: number;
            file_path: string;
            caption?: string | null;
            media_type: string;
        }>;
        status_history: Array<{
            id: number;
            from_status?: string | null;
            to_status: string;
            reason?: string | null;
            note?: string | null;
            created_at?: string | null;
        }>;
        active_agency?: {
            id: number;
            name: string;
            jurisdiction: string;
        } | null;
    };
}

export default function ReportDetail({ report }: ReportDetailProps) {
    const [copied, setCopied] = useState(false);

    const handleCopyCode = () => {
        navigator.clipboard.writeText(report.tracking_code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F3F7F4] text-[#171C19]">
            <Head title={`Laporan ${report.tracking_code} — JAGAIN`} />
            <EmergencyBanner />
            <Navbar />

            {/* Breadcrumb / Top Bar */}
            <div className="bg-white border-b border-[#DDE3DE] py-3.5 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <Link
                        href="/peta"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#216B49] hover:text-[#174B35] transition-colors"
                    >
                        <ArrowLeft className="size-4" />
                        Kembali ke Peta Karhutla Kalimantan
                    </Link>

                    <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[#68716B]">Kode Lacak Publik:</span>
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
            </div>

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left 2 Cols: Report Details & Timeline */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title & Status Card */}
                        <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
                            <div className="flex flex-wrap items-center gap-2">
                                <StatusBadge status={report.report_status} label={report.status_label} />
                                {report.category && (
                                    <span className="px-2.5 py-1 text-xs font-medium bg-[#F3F7F4] text-[#343B36] rounded-full border border-[#DDE3DE]">
                                        {report.category.name}
                                    </span>
                                )}
                                {report.is_simulated && (
                                    <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-[#171C19] text-white rounded">
                                        DATA SIMULASI
                                    </span>
                                )}
                            </div>

                            <h1 className="text-xl sm:text-2xl font-bold text-[#171C19] leading-snug">
                                {report.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-xs text-[#68716B] border-t border-[#DDE3DE] pt-4">
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="size-3.5 text-[#216B49]" />
                                    <span className="font-medium text-[#171C19]">{report.regency_city}, {report.province}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="size-3.5 text-[#68716B]" />
                                    <span>
                                        Dilaporkan:{' '}
                                        {report.reported_occurrence_at
                                            ? new Date(report.reported_occurrence_at).toLocaleString('id-ID', {
                                                  day: '2-digit',
                                                  month: 'short',
                                                  year: 'numeric',
                                                  hour: '2-digit',
                                                  minute: '2-digit',
                                              })
                                            : 'Baru ini'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Dual Status: Observasi Kondisi Kebakaran Aktual Lapangan */}
                        <div className="bg-white border-2 border-[#174B35]/20 rounded-2xl p-6 shadow-xs space-y-3">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                                <div className="text-xs font-bold uppercase tracking-wider text-[#174B35] flex items-center gap-1.5">
                                    <AlertTriangle className="size-4 text-[#174B35]" />
                                    Kondisi Kebakaran Aktual di Lapangan
                                </div>
                                <span className="text-[11px] text-[#68716B] font-mono">Pemisahan Atribut Operasional</span>
                            </div>

                            <div>
                                <FireConditionBadge
                                    condition={report.fire_condition}
                                    source={report.fire_condition_source}
                                    observedAt={report.fire_condition_observed_at}
                                />
                            </div>

                            <p className="text-[11px] text-[#68716B] leading-relaxed pt-1 border-t border-[#DDE3DE]">
                                <strong>Catatan Kredibilitas:</strong> Kondisi kebakaran di atas diverifikasi langsung oleh petugas operasional darat. Laporan yang telah berstatus administratif "Selesai" tetap memuat bukti pemadaman dingin sebelum kondisi lahan dinyatakan tuntas aman.
                            </p>
                        </div>

                        {/* Description & Location Notes */}
                        <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
                            <h2 className="text-xs font-bold text-[#171C19] uppercase tracking-wider">
                                Uraian Kejadian & Kronologi Warga
                            </h2>
                            <p className="text-xs sm:text-sm text-[#343B36] whitespace-pre-line leading-relaxed">
                                {report.description}
                            </p>

                            <div className="mt-4 pt-4 border-t border-[#DDE3DE] bg-[#F3F7F4] p-4 rounded-xl">
                                <h3 className="text-xs font-bold text-[#174B35] mb-1">
                                    Petunjuk Patok Lokasi Khusus:
                                </h3>
                                <p className="text-xs text-[#343B36]">
                                    {report.location_description || 'Tidak ada petunjuk patok tambahan.'}
                                </p>
                            </div>
                        </div>

                        {/* Evidence Photos */}
                        {report.evidence.length > 0 && (
                            <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
                                <h2 className="text-xs font-bold text-[#171C19] uppercase tracking-wider">
                                    Dokumentasi Foto Lapangan ({report.evidence.length})
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {report.evidence.map((ev) => (
                                        <div key={ev.id} className="border border-[#DDE3DE] rounded-xl overflow-hidden bg-[#F3F7F4]">
                                            <img
                                                src={ev.file_path}
                                                alt={ev.caption || 'Bukti karhutla'}
                                                className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                            {ev.caption && (
                                                <div className="p-3 text-xs text-[#343B36] font-medium bg-white border-t border-[#DDE3DE]">
                                                    {ev.caption}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Chronological Audit Trail Timeline */}
                        <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                            <div className="flex items-center justify-between pb-3 border-b border-[#DDE3DE]">
                                <h2 className="text-xs font-bold text-[#171C19] uppercase tracking-wider flex items-center gap-2">
                                    <Clock className="size-4 text-[#216B49]" />
                                    Jejak Audit & Perjalanan Status Laporan
                                </h2>
                                <span className="text-[11px] text-[#68716B] font-mono">Immutable Log</span>
                            </div>

                            {report.status_history.length === 0 ? (
                                <p className="text-xs text-[#68716B]">Belum ada riwayat status tercatat.</p>
                            ) : (
                                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DDE3DE]">
                                    {report.status_history.map((hist) => (
                                        <div key={hist.id} className="relative group">
                                            <span className="absolute -left-6 top-1 size-4 rounded-full bg-[#216B49] border-2 border-white ring-2 ring-[#E8F1EB]" />
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <StatusBadge status={hist.to_status} size="sm" />
                                                    <span className="text-[11px] font-mono text-[#68716B]">
                                                        {hist.created_at
                                                            ? new Date(hist.created_at).toLocaleString('id-ID', {
                                                                  day: '2-digit',
                                                                  month: 'short',
                                                                  year: 'numeric',
                                                                  hour: '2-digit',
                                                                  minute: '2-digit',
                                                              })
                                                            : ''}
                                                    </span>
                                                </div>
                                                {hist.note && (
                                                    <p className="text-xs text-[#343B36] bg-[#F3F7F4] p-3 rounded-xl border border-[#DDE3DE] mt-1">
                                                        {hist.note}
                                                    </p>
                                                )}
                                                {hist.reason && (
                                                    <p className="text-xs text-[#171C19] font-medium mt-1">
                                                        Alasan: {hist.reason}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right 1 Col: Location Map & Agency Assignment */}
                    <div className="space-y-6">
                        {/* Assigned Agency Card */}
                        <div className="bg-white border border-[#DDE3DE] rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
                            <h3 className="text-xs font-bold text-[#171C19] uppercase tracking-wider flex items-center gap-2">
                                <Building className="size-4 text-[#174B35]" />
                                Instansi Penanganan Resmi
                            </h3>

                            {report.active_agency ? (
                                <div className="bg-[#E8F1EB] border border-[#216B49]/30 rounded-xl p-4 space-y-2">
                                    <div className="font-bold text-sm text-[#174B35]">
                                        {report.active_agency.name}
                                    </div>
                                    <div className="text-xs text-[#343B36]">
                                        Wilayah: {report.active_agency.jurisdiction}
                                    </div>
                                    <div className="text-[11px] text-[#216B49] font-semibold pt-1 border-t border-[#216B49]/20">
                                        Ditugaskan oleh Administrator untuk verifikasi lapangan & tindakan pencegahan.
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-[#F3F7F4] border border-[#DDE3DE] rounded-xl p-4 text-xs text-[#68716B] leading-relaxed">
                                    Laporan saat ini dalam antrean verifikasi administratif sebelum penugasan diterbitkan ke instansi teknis terkait.
                                </div>
                            )}
                        </div>

                        {/* Location Coordinates & Map */}
                        <div className="bg-white border border-[#DDE3DE] rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
                            <h3 className="text-xs font-bold text-[#171C19] uppercase tracking-wider flex items-center gap-2">
                                <MapPin className="size-4 text-[#216B49]" />
                                Titik Koordinat GPS Lapangan
                            </h3>

                            <div className="bg-[#F3F7F4] p-3 rounded-xl border border-[#DDE3DE] text-xs font-mono space-y-1">
                                <div>Lintang: <strong className="text-[#171C19]">{report.latitude}</strong></div>
                                <div>Bujur: <strong className="text-[#171C19]">{report.longitude}</strong></div>
                            </div>

                            <KarhutlaMap
                                reports={[report]}
                                height="260px"
                            />
                        </div>

                        {/* Privacy & Whistleblower Shield Callout */}
                        <div className="bg-white border border-[#DDE3DE] rounded-2xl p-5 shadow-xs space-y-2">
                            <div className="flex items-center gap-2 text-xs font-bold text-[#174B35]">
                                <Shield className="size-4 text-[#174B35]" />
                                Privasi Pelapor Dijamin Terlindungi
                            </div>
                            <p className="text-xs text-[#68716B] leading-relaxed">
                                Sesuai protokol transparansi JAGAIN, data pribadi warga pelapor disaring dan tidak dipublikasikan ke umum guna menjamin keselamatan masyarakat.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
