import { useMemo, useState } from 'react';
import {
    GanttProvider,
    GanttTimeline,
    GanttHeader,
    GanttSidebar,
    GanttSidebarGroup,
    GanttSidebarItem,
    GanttFeatureList,
    GanttFeatureRow,
    GanttToday,
    type GanttFeature,
    type GanttStatus,
    type Range,
} from '@/components/kibo-ui/gantt';
import { Layers } from 'lucide-react';

interface OperationalGanttTimelineProps {
    assignedAt: string;
    status: string;
    updates: Array<{
        id: number;
        update_type: string;
        note: string;
        created_at: string;
        created_by_user?: { name: string };
    }>;
    completedAt?: string | null;
    title?: string;
}

const STATUS_CONFIG: Record<string, GanttStatus> = {
    ASSIGNED: { id: 'assigned', name: 'Penugasan Masuk', color: '#87867f' },
    IN_PROGRESS: { id: 'in_progress', name: 'Penanganan Aktif', color: '#d97757' },
    REVIEW: { id: 'review', name: 'Pengajuan Review', color: '#3d3d3a' },
    COMPLETED: { id: 'completed', name: 'Selesai Terverifikasi', color: '#141413' },
};

export default function OperationalGanttTimeline({
    assignedAt,
    status,
    updates = [],
    completedAt,
    title = 'Jadwal & Kronologi Penanganan Lapangan',
}: OperationalGanttTimelineProps) {
    const [range, setRange] = useState<Range>('daily');

    const features: GanttFeature[] = useMemo(() => {
        const list: GanttFeature[] = [];
        const baseDate = new Date(assignedAt);
        const now = new Date();

        // 1. Initial Assignment Phase
        const firstUpdateDate = updates.length > 0 ? new Date(updates[0].created_at) : now;
        list.push({
            id: 'feat-assigned',
            name: '1. Penugasan & Mobilisasi Tim',
            startAt: baseDate,
            endAt: firstUpdateDate > baseDate ? firstUpdateDate : new Date(baseDate.getTime() + 4 * 3600 * 1000),
            status: STATUS_CONFIG.ASSIGNED,
        });

        // 2. Operational Updates / Field Execution
        if (updates.length > 0) {
            updates.forEach((u, index) => {
                const updateStart = new Date(u.created_at);
                const nextUpdate = updates[index + 1];
                const updateEnd = nextUpdate
                    ? new Date(nextUpdate.created_at)
                    : completedAt
                    ? new Date(completedAt)
                    : new Date(updateStart.getTime() + 6 * 3600 * 1000);

                list.push({
                    id: `feat-update-${u.id}`,
                    name: `${index + 2}. Progres: ${u.update_type}`,
                    startAt: updateStart,
                    endAt: updateEnd > updateStart ? updateEnd : new Date(updateStart.getTime() + 2 * 3600 * 1000),
                    status: STATUS_CONFIG.IN_PROGRESS,
                });
            });
        }

        // 3. Final Verification / Completion Phase if available
        if (completedAt || status === 'COMPLETED' || status === 'RESOLVED_VERIFIED') {
            const compDate = completedAt ? new Date(completedAt) : now;
            list.push({
                id: 'feat-completed',
                name: 'Penyelesaian & Verifikasi Penanganan',
                startAt: compDate,
                endAt: new Date(compDate.getTime() + 4 * 3600 * 1000),
                status: STATUS_CONFIG.COMPLETED,
            });
        }

        return list;
    }, [assignedAt, updates, completedAt, status]);

    return (
        <div className="bg-[#faf9f5] border border-[#cccbc8] rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#cccbc8] gap-2">
                <div>
                    <h3 className="text-xs font-sans font-semibold uppercase tracking-wider text-[#141413] flex items-center gap-2">
                        <Layers className="size-4 text-[#141413]" />
                        <span>{title}</span>
                    </h3>
                    <p className="text-xs font-serif text-[#87867f] mt-0.5">
                        Visualisasi kronologi durasi respons, penanganan lapangan, dan verifikasi akhir.
                    </p>
                </div>

                <div className="flex items-center gap-1 self-start sm:self-auto bg-[#e3dacc]/40 p-1 rounded-lg border border-[#cccbc8]">
                    {(['daily', 'monthly'] as Range[]).map((r) => (
                        <button
                            key={r}
                            type="button"
                            onClick={() => setRange(r)}
                            className={`px-3 py-1 text-[11px] font-sans font-medium rounded-md transition-colors capitalize ${
                                range === r
                                    ? 'bg-[#141413] text-[#faf9f5]'
                                    : 'text-[#87867f] hover:text-[#141413]'
                            }`}
                        >
                            {r === 'daily' ? 'Harian' : 'Bulanan'}
                        </button>
                    ))}
                </div>
            </div>

            {features.length === 0 ? (
                <div className="text-center py-8 text-xs font-serif text-[#87867f]">
                    Belum ada data linimasa penanganan untuk laporan ini.
                </div>
            ) : (
                <div className="border border-[#cccbc8] rounded-xl overflow-hidden bg-[#faf9f5]">
                    <div className="h-[280px] w-full overflow-hidden">
                        <GanttProvider range={range} zoom={100} className="h-full w-full">
                            <GanttSidebar className="w-[240px] text-xs font-sans">
                                <GanttSidebarGroup name="Aktivitas Penanganan">
                                    {features.map((feature) => (
                                        <GanttSidebarItem key={feature.id} feature={feature} />
                                    ))}
                                </GanttSidebarGroup>
                            </GanttSidebar>

                            <GanttTimeline>
                                <GanttHeader />
                                <GanttToday />
                                <GanttFeatureList>
                                    <GanttFeatureRow features={features}>
                                        {(feature) => (
                                            <div className="flex items-center gap-1.5 px-2 text-xs truncate font-sans">
                                                <div
                                                    className="size-2 rounded-full shrink-0"
                                                    style={{ backgroundColor: feature.status.color }}
                                                />
                                                <span className="truncate font-medium text-[11px] text-[#141413]">
                                                    {feature.name}
                                                </span>
                                            </div>
                                        )}
                                    </GanttFeatureRow>
                                </GanttFeatureList>
                            </GanttTimeline>
                        </GanttProvider>
                    </div>
                </div>
            )}

            <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] font-sans text-[#87867f]">
                <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[#87867f]" />
                    <span>Penugasan Masuk</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[#d97757]" />
                    <span>Penanganan Lapangan (Aktif)</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[#141413]" />
                    <span>Selesai & Diverifikasi</span>
                </div>
            </div>
        </div>
    );
}
