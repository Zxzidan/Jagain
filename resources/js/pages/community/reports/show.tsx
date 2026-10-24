import React, { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowLeft,
    Calendar,
    Camera,
    CheckCircle2,
    Clock,
    Compass,
    Download,
    FileText,
    Flame,
    Info,
    Loader2,
    MapPin,
    Send,
    Shield,
    Upload,
    User,
    X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { StatusBadge, FireConditionBadge } from '@/components/reports/status-badge';
import { ReportMapViewer } from '@/components/reports/report-map-viewer';
import type { ReportItem } from '@/types';
import { dashboard } from '@/routes';

interface Props {
    report: ReportItem;
}

const CATEGORY_LABELS: Record<string, string> = {
    hutan: 'Kebakaran Hutan',
    gambut: 'Lahan Gambut',
    perkebunan: 'Pertanian / Perkebunan',
    pemukiman: 'Dekat Pemukiman',
    lainnya: 'Lainnya',
};

export default function ReportShow({ report }: Props) {
    const page = usePage();
    const flash = (page.props as any).flash;

    const [previewFile, setPreviewFile] = useState<string | null>(null);

    // Form for providing additional info when in NEEDS_INFORMATION status
    const { data, setData, post, processing, errors, reset } = useForm({
        additional_information: '',
        evidence: null as File | null,
    });

    const formatDate = (isoString?: string | null) => {
        if (!isoString) return '-';
        try {
            const date = new Date(isoString);
            return new Intl.DateTimeFormat('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }).format(date) + ' WIB';
        } catch {
            return isoString;
        }
    };

    const formatCategory = (cat: any) => {
        if (!cat) return 'Umum';
        if (typeof cat === 'object') {
            return cat.name || cat.slug || 'Umum';
        }
        return CATEGORY_LABELS[cat] || cat;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('Ukuran file maksimal 5 MB.');
                return;
            }
            setData('evidence', file);
            setPreviewFile(URL.createObjectURL(file));
        }
    };

    const handleRemoveFile = () => {
        setData('evidence', null);
        if (previewFile) {
            URL.revokeObjectURL(previewFile);
            setPreviewFile(null);
        }
    };

    const handleSubmitAdditionalInfo = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/reports/${report.id}/additional-info`, {
            forceFormData: true,
            onSuccess: () => {
                reset();
                handleRemoveFile();
            },
        });
    };

    return (
        <>
            <Head title={`Detail Laporan ${report.report_number} - JAGAIN`} />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-5xl mx-auto w-full">
                {/* Back button */}
                <div className="flex items-center justify-between">
                    <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-xs text-forest-green hover:bg-soft-green -ml-2"
                    >
                        <Link href="/reports">
                            <ArrowLeft className="size-3.5 mr-1.5" />
                            Kembali ke Daftar Laporan
                        </Link>
                    </Button>

                    <div className="text-xs text-gray-neutral">
                        Dibuat: {formatDate(report.created_at)}
                    </div>
                </div>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="flex items-center gap-3 rounded-xl border border-primary-green/30 bg-soft-green p-4 text-sm text-forest-green">
                        <CheckCircle2 className="size-5 shrink-0 text-primary-green" />
                        <span className="font-medium">{flash.success}</span>
                    </div>
                )}
                {flash?.error && (
                    <div className="flex items-center gap-3 rounded-xl border border-primary-green bg-pale-green p-4 text-sm text-dark-neutral">
                        <AlertCircle className="size-5 shrink-0 text-primary-green" />
                        <span className="font-medium">{flash.error}</span>
                    </div>
                )}

                {/* Header Card */}
                <div className="rounded-2xl border border-border-neutral bg-white p-5 sm:p-6 shadow-xs dark:border-border-neutral dark:bg-card">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border-neutral pb-4 dark:border-border-neutral">
                        <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono text-sm font-bold text-forest-green bg-soft-green px-2.5 py-1 rounded-md dark:bg-soft-green dark:text-forest-green">
                                    {report.report_number}
                                </span>
                                <StatusBadge status={report.report_status} />
                                <FireConditionBadge condition={report.fire_condition} />
                            </div>
                            <h1 className="text-lg md:text-xl font-bold text-dark-neutral pt-1">
                                {report.title}
                            </h1>
                            <div className="text-xs text-primary-green font-semibold uppercase tracking-wider">
                                Kategori: {formatCategory(report.category)}
                            </div>
                        </div>

                        <div className="sm:text-right text-xs text-gray-neutral shrink-0">
                            <div>Status Saat Ini:</div>
                            <div className="font-semibold text-dark-neutral text-sm mt-0.5">
                                {report.status_label}
                            </div>
                        </div>
                    </div>

                    {/* Status explanation & distinction banner */}
                    <div className="mt-4 flex items-start gap-3 rounded-xl border border-border-neutral bg-pale-green p-3 text-xs text-dark-neutral dark:border-border-neutral dark:bg-[#15241b]">
                        <Info className="size-4 shrink-0 text-primary-green mt-0.5" />
                        <div>
                            <span className="font-bold text-forest-green">Pemberitahuan Status Transparansi: </span>
                            {report.status_description || 'Laporan diproses sesuai alur verifikasi resmi.'}
                            <span className="block mt-1 text-[11px] text-gray-neutral">
                                <em>Catatan:</em> Status administratif (seperti 'Penanganan Selesai') menandakan penyelesaian alur administrasi pelaporan, dan bukan klaim sepihak bahwa api di lapangan telah padam sepenuhnya tanpa bukti inspeksi fisik.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Needs Information Action Section */}
                {report.can_provide_additional_info && (
                    <div className="rounded-2xl border-2 border-primary-green/60 bg-soft-green/70 p-5 sm:p-6 shadow-sm dark:border-primary-green/40 dark:bg-[#151c17]">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="size-6 shrink-0 text-primary-green mt-0.5" />
                            <div className="space-y-2 flex-1">
                                <h3 className="text-base font-bold text-forest-green">
                                    Permintaan Informasi Tambahan dari Verifikator
                                </h3>
                                <p className="text-xs text-dark-neutral leading-relaxed">
                                    Tim verifikator membutuhkan rincian tambahan untuk menindaklanjuti laporan Anda:
                                </p>

                                {report.information_requested && (
                                    <div className="rounded-lg border border-primary-green/30 bg-white p-3.5 text-xs text-dark-neutral font-medium dark:border-primary-green/40 dark:bg-[#1a241e]">
                                        "{report.information_requested}"
                                    </div>
                                )}

                                {/* Form to submit response */}
                                <form onSubmit={handleSubmitAdditionalInfo} className="mt-4 space-y-4 pt-2">
                                    <div>
                                        <Label htmlFor="additional_information" className="text-xs font-semibold text-forest-green">
                                            Tanggapan / Informasi Tambahan Anda <span className="text-primary-green font-bold">*</span>
                                        </Label>
                                        <textarea
                                            id="additional_information"
                                            rows={3}
                                            value={data.additional_information}
                                            onChange={(e) => setData('additional_information', e.target.value)}
                                            placeholder="Tuliskan keterangan tambahan yang diminta verifikator..."
                                            className="mt-1 w-full rounded-md border border-border-neutral bg-white p-3 text-xs text-dark-neutral focus:border-primary-green focus:outline-none focus:ring-1 focus:ring-primary-green dark:border-border-neutral dark:bg-[#151c17] dark:text-foreground"
                                            required
                                        />
                                        {errors.additional_information && (
                                            <p className="mt-1 text-xs text-primary-green font-medium">
                                                {errors.additional_information}
                                            </p>
                                        )}
                                    </div>

                                    {/* Upload optional evidence for response */}
                                    <div>
                                        <Label className="text-xs font-medium text-dark-neutral">
                                            Bukti Foto Susulan (Opsional, maks 5 MB)
                                        </Label>
                                        {!previewFile ? (
                                            <div className="mt-1 flex items-center gap-2">
                                                <label
                                                    htmlFor="additional_evidence"
                                                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-border-neutral bg-white px-3 py-1.5 text-xs font-medium text-dark-neutral hover:bg-pale-green dark:border-border-neutral dark:bg-card dark:hover:bg-[#1c2620]"
                                                >
                                                    <Upload className="size-3.5" />
                                                    Pilih Foto Bukti
                                                </label>
                                                <input
                                                    id="additional_evidence"
                                                    type="file"
                                                    accept="image/jpeg,image/png,image/jpg,image/webp"
                                                    onChange={handleFileChange}
                                                    className="sr-only"
                                                />
                                            </div>
                                        ) : (
                                            <div className="mt-1 flex items-center gap-3 rounded-lg border border-border-neutral bg-white p-2 dark:border-border-neutral dark:bg-card">
                                                <img
                                                    src={previewFile}
                                                    alt="Preview bukti susulan"
                                                    className="size-12 rounded object-cover"
                                                />
                                                <span className="text-xs text-dark-neutral truncate flex-1">
                                                    {data.evidence?.name}
                                                </span>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={handleRemoveFile}
                                                >
                                                    <X className="size-3.5" />
                                                </Button>
                                            </div>
                                        )}
                                        {errors.evidence && (
                                            <p className="mt-1 text-xs text-primary-green font-medium">{errors.evidence}</p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-primary-green text-white hover:bg-forest-green text-xs font-semibold"
                                    >
                                        {processing ? (
                                            <>
                                                <Loader2 className="size-3.5 mr-2 animate-spin" />
                                                Mengirim Informasi...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="size-3.5 mr-1.5" />
                                                Kirim Jawaban Tambahan
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Previously Provided Additional Information (if any) */}
                {report.additional_information && (
                    <div className="rounded-xl border border-border-neutral bg-white p-4 shadow-2xs dark:border-border-neutral dark:bg-card">
                        <h3 className="text-xs font-bold text-forest-green uppercase tracking-wider">
                            Informasi Tambahan yang Pernah Anda Berikan
                        </h3>
                        <p className="mt-2 text-xs text-dark-neutral leading-relaxed bg-pale-green/40 p-3 rounded-lg dark:bg-[#1a241e]">
                            {report.additional_information}
                        </p>
                    </div>
                )}

                {/* Admin Notes to Reporter (if available) */}
                {report.admin_notes && (
                    <div className="rounded-xl border border-border-neutral bg-white p-4 shadow-2xs dark:border-border-neutral dark:bg-card">
                        <h3 className="text-xs font-bold text-forest-green uppercase tracking-wider flex items-center gap-1.5">
                            <Info className="size-3.5 text-primary-green" />
                            Catatan Resmi dari Tim Verifikator
                        </h3>
                        <p className="mt-2 text-xs text-dark-neutral leading-relaxed bg-soft-green/40 p-3 rounded-lg dark:bg-[#1a241e]">
                            {report.admin_notes}
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Report Details & Evidence (2 cols) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Details */}
                        <div className="rounded-2xl border border-border-neutral bg-white p-5 sm:p-6 shadow-xs space-y-4 dark:border-border-neutral dark:bg-card">
                            <h2 className="text-sm font-bold text-forest-green uppercase tracking-wider border-b border-border-neutral pb-2">
                                Rincian Deskripsi Kejadian
                            </h2>

                            <div className="text-xs text-dark-neutral leading-relaxed whitespace-pre-line bg-pale-green/30 p-3.5 rounded-xl border border-border-neutral/60 dark:bg-[#1a241e]">
                                {report.description}
                            </div>

                            {/* Location Details & Interactive Leaflet Map */}
                            <div className="space-y-3 pt-2">
                                <h3 className="text-xs font-semibold text-forest-green uppercase tracking-wider">
                                    Lokasi & Titik Koordinat
                                </h3>
                                <div className="rounded-xl border border-border-neutral bg-white p-4 space-y-3 dark:border-border-neutral dark:bg-[#151c17]">
                                    <div className="flex items-start gap-2.5 text-xs text-dark-neutral">
                                        <MapPin className="size-4 shrink-0 text-primary-green mt-0.5" />
                                        <div>
                                            <span className="font-medium text-gray-neutral">Patokan Wilayah: </span>
                                            <span className="font-semibold text-dark-neutral">{report.location_description}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2.5 text-xs text-dark-neutral">
                                        <Compass className="size-4 shrink-0 text-leaf-green" />
                                        <div>
                                            <span className="font-medium text-gray-neutral">Koordinat Titik: </span>
                                            <span className="font-mono font-bold text-forest-green">
                                                {report.latitude.toFixed(6)}°, {report.longitude.toFixed(6)}°
                                            </span>
                                        </div>
                                    </div>

                                    {report.reported_occurrence_at && (
                                        <div className="flex items-center gap-2.5 text-xs text-dark-neutral">
                                            <Clock className="size-4 shrink-0 text-gray-neutral" />
                                            <div>
                                                <span className="font-medium text-gray-neutral">Waktu Kejadian yang Diketahui: </span>
                                                <span>{formatDate(report.reported_occurrence_at)}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Leaflet Map Viewer */}
                                <ReportMapViewer
                                    latitude={report.latitude}
                                    longitude={report.longitude}
                                    locationDescription={report.location_description}
                                    reportNumber={report.report_number}
                                    title={report.title}
                                    categoryLabel={formatCategory(report.category)}
                                />
                            </div>

                            {/* Evidence Photo Preview */}
                            <div className="space-y-2 pt-2">
                                <h3 className="text-xs font-semibold text-forest-green uppercase tracking-wider flex items-center justify-between">
                                    <span>Bukti Foto yang Dilampirkan</span>
                                    <span className="text-gray-neutral font-normal">
                                        {report.evidence.length} file
                                    </span>
                                </h3>

                                {report.evidence.length === 0 ? (
                                    <div className="rounded-xl border border-dashed border-border-neutral bg-pale-green/20 p-5 text-center text-xs text-gray-neutral dark:border-border-neutral dark:bg-[#1a241e]/50">
                                        Tidak ada file foto bukti yang dilampirkan pada laporan ini.
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {report.evidence.map((item) => (
                                            <div
                                                key={item.id}
                                                className="overflow-hidden rounded-xl border border-border-neutral bg-white shadow-2xs dark:border-border-neutral dark:bg-card"
                                            >
                                                <a
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group block relative aspect-video bg-neutral-100 overflow-hidden dark:bg-[#151c17]"
                                                >
                                                    <img
                                                        src={item.url}
                                                        alt={item.original_filename}
                                                        className="size-full object-cover transition duration-200 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                                                        Klik untuk memperbesar
                                                    </div>
                                                </a>
                                                <div className="p-3 text-xs">
                                                    <p className="font-medium text-dark-neutral truncate">
                                                        {item.original_filename}
                                                    </p>
                                                    <p className="text-[11px] text-gray-neutral">
                                                        {(item.size_bytes / (1024 * 1024)).toFixed(2)} MB
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Tracking Timeline (1 col) */}
                    <div className="space-y-4">
                        <div className="rounded-2xl border border-border-neutral bg-white p-5 sm:p-6 shadow-xs dark:border-border-neutral dark:bg-card">
                            <h2 className="text-sm font-bold text-forest-green uppercase tracking-wider border-b border-border-neutral pb-2 flex items-center gap-2">
                                <Clock className="size-4 text-primary-green" />
                                Kronologi Perjalanan Laporan
                            </h2>

                            <p className="text-[11px] text-gray-neutral mt-1">
                                Riwayat perubahan status tercatat secara transparan dari sistem:
                            </p>

                            {/* Timeline list */}
                            <div className="relative mt-5 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-border-neutral">
                                {report.status_histories.map((hist, idx) => (
                                    <div key={hist.id} className="relative flex items-start gap-4">
                                        {/* Dot */}
                                        <div className="relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-primary-green bg-white shadow-2xs dark:bg-card">
                                            <div className="size-2 rounded-full bg-primary-green" />
                                        </div>

                                        {/* Content */}
                                        <div className="space-y-1 flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-1.5">
                                                <span className="text-xs font-bold text-forest-green">
                                                    {hist.to_status_label}
                                                </span>
                                            </div>

                                            <div className="text-[11px] text-gray-neutral">
                                                {formatDate(hist.created_at)}
                                            </div>

                                            {hist.note && (
                                                <p className="text-xs text-dark-neutral bg-pale-green/60 p-2 rounded-md border border-border-neutral/50 mt-1 leading-normal dark:bg-[#1a241e]">
                                                    {hist.note}
                                                </p>
                                            )}

                                            <div className="text-[10px] text-gray-neutral/80 flex items-center gap-1 pt-0.5">
                                                <User className="size-3" />
                                                <span>Aktor: {hist.actor_name}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Safety Reminder */}
                        <div className="rounded-xl border border-border-neutral bg-pale-green p-4 text-xs text-dark-neutral dark:border-border-neutral dark:bg-card">
                            <div className="font-semibold text-forest-green flex items-center gap-1.5">
                                <Shield className="size-3.5 text-primary-green" />
                                Transparansi Pelaporan
                            </div>
                            <p className="mt-1 text-[11px] text-gray-neutral leading-relaxed">
                                Seluruh perubahan status divalidasi pada server. Pelapor dapat melengkapi informasi apabila diminta oleh tim penilai melalui sistem ini.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

ReportShow.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Laporan Saya',
            href: '/reports',
        },
        {
            title: 'Detail & Pelacakan',
            href: '#',
        },
    ],
};
