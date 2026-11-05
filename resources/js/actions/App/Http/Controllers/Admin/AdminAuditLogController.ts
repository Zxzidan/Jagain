import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AdminAuditLogController::__invoke
 * @see app/Http/Controllers/Admin/AdminAuditLogController.php:137
 * @route '/admin/audit-logs'
 */
const AdminAuditLogController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: AdminAuditLogController.url(options),
    method: 'get',
})

AdminAuditLogController.definition = {
    methods: ["get","head"],
    url: '/admin/audit-logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminAuditLogController::__invoke
 * @see app/Http/Controllers/Admin/AdminAuditLogController.php:137
 * @route '/admin/audit-logs'
 */
AdminAuditLogController.url = (options?: RouteQueryOptions) => {
    return AdminAuditLogController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminAuditLogController::__invoke
 * @see app/Http/Controllers/Admin/AdminAuditLogController.php:137
 * @route '/admin/audit-logs'
 */
AdminAuditLogController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: AdminAuditLogController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminAuditLogController::__invoke
 * @see app/Http/Controllers/Admin/AdminAuditLogController.php:137
 * @route '/admin/audit-logs'
 */
AdminAuditLogController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: AdminAuditLogController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminAuditLogController::__invoke
 * @see app/Http/Controllers/Admin/AdminAuditLogController.php:137
 * @route '/admin/audit-logs'
 */
    const AdminAuditLogControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: AdminAuditLogController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminAuditLogController::__invoke
 * @see app/Http/Controllers/Admin/AdminAuditLogController.php:137
 * @route '/admin/audit-logs'
 */
        AdminAuditLogControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: AdminAuditLogController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminAuditLogController::__invoke
 * @see app/Http/Controllers/Admin/AdminAuditLogController.php:137
 * @route '/admin/audit-logs'
 */
        AdminAuditLogControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: AdminAuditLogController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    AdminAuditLogController.form = AdminAuditLogControllerForm
export default AdminAuditLogController