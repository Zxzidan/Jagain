import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import assignments from './assignments'
/**
* @see \App\Http\Controllers\Agency\AgencyDashboardController::dashboard
 * @see app/Http/Controllers/Agency/AgencyDashboardController.php:14
 * @route '/opd/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/opd/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Agency\AgencyDashboardController::dashboard
 * @see app/Http/Controllers/Agency/AgencyDashboardController.php:14
 * @route '/opd/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Agency\AgencyDashboardController::dashboard
 * @see app/Http/Controllers/Agency/AgencyDashboardController.php:14
 * @route '/opd/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Agency\AgencyDashboardController::dashboard
 * @see app/Http/Controllers/Agency/AgencyDashboardController.php:14
 * @route '/opd/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Agency\AgencyDashboardController::dashboard
 * @see app/Http/Controllers/Agency/AgencyDashboardController.php:14
 * @route '/opd/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Agency\AgencyDashboardController::dashboard
 * @see app/Http/Controllers/Agency/AgencyDashboardController.php:14
 * @route '/opd/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Agency\AgencyDashboardController::dashboard
 * @see app/Http/Controllers/Agency/AgencyDashboardController.php:14
 * @route '/opd/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \App\Http\Controllers\Admin\AdminMapController::map
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/opd/map'
 */
export const map = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: map.url(options),
    method: 'get',
})

map.definition = {
    methods: ["get","head"],
    url: '/opd/map',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminMapController::map
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/opd/map'
 */
map.url = (options?: RouteQueryOptions) => {
    return map.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminMapController::map
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/opd/map'
 */
map.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: map.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminMapController::map
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/opd/map'
 */
map.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: map.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminMapController::map
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/opd/map'
 */
    const mapForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: map.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminMapController::map
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/opd/map'
 */
        mapForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: map.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminMapController::map
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/opd/map'
 */
        mapForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: map.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    map.form = mapForm
const agency = {
    dashboard: Object.assign(dashboard, dashboard),
assignments: Object.assign(assignments, assignments),
map: Object.assign(map, map),
}

export default agency