import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import StatusBadge from '@/components/status-badge';
import FireConditionBadge from '@/components/fire-condition-badge';
import KarhutlaMap from '@/components/karhutla-map';
import OperationalGanttTimeline from '@/components/operational-gantt-timeline';
import {
    ArrowLeft,
    Building,
    CheckCircle2,
    XCircle,
    Clock,
    MapPin,
    Upload,
    Send,
    Shield,
    FileText,
    AlertCircle,
} from 'lucide-react';

interface AssignmentShowProps {
    assignment: {
        id: number;
        assignment_status: string;
        assigned_at: string;
        notes?: string | null;
        decline_reason?: string | null;
        agency: {
            id: number;
            name: string;
            code?: string | null;
            jurisdiction: string;
        };
        report: {
            id: number;
            tracking_code: string;
            title: string;
            description: string;
            latitude: number;
            longitude: number;
            province?: string | null;
            regency_city?: string | null;
            location_description?: string | null;
            reported_occurrence_at?: string | null;
            report_status: string;
            fire_condition: string;
            fire_condition_source?: string | null;
            fire_condition_observed_at?: string | null;
            category?: { name: string } | null;
            evidence: Array<{ id: number; file_path: string; caption?: string | null }>;
        };
        operational_updates: Array<{
            id: number;
            update_type: string;
            note: string;
            fire_condition_observed?: string | null;
            evidence_path?: string | null;
            created_at: string;
            created_by_user: { name: string };
        }>;
    };
    fireConditionOptions: Array<{ value: string; label: string }>;
}

export default function OpdAssignmentShow({
    assignment,
    fireConditionOptions,
}: AssignmentShowProps) {
    const { report } = assignment;
    const isAssigned = assignment.assignment_status === 'ASSIGNED';
    const isHandling = ['RECEIVED_BY_AGENCY', 'IN_PROGRESS'].includes(assignment.assignment_status);

    // Form 1: Respond to assignment
    const responseForm = useForm({
        response_type: 'ACCEPT',
        decline_reason: '',
    });

    // Form 2: Operational progress update
    const progressForm = useForm({
        update_type: 'CONTAINMENT',
        note: '',
        fire_condition_observed: '',
        evidence_file: null as File | null,
    });

    // Form 3: Submit for review
    const reviewForm = useForm({
        summary: '',
    });

    const handleRespond = (e: React.FormEvent) => {
        e.preventDefault();
        responseForm.post(`/opd/tugas/${assignment.id}/respon`, {
            preserveScroll: true,
        });
    };

    const handleUpdateProgress = (e: React.FormEvent) => {
        e.preventDefault();
        progressForm.post(`/opd/tugas/${assignment.id}/progres`, {
            preserveScroll: true,
            onSuccess: () => progressForm.reset('note', 'evidence_file'),
        });
    };

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        reviewForm.post(`/opd/tugas/${assignment.id}/ajukan-review`, {
            preserveScroll: true,
        });
    };

    return (
        <div className="min-h-screen bg-white text-neutral-900 p-4 sm:p-6 lg:p-8 space-y-6">
            <Head title={`Tugas ${report.tracking_code} — ${assignment.agency.name}`} />

            {/* Top Navigation Bar */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-4 sm:px-6 flex items-center justify-between shadow-xs">
                <Link
                    href="/opd/tugas"
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
                >
                    <ArrowLeft className="size-4" />
                    <span>Kembali ke Daftar Tugas OPD</span>
                </Link>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-sans text-neutral-500">Kode Laporan:</span>
                    <span className="font-mono text-xs font-medium px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-900 border border-neutral-200">
                        {report.tracking_code}
                    </span>
                </div>
            </div>

            <div className="space-y-6">
                {/* Header Card */}
                <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <StatusBadge status={assignment.assignment_status} />
                            {report.category && (
                                <span className="text-xs font-sans bg-neutral-100 text-neutral-800 px-2.5 py-0.5 rounded-md border border-neutral-200 font-medium">
                                    {report.category.name}
                                </span>
                            )}
                        </div>
                        <span className="text-xs font-mono text-neutral-500">
                            Ditugaskan: {new Date(assignment.assigned_at).toLocaleString('id-ID')}
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 leading-snug">
                        {report.title}
                    </h1>

                    <p className="text-sm font-sans text-neutral-700 whitespace-pre-line leading-relaxed">
                        {report.description}
                    </p>

                    <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs space-y-1">
                        <div className="font-sans font-semibold text-neutral-900">Petunjuk Lokasi Khusus:</div>
                        <div className="text-neutral-600 font-sans">{report.location_description || 'Tidak ada catatan tambahan'}</div>
                        <div className="text-[11px] font-mono text-neutral-500 pt-1">
                            {[report.regency_city, report.province].filter(Boolean).join(', ') || 'Wilayah Terdata Lapangan'} (Koordinat: {report.latitude}, {report.longitude})
                        </div>
                    </div>

                    {assignment.notes && (
                        <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200/80 text-xs text-neutral-900 font-sans">
                            <strong className="font-semibold block mb-0.5 text-amber-950">Instruksi Khusus dari Administrator:</strong>
                            <p className="leading-relaxed text-amber-900">{assignment.notes}</p>
                        </div>
                    )}
                </div>

                {/* ACTION 1: Terima / Tolak Penugasan (Only if ASSIGNED) */}
                {isAssigned && (
                    <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-xs">
                        <div className="border-b border-neutral-200 pb-3">
                            <h2 className="text-sm font-sans font-semibold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                                <Building className="size-4 text-neutral-700" />
                                Konfirmasi Respon Penugasan Lapangan
                            </h2>
                            <p className="text-xs font-sans text-neutral-500 mt-1">
                                Instansi {assignment.agency.name} wajib mengonfirmasi penerimaan tugas sebelum melakukan tindakan operasional di lapangan.
                            </p>
                        </div>

                        <form onSubmit={handleRespond} className="space-y-4">
                            <div className="flex items-center gap-6 text-xs font-sans">
                                <label className="flex items-center gap-2 cursor-pointer font-medium text-neutral-900">
                                    <input
                                        type="radio"
                                        name="response_type"
                                        value="ACCEPT"
                                        checked={responseForm.data.response_type === 'ACCEPT'}
                                        onChange={() => responseForm.setData('response_type', 'ACCEPT')}
                                        className="text-neutral-900 focus:ring-neutral-900"
                                    />
                                    <span>Terima Penugasan & Luncurkan Regu</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer font-medium text-neutral-900">
                                    <input
                                        type="radio"
                                        name="response_type"
                                        value="DECLINE"
                                        checked={responseForm.data.response_type === 'DECLINE'}
                                        onChange={() => responseForm.setData('response_type', 'DECLINE')}
                                        className="text-neutral-900 focus:ring-neutral-900"
                                    />
                                    <span>Tolak Penugasan (Wajib Alasan)</span>
                                </label>
                            </div>

                            {responseForm.data.response_type === 'DECLINE' && (
                                <div className="space-y-1">
                                    <label className="block text-xs font-sans font-medium text-neutral-900">
                                        Alasan Penolakan Penugasan (Wajib):
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={responseForm.data.decline_reason}
                                        onChange={(e) => responseForm.setData('decline_reason', e.target.value)}
                                        placeholder="Contoh: Lokasi berada di luar batas wilayah kewenangan administratif kami, atau seluruh regu sedang terkonsentrasi di kebakaran status darurat..."
                                        className="w-full text-xs p-3 rounded-xl border border-neutral-200 bg-white font-sans focus:outline-none focus:border-neutral-900"
                                        required
                                    />
                                    {responseForm.errors.decline_reason && (
                                        <p className="text-[11px] text-red-600 mt-1">{responseForm.errors.decline_reason}</p>
                                    )}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={responseForm.processing}
                                className={`px-5 py-2.5 text-xs font-sans font-medium rounded-lg transition-colors ${
                                    responseForm.data.response_type === 'ACCEPT'
                                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                        : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                                }`}
                            >
                                {responseForm.processing
                                    ? 'Memproses...'
                                    : responseForm.data.response_type === 'ACCEPT'
                                      ? 'Konfirmasi Terima Tugas'
                                      : 'Kirim Penolakan Penugasan'}
                            </button>
                        </form>
                    </div>
                )}

                {/* If DECLINED */}
                {assignment.assignment_status === 'DECLINED_BY_AGENCY' && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-xs space-y-1">
                        <div className="font-sans font-medium text-red-700">Penugasan Ditolak oleh Instansi</div>
                        <p className="font-sans text-neutral-600">Alasan: {assignment.decline_reason}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left 2 Cols: Progress Updates and Review Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* ACTION 2: Tambah Progres Operasional Lapangan (If handling) */}
                        {isHandling && (
                            <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-xs">
                                <div className="border-b border-neutral-200 pb-3">
                                    <h2 className="text-sm font-sans font-semibold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                                        <Clock className="size-4 text-neutral-700" />
                                        Catat Perkembangan Operasional Lapangan
                                    </h2>
                                    <p className="text-xs font-sans text-neutral-500 mt-1">
                                        Catatan ini akan otomatis masuk ke kronologi pelacakan publik secara transparan.
                                    </p>
                                </div>

                                <form onSubmit={handleUpdateProgress} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-sans font-medium text-neutral-900 mb-1">
                                                Jenis Tindakan Operasional:
                                            </label>
                                            <select
                                                value={progressForm.data.update_type}
                                                onChange={(e) => progressForm.setData('update_type', e.target.value)}
                                                className="w-full text-xs p-2.5 rounded-lg border border-neutral-200 bg-white text-neutral-900 font-sans focus:outline-none focus:border-neutral-900"
                                            >
                                                <option value="PATROL">Patroli Pengecekan Lokasi (Ground Check)</option>
                                                <option value="CONTAINMENT">Penyekatan / Pembuatan Sekat Bakar</option>
                                                <option value="EXTINGUISHING">Pemadaman Aktif (Water Bombing / Darat)</option>
                                                <option value="STATUS_CHECK">Pendinginan (Mopping Up) / Pantau Asap</option>
                                                <option value="GENERAL_UPDATE">Pembaruan Lapangan Umum</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-sans font-medium text-neutral-900 mb-1">
                                                Hasil Observasi Fisik Api (Ground Check):
                                            </label>
                                            <select
                                                value={progressForm.data.fire_condition_observed}
                                                onChange={(e) =>
                                                    progressForm.setData('fire_condition_observed', e.target.value)
                                                }
                                                className="w-full text-xs p-2.5 rounded-lg border border-neutral-200 bg-white text-neutral-900 font-sans focus:outline-none focus:border-neutral-900"
                                            >
                                                <option value="">— Tidak Ada Perubahan Kondisi —</option>
                                                {fireConditionOptions.map((f) => (
                                                    <option key={f.value} value={f.value}>
                                                        {f.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-sans font-medium text-neutral-900 mb-1">
                                            Catatan Progres Lapangan (Wajib):
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={progressForm.data.note}
                                            onChange={(e) => progressForm.setData('note', e.target.value)}
                                            placeholder="Contoh: Regu 2 tiba di koordinat. Sumber air parit primer mencukupi, sedang dilakukan penyemprotan sekat bakar sepanjang 200 meter..."
                                            className="w-full text-xs p-3 rounded-xl border border-neutral-200 bg-white font-sans focus:outline-none focus:border-neutral-900"
                                            required
                                        />
                                        {progressForm.errors.note && (
                                            <p className="text-[11px] text-red-600 mt-1">{progressForm.errors.note}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-sans font-medium text-neutral-900 mb-1">
                                            Unggah Foto Bukti Penanganan (Opsional):
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/png,image/jpeg,image/webp"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) progressForm.setData('evidence_file', file);
                                            }}
                                            className="text-xs font-sans text-neutral-500"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={progressForm.processing}
                                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-medium text-xs rounded-lg transition-colors"
                                    >
                                        {progressForm.processing ? 'Menyimpan...' : 'Simpan Catatan Progres'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* ACTION 3: Ajukan Penyelesaian untuk Review Admin (If IN_PROGRESS) */}
                        {assignment.assignment_status === 'IN_PROGRESS' && (
                            <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-xs">
                                <div className="border-b border-neutral-200 pb-3">
                                    <h2 className="text-sm font-sans font-semibold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                                        <CheckCircle2 className="size-4 text-emerald-600" />
                                        Ajukan Penyelesaian Penanganan ke Administrator
                                    </h2>
                                    <p className="text-xs font-sans text-neutral-500 mt-1">
                                        Gunakan setelah pemadaman tuntas atau api telah terkendali sepenuhnya di lapangan.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmitReview} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-sans font-medium text-neutral-900 mb-1">
                                            Ringkasan Hasil Penanganan & Verifikasi Akhir:
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={reviewForm.data.summary}
                                            onChange={(e) => reviewForm.setData('summary', e.target.value)}
                                            placeholder="Jelaskan luas area yang berhasil dipadamkan/disekat, status bara di bawah permukaan tanah gambut, dan hasil pengecekan akhir regu sebelum ditarik kembali..."
                                            className="w-full text-xs p-3 rounded-xl border border-neutral-200 bg-white font-sans focus:outline-none focus:border-neutral-900"
                                            required
                                        />
                                        {reviewForm.errors.summary && (
                                            <p className="text-[11px] text-red-600 mt-1">{reviewForm.errors.summary}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={reviewForm.processing}
                                        className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-sans font-medium text-xs rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        <Send className="size-3.5" />
                                        <span>{reviewForm.processing ? 'Mengajukan...' : 'Ajukan Review Penyelesaian ke Admin'}</span>
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Visualisasi Linimasa & Gantt Chart Jadwal Penanganan */}
                        <OperationalGanttTimeline
                            assignedAt={assignment.assigned_at}
                            status={assignment.assignment_status}
                            updates={assignment.operational_updates}
                            completedAt={assignment.assignment_status === 'COMPLETED' ? new Date().toISOString() : null}
                            title={`Linimasa & Jadwal Penanganan (${assignment.agency.name})`}
                        />

                        {/* Riwayat Catatan Progres Tindak Lanjut */}
                        <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-xs">
                            <h3 className="text-xs font-sans font-semibold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                                <Clock className="size-4 text-neutral-700" />
                                Riwayat Catatan Tindak Lanjut Instansi ({assignment.operational_updates.length})
                            </h3>

                            {assignment.operational_updates.length === 0 ? (
                                <p className="text-xs font-sans text-neutral-500 py-4">Belum ada catatan progres operasional.</p>
                            ) : (
                                <div className="space-y-3">
                                    {assignment.operational_updates.map((update) => (
                                        <div
                                            key={update.id}
                                            className="bg-neutral-50 border border-neutral-200 p-4 rounded-xl text-xs space-y-2"
                                        >
                                            <div className="flex items-center justify-between font-sans font-medium text-neutral-900 text-[11px]">
                                                <span>Tindakan: {update.update_type}</span>
                                                <span className="text-neutral-500 font-mono">
                                                    {new Date(update.created_at).toLocaleString('id-ID')} • Oleh:{' '}
                                                    {update.created_by_user.name}
                                                </span>
                                            </div>

                                            <p className="text-neutral-800 font-sans whitespace-pre-line leading-relaxed text-sm">
                                                {update.note}
                                            </p>

                                            {update.fire_condition_observed && (
                                                <div className="text-[11px] font-sans text-neutral-700">
                                                    Kondisi Api Terobservasi: <span className="font-medium text-neutral-900">{update.fire_condition_observed}</span>
                                                </div>
                                            )}

                                            {update.evidence_path && (
                                                <div className="pt-2">
                                                    <img
                                                        src={update.evidence_path}
                                                        alt="Bukti operasional"
                                                        className="size-32 object-cover rounded-lg border border-neutral-200"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right 1 Col: Location Map & Coordinates */}
                    <div className="space-y-6">
                        <div className="bg-white border border-neutral-200 rounded-2xl p-5 space-y-3 shadow-xs">
                            <h3 className="text-xs font-sans font-semibold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
                                <MapPin className="size-4 text-neutral-700" />
                                Lokasi Kejadian Lapangan
                            </h3>
                            <div className="bg-neutral-50 p-2.5 rounded-lg border border-neutral-200 text-xs font-mono text-neutral-900">
                                <div>Lat: {report.latitude}</div>
                                <div>Lng: {report.longitude}</div>
                            </div>
                            <KarhutlaMap
                                reports={[
                                    {
                                        id: report.id,
                                        tracking_code: report.tracking_code,
                                        title: report.title,
                                        latitude: report.latitude,
                                        longitude: report.longitude,
                                        province: report.province,
                                        regency_city: report.regency_city,
                                        location_description: report.location_description,
                                        report_status: report.report_status,
                                        status_label: report.report_status,
                                    },
                                ]}
                                height="260px"
                            />
                        </div>

                        {/* Safety Notice */}
                        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 text-xs text-neutral-900 space-y-2">
                            <div className="font-sans font-semibold flex items-center gap-1.5 text-amber-950">
                                <Shield className="size-4 text-amber-800" />
                                Standar Operasional Keselamatan Petugas
                            </div>
                            <p className="font-sans text-amber-900 leading-relaxed">
                                Pastikan seluruh personil regu pemadam dilengkapi APD lengkap (masker respirator, helm, sepatu boots tahan api, dan kacamata pelindung). Selalu siapkan jalur evakuasi darurat sebelum memulai pemadaman di area gambut.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
