import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import reports from './reports'
/**
* @see \App\Http\Controllers\PublicController::map
 * @see app/Http/Controllers/PublicController.php:122
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
 * @see app/Http/Controllers/PublicController.php:122
 * @route '/peta'
 */
map.url = (options?: RouteQueryOptions) => {
    return map.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::map
 * @see app/Http/Controllers/PublicController.php:122
 * @route '/peta'
 */
map.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: map.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicController::map
 * @see app/Http/Controllers/PublicController.php:122
 * @route '/peta'
 */
map.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: map.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicController::map
 * @see app/Http/Controllers/PublicController.php:122
 * @route '/peta'
 */
    const mapForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: map.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicController::map
 * @see app/Http/Controllers/PublicController.php:122
 * @route '/peta'
 */
        mapForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: map.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicController::map
 * @see app/Http/Controllers/PublicController.php:122
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
* @see \App\Http\Controllers\PublicController::safetyGuide
 * @see app/Http/Controllers/PublicController.php:239
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
 * @see app/Http/Controllers/PublicController.php:239
 * @route '/panduan-keselamatan'
 */
safetyGuide.url = (options?: RouteQueryOptions) => {
    return safetyGuide.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::safetyGuide
 * @see app/Http/Controllers/PublicController.php:239
 * @route '/panduan-keselamatan'
 */
safetyGuide.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: safetyGuide.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicController::safetyGuide
 * @see app/Http/Controllers/PublicController.php:239
 * @route '/panduan-keselamatan'
 */
safetyGuide.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: safetyGuide.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicController::safetyGuide
 * @see app/Http/Controllers/PublicController.php:239
 * @route '/panduan-keselamatan'
 */
    const safetyGuideForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: safetyGuide.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicController::safetyGuide
 * @see app/Http/Controllers/PublicController.php:239
 * @route '/panduan-keselamatan'
 */
        safetyGuideForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: safetyGuide.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicController::safetyGuide
 * @see app/Http/Controllers/PublicController.php:239
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
 * @see app/Http/Controllers/PublicController.php:247
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
 * @see app/Http/Controllers/PublicController.php:247
 * @route '/tentang-kami'
 */
about.url = (options?: RouteQueryOptions) => {
    return about.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::about
 * @see app/Http/Controllers/PublicController.php:247
 * @route '/tentang-kami'
 */
about.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: about.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicController::about
 * @see app/Http/Controllers/PublicController.php:247
 * @route '/tentang-kami'
 */
about.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: about.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicController::about
 * @see app/Http/Controllers/PublicController.php:247
 * @route '/tentang-kami'
 */
    const aboutForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: about.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicController::about
 * @see app/Http/Controllers/PublicController.php:247
 * @route '/tentang-kami'
 */
        aboutForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: about.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicController::about
 * @see app/Http/Controllers/PublicController.php:247
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
const publicMethod = {
    map: Object.assign(map, map),
reports: Object.assign(reports, reports),
safetyGuide: Object.assign(safetyGuide, safetyGuide),
about: Object.assign(about, about),
}

export default publicMethod