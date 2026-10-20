import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import StatusBadge from '@/components/status-badge';
import FireConditionBadge from '@/components/fire-condition-badge';
import KarhutlaMap from '@/components/karhutla-map';
import OperationalGanttTimeline from '@/components/operational-gantt-timeline';
import {
    ArrowLeft,
    Clock,
    MapPin,
    Building,
    Send,
    AlertTriangle,
    Shield,
    CheckCircle2,
    FileText,
    User,
    Phone,
} from 'lucide-react';

interface ReportShowProps {
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
        information_requested?: string | null;
        close_reason?: string | null;
        reporter_name?: string | null;
        reporter_phone?: string | null;
        created_at: string;
        category?: { id: number; name: string } | null;
        created_by_user?: { id: number; name: string; email: string; phone?: string | null } | null;
        evidence: Array<{ id: number; file_path: string; caption?: string | null }>;
        status_histories: Array<{
            id: number;
            from_status?: string | null;
            to_status: string;
            reason?: string | null;
            note?: string | null;
            created_at: string;
            actor_user?: { name: string } | null;
        }>;
        assignments: Array<{
            id: number;
            assignment_status: string;
            assigned_at: string;
            notes?: string | null;
            decline_reason?: string | null;
            agency: { id: number; name: string; jurisdiction: string };
            operational_updates: Array<{
                id: number;
                update_type: string;
                note: string;
                fire_condition_observed?: string | null;
                created_at: string;
                created_by_user: { name: string };
            }>;
            histories: Array<{
                id: number;
                to_status: string;
                reason?: string | null;
                note?: string | null;
                created_at: string;
            }>;
        }>;
    };
    potentialDuplicates: Array<{
        id: number;
        tracking_code: string;
        title: string;
        latitude: number;
        longitude: number;
        created_at: string;
        report_status: string;
        category?: { name: string } | null;
    }>;
    agencies: Array<{ id: number; name: string; jurisdiction: string; code: string }>;
    availableTransitions: Array<{ value: string; label: string }>;
    fireConditionOptions: Array<{ value: string; label: string }>;
}

export default function AdminReportShow({
    report,
    potentialDuplicates,
    agencies,
    availableTransitions,
    fireConditionOptions,
}: ReportShowProps) {
    // Status transition form
    const transitionForm = useForm({
        target_status: availableTransitions[0]?.value || '',
        reason: '',
        note: '',
        fire_condition: '',
    });

    // Assignment form
    const assignForm = useForm({
        agency_id: agencies[0]?.id ? String(agencies[0].id) : '',
        notes: '',
    });

    const handleTransitionSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        transitionForm.post(`/admin/laporan/${report.id}/status`, {
            preserveScroll: true,
        });
    };

    const handleAssignSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        assignForm.post(`/admin/laporan/${report.id}/assign`, {
            preserveScroll: true,
        });
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-[#F3F7F4] min-h-screen text-[#171C19]">
            <Head title={`Pemeriksaan Laporan ${report.tracking_code} — Admin JAGAIN`} />

            {/* Top Navigation Bar */}
            <div className="bg-white border border-[#DDE3DE] rounded-2xl p-4 sm:px-6 shadow-xs flex items-center justify-between">
                <Link
                    href="/admin/laporan"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#174B35] hover:underline"
                >
                    <ArrowLeft className="size-4" />
                    Kembali ke Antrean Laporan
                </Link>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-[#68716B]">Kode Laporan:</span>
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#E8F1EB] text-[#174B35] border border-[#216B49]/20">
                        {report.tracking_code}
                    </span>
                </div>
            </div>

            <div className="space-y-6">
                {/* Potential Duplicate Warning (if detected) */}
                {potentialDuplicates.length > 0 && (
                    <div className="bg-[#FFFBEB] border-l-4 border-[#D97706] p-4 rounded-r-xl shadow-xs text-xs text-[#92400E] space-y-2">
                        <div className="font-bold flex items-center gap-2">
                            <AlertTriangle className="size-4 text-[#D97706]" />
                            Deteksi Potensi Duplikasi ({potentialDuplicates.length} Laporan Serupa di Area Terdekat)
                        </div>
                        <p className="leading-relaxed">
                            Ditemukan laporan lain dalam radius ~50 km pada rentang waktu 7 hari terakhir. Periksa apakah kejadian ini merupakan insiden yang sama sebelum menugaskan instansi:
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                            {potentialDuplicates.map((dup) => (
                                <Link
                                    key={dup.id}
                                    href={`/admin/laporan/${dup.id}`}
                                    className="px-2.5 py-1 bg-white border border-[#FDE68A] rounded text-[11px] font-semibold text-[#B45309] hover:bg-[#FEF3C7]"
                                >
                                    {dup.tracking_code}: {dup.title} ({dup.report_status})
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left 2 Cols: Main Details & Actions */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Report Header Card */}
                        <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-xs space-y-4">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <StatusBadge status={report.report_status} />
                                    {report.category && (
                                        <span className="text-xs bg-[#F3F7F4] text-[#343B36] px-2.5 py-1 rounded-full border border-[#DDE3DE]">
                                            {report.category.name}
                                        </span>
                                    )}
                                </div>
                                <span className="text-xs text-[#68716B]">
                                    Diajukan: {new Date(report.created_at).toLocaleString('id-ID')}
                                </span>
                            </div>

                            <h1 className="text-2xl font-bold text-[#171C19]">
                                {report.title}
                            </h1>

                            <p className="text-xs text-[#343B36] whitespace-pre-line leading-relaxed">
                                {report.description}
                            </p>

                            <div className="bg-[#F3F7F4] p-3 rounded-lg border border-[#DDE3DE] text-xs space-y-1">
                                <div className="font-semibold text-[#171C19]">Petunjuk Lokasi Khusus:</div>
                                <div className="text-[#68716B]">{report.location_description}</div>
                                <div className="text-[11px] text-[#68716B] pt-1">
                                    Wilayah: {report.regency_city}, {report.province}
                                </div>
                            </div>
                        </div>

                        {/* Fire Condition Status */}
                        <div className="bg-white border border-[#DDE3DE] rounded-xl p-5 shadow-xs">
                            <div className="text-xs font-bold uppercase tracking-wider text-[#174B35] mb-2">
                                Kondisi Kebakaran Aktual Terakhir
                            </div>
                            <FireConditionBadge
                                condition={report.fire_condition}
                                source={report.fire_condition_source}
                                observedAt={report.fire_condition_observed_at}
                            />
                        </div>

                        {/* Evidence Viewer */}
                        {report.evidence.length > 0 && (
                            <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-xs space-y-3">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-[#171C19]">
                                    Bukti Foto Terlampir ({report.evidence.length})
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {report.evidence.map((ev) => (
                                        <div key={ev.id} className="border border-[#DDE3DE] rounded-lg overflow-hidden bg-[#F3F7F4]">
                                            <img src={ev.file_path} alt={ev.caption || 'Bukti'} className="w-full h-44 object-cover" />
                                            {ev.caption && <p className="p-2 text-xs text-[#343B36]">{ev.caption}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Action Panel: Status Transition */}
                        <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-xs space-y-4">
                            <div className="border-b border-[#DDE3DE] pb-3">
                                <h3 className="text-sm font-bold text-[#171C19] uppercase tracking-wider flex items-center gap-2">
                                    <Shield className="size-4 text-[#174B35]" />
                                    Tindakan Validasi & Transisi Status Laporan
                                </h3>
                                <p className="text-xs text-[#68716B] mt-0.5">
                                    Setiap transisi status divalidasi server dan dicatat permanen dalam audit log
                                </p>
                            </div>

                            {availableTransitions.length === 0 ? (
                                <p className="text-xs text-[#68716B]">
                                    Laporan berada dalam status terminal ({report.report_status}). Tidak ada transisi reguler berikutnya.
                                </p>
                            ) : (
                                <form onSubmit={handleTransitionSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#171C19] mb-1.5">
                                            Pilih Status Tujuan Baru:
                                        </label>
                                        <select
                                            value={transitionForm.data.target_status}
                                            onChange={(e) => transitionForm.setData('target_status', e.target.value)}
                                            className="w-full text-xs p-2.5 rounded-lg border border-[#DDE3DE] bg-white text-[#171C19]"
                                            required
                                        >
                                            {availableTransitions.map((tr) => (
                                                <option key={tr.value} value={tr.value}>
                                                    {tr.label} ({tr.value})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Conditional Reason if CLOSED_WITH_REASON */}
                                    {transitionForm.data.target_status === 'CLOSED_WITH_REASON' && (
                                        <div>
                                            <label className="block text-xs font-semibold text-[#171C19] mb-1.5">
                                                Alasan Penutupan Berkas (Wajib):
                                            </label>
                                            <textarea
                                                rows={3}
                                                value={transitionForm.data.reason}
                                                onChange={(e) => transitionForm.setData('reason', e.target.value)}
                                                placeholder="Contoh: Laporan duplikasi dengan insiden JGN-..., atau informasi tidak memenuhi kriteria verifikasi lapangan..."
                                                className="w-full text-xs p-2.5 rounded-lg border border-[#DDE3DE]"
                                                required
                                            />
                                        </div>
                                    )}

                                    {/* Conditional Note if NEEDS_INFORMATION */}
                                    {transitionForm.data.target_status === 'NEEDS_INFORMATION' && (
                                        <div>
                                            <label className="block text-xs font-semibold text-[#171C19] mb-1.5">
                                                Informasi Tambahan yang Dibutuhkan dari Pelapor (Wajib):
                                            </label>
                                            <textarea
                                                rows={3}
                                                value={transitionForm.data.note}
                                                onChange={(e) => transitionForm.setData('note', e.target.value)}
                                                placeholder="Jelaskan pertanyaan atau data spesifik yang perlu dilengkapi pelapor..."
                                                className="w-full text-xs p-2.5 rounded-lg border border-[#DDE3DE]"
                                                required
                                            />
                                        </div>
                                    )}

                                    {/* Optional General Note */}
                                    {transitionForm.data.target_status !== 'CLOSED_WITH_REASON' &&
                                        transitionForm.data.target_status !== 'NEEDS_INFORMATION' && (
                                            <div>
                                                <label className="block text-xs font-semibold text-[#171C19] mb-1.5">
                                                    Catatan Verifikasi / Tindak Lanjut:
                                                </label>
                                                <input
                                                    type="text"
                                                    value={transitionForm.data.note}
                                                    onChange={(e) => transitionForm.setData('note', e.target.value)}
                                                    placeholder="Contoh: Laporan diverifikasi via citra sebaran asap..."
                                                    className="w-full text-xs p-2.5 rounded-lg border border-[#DDE3DE]"
                                                />
                                            </div>
                                        )}

                                    {/* Optional Fire Condition Update */}
                                    <div>
                                        <label className="block text-xs font-semibold text-[#171C19] mb-1.5">
                                            Pembaruan Kondisi Kebakaran Lapangan (Opsional):
                                        </label>
                                        <select
                                            value={transitionForm.data.fire_condition}
                                            onChange={(e) => transitionForm.setData('fire_condition', e.target.value)}
                                            className="w-full text-xs p-2.5 rounded-lg border border-[#DDE3DE] bg-white text-[#171C19]"
                                        >
                                            <option value="">-- Tetap Gunakan Kondisi Saat Ini --</option>
                                            {fireConditionOptions.map((f) => (
                                                <option key={f.value} value={f.value}>
                                                    {f.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={transitionForm.processing}
                                        className="py-2.5 px-4 bg-[#174B35] hover:bg-[#216B49] text-white font-semibold text-xs rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        {transitionForm.processing ? 'Menyimpan...' : 'Perbarui Status Laporan'}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Linimasa Jadwal Penanganan OPD (Kibo UI Gantt) */}
                        {report.assignments.length > 0 && (
                            <OperationalGanttTimeline
                                assignedAt={report.assignments[0].assigned_at}
                                status={report.assignments[0].assignment_status}
                                updates={report.assignments[0].operational_updates}
                                completedAt={report.report_status === 'RESOLVED_VERIFIED' ? new Date().toISOString() : null}
                                title={`Linimasa Penanganan Lapangan (${report.assignments[0].agency.name})`}
                            />
                        )}

                        {/* Action Panel: Dispatch to Agency */}
                        <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-xs space-y-4">
                            <div className="border-b border-[#DDE3DE] pb-3">
                                <h3 className="text-sm font-bold text-[#171C19] uppercase tracking-wider flex items-center gap-2">
                                    <Building className="size-4 text-[#216B49]" />
                                    Penugasan Laporan kepada Instansi / OPD
                                </h3>
                                <p className="text-xs text-[#68716B] mt-0.5">
                                    Tugaskan insiden kepada BPBD, Manggala Agni, atau Damkar setempat
                                </p>
                            </div>

                            <form onSubmit={handleAssignSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#171C19] mb-1.5">
                                        Pilih Instansi Penanganan:
                                    </label>
                                    <select
                                        value={assignForm.data.agency_id}
                                        onChange={(e) => assignForm.setData('agency_id', e.target.value)}
                                        className="w-full text-xs p-2.5 rounded-lg border border-[#DDE3DE] bg-white text-[#171C19]"
                                        required
                                    >
                                        {agencies.map((agency) => (
                                            <option key={agency.id} value={agency.id}>
                                                {agency.name} ({agency.jurisdiction})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-[#171C19] mb-1.5">
                                        Instruksi / Catatan Khusus Penugasan:
                                    </label>
                                    <textarea
                                        rows={2}
                                        value={assignForm.data.notes}
                                        onChange={(e) => assignForm.setData('notes', e.target.value)}
                                        placeholder="Contoh: Prioritas pemadaman darat batas lahan gambut sebelah selatan..."
                                        className="w-full text-xs p-2.5 rounded-lg border border-[#DDE3DE]"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={assignForm.processing}
                                    className="py-2.5 px-4 bg-[#216B49] hover:bg-[#174B35] text-white font-semibold text-xs rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {assignForm.processing ? 'Menugaskan...' : 'Kirim Penugasan ke OPD'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right 1 Col: Location, Reporter Info, Timeline */}
                    <div className="space-y-6">
                        {/* Reporter Private Verification Box */}
                        <div className="bg-white border border-[#DDE3DE] rounded-xl p-5 shadow-xs space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-[#171C19] flex items-center gap-1.5">
                                <User className="size-4 text-[#174B35]" />
                                Data Pelapor (Khusus Admin)
                            </h3>
                            <div className="bg-[#F3F7F4] p-3 rounded-lg border border-[#DDE3DE] text-xs space-y-1.5">
                                <div>
                                    Nama: <strong>{report.reporter_name || report.created_by_user?.name || 'Anonim Warga'}</strong>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Phone className="size-3 text-[#216B49]" />
                                    <span>{report.reporter_phone || report.created_by_user?.phone || 'Tidak ada nomor'}</span>
                                </div>
                                <div className="text-[11px] text-[#68716B]">
                                    Akun: {report.created_by_user?.email || 'Tamu'}
                                </div>
                            </div>
                            <p className="text-[10px] text-[#68716B] italic leading-tight">
                                Data kontak pelapor dirahasiakan dari publik untuk mencegah intimidasi.
                            </p>
                        </div>

                        {/* Location Coordinates & Map */}
                        <div className="bg-white border border-[#DDE3DE] rounded-xl p-5 shadow-xs space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-[#171C19] flex items-center gap-1.5">
                                <MapPin className="size-4 text-[#216B49]" />
                                Titik Koordinat Laporan
                            </h3>
                            <div className="bg-[#F3F7F4] p-2.5 rounded border border-[#DDE3DE] text-xs font-mono">
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
                                height="220px"
                            />
                        </div>

                        {/* Status Chronology Timeline */}
                        <div className="bg-white border border-[#DDE3DE] rounded-xl p-5 shadow-xs space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-[#171C19] flex items-center gap-1.5">
                                <Clock className="size-4 text-[#174B35]" />
                                Kronologi Riwayat Status
                            </h3>

                            <div className="relative pl-5 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DDE3DE]">
                                {report.status_histories.map((hist) => (
                                    <div key={hist.id} className="relative text-xs">
                                        <span className="absolute -left-5 top-1 size-3.5 rounded-full bg-[#174B35] border-2 border-white" />
                                        <div className="font-semibold text-[#171C19]">
                                            {hist.to_status}
                                        </div>
                                        <div className="text-[10px] text-[#68716B]">
                                            {new Date(hist.created_at).toLocaleString('id-ID')} • Aktor: {hist.actor_user?.name || 'Sistem'}
                                        </div>
                                        {hist.note && (
                                            <p className="text-[11px] text-[#343B36] bg-[#F3F7F4] p-2 rounded mt-1 border border-[#DDE3DE]">
                                                {hist.note}
                                            </p>
                                        )}
                                        {hist.reason && (
                                            <p className="text-[11px] text-red-700 mt-1 font-medium">
                                                Alasan: {hist.reason}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
