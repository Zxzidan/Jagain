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
import { Calendar, Clock, Layers } from 'lucide-react';

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
    ASSIGNED: { id: 'assigned', name: 'Penugasan Masuk', color: '#68716B' },
    IN_PROGRESS: { id: 'in_progress', name: 'Penanganan Aktif', color: '#216B49' },
    REVIEW: { id: 'review', name: 'Pengajuan Review', color: '#39845C' },
    COMPLETED: { id: 'completed', name: 'Selesai Terverifikasi', color: '#174B35' },
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
            name: '1. Penugasan Resmi & Mobilisasi Tim',
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
        <div className="bg-white dark:bg-[#1F2522] border border-[#DDE3DE] dark:border-[#343B36] rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#DDE3DE] dark:border-[#343B36] gap-2">
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#171C19] dark:text-white flex items-center gap-2">
                        <Layers className="size-4 text-[#216B49]" />
                        <span>{title}</span>
                    </h3>
                    <p className="text-[11px] text-[#68716B] mt-0.5">
                        Visualisasi kronologi durasi respons, penanganan lapangan, dan verifikasi akhir
                    </p>
                </div>

                <div className="flex items-center gap-1 self-start sm:self-auto bg-[#F3F7F4] dark:bg-[#171C19] p-1 rounded-lg border border-[#DDE3DE] dark:border-[#343B36]">
                    {(['daily', 'monthly'] as Range[]).map((r) => (
                        <button
                            key={r}
                            type="button"
                            onClick={() => setRange(r)}
                            className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors capitalize ${
                                range === r
                                    ? 'bg-white dark:bg-[#26332C] text-[#174B35] dark:text-[#E8F1EB] shadow-xs font-semibold'
                                    : 'text-[#68716B] hover:text-[#171C19]'
                            }`}
                        >
                            {r === 'daily' ? 'Harian' : 'Bulanan'}
                        </button>
                    ))}
                </div>
            </div>

            {features.length === 0 ? (
                <div className="text-center py-8 text-xs text-[#68716B]">
                    Belum ada data linimasa penanganan untuk laporan ini.
                </div>
            ) : (
                <div className="border border-[#DDE3DE] dark:border-[#343B36] rounded-lg overflow-hidden bg-white dark:bg-[#171C19]">
                    <div className="h-[280px] w-full overflow-hidden">
                        <GanttProvider range={range} zoom={100} className="h-full w-full">
                            <GanttSidebar className="w-[240px] text-xs">
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
                                            <div className="flex items-center gap-1.5 px-2 text-xs truncate">
                                                <div
                                                    className="size-2 rounded-full shrink-0"
                                                    style={{ backgroundColor: feature.status.color }}
                                                />
                                                <span className="truncate font-medium text-[11px]">
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

            <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] text-[#68716B]">
                <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-[#68716B]" />
                    <span>Penugasan Masuk</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-[#216B49]" />
                    <span>Penanganan Lapangan (Aktif)</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-[#174B35]" />
                    <span>Selesai & Diverifikasi</span>
                </div>
            </div>
        </div>
    );
}
