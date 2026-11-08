import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Executive\ExecutiveDashboardController::dashboard
 * @see app/Http/Controllers/Executive/ExecutiveDashboardController.php:25
 * @route '/executive'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/executive',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Executive\ExecutiveDashboardController::dashboard
 * @see app/Http/Controllers/Executive/ExecutiveDashboardController.php:25
 * @route '/executive'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Executive\ExecutiveDashboardController::dashboard
 * @see app/Http/Controllers/Executive/ExecutiveDashboardController.php:25
 * @route '/executive'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Executive\ExecutiveDashboardController::dashboard
 * @see app/Http/Controllers/Executive/ExecutiveDashboardController.php:25
 * @route '/executive'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Executive\ExecutiveDashboardController::dashboard
 * @see app/Http/Controllers/Executive/ExecutiveDashboardController.php:25
 * @route '/executive'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Executive\ExecutiveDashboardController::dashboard
 * @see app/Http/Controllers/Executive/ExecutiveDashboardController.php:25
 * @route '/executive'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Executive\ExecutiveDashboardController::dashboard
 * @see app/Http/Controllers/Executive/ExecutiveDashboardController.php:25
 * @route '/executive'
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
const executive = {
    dashboard: Object.assign(dashboard, dashboard),
}

export default executive