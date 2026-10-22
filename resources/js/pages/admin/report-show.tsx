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
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-[#f0eee6] min-h-screen text-[#141413] selection:bg-[#e3dacc] selection:text-[#141413]">
            <Head title={`Pemeriksaan Laporan ${report.tracking_code} — Admin JAGAIN`} />

            {/* Top Navigation Bar */}
            <div className="bg-[#faf9f5] border border-[#cccbc8] rounded-[24px] p-4 sm:px-6 flex items-center justify-between font-sans">
                <Link
                    href="/admin/laporan"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#141413] hover:text-[#d97757] hover:underline"
                >
                    <ArrowLeft className="size-4" />
                    <span>Kembali ke Antrean Laporan</span>
                </Link>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-[#87867f]">Kode Laporan:</span>
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-[4px] bg-[#f0eee6] text-[#141413] border border-[#cccbc8]">
                        {report.tracking_code}
                    </span>
                </div>
            </div>

            <div className="space-y-6">
                {/* Potential Duplicate Warning (Manilla Card #f5e3c7) */}
                {potentialDuplicates.length > 0 && (
                    <div className="bg-[#f5e3c7] border border-[#e3dacc] p-6 rounded-[24px] text-xs font-serif text-[#141413] space-y-2">
                        <div className="font-sans font-bold flex items-center gap-2">
                            <AlertTriangle className="size-4 text-[#d97757]" />
                            Deteksi Potensi Duplikasi ({potentialDuplicates.length} Laporan Serupa di Area Terdekat)
                        </div>
                        <p className="leading-relaxed">
                            Ditemukan laporan lain dalam radius ~50 km pada rentang waktu 7 hari terakhir. Periksa apakah kejadian ini merupakan insiden yang sama sebelum menugaskan instansi:
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1 font-sans">
                            {potentialDuplicates.map((dup) => (
                                <Link
                                    key={dup.id}
                                    href={`/admin/laporan/${dup.id}`}
                                    className="px-3 py-1 bg-[#faf9f5] border border-[#cccbc8] rounded-[6px] text-[11px] font-semibold text-[#141413] hover:bg-[#e3dacc]"
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
                        <div className="bg-[#faf9f5] border border-[#cccbc8] rounded-[24px] p-8 space-y-4 font-sans">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <StatusBadge status={report.report_status} />
                                    {report.category && (
                                        <span className="text-xs bg-[#f0eee6] text-[#141413] px-2.5 py-1 rounded-[4px] border border-[#cccbc8]">
                                            {report.category.name}
                                        </span>
                                    )}
                                </div>
                                <span className="text-xs font-mono text-[#87867f]">
                                    Diajukan: {new Date(report.created_at).toLocaleString('id-ID')}
                                </span>
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-serif text-[#141413]">
                                {report.title}
                            </h1>

                            <p className="font-serif text-sm text-[#141413] whitespace-pre-line leading-relaxed">
                                {report.description}
                            </p>

                            <div className="bg-[#f0eee6] p-4 rounded-[12px] border border-[#cccbc8] text-xs space-y-1">
                                <div className="font-semibold text-[#141413]">Petunjuk Lokasi Khusus:</div>
                                <div className="font-serif text-[#87867f]">{report.location_description}</div>
                                <div className="text-[11px] font-serif text-[#87867f] pt-1">
                                    Wilayah: {report.regency_city}, {report.province}
                                </div>
                            </div>
                        </div>

                        {/* Fire Condition Status */}
                        <div className="bg-[#faf9f5] border border-[#cccbc8] rounded-[24px] p-6 font-sans">
                            <div className="text-xs font-bold uppercase tracking-wider text-[#141413] mb-3">
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
                            <div className="bg-[#faf9f5] border border-[#cccbc8] rounded-[24px] p-6 space-y-4 font-sans">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-[#141413]">
                                    Bukti Foto Terlampir ({report.evidence.length})
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {report.evidence.map((ev) => (
                                        <div key={ev.id} className="border border-[#cccbc8] rounded-[16px] overflow-hidden bg-[#f0eee6]">
                                            <img src={ev.file_path} alt={ev.caption || 'Bukti'} className="w-full h-44 object-cover" />
                                            {ev.caption && <p className="p-3 text-xs font-serif text-[#141413] bg-[#faf9f5] border-t border-[#cccbc8]">{ev.caption}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Action Panel: Status Transition */}
                        <div className="bg-[#faf9f5] border border-[#cccbc8] rounded-[24px] p-8 space-y-5 font-sans">
                            <div className="border-b border-[#cccbc8] pb-3.5">
                                <h3 className="text-sm font-bold text-[#141413] uppercase tracking-wider flex items-center gap-2">
                                    <Shield className="size-4 text-[#87867f]" />
                                    Tindakan Validasi & Transisi Status Laporan
                                </h3>
                                <p className="font-serif text-xs text-[#87867f] mt-0.5">
                                    Setiap transisi status divalidasi server dan dicatat permanen dalam audit log
                                </p>
                            </div>

                            {availableTransitions.length === 0 ? (
                                <p className="font-serif text-xs text-[#87867f]">
                                    Laporan berada dalam status terminal ({report.report_status}). Tidak ada transisi reguler berikutnya.
                                </p>
                            ) : (
                                <form onSubmit={handleTransitionSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#141413] mb-1.5">
                                            Pilih Status Tujuan Baru:
                                        </label>
                                        <select
                                            value={transitionForm.data.target_status}
                                            onChange={(e) => transitionForm.setData('target_status', e.target.value)}
                                            className="w-full text-xs p-3 rounded-[8px] border border-[#cccbc8] bg-[#faf9f5] text-[#141413] focus:outline-none focus:ring-1 focus:ring-[#141413]"
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
                                            <label className="block text-xs font-semibold text-[#141413] mb-1.5">
                                                Alasan Penutupan Berkas (Wajib):
                                            </label>
                                            <textarea
                                                rows={3}
                                                value={transitionForm.data.reason}
                                                onChange={(e) => transitionForm.setData('reason', e.target.value)}
                                                placeholder="Contoh: Laporan duplikasi dengan insiden JGN-..., atau informasi tidak memenuhi kriteria verifikasi lapangan..."
                                                className="w-full text-xs p-3 rounded-[8px] border border-[#cccbc8] font-serif leading-relaxed"
                                                required
                                            />
                                        </div>
                                    )}

                                    {/* Conditional Note if NEEDS_INFORMATION */}
                                    {transitionForm.data.target_status === 'NEEDS_INFORMATION' && (
                                        <div>
                                            <label className="block text-xs font-semibold text-[#141413] mb-1.5">
                                                Informasi Tambahan yang Dibutuhkan dari Pelapor (Wajib):
                                            </label>
                                            <textarea
                                                rows={3}
                                                value={transitionForm.data.note}
                                                onChange={(e) => transitionForm.setData('note', e.target.value)}
                                                placeholder="Jelaskan pertanyaan atau data spesifik yang perlu dilengkapi pelapor..."
                                                className="w-full text-xs p-3 rounded-[8px] border border-[#cccbc8] font-serif leading-relaxed"
                                                required
                                            />
                                        </div>
                                    )}

                                    {/* Optional General Note */}
                                    {transitionForm.data.target_status !== 'CLOSED_WITH_REASON' &&
                                        transitionForm.data.target_status !== 'NEEDS_INFORMATION' && (
                                            <div>
                                                <label className="block text-xs font-semibold text-[#141413] mb-1.5">
                                                    Catatan Verifikasi / Tindak Lanjut:
                                                </label>
                                                <input
                                                    type="text"
                                                    value={transitionForm.data.note}
                                                    onChange={(e) => transitionForm.setData('note', e.target.value)}
                                                    placeholder="Contoh: Laporan diverifikasi via citra sebaran asap..."
                                                    className="w-full text-xs p-3 rounded-[8px] border border-[#cccbc8]"
                                                />
                                            </div>
                                        )}

                                    {/* Optional Fire Condition Update */}
                                    <div>
                                        <label className="block text-xs font-semibold text-[#141413] mb-1.5">
                                            Pembaruan Kondisi Kebakaran Lapangan (Opsional):
                                        </label>
                                        <select
                                            value={transitionForm.data.fire_condition}
                                            onChange={(e) => transitionForm.setData('fire_condition', e.target.value)}
                                            className="w-full text-xs p-3 rounded-[8px] border border-[#cccbc8] bg-[#faf9f5] text-[#141413]"
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
                                        className="py-3 px-5 bg-[#141413] hover:bg-[#3d3d3a] text-[#faf9f5] font-semibold text-xs rounded-[8px] transition-colors disabled:opacity-50"
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
                        <div className="bg-[#faf9f5] border border-[#cccbc8] rounded-[24px] p-8 space-y-5 font-sans">
                            <div className="border-b border-[#cccbc8] pb-3.5">
                                <h3 className="text-sm font-bold text-[#141413] uppercase tracking-wider flex items-center gap-2">
                                    <Building className="size-4 text-[#87867f]" />
                                    Penugasan Laporan kepada Instansi / OPD
                                </h3>
                                <p className="font-serif text-xs text-[#87867f] mt-0.5">
                                    Tugaskan insiden kepada BPBD, Manggala Agni, atau Damkar setempat
                                </p>
                            </div>

                            <form onSubmit={handleAssignSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#141413] mb-1.5">
                                        Pilih Instansi Penanganan:
                                    </label>
                                    <select
                                        value={assignForm.data.agency_id}
                                        onChange={(e) => assignForm.setData('agency_id', e.target.value)}
                                        className="w-full text-xs p-3 rounded-[8px] border border-[#cccbc8] bg-[#faf9f5] text-[#141413]"
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
                                    <label className="block text-xs font-semibold text-[#141413] mb-1.5">
                                        Instruksi / Catatan Khusus Penugasan:
                                    </label>
                                    <textarea
                                        rows={2}
                                        value={assignForm.data.notes}
                                        onChange={(e) => assignForm.setData('notes', e.target.value)}
                                        placeholder="Contoh: Prioritas pemadaman darat batas lahan gambut sebelah selatan..."
                                        className="w-full text-xs p-3 rounded-[8px] border border-[#cccbc8] font-serif leading-relaxed"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={assignForm.processing}
                                    className="py-3 px-5 bg-[#141413] hover:bg-[#3d3d3a] text-[#faf9f5] font-semibold text-xs rounded-[8px] transition-colors disabled:opacity-50"
                                >
                                    {assignForm.processing ? 'Menugaskan...' : 'Kirim Penugasan ke OPD'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right 1 Col: Location, Reporter Info, Timeline */}
                    <div className="space-y-6 font-sans">
                        {/* Reporter Private Verification Box */}
                        <div className="bg-[#faf9f5] border border-[#cccbc8] rounded-[24px] p-6 space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-[#141413] flex items-center gap-1.5">
                                <User className="size-4 text-[#87867f]" />
                                Data Pelapor (Khusus Admin)
                            </h3>
                            <div className="bg-[#f0eee6] p-4 rounded-[12px] border border-[#cccbc8] text-xs space-y-1.5">
                                <div>
                                    Nama: <strong>{report.reporter_name || report.created_by_user?.name || 'Anonim Warga'}</strong>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Phone className="size-3 text-[#87867f]" />
                                    <span>{report.reporter_phone || report.created_by_user?.phone || 'Tidak ada nomor'}</span>
                                </div>
                                <div className="text-[11px] text-[#87867f]">
                                    Akun: {report.created_by_user?.email || 'Tamu'}
                                </div>
                            </div>
                            <p className="text-[11px] font-serif text-[#87867f] italic leading-tight">
                                Data kontak pelapor dirahasiakan dari publik untuk mencegah intimidasi.
                            </p>
                        </div>

                        {/* Location Coordinates & Map */}
                        <div className="bg-[#faf9f5] border border-[#cccbc8] rounded-[24px] p-6 space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-[#141413] flex items-center gap-1.5">
                                <MapPin className="size-4 text-[#d97757]" />
                                Titik Koordinat Laporan
                            </h3>
                            <div className="bg-[#f0eee6] p-3 rounded-[8px] border border-[#cccbc8] text-xs font-mono">
                                <div>Lat: {report.latitude}</div>
                                <div>Lng: {report.longitude}</div>
                            </div>
                            <div className="rounded-[16px] overflow-hidden border border-[#cccbc8]">
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
                        </div>

                        {/* Status Chronology Timeline */}
                        <div className="bg-[#faf9f5] border border-[#cccbc8] rounded-[24px] p-6 space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-[#141413] flex items-center gap-1.5">
                                <Clock className="size-4 text-[#87867f]" />
                                Kronologi Riwayat Status
                            </h3>

                            <div className="relative pl-5 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#cccbc8]">
                                {report.status_histories.map((hist) => (
                                    <div key={hist.id} className="relative text-xs">
                                        <span className="absolute -left-5 top-1 size-3.5 rounded-full bg-[#141413] border-2 border-[#faf9f5]" />
                                        <div className="font-semibold text-[#141413]">
                                            {hist.to_status}
                                        </div>
                                        <div className="text-[10px] font-mono text-[#87867f]">
                                            {new Date(hist.created_at).toLocaleString('id-ID')} • Aktor: {hist.actor_user?.name || 'Sistem'}
                                        </div>
                                        {hist.note && (
                                            <p className="text-[11px] font-serif text-[#141413] bg-[#f0eee6] p-2.5 rounded-[6px] mt-1 border border-[#cccbc8]">
                                                {hist.note}
                                            </p>
                                        )}
                                        {hist.reason && (
                                            <p className="text-[11px] font-serif text-[#c6613f] mt-1 font-semibold">
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
