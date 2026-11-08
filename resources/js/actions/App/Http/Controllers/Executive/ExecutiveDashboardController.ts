import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Executive\ExecutiveDashboardController::index
 * @see app/Http/Controllers/Executive/ExecutiveDashboardController.php:25
 * @route '/executive'
 */
const index5f84b2730477e24a25a929ddbc1eb4ac = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index5f84b2730477e24a25a929ddbc1eb4ac.url(options),
    method: 'get',
})

index5f84b2730477e24a25a929ddbc1eb4ac.definition = {
    methods: ["get","head"],
    url: '/executive',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Executive\ExecutiveDashboardController::index
 * @see app/Http/Controllers/Executive/ExecutiveDashboardController.php:25
 * @route '/executive'
 */
index5f84b2730477e24a25a929ddbc1eb4ac.url = (options?: RouteQueryOptions) => {
    return index5f84b2730477e24a25a929ddbc1eb4ac.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Executive\ExecutiveDashboardController::index
 * @see app/Http/Controllers/Executive/ExecutiveDashboardController.php:25
 * @route '/executive'
 */
index5f84b2730477e24a25a929ddbc1eb4ac.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index5f84b2730477e24a25a929ddbc1eb4ac.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Executive\ExecutiveDashboardController::index
 * @see app/Http/Controllers/Executive/ExecutiveDashboardController.php:25
 * @route '/executive'
 */
index5f84b2730477e24a25a929ddbc1eb4ac.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index5f84b2730477e24a25a929ddbc1eb4ac.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Executive\ExecutiveDashboardController::index
 * @see app/Http/Controllers/Executive/ExecutiveDashboardController.php:25
 * @route '/executive'
 */
    const index5f84b2730477e24a25a929ddbc1eb4acForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index5f84b2730477e24a25a929ddbc1eb4ac.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Executive\ExecutiveDashboardController::index
 * @see app/Http/Controllers/Executive/ExecutiveDashboardController.php:25
 * @route '/executive'
 */
        index5f84b2730477e24a25a929ddbc1eb4acForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index5f84b2730477e24a25a929ddbc1eb4ac.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Executive\ExecutiveDashboardController::index
 * @see app/Http/Controllers/Executive/ExecutiveDashboardController.php:25
 * @route '/executive'
 */
        index5f84b2730477e24a25a929ddbc1eb4acForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index5f84b2730477e24a25a929ddbc1eb4ac.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index5f84b2730477e24a25a929ddbc1eb4ac.form = index5f84b2730477e24a25a929ddbc1eb4acForm
    /**
* @see \App\Http\Controllers\Executive\ExecutiveDashboardController::index
 * @see app/Http/Controllers/Executive/ExecutiveDashboardController.php:25
 * @route '/executive/dashboard'
 */
const index5f66317b8f87846e5513d12d2edf1486 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index5f66317b8f87846e5513d12d2edf1486.url(options),
    method: 'get',
})

index5f66317b8f87846e5513d12d2edf1486.definition = {
    methods: ["get","head"],
    url: '/executive/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Executive\ExecutiveDashboardController::index
 * @see app/Http/Controllers/Executive/ExecutiveDashboardController.php:25
 * @route '/executive/dashboard'
 */
index5f66317b8f87846e5513d12d2edf1486.url = (options?: RouteQueryOptions) => {
    return index5f66317b8f87846e5513d12d2edf1486.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Executive\ExecutiveDashboardController::index
 * @see app/Http/Controllers/Executive/ExecutiveDashboardController.php:25
 * @route '/executive/dashboard'
 */
index5f66317b8f87846e5513d12d2edf1486.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index5f66317b8f87846e5513d12d2edf1486.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Executive\ExecutiveDashboardController::index
 * @see app/Http/Controllers/Executive/ExecutiveDashboardController.php:25
 * @route '/executive/dashboard'
 */
index5f66317b8f87846e5513d12d2edf1486.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index5f66317b8f87846e5513d12d2edf1486.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Executive\ExecutiveDashboardController::index
 * @see app/Http/Controllers/Executive/ExecutiveDashboardController.php:25
 * @route '/executive/dashboard'
 */
    const index5f66317b8f87846e5513d12d2edf1486Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index5f66317b8f87846e5513d12d2edf1486.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Executive\ExecutiveDashboardController::index
 * @see app/Http/Controllers/Executive/ExecutiveDashboardController.php:25
 * @route '/executive/dashboard'
 */
        index5f66317b8f87846e5513d12d2edf1486Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index5f66317b8f87846e5513d12d2edf1486.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Executive\ExecutiveDashboardController::index
 * @see app/Http/Controllers/Executive/ExecutiveDashboardController.php:25
 * @route '/executive/dashboard'
 */
        index5f66317b8f87846e5513d12d2edf1486Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index5f66317b8f87846e5513d12d2edf1486.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index5f66317b8f87846e5513d12d2edf1486.form = index5f66317b8f87846e5513d12d2edf1486Form

/**
* Multiple routes resolve to \App\Http\Controllers\Executive\ExecutiveDashboardController::index, so this export is a
* dictionary keyed by URI rather than a callable, with the verbs prefixed where two routes share a URI.
* Call a specific route with `index['<key>'](...)`, or import the route by name from your
* generated `routes/` directory.
*/
export const index = {
    '/executive': index5f84b2730477e24a25a929ddbc1eb4ac,
    '/executive/dashboard': index5f66317b8f87846e5513d12d2edf1486,
}

const ExecutiveDashboardController = { index }

export default ExecutiveDashboardController