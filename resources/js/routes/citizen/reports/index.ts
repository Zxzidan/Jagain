import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CitizenReportController::create
 * @see app/Http/Controllers/CitizenReportController.php:29
 * @route '/lapor'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/lapor',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CitizenReportController::create
 * @see app/Http/Controllers/CitizenReportController.php:29
 * @route '/lapor'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CitizenReportController::create
 * @see app/Http/Controllers/CitizenReportController.php:29
 * @route '/lapor'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CitizenReportController::create
 * @see app/Http/Controllers/CitizenReportController.php:29
 * @route '/lapor'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CitizenReportController::create
 * @see app/Http/Controllers/CitizenReportController.php:29
 * @route '/lapor'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CitizenReportController::create
 * @see app/Http/Controllers/CitizenReportController.php:29
 * @route '/lapor'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CitizenReportController::create
 * @see app/Http/Controllers/CitizenReportController.php:29
 * @route '/lapor'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\CitizenReportController::store
 * @see app/Http/Controllers/CitizenReportController.php:52
 * @route '/lapor'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/lapor',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CitizenReportController::store
 * @see app/Http/Controllers/CitizenReportController.php:52
 * @route '/lapor'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CitizenReportController::store
 * @see app/Http/Controllers/CitizenReportController.php:52
 * @route '/lapor'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CitizenReportController::store
 * @see app/Http/Controllers/CitizenReportController.php:52
 * @route '/lapor'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CitizenReportController::store
 * @see app/Http/Controllers/CitizenReportController.php:52
 * @route '/lapor'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\CitizenReportController::index
 * @see app/Http/Controllers/CitizenReportController.php:150
 * @route '/laporan-saya'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/laporan-saya',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CitizenReportController::index
 * @see app/Http/Controllers/CitizenReportController.php:150
 * @route '/laporan-saya'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CitizenReportController::index
 * @see app/Http/Controllers/CitizenReportController.php:150
 * @route '/laporan-saya'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CitizenReportController::index
 * @see app/Http/Controllers/CitizenReportController.php:150
 * @route '/laporan-saya'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CitizenReportController::index
 * @see app/Http/Controllers/CitizenReportController.php:150
 * @route '/laporan-saya'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CitizenReportController::index
 * @see app/Http/Controllers/CitizenReportController.php:150
 * @route '/laporan-saya'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CitizenReportController::index
 * @see app/Http/Controllers/CitizenReportController.php:150
 * @route '/laporan-saya'
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
* @see \App\Http\Controllers\CitizenReportController::show
 * @see app/Http/Controllers/CitizenReportController.php:176
 * @route '/laporan-saya/{tracking_code}'
 */
export const show = (args: { tracking_code: string | number } | [tracking_code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/laporan-saya/{tracking_code}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CitizenReportController::show
 * @see app/Http/Controllers/CitizenReportController.php:176
 * @route '/laporan-saya/{tracking_code}'
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
* @see \App\Http\Controllers\CitizenReportController::show
 * @see app/Http/Controllers/CitizenReportController.php:176
 * @route '/laporan-saya/{tracking_code}'
 */
show.get = (args: { tracking_code: string | number } | [tracking_code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CitizenReportController::show
 * @see app/Http/Controllers/CitizenReportController.php:176
 * @route '/laporan-saya/{tracking_code}'
 */
show.head = (args: { tracking_code: string | number } | [tracking_code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CitizenReportController::show
 * @see app/Http/Controllers/CitizenReportController.php:176
 * @route '/laporan-saya/{tracking_code}'
 */
    const showForm = (args: { tracking_code: string | number } | [tracking_code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CitizenReportController::show
 * @see app/Http/Controllers/CitizenReportController.php:176
 * @route '/laporan-saya/{tracking_code}'
 */
        showForm.get = (args: { tracking_code: string | number } | [tracking_code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CitizenReportController::show
 * @see app/Http/Controllers/CitizenReportController.php:176
 * @route '/laporan-saya/{tracking_code}'
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
/**
* @see \App\Http\Controllers\CitizenReportController::provideInfo
 * @see app/Http/Controllers/CitizenReportController.php:238
 * @route '/laporan-saya/{tracking_code}/tambah-informasi'
 */
export const provideInfo = (args: { tracking_code: string | number } | [tracking_code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: provideInfo.url(args, options),
    method: 'post',
})

provideInfo.definition = {
    methods: ["post"],
    url: '/laporan-saya/{tracking_code}/tambah-informasi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CitizenReportController::provideInfo
 * @see app/Http/Controllers/CitizenReportController.php:238
 * @route '/laporan-saya/{tracking_code}/tambah-informasi'
 */
provideInfo.url = (args: { tracking_code: string | number } | [tracking_code: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return provideInfo.definition.url
            .replace('{tracking_code}', parsedArgs.tracking_code.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CitizenReportController::provideInfo
 * @see app/Http/Controllers/CitizenReportController.php:238
 * @route '/laporan-saya/{tracking_code}/tambah-informasi'
 */
provideInfo.post = (args: { tracking_code: string | number } | [tracking_code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: provideInfo.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CitizenReportController::provideInfo
 * @see app/Http/Controllers/CitizenReportController.php:238
 * @route '/laporan-saya/{tracking_code}/tambah-informasi'
 */
    const provideInfoForm = (args: { tracking_code: string | number } | [tracking_code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: provideInfo.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CitizenReportController::provideInfo
 * @see app/Http/Controllers/CitizenReportController.php:238
 * @route '/laporan-saya/{tracking_code}/tambah-informasi'
 */
        provideInfoForm.post = (args: { tracking_code: string | number } | [tracking_code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: provideInfo.url(args, options),
            method: 'post',
        })
    
    provideInfo.form = provideInfoForm
const reports = {
    create: Object.assign(create, create),
store: Object.assign(store, store),
index: Object.assign(index, index),
show: Object.assign(show, show),
provideInfo: Object.assign(provideInfo, provideInfo),
}

export default reports