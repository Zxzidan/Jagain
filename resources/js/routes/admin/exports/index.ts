import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AdminExportController::reports
 * @see app/Http/Controllers/Admin/AdminExportController.php:17
 * @route '/admin/exports/reports'
 */
export const reports = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})

reports.definition = {
    methods: ["get","head"],
    url: '/admin/exports/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminExportController::reports
 * @see app/Http/Controllers/Admin/AdminExportController.php:17
 * @route '/admin/exports/reports'
 */
reports.url = (options?: RouteQueryOptions) => {
    return reports.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminExportController::reports
 * @see app/Http/Controllers/Admin/AdminExportController.php:17
 * @route '/admin/exports/reports'
 */
reports.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminExportController::reports
 * @see app/Http/Controllers/Admin/AdminExportController.php:17
 * @route '/admin/exports/reports'
 */
reports.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reports.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminExportController::reports
 * @see app/Http/Controllers/Admin/AdminExportController.php:17
 * @route '/admin/exports/reports'
 */
    const reportsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reports.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminExportController::reports
 * @see app/Http/Controllers/Admin/AdminExportController.php:17
 * @route '/admin/exports/reports'
 */
        reportsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reports.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminExportController::reports
 * @see app/Http/Controllers/Admin/AdminExportController.php:17
 * @route '/admin/exports/reports'
 */
        reportsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reports.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reports.form = reportsForm
const exports = {
    reports: Object.assign(reports, reports),
}

export default exports