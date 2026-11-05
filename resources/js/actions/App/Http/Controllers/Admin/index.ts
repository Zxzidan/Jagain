import AdminDashboardController from './AdminDashboardController'
import AdminReportController from './AdminReportController'
import AdminAgencyController from './AdminAgencyController'
import AdminCategoryController from './AdminCategoryController'
import AdminAuditLogController from './AdminAuditLogController'
import AdminExportController from './AdminExportController'
import AdminMapController from './AdminMapController'
const Admin = {
    AdminDashboardController: Object.assign(AdminDashboardController, AdminDashboardController),
AdminReportController: Object.assign(AdminReportController, AdminReportController),
AdminAgencyController: Object.assign(AdminAgencyController, AdminAgencyController),
AdminCategoryController: Object.assign(AdminCategoryController, AdminCategoryController),
AdminAuditLogController: Object.assign(AdminAuditLogController, AdminAuditLogController),
AdminExportController: Object.assign(AdminExportController, AdminExportController),
AdminMapController: Object.assign(AdminMapController, AdminMapController),
}

export default Admin