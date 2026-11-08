import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PublicController::show
 * @see app/Http/Controllers/PublicController.php:243
 * @route '/laporan-publik/{tracking_code}'
 */
export const show = (args: { tracking_code: string | number } | [tracking_code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/laporan-publik/{tracking_code}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicController::show
 * @see app/Http/Controllers/PublicController.php:243
 * @route '/laporan-publik/{tracking_code}'
 */
show.url = (args: { tracking_code: string | number } | [tracking_code: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tracking_code: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    tracking_code: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tracking_code: args.tracking_code,
                }

    return show.definition.url
            .replace('{tracking_code}', parsedArgs.tracking_code.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::show
 * @see app/Http/Controllers/PublicController.php:243
 * @route '/laporan-publik/{tracking_code}'
 */
show.get = (args: { tracking_code: string | number } | [tracking_code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicController::show
 * @see app/Http/Controllers/PublicController.php:243
 * @route '/laporan-publik/{tracking_code}'
 */
show.head = (args: { tracking_code: string | number } | [tracking_code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicController::show
 * @see app/Http/Controllers/PublicController.php:243
 * @route '/laporan-publik/{tracking_code}'
 */
    const showForm = (args: { tracking_code: string | number } | [tracking_code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicController::show
 * @see app/Http/Controllers/PublicController.php:243
 * @route '/laporan-publik/{tracking_code}'
 */
        showForm.get = (args: { tracking_code: string | number } | [tracking_code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicController::show
 * @see app/Http/Controllers/PublicController.php:243
 * @route '/laporan-publik/{tracking_code}'
 */
        showForm.head = (args: { tracking_code: string | number } | [tracking_code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const reports = {
    show: Object.assign(show, show),
}

export default reports