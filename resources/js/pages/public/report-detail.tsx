import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import EmergencyBanner from '@/components/emergency-banner';
import KarhutlaMap from '@/components/karhutla-map';
import StatusBadge from '@/components/status-badge';
import FireConditionBadge from '@/components/fire-condition-badge';
import { ArrowLeft, MapPin, Calendar, Building, Clock, CheckCircle, FileText, Shield } from 'lucide-react';

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
    return (
        <div className="min-h-screen flex flex-col bg-white text-[#171C19]">
            <Head title={`Laporan ${report.tracking_code} — JAGAIN`} />
            <EmergencyBanner />
            <Navbar />

            {/* Breadcrumb / Top Bar */}
            <div className="bg-[#F3F7F4] border-b border-[#DDE3DE] py-3 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link
                        href="/peta"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#216B49] hover:text-[#174B35]"
                    >
                        <ArrowLeft className="size-4" />
                        Kembali ke Peta Karhutla
                    </Link>

                    <span className="font-mono text-xs font-semibold text-[#68716B]">
                        Kode Lacak: {report.tracking_code}
                    </span>
                </div>
            </div>

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left 2 Cols: Report Details & Timeline */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title & Status Header */}
                        <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-xs">
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                <StatusBadge status={report.report_status} label={report.status_label} />
                                {report.category && (
                                    <span className="px-2.5 py-1 text-xs font-medium bg-[#F3F7F4] text-[#343B36] rounded-full border border-[#DDE3DE]">
                                        {report.category.name}
                                    </span>
                                )}
                                {report.is_simulated && (
                                    <span className="px-2 py-0.5 text-[10px] font-bold bg-[#F3F7F4] text-[#171C19] border border-[#171C19] rounded">
                                        DATA SIMULASI
                                    </span>
                                )}
                            </div>

                            <h1 className="text-2xl font-bold text-[#171C19] leading-snug mb-3">
                                {report.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-xs text-[#68716B] border-t border-[#DDE3DE] pt-3">
                                <div className="flex items-center gap-1">
                                    <MapPin className="size-3.5 text-[#216B49]" />
                                    <span>{report.regency_city}, {report.province}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="size-3.5 text-[#68716B]" />
                                    <span>
                                        Dilaporkan:{' '}
                                        {report.reported_occurrence_at
                                            ? new Date(report.reported_occurrence_at).toLocaleString('id-ID')
                                            : 'Baru ini'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Fire Condition Status Card (Strictly Separated from Report Status) */}
                        <div className="bg-[#F3F7F4] border border-[#DDE3DE] rounded-xl p-5">
                            <div className="text-xs font-bold uppercase tracking-wider text-[#174B35] mb-1">
                                Observasi Kondisi Kebakaran Aktual Lapangan
                            </div>
                            <div className="mt-2">
                                <FireConditionBadge
                                    condition={report.fire_condition}
                                    source={report.fire_condition_source}
                                    observedAt={report.fire_condition_observed_at}
                                />
                            </div>
                            <p className="text-[11px] text-[#68716B] mt-2 leading-relaxed">
                                Catatan: Kondisi kebakaran aktual dicatat terpisah berdasarkan laporan operasional lapangan terbaru dan tidak disimpulkan secara otomatis dari status administratif laporan.
                            </p>
                        </div>

                        {/* Description */}
                        <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-xs">
                            <h2 className="text-sm font-bold text-[#171C19] uppercase tracking-wider mb-2">
                                Deskripsi Kejadian
                            </h2>
                            <p className="text-sm text-[#343B36] whitespace-pre-line leading-relaxed">
                                {report.description}
                            </p>

                            <div className="mt-4 pt-4 border-t border-[#DDE3DE]">
                                <h3 className="text-xs font-semibold text-[#171C19] mb-1">
                                    Petunjuk Lokasi Khusus:
                                </h3>
                                <p className="text-xs text-[#68716B]">
                                    {report.location_description}
                                </p>
                            </div>
                        </div>

                        {/* Evidence Photos (if any) */}
                        {report.evidence.length > 0 && (
                            <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-xs">
                                <h2 className="text-sm font-bold text-[#171C19] uppercase tracking-wider mb-3">
                                    Bukti Foto / Visual ({report.evidence.length})
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {report.evidence.map((ev) => (
                                        <div key={ev.id} className="border border-[#DDE3DE] rounded-lg overflow-hidden bg-[#F3F7F4]">
                                            <img
                                                src={ev.file_path}
                                                alt={ev.caption || 'Bukti karhutla'}
                                                className="w-full h-48 object-cover"
                                            />
                                            {ev.caption && (
                                                <div className="p-2 text-xs text-[#343B36] font-medium bg-white">
                                                    {ev.caption}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Chronological Status History Timeline */}
                        <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-xs">
                            <h2 className="text-sm font-bold text-[#171C19] uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Clock className="size-4 text-[#216B49]" />
                                Kronologi Perjalanan Laporan
                            </h2>

                            {report.status_history.length === 0 ? (
                                <p className="text-xs text-[#68716B]">Belum ada riwayat status tercatat.</p>
                            ) : (
                                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DDE3DE]">
                                    {report.status_history.map((hist, idx) => (
                                        <div key={hist.id} className="relative group">
                                            <span className="absolute -left-6 top-1 size-4 rounded-full bg-[#216B49] border-2 border-white" />
                                            <div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <StatusBadge status={hist.to_status} size="sm" />
                                                    <span className="text-[11px] text-[#68716B]">
                                                        {hist.created_at
                                                            ? new Date(hist.created_at).toLocaleString('id-ID')
                                                            : ''}
                                                    </span>
                                                </div>
                                                {hist.note && (
                                                    <p className="text-xs text-[#343B36] mt-1 bg-[#F3F7F4] p-2.5 rounded-md border border-[#DDE3DE]">
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
                        <div className="bg-white border border-[#DDE3DE] rounded-xl p-5 shadow-xs">
                            <h3 className="text-xs font-bold text-[#171C19] uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Building className="size-4 text-[#174B35]" />
                                Instansi Penanganan
                            </h3>

                            {report.active_agency ? (
                                <div className="bg-[#E8F1EB] border border-[#216B49]/30 rounded-lg p-3.5 space-y-1">
                                    <div className="font-bold text-sm text-[#174B35]">
                                        {report.active_agency.name}
                                    </div>
                                    <div className="text-xs text-[#343B36]">
                                        Wilayah: {report.active_agency.jurisdiction}
                                    </div>
                                    <div className="text-[11px] text-[#216B49] font-medium pt-1">
                                        Telah ditugaskan untuk verifikasi & tindakan lapangan.
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-[#F3F7F4] border border-[#DDE3DE] rounded-lg p-3 text-xs text-[#68716B]">
                                    Laporan masih dalam antrean review pemeriksaan awal sebelum diteruskan ke instansi terkait.
                                </div>
                            )}
                        </div>

                        {/* Location Coordinates & Mini Map */}
                        <div className="bg-white border border-[#DDE3DE] rounded-xl p-5 shadow-xs space-y-3">
                            <h3 className="text-xs font-bold text-[#171C19] uppercase tracking-wider flex items-center gap-2">
                                <MapPin className="size-4 text-[#216B49]" />
                                Titik Koordinat Lapangan
                            </h3>

                            <div className="bg-[#F3F7F4] p-3 rounded-lg border border-[#DDE3DE] text-xs font-mono space-y-1">
                                <div>Lintang (Lat): <strong className="text-[#171C19]">{report.latitude}</strong></div>
                                <div>Bujur (Lng): <strong className="text-[#171C19]">{report.longitude}</strong></div>
                            </div>

                            <KarhutlaMap
                                reports={[report]}
                                height="260px"
                            />
                        </div>

                        {/* Safety Box */}
                        <div className="bg-[#E8F1EB] border border-[#216B49]/30 rounded-xl p-5 text-xs text-[#174B35] space-y-2">
                            <div className="font-bold flex items-center gap-1.5">
                                <Shield className="size-4 text-[#174B35]" />
                                Informasi Pelapor Terlindungi
                            </div>
                            <p className="text-[#343B36] leading-relaxed">
                                Nama dan kontak pelapor tidak dipublikasikan ke umum untuk melindungi privasi dan keamanan masyarakat pelapor.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
