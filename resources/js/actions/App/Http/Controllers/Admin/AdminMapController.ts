import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AdminMapController::index
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/admin/map'
 */
const index8b1e4a1d3170aa908eba828d311244fb = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index8b1e4a1d3170aa908eba828d311244fb.url(options),
    method: 'get',
})

index8b1e4a1d3170aa908eba828d311244fb.definition = {
    methods: ["get","head"],
    url: '/admin/map',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminMapController::index
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/admin/map'
 */
index8b1e4a1d3170aa908eba828d311244fb.url = (options?: RouteQueryOptions) => {
    return index8b1e4a1d3170aa908eba828d311244fb.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminMapController::index
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/admin/map'
 */
index8b1e4a1d3170aa908eba828d311244fb.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index8b1e4a1d3170aa908eba828d311244fb.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminMapController::index
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/admin/map'
 */
index8b1e4a1d3170aa908eba828d311244fb.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index8b1e4a1d3170aa908eba828d311244fb.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminMapController::index
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/admin/map'
 */
    const index8b1e4a1d3170aa908eba828d311244fbForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index8b1e4a1d3170aa908eba828d311244fb.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminMapController::index
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/admin/map'
 */
        index8b1e4a1d3170aa908eba828d311244fbForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index8b1e4a1d3170aa908eba828d311244fb.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminMapController::index
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/admin/map'
 */
        index8b1e4a1d3170aa908eba828d311244fbForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index8b1e4a1d3170aa908eba828d311244fb.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index8b1e4a1d3170aa908eba828d311244fb.form = index8b1e4a1d3170aa908eba828d311244fbForm
    /**
* @see \App\Http\Controllers\Admin\AdminMapController::index
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/admin/peta'
 */
const index59b10b30336fa0cea868325ff9c55a31 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index59b10b30336fa0cea868325ff9c55a31.url(options),
    method: 'get',
})

index59b10b30336fa0cea868325ff9c55a31.definition = {
    methods: ["get","head"],
    url: '/admin/peta',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminMapController::index
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/admin/peta'
 */
index59b10b30336fa0cea868325ff9c55a31.url = (options?: RouteQueryOptions) => {
    return index59b10b30336fa0cea868325ff9c55a31.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminMapController::index
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/admin/peta'
 */
index59b10b30336fa0cea868325ff9c55a31.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index59b10b30336fa0cea868325ff9c55a31.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminMapController::index
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/admin/peta'
 */
index59b10b30336fa0cea868325ff9c55a31.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index59b10b30336fa0cea868325ff9c55a31.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminMapController::index
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/admin/peta'
 */
    const index59b10b30336fa0cea868325ff9c55a31Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index59b10b30336fa0cea868325ff9c55a31.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminMapController::index
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/admin/peta'
 */
        index59b10b30336fa0cea868325ff9c55a31Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index59b10b30336fa0cea868325ff9c55a31.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminMapController::index
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/admin/peta'
 */
        index59b10b30336fa0cea868325ff9c55a31Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index59b10b30336fa0cea868325ff9c55a31.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index59b10b30336fa0cea868325ff9c55a31.form = index59b10b30336fa0cea868325ff9c55a31Form
    /**
* @see \App\Http\Controllers\Admin\AdminMapController::index
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/opd/map'
 */
const index801c3877a9a364ef8ac1e61c022c802f = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index801c3877a9a364ef8ac1e61c022c802f.url(options),
    method: 'get',
})

index801c3877a9a364ef8ac1e61c022c802f.definition = {
    methods: ["get","head"],
    url: '/opd/map',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminMapController::index
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/opd/map'
 */
index801c3877a9a364ef8ac1e61c022c802f.url = (options?: RouteQueryOptions) => {
    return index801c3877a9a364ef8ac1e61c022c802f.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminMapController::index
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/opd/map'
 */
index801c3877a9a364ef8ac1e61c022c802f.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index801c3877a9a364ef8ac1e61c022c802f.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminMapController::index
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/opd/map'
 */
index801c3877a9a364ef8ac1e61c022c802f.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index801c3877a9a364ef8ac1e61c022c802f.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminMapController::index
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/opd/map'
 */
    const index801c3877a9a364ef8ac1e61c022c802fForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index801c3877a9a364ef8ac1e61c022c802f.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminMapController::index
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/opd/map'
 */
        index801c3877a9a364ef8ac1e61c022c802fForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index801c3877a9a364ef8ac1e61c022c802f.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminMapController::index
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/opd/map'
 */
        index801c3877a9a364ef8ac1e61c022c802fForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index801c3877a9a364ef8ac1e61c022c802f.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index801c3877a9a364ef8ac1e61c022c802f.form = index801c3877a9a364ef8ac1e61c022c802fForm
    /**
* @see \App\Http\Controllers\Admin\AdminMapController::index
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/opd/peta'
 */
const indexaca31a03e52135c95d42d7f49a5cc303 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexaca31a03e52135c95d42d7f49a5cc303.url(options),
    method: 'get',
})

indexaca31a03e52135c95d42d7f49a5cc303.definition = {
    methods: ["get","head"],
    url: '/opd/peta',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminMapController::index
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/opd/peta'
 */
indexaca31a03e52135c95d42d7f49a5cc303.url = (options?: RouteQueryOptions) => {
    return indexaca31a03e52135c95d42d7f49a5cc303.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminMapController::index
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/opd/peta'
 */
indexaca31a03e52135c95d42d7f49a5cc303.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexaca31a03e52135c95d42d7f49a5cc303.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminMapController::index
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/opd/peta'
 */
indexaca31a03e52135c95d42d7f49a5cc303.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexaca31a03e52135c95d42d7f49a5cc303.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminMapController::index
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/opd/peta'
 */
    const indexaca31a03e52135c95d42d7f49a5cc303Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexaca31a03e52135c95d42d7f49a5cc303.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminMapController::index
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/opd/peta'
 */
        indexaca31a03e52135c95d42d7f49a5cc303Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexaca31a03e52135c95d42d7f49a5cc303.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminMapController::index
 * @see app/Http/Controllers/Admin/AdminMapController.php:19
 * @route '/opd/peta'
 */
        indexaca31a03e52135c95d42d7f49a5cc303Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexaca31a03e52135c95d42d7f49a5cc303.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexaca31a03e52135c95d42d7f49a5cc303.form = indexaca31a03e52135c95d42d7f49a5cc303Form

/**
* Multiple routes resolve to \App\Http\Controllers\Admin\AdminMapController::index, so this export is a
* dictionary keyed by URI rather than a callable, with the verbs prefixed where two routes share a URI.
* Call a specific route with `index['<key>'](...)`, or import the route by name from your
* generated `routes/` directory.
*/
export const index = {
    '/admin/map': index8b1e4a1d3170aa908eba828d311244fb,
    '/admin/peta': index59b10b30336fa0cea868325ff9c55a31,
    '/opd/map': index801c3877a9a364ef8ac1e61c022c802f,
    '/opd/peta': indexaca31a03e52135c95d42d7f49a5cc303,
}

const AdminMapController = { index }

export default AdminMapController