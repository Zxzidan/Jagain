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
            code: string;
            jurisdiction: string;
        };
        report: {
            id: number;
            tracking_code: string;
            title: string;
            description: string;
            latitude: number;
            longitude: number;
            province: string;
            regency_city: string;
            location_description: string;
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
        <div className="min-h-screen bg-[#f0eee6] text-[#141413] p-4 sm:p-6 lg:p-8 space-y-6">
            <Head title={`Tugas ${report.tracking_code} — ${assignment.agency.code}`} />

            {/* Top Navigation Bar */}
            <div className="bg-[#faf9f5] border border-[#cccbc8] rounded-2xl p-4 sm:px-6 flex items-center justify-between">
                <Link
                    href="/opd/tugas"
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-[#141413] hover:text-[#d97757] transition-colors"
                >
                    <ArrowLeft className="size-4" />
                    <span>Kembali ke Daftar Tugas OPD</span>
                </Link>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-sans text-[#87867f]">Kode Laporan:</span>
                    <span className="font-mono text-xs font-medium px-2 py-0.5 rounded bg-[#e3dacc]/70 text-[#141413] border border-[#cccbc8]">
                        {report.tracking_code}
                    </span>
                </div>
            </div>

            <div className="space-y-6">
                {/* Header Card */}
                <div className="bg-[#faf9f5] border border-[#cccbc8] rounded-2xl p-6 sm:p-8 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <StatusBadge status={assignment.assignment_status} />
                            {report.category && (
                                <span className="text-xs font-sans bg-[#e3dacc]/40 text-[#141413] px-2.5 py-0.5 rounded border border-[#cccbc8]">
                                    {report.category.name}
                                </span>
                            )}
                        </div>
                        <span className="text-xs font-mono text-[#87867f]">
                            Ditugaskan: {new Date(assignment.assigned_at).toLocaleString('id-ID')}
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-serif font-normal text-[#141413] leading-snug">
                        {report.title}
                    </h1>

                    <p className="text-sm font-serif text-[#141413]/90 whitespace-pre-line leading-relaxed">
                        {report.description}
                    </p>

                    <div className="bg-[#f0eee6] p-4 rounded-xl border border-[#cccbc8] text-xs space-y-1">
                        <div className="font-sans font-semibold text-[#141413]">Petunjuk Lokasi Khusus:</div>
                        <div className="text-[#87867f] font-sans">{report.location_description}</div>
                        <div className="text-[11px] font-mono text-[#87867f] pt-1">
                            {report.regency_city}, {report.province} (Koordinat: {report.latitude}, {report.longitude})
                        </div>
                    </div>

                    {assignment.notes && (
                        <div className="bg-[#f5e3c7]/60 p-4 rounded-xl border border-[#cccbc8] text-xs text-[#141413] font-sans">
                            <strong className="font-semibold block mb-0.5">Instruksi Khusus dari Administrator:</strong>
                            <p className="leading-relaxed">{assignment.notes}</p>
                        </div>
                    )}
                </div>

                {/* ACTION 1: Terima / Tolak Penugasan (Only if ASSIGNED) */}
                {isAssigned && (
                    <div className="bg-[#f5e3c7]/70 border border-[#cccbc8] rounded-2xl p-6 space-y-4">
                        <div className="border-b border-[#cccbc8] pb-3">
                            <h2 className="text-sm font-sans font-semibold text-[#141413] uppercase tracking-wider flex items-center gap-2">
                                <Building className="size-4 text-[#141413]" />
                                Konfirmasi Respon Penugasan Lapangan
                            </h2>
                            <p className="text-xs font-sans text-[#87867f] mt-1">
                                Instansi {assignment.agency.name} wajib mengonfirmasi penerimaan tugas sebelum melakukan tindakan operasional di lapangan.
                            </p>
                        </div>

                        <form onSubmit={handleRespond} className="space-y-4">
                            <div className="flex items-center gap-6 text-xs font-sans">
                                <label className="flex items-center gap-2 cursor-pointer font-medium text-[#141413]">
                                    <input
                                        type="radio"
                                        name="response_type"
                                        value="ACCEPT"
                                        checked={responseForm.data.response_type === 'ACCEPT'}
                                        onChange={() => responseForm.setData('response_type', 'ACCEPT')}
                                        className="text-[#141413] focus:ring-[#141413]"
                                    />
                                    <span>Terima Penugasan & Luncurkan Regu</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer font-medium text-[#141413]">
                                    <input
                                        type="radio"
                                        name="response_type"
                                        value="DECLINE"
                                        checked={responseForm.data.response_type === 'DECLINE'}
                                        onChange={() => responseForm.setData('response_type', 'DECLINE')}
                                        className="text-[#141413] focus:ring-[#141413]"
                                    />
                                    <span>Tolak Penugasan (Wajib Alasan)</span>
                                </label>
                            </div>

                            {responseForm.data.response_type === 'DECLINE' && (
                                <div className="space-y-1">
                                    <label className="block text-xs font-sans font-medium text-[#141413]">
                                        Alasan Penolakan Penugasan (Wajib):
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={responseForm.data.decline_reason}
                                        onChange={(e) => responseForm.setData('decline_reason', e.target.value)}
                                        placeholder="Contoh: Lokasi berada di luar batas wilayah kewenangan administratif kami, atau seluruh regu sedang terkonsentrasi di kebakaran status darurat..."
                                        className="w-full text-xs p-3 rounded-xl border border-[#cccbc8] bg-[#faf9f5] font-sans focus:outline-none focus:border-[#141413]"
                                        required
                                    />
                                    {responseForm.errors.decline_reason && (
                                        <p className="text-[11px] text-[#d97757] mt-1">{responseForm.errors.decline_reason}</p>
                                    )}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={responseForm.processing}
                                className={`px-5 py-2.5 text-xs font-sans font-medium rounded-lg transition-colors ${
                                    responseForm.data.response_type === 'ACCEPT'
                                        ? 'bg-[#d97757] hover:bg-[#c6613f] text-[#faf9f5]'
                                        : 'bg-[#141413] hover:bg-[#3d3d3a] text-[#faf9f5]'
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
                    <div className="bg-[#faf9f5] border border-[#cccbc8] rounded-2xl p-5 text-xs space-y-1">
                        <div className="font-sans font-medium text-[#d97757]">Penugasan Ditolak oleh Instansi</div>
                        <p className="font-sans text-[#87867f]">Alasan: {assignment.decline_reason}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left 2 Cols: Progress Updates and Review Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* ACTION 2: Tambah Progres Operasional Lapangan (If handling) */}
                        {isHandling && (
                            <div className="bg-[#faf9f5] border border-[#cccbc8] rounded-2xl p-6 space-y-4">
                                <div className="border-b border-[#cccbc8] pb-3">
                                    <h2 className="text-sm font-sans font-semibold text-[#141413] uppercase tracking-wider flex items-center gap-2">
                                        <Clock className="size-4 text-[#141413]" />
                                        Catat Perkembangan Operasional Lapangan
                                    </h2>
                                    <p className="text-xs font-sans text-[#87867f] mt-1">
                                        Catatan ini akan otomatis masuk ke kronologi pelacakan publik secara transparan.
                                    </p>
                                </div>

                                <form onSubmit={handleUpdateProgress} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-sans font-medium text-[#141413] mb-1">
                                                Jenis Tindakan Operasional:
                                            </label>
                                            <select
                                                value={progressForm.data.update_type}
                                                onChange={(e) => progressForm.setData('update_type', e.target.value)}
                                                className="w-full text-xs p-2.5 rounded-lg border border-[#cccbc8] bg-[#faf9f5] text-[#141413] font-sans focus:outline-none focus:border-[#141413]"
                                            >
                                                <option value="PATROL">Patroli Pengecekan Lokasi (Ground Check)</option>
                                                <option value="CONTAINMENT">Penyekatan / Pembuatan Sekat Bakar</option>
                                                <option value="EXTINGUISHING">Pemadaman Aktif (Water Bombing / Darat)</option>
                                                <option value="STATUS_CHECK">Pendinginan (Mopping Up) / Pantau Asap</option>
                                                <option value="GENERAL_UPDATE">Pembaruan Lapangan Umum</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-sans font-medium text-[#141413] mb-1">
                                                Hasil Observasi Fisik Api (Ground Check):
                                            </label>
                                            <select
                                                value={progressForm.data.fire_condition_observed}
                                                onChange={(e) =>
                                                    progressForm.setData('fire_condition_observed', e.target.value)
                                                }
                                                className="w-full text-xs p-2.5 rounded-lg border border-[#cccbc8] bg-[#faf9f5] text-[#141413] font-sans focus:outline-none focus:border-[#141413]"
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
                                        <label className="block text-xs font-sans font-medium text-[#141413] mb-1">
                                            Catatan Progres Lapangan (Wajib):
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={progressForm.data.note}
                                            onChange={(e) => progressForm.setData('note', e.target.value)}
                                            placeholder="Contoh: Regu 2 tiba di koordinat. Sumber air parit primer mencukupi, sedang dilakukan penyemprotan sekat bakar sepanjang 200 meter..."
                                            className="w-full text-xs p-3 rounded-xl border border-[#cccbc8] bg-[#faf9f5] font-sans focus:outline-none focus:border-[#141413]"
                                            required
                                        />
                                        {progressForm.errors.note && (
                                            <p className="text-[11px] text-[#d97757] mt-1">{progressForm.errors.note}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-sans font-medium text-[#141413] mb-1">
                                            Unggah Foto Bukti Penanganan (Opsional):
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/png,image/jpeg,image/webp"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) progressForm.setData('evidence_file', file);
                                            }}
                                            className="text-xs font-sans text-[#87867f]"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={progressForm.processing}
                                        className="px-5 py-2.5 bg-[#d97757] hover:bg-[#c6613f] text-[#faf9f5] font-sans font-medium text-xs rounded-lg transition-colors"
                                    >
                                        {progressForm.processing ? 'Menyimpan...' : 'Simpan Catatan Progres'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* ACTION 3: Ajukan Penyelesaian untuk Review Admin (If IN_PROGRESS) */}
                        {assignment.assignment_status === 'IN_PROGRESS' && (
                            <div className="bg-[#faf9f5] border border-[#cccbc8] rounded-2xl p-6 space-y-4">
                                <div className="border-b border-[#cccbc8] pb-3">
                                    <h2 className="text-sm font-sans font-semibold text-[#141413] uppercase tracking-wider flex items-center gap-2">
                                        <CheckCircle2 className="size-4 text-[#141413]" />
                                        Ajukan Penyelesaian Penanganan ke Administrator
                                    </h2>
                                    <p className="text-xs font-sans text-[#87867f] mt-1">
                                        Gunakan setelah pemadaman tuntas atau api telah terkendali sepenuhnya di lapangan.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmitReview} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-sans font-medium text-[#141413] mb-1">
                                            Ringkasan Hasil Penanganan & Verifikasi Akhir:
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={reviewForm.data.summary}
                                            onChange={(e) => reviewForm.setData('summary', e.target.value)}
                                            placeholder="Jelaskan luas area yang berhasil dipadamkan/disekat, status bara di bawah permukaan tanah gambut, dan hasil pengecekan akhir regu sebelum ditarik kembali..."
                                            className="w-full text-xs p-3 rounded-xl border border-[#cccbc8] bg-[#faf9f5] font-sans focus:outline-none focus:border-[#141413]"
                                            required
                                        />
                                        {reviewForm.errors.summary && (
                                            <p className="text-[11px] text-[#d97757] mt-1">{reviewForm.errors.summary}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={reviewForm.processing}
                                        className="px-5 py-2.5 bg-[#141413] hover:bg-[#3d3d3a] text-[#faf9f5] font-sans font-medium text-xs rounded-lg transition-colors flex items-center gap-2"
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
                            title={`Linimasa & Jadwal Penanganan (${assignment.agency.code})`}
                        />

                        {/* Riwayat Catatan Progres Tindak Lanjut */}
                        <div className="bg-[#faf9f5] border border-[#cccbc8] rounded-2xl p-6 space-y-4">
                            <h3 className="text-xs font-sans font-semibold uppercase tracking-wider text-[#141413] flex items-center gap-2">
                                <Clock className="size-4 text-[#141413]" />
                                Riwayat Catatan Tindak Lanjut Instansi ({assignment.operational_updates.length})
                            </h3>

                            {assignment.operational_updates.length === 0 ? (
                                <p className="text-xs font-serif text-[#87867f] py-4">Belum ada catatan progres operasional.</p>
                            ) : (
                                <div className="space-y-3">
                                    {assignment.operational_updates.map((update) => (
                                        <div
                                            key={update.id}
                                            className="bg-[#f0eee6] border border-[#cccbc8] p-4 rounded-xl text-xs space-y-2"
                                        >
                                            <div className="flex items-center justify-between font-sans font-medium text-[#141413] text-[11px]">
                                                <span>Tindakan: {update.update_type}</span>
                                                <span className="text-[#87867f] font-mono">
                                                    {new Date(update.created_at).toLocaleString('id-ID')} • Oleh:{' '}
                                                    {update.created_by_user.name}
                                                </span>
                                            </div>

                                            <p className="text-[#141413] font-serif whitespace-pre-line leading-relaxed text-sm">
                                                {update.note}
                                            </p>

                                            {update.fire_condition_observed && (
                                                <div className="text-[11px] font-sans text-[#141413]">
                                                    Kondisi Api Terobservasi: <span className="font-medium">{update.fire_condition_observed}</span>
                                                </div>
                                            )}

                                            {update.evidence_path && (
                                                <div className="pt-2">
                                                    <img
                                                        src={update.evidence_path}
                                                        alt="Bukti operasional"
                                                        className="size-32 object-cover rounded-lg border border-[#cccbc8]"
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
                        <div className="bg-[#faf9f5] border border-[#cccbc8] rounded-2xl p-5 space-y-3">
                            <h3 className="text-xs font-sans font-semibold uppercase tracking-wider text-[#141413] flex items-center gap-1.5">
                                <MapPin className="size-4 text-[#141413]" />
                                Lokasi Kejadian Lapangan
                            </h3>
                            <div className="bg-[#f0eee6] p-2.5 rounded-lg border border-[#cccbc8] text-xs font-mono text-[#141413]">
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
                        <div className="bg-[#f5e3c7]/60 border border-[#cccbc8] rounded-2xl p-5 text-xs text-[#141413] space-y-2">
                            <div className="font-sans font-semibold flex items-center gap-1.5">
                                <Shield className="size-4 text-[#141413]" />
                                Standar Operasional Keselamatan Petugas
                            </div>
                            <p className="font-sans text-[#141413]/80 leading-relaxed">
                                Pastikan seluruh personil regu pemadam dilengkapi APD lengkap (masker respirator, helm, sepatu boots tahan api, dan kacamata pelindung). Selalu siapkan jalur evakuasi darurat sebelum memulai pemadaman di area gambut.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
