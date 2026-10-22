export type ReportStatus =
    | 'SUBMITTED'
    | 'UNDER_REVIEW'
    | 'NEEDS_INFORMATION'
    | 'VERIFIED'
    | 'DISPATCHED'
    | 'RESOLUTION_REVIEW'
    | 'RESOLVED_VERIFIED'
    | 'CLOSED_WITH_REASON';

export type FireCondition =
    | 'UNKNOWN'
    | 'REPORTED_ACTIVE'
    | 'OBSERVED_ACTIVE'
    | 'OBSERVED_CONTAINED'
    | 'OBSERVED_EXTINGUISHED';

export interface EvidenceItem {
    id: number;
    original_filename: string;
    media_type: string;
    size_bytes: number;
    url: string;
    created_at?: string;
}

export interface StatusHistoryItem {
    id: number;
    from_status: string | null;
    to_status: string;
    to_status_label: string;
    reason: string | null;
    note: string | null;
    actor_name: string;
    created_at: string;
}

export interface ReportItem {
    id: number;
    report_number: string;
    title: string;
    category: string;
    description: string;
    location_description: string;
    latitude: number;
    longitude: number;
    report_status: ReportStatus;
    status_label: string;
    status_description?: string;
    fire_condition: FireCondition;
    fire_condition_label: string;
    admin_notes?: string | null;
    information_requested?: string | null;
    additional_information?: string | null;
    created_at: string;
    updated_at?: string;
    reported_occurrence_at?: string | null;
    can_provide_additional_info?: boolean;
    evidence_count?: number;
    has_evidence?: boolean;
    evidence: EvidenceItem[];
    status_histories: StatusHistoryItem[];
}

export interface ReportPagination {
    data: ReportItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    prev_page_url: string | null;
    next_page_url: string | null;
}

export interface DashboardMetrics {
    total: number;
    submitted: number;
    in_review: number;
    verified: number;
    dispatched?: number;
    in_progress?: number;
    resolved: number;
    closed?: number;
    needs_info: number;
}

