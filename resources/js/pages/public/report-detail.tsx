import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import KarhutlaMap from '@/components/karhutla-map';
import StatusBadge from '@/components/status-badge';
import FireConditionBadge from '@/components/fire-condition-badge';
import BorderGlow from '@/components/react-bits/BorderGlow';
import {
    ArrowLeft,
    MapPin,
    Calendar,
    Building,
    Clock,
    Shield,
    Copy,
    Check,
    AlertTriangle,
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

export default function ReportDetailPage({ report }: ReportDetailProps) {
    const [copied, setCopied] = useState(false);

    const handleCopyCode = () => {
        navigator.clipboard.writeText(report.tracking_code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-[#10e57a] selection:text-black font-sans antialiased overflow-x-hidden w-full max-w-full">
            <Head title={`Laporan ${report.tracking_code} — JAGAIN`} />
            <Navbar />

            {/* Breadcrumb Header Strip */}
            <div className="bg-neutral-50 border-b border-neutral-200 pt-28 pb-4 px-4 sm:px-6 lg:px-8 font-sans">
                <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <Link
                        href="/peta"
                        className="inline-flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-black transition-colors"
                    >
                        <ArrowLeft className="size-3.5" />
                        <span>Kembali ke Peta Sebaran</span>
                    </Link>

                    <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs text-neutral-400 font-medium">KODE LACAK:</span>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 border border-emerald-300 rounded-full font-mono text-xs font-bold text-emerald-800 shadow-xs">
                            <span>{report.tracking_code}</span>
                            <button
                                type="button"
                                onClick={handleCopyCode}
                                className="p-0.5 text-emerald-600 hover:text-black transition-colors cursor-pointer"
                                title="Salin Kode Lacak"
                            >
                                {copied ? <Check className="size-3.5 text-emerald-700" /> : <Copy className="size-3.5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <main className="flex-1 max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Left 8 Cols: Dossier Information */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Title & Metadata */}
                        <div className="border-b border-neutral-200 pb-6 space-y-4">
                            <div className="flex flex-wrap items-center gap-2 font-sans">
                                <StatusBadge status={report.report_status} label={report.status_label} />
                                {report.category && (
                                    <span className="px-3 py-1 text-xs rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200 font-medium">
                                        {report.category.name}
                                    </span>
                                )}
                                {report.is_simulated && (
                                    <span className="px-3 py-1 text-[10px] font-mono font-bold rounded-full bg-red-100 text-red-800 border border-red-200">
                                        DATA SIMULASI
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-950 leading-tight">
                                {report.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-5 text-xs text-neutral-500 pt-1 font-sans">
                                <div className="flex items-center gap-1.5 text-neutral-800 font-medium">
                                    <MapPin className="size-3.5 text-emerald-600" />
                                    <span>{report.regency_city}, {report.province}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="size-3.5 text-neutral-400" />
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
                                            : 'Terkini'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Dual Status: Kondisi Kebakaran Aktual with React Bits <BorderGlow /> */}
                        <BorderGlow
                            edgeSensitivity={30}
                            glowColor="38 90 60"
                            backgroundColor="#fffdf5"
                            borderRadius={28}
                            glowRadius={36}
                            glowIntensity={1.1}
                            coneSpread={26}
                            animated={false}
                            colors={['#f59e0b', '#ef4444', '#f97316']}
                            fillOpacity={0.12}
                            className="w-full bg-amber-50/70 border border-amber-300 shadow-sm"
                        >
                            <div className="p-7 space-y-4">
                                <div className="flex items-center justify-between flex-wrap gap-2 border-b border-amber-200 pb-3">
                                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-900 flex items-center gap-2">
                                        <AlertTriangle className="size-4 text-amber-700" />
                                        <span>Observasi Kondisi Kebakaran Aktual Lapangan</span>
                                    </div>
                                    <span className="font-mono text-xs text-amber-700 font-medium">Pemeriksaan Regu</span>
                                </div>

                                <div>
                                    <FireConditionBadge
                                        condition={report.fire_condition}
                                        source={report.fire_condition_source}
                                        observedAt={report.fire_condition_observed_at}
                                    />
                                </div>

                                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed pt-1 font-sans">
                                    <strong className="text-neutral-950 font-bold">Catatan Integritas:</strong> Kondisi kebakaran di atas diverifikasi langsung oleh petugas regu darat. Laporan yang berstatus administratif "Selesai" tetap memuat bukti pemadaman dingin sebelum kondisi lahan dinyatakan tuntas aman.
                                </p>
                            </div>
                        </BorderGlow>

                        {/* Uraian Kejadian & Patok Lokasi */}
                        <div className="space-y-4">
                            <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-2">
                                Uraian Kejadian & Kronologi Warga
                            </h2>
                            <p className="text-sm sm:text-base text-neutral-700 whitespace-pre-line leading-relaxed font-sans">
                                {report.description}
                            </p>

                            <div className="bg-neutral-50 rounded-[1.5rem] p-5 space-y-1 text-xs border border-neutral-200">
                                <strong className="font-sans font-bold text-neutral-900 block">
                                    Petunjuk Patok Lokasi Lapangan:
                                </strong>
                                <span className="text-xs text-neutral-500 leading-relaxed block">
                                    {report.location_description || 'Tidak ada petunjuk patok tambahan yang dicatat.'}
                                </span>
                            </div>
                        </div>

                        {/* Evidence Photos */}
                        {report.evidence.length > 0 && (
                            <div className="space-y-4 pt-4 border-t border-neutral-200">
                                <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-900">
                                    Dokumentasi Bukti Lapangan ({report.evidence.length})
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {report.evidence.map((ev) => (
                                        <div key={ev.id} className="rounded-[1.5rem] overflow-hidden border border-neutral-200 bg-white shadow-sm">
                                            <img
                                                src={ev.file_path}
                                                alt={ev.caption || 'Bukti karhutla'}
                                                className="w-full h-52 object-cover"
                                            />
                                            {ev.caption && (
                                                <div className="p-3 text-xs text-neutral-700 bg-neutral-50 border-t border-neutral-200">
                                                    {ev.caption}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Chronological Audit Trail Timeline */}
                        <div className="space-y-4 pt-4 border-t border-neutral-200">
                            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                                <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                                    <Clock className="size-4 text-emerald-600" />
                                    <span>Jejak Audit & Perjalanan Status Laporan</span>
                                </h2>
                                <span className="font-mono text-xs text-neutral-500">Rantai Audit Permanen</span>
                            </div>

                            {report.status_history.length === 0 ? (
                                <p className="text-sm text-neutral-400">Belum ada riwayat status tercatat.</p>
                            ) : (
                                <div className="bg-white border border-neutral-200 rounded-[2rem] overflow-hidden divide-y divide-neutral-100 shadow-sm">
                                    {report.status_history.map((hist) => (
                                        <div key={hist.id} className="p-6 space-y-2 text-xs">
                                            <div className="flex items-center justify-between flex-wrap gap-2 font-sans">
                                                <StatusBadge status={hist.to_status} size="sm" />
                                                <span className="font-mono text-xs text-neutral-400">
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
                                                <p className="text-xs text-neutral-700 bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200 leading-relaxed font-sans">
                                                    {hist.note}
                                                </p>
                                            )}
                                            {hist.reason && (
                                                <p className="text-xs text-neutral-500 font-sans">
                                                    <strong className="text-neutral-900">Alasan Keputusan:</strong> <span>{hist.reason}</span>
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right 4 Cols: Agency Assignment & Map Coordinates */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Assigned Agency */}
                        <div className="bg-white border border-neutral-200 rounded-[2rem] p-6 space-y-4 shadow-sm">
                            <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                                <Building className="size-4 text-emerald-600" />
                                <span>Instansi Penanganan Lapangan</span>
                            </h3>

                            {report.active_agency ? (
                                <div className="bg-neutral-50 p-5 rounded-2xl space-y-2 border border-neutral-200">
                                    <div className="font-bold text-sm text-neutral-900">
                                        {report.active_agency.name}
                                    </div>
                                    <div className="text-xs text-neutral-500">
                                        Wilayah Kewenangan: {report.active_agency.jurisdiction}
                                    </div>
                                    <div className="font-mono text-[11px] text-emerald-700 font-semibold pt-2 border-t border-neutral-200">
                                        Penugasan resmi terbit dari administrator JAGAIN.
                                    </div>
                                </div>
                            ) : (
                                <div className="p-4 text-xs text-neutral-500 leading-relaxed bg-neutral-50 rounded-2xl border border-neutral-200">
                                    Laporan berada dalam antrean peninjauan verifikator sebelum penugasan diterbitkan ke instansi operasional.
                                </div>
                            )}
                        </div>

                        {/* Location Coordinates & Map */}
                        <div className="bg-white border border-neutral-200 rounded-[2rem] p-6 space-y-4 shadow-sm">
                            <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                                <MapPin className="size-4 text-emerald-600" />
                                <span>Titik Koordinat Geospasial</span>
                            </h3>

                            <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 font-mono text-xs space-y-1">
                                <div>Lintang: <strong className="text-neutral-900">{report.latitude}</strong></div>
                                <div>Bujur: <strong className="text-neutral-900">{report.longitude}</strong></div>
                            </div>

                            <div className="rounded-2xl overflow-hidden border border-neutral-200">
                                <KarhutlaMap reports={[report]} height="240px" showLegend={false} />
                            </div>
                        </div>

                        {/* Privacy Shield Mandate */}
                        <div className="bg-emerald-50/70 rounded-[2rem] p-6 space-y-2.5 border border-emerald-200 shadow-sm">
                            <div className="flex items-center gap-2 font-bold text-xs text-emerald-950">
                                <Shield className="size-4 text-emerald-700" />
                                <span>Perlindungan Privasi Pelapor</span>
                            </div>
                            <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                                Sesuai protokol transparansi JAGAIN, data pribadi warga pelapor disaring dan tidak dipublikasikan ke umum demi keselamatan pelapor di lapangan.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
