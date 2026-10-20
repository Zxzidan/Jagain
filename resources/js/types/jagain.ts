import type { User } from './auth';

export type ReportStatus =
    | 'SUBMITTED'
    | 'UNDER_REVIEW'
    | 'NEEDS_INFORMATION'
    | 'VERIFIED'
    | 'DISPATCHED'
    | 'RESOLUTION_REVIEW'
    | 'RESOLVED_VERIFIED'
    | 'CLOSED_WITH_REASON';

export type AssignmentStatus =
    | 'ASSIGNED'
    | 'RECEIVED_BY_AGENCY'
    | 'DECLINED_BY_AGENCY'
    | 'IN_PROGRESS'
    | 'SUBMITTED_FOR_REVIEW'
    | 'COMPLETED';

export type Category = {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    is_active: boolean;
    reports_count?: number;
    created_at?: string;
    updated_at?: string;
};

export type Agency = {
    id: number;
    name: string;
    agency_type: string;
    jurisdiction: string;
    is_active: boolean;
    assignments_count?: number;
    created_at?: string;
    updated_at?: string;
};

export type Evidence = {
    id: number;
    report_id: number;
    uploaded_by_user_id: number;
    storage_key: string;
    original_filename: string;
    media_type: string;
    size_bytes: number;
    captured_at: string | null;
    visibility: string;
    uploader?: User;
    created_at?: string;
};

export type ReportStatusHistory = {
    id: number;
    report_id: number;
    from_status: ReportStatus | null;
    to_status: ReportStatus;
    actor_user_id: number;
    reason: string | null;
    note: string | null;
    public_note: string | null;
    created_at: string;
    actor?: User;
};

export type AssignmentHistory = {
    id: number;
    assignment_id: number;
    from_status: AssignmentStatus | null;
    to_status: AssignmentStatus;
    actor_user_id: number;
    reason: string | null;
    note: string | null;
    created_at: string;
    actor?: User;
};

export type OperationalUpdate = {
    id: number;
    assignment_id: number;
    created_by_user_id: number;
    update_type: string;
    note: string;
    evidence_id: number | null;
    created_at: string;
    creator?: User;
    evidence?: Evidence | null;
};

export type Assignment = {
    id: number;
    report_id: number;
    agency_id: number;
    assigned_by_user_id: number;
    assignment_status: AssignmentStatus;
    decline_reason: string | null;
    assigned_at: string;
    updated_at?: string;
    agency?: Agency;
    assigner?: User;
    histories?: AssignmentHistory[];
    updates?: OperationalUpdate[];
};

export type Report = {
    id: number;
    created_by_user_id: number;
    category_id: number;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    location_description: string | null;
    reported_occurrence_at: string | null;
    report_status: ReportStatus;
    visibility: string;
    is_simulated: boolean;
    lock_version: number;
    actual_fire_condition: string;
    created_at: string;
    updated_at: string;
    category?: Category;
    creator?: User;
    evidence?: Evidence[];
    status_histories?: ReportStatusHistory[];
    assignments?: Assignment[];
    latest_assignment?: Assignment | null;
};

export type AuditLog = {
    id: number;
    actor_user_id: number | null;
    action: string;
    entity_type: string;
    entity_id: number;
    before_snapshot: Record<string, unknown> | null;
    after_snapshot: Record<string, unknown> | null;
    reason: string | null;
    request_id: string | null;
    created_at: string;
    actor?: User | null;
};

export type PaginatedResponse<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    prev_page_url: string | null;
    next_page_url: string | null;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
};
