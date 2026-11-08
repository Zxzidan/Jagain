import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PublicController::index
 * @see app/Http/Controllers/PublicController.php:19
 * @route '/'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicController::index
 * @see app/Http/Controllers/PublicController.php:19
 * @route '/'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::index
 * @see app/Http/Controllers/PublicController.php:19
 * @route '/'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicController::index
 * @see app/Http/Controllers/PublicController.php:19
 * @route '/'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicController::index
 * @see app/Http/Controllers/PublicController.php:19
 * @route '/'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicController::index
 * @see app/Http/Controllers/PublicController.php:19
 * @route '/'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicController::index
 * @see app/Http/Controllers/PublicController.php:19
 * @route '/'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\PublicController::map
 * @see app/Http/Controllers/PublicController.php:112
 * @route '/peta'
 */
export const map = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: map.url(options),
    method: 'get',
})

map.definition = {
    methods: ["get","head"],
    url: '/peta',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicController::map
 * @see app/Http/Controllers/PublicController.php:112
 * @route '/peta'
 */
map.url = (options?: RouteQueryOptions) => {
    return map.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::map
 * @see app/Http/Controllers/PublicController.php:112
 * @route '/peta'
 */
map.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: map.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicController::map
 * @see app/Http/Controllers/PublicController.php:112
 * @route '/peta'
 */
map.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: map.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicController::map
 * @see app/Http/Controllers/PublicController.php:112
 * @route '/peta'
 */
    const mapForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: map.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicController::map
 * @see app/Http/Controllers/PublicController.php:112
 * @route '/peta'
 */
        mapForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: map.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicController::map
 * @see app/Http/Controllers/PublicController.php:112
 * @route '/peta'
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
/**
* @see \App\Http\Controllers\PublicController::showReport
 * @see app/Http/Controllers/PublicController.php:206
 * @route '/laporan-publik/{tracking_code}'
 */
export const showReport = (args: { tracking_code: string | number } | [tracking_code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showReport.url(args, options),
    method: 'get',
})

showReport.definition = {
    methods: ["get","head"],
    url: '/laporan-publik/{tracking_code}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicController::showReport
 * @see app/Http/Controllers/PublicController.php:206
 * @route '/laporan-publik/{tracking_code}'
 */
showReport.url = (args: { tracking_code: string | number } | [tracking_code: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return showReport.definition.url
            .replace('{tracking_code}', parsedArgs.tracking_code.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::showReport
 * @see app/Http/Controllers/PublicController.php:206
 * @route '/laporan-publik/{tracking_code}'
 */
showReport.get = (args: { tracking_code: string | number } | [tracking_code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showReport.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicController::showReport
 * @see app/Http/Controllers/PublicController.php:206
 * @route '/laporan-publik/{tracking_code}'
 */
showReport.head = (args: { tracking_code: string | number } | [tracking_code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showReport.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicController::showReport
 * @see app/Http/Controllers/PublicController.php:206
 * @route '/laporan-publik/{tracking_code}'
 */
    const showReportForm = (args: { tracking_code: string | number } | [tracking_code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showReport.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicController::showReport
 * @see app/Http/Controllers/PublicController.php:206
 * @route '/laporan-publik/{tracking_code}'
 */
        showReportForm.get = (args: { tracking_code: string | number } | [tracking_code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showReport.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicController::showReport
 * @see app/Http/Controllers/PublicController.php:206
 * @route '/laporan-publik/{tracking_code}'
 */
        showReportForm.head = (args: { tracking_code: string | number } | [tracking_code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showReport.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showReport.form = showReportForm
/**
* @see \App\Http\Controllers\PublicController::safetyGuide
 * @see app/Http/Controllers/PublicController.php:221
 * @route '/panduan-keselamatan'
 */
export const safetyGuide = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: safetyGuide.url(options),
    method: 'get',
})

safetyGuide.definition = {
    methods: ["get","head"],
    url: '/panduan-keselamatan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicController::safetyGuide
 * @see app/Http/Controllers/PublicController.php:221
 * @route '/panduan-keselamatan'
 */
safetyGuide.url = (options?: RouteQueryOptions) => {
    return safetyGuide.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::safetyGuide
 * @see app/Http/Controllers/PublicController.php:221
 * @route '/panduan-keselamatan'
 */
safetyGuide.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: safetyGuide.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicController::safetyGuide
 * @see app/Http/Controllers/PublicController.php:221
 * @route '/panduan-keselamatan'
 */
safetyGuide.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: safetyGuide.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicController::safetyGuide
 * @see app/Http/Controllers/PublicController.php:221
 * @route '/panduan-keselamatan'
 */
    const safetyGuideForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: safetyGuide.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicController::safetyGuide
 * @see app/Http/Controllers/PublicController.php:221
 * @route '/panduan-keselamatan'
 */
        safetyGuideForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: safetyGuide.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicController::safetyGuide
 * @see app/Http/Controllers/PublicController.php:221
 * @route '/panduan-keselamatan'
 */
        safetyGuideForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: safetyGuide.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    safetyGuide.form = safetyGuideForm
/**
* @see \App\Http\Controllers\PublicController::about
 * @see app/Http/Controllers/PublicController.php:229
 * @route '/tentang-kami'
 */
export const about = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: about.url(options),
    method: 'get',
})

about.definition = {
    methods: ["get","head"],
    url: '/tentang-kami',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicController::about
 * @see app/Http/Controllers/PublicController.php:229
 * @route '/tentang-kami'
 */
about.url = (options?: RouteQueryOptions) => {
    return about.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::about
 * @see app/Http/Controllers/PublicController.php:229
 * @route '/tentang-kami'
 */
about.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: about.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicController::about
 * @see app/Http/Controllers/PublicController.php:229
 * @route '/tentang-kami'
 */
about.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: about.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicController::about
 * @see app/Http/Controllers/PublicController.php:229
 * @route '/tentang-kami'
 */
    const aboutForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: about.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicController::about
 * @see app/Http/Controllers/PublicController.php:229
 * @route '/tentang-kami'
 */
        aboutForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: about.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicController::about
 * @see app/Http/Controllers/PublicController.php:229
 * @route '/tentang-kami'
 */
        aboutForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: about.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    about.form = aboutForm
const PublicController = { index, map, showReport, safetyGuide, about }

export default PublicController