import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Community\ReportController::index
 * @see app/Http/Controllers/Community/ReportController.php:26
 * @route '/reports'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Community\ReportController::index
 * @see app/Http/Controllers/Community/ReportController.php:26
 * @route '/reports'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Community\ReportController::index
 * @see app/Http/Controllers/Community/ReportController.php:26
 * @route '/reports'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Community\ReportController::index
 * @see app/Http/Controllers/Community/ReportController.php:26
 * @route '/reports'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Community\ReportController::index
 * @see app/Http/Controllers/Community/ReportController.php:26
 * @route '/reports'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Community\ReportController::index
 * @see app/Http/Controllers/Community/ReportController.php:26
 * @route '/reports'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Community\ReportController::index
 * @see app/Http/Controllers/Community/ReportController.php:26
 * @route '/reports'
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
* @see \App\Http\Controllers\Community\ReportController::create
 * @see app/Http/Controllers/Community/ReportController.php:85
 * @route '/reports/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/reports/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Community\ReportController::create
 * @see app/Http/Controllers/Community/ReportController.php:85
 * @route '/reports/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Community\ReportController::create
 * @see app/Http/Controllers/Community/ReportController.php:85
 * @route '/reports/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Community\ReportController::create
 * @see app/Http/Controllers/Community/ReportController.php:85
 * @route '/reports/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Community\ReportController::create
 * @see app/Http/Controllers/Community/ReportController.php:85
 * @route '/reports/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Community\ReportController::create
 * @see app/Http/Controllers/Community/ReportController.php:85
 * @route '/reports/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Community\ReportController::create
 * @see app/Http/Controllers/Community/ReportController.php:85
 * @route '/reports/create'
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
* @see \App\Http\Controllers\Community\ReportController::store
 * @see app/Http/Controllers/Community/ReportController.php:93
 * @route '/reports'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/reports',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Community\ReportController::store
 * @see app/Http/Controllers/Community/ReportController.php:93
 * @route '/reports'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Community\ReportController::store
 * @see app/Http/Controllers/Community/ReportController.php:93
 * @route '/reports'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Community\ReportController::store
 * @see app/Http/Controllers/Community/ReportController.php:93
 * @route '/reports'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Community\ReportController::store
 * @see app/Http/Controllers/Community/ReportController.php:93
 * @route '/reports'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Community\ReportController::show
 * @see app/Http/Controllers/Community/ReportController.php:155
 * @route '/reports/{report}'
 */
export const show = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/reports/{report}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Community\ReportController::show
 * @see app/Http/Controllers/Community/ReportController.php:155
 * @route '/reports/{report}'
 */
show.url = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { report: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { report: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    report: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        report: typeof args.report === 'object'
                ? args.report.id
                : args.report,
                }

    return show.definition.url
            .replace('{report}', parsedArgs.report.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Community\ReportController::show
 * @see app/Http/Controllers/Community/ReportController.php:155
 * @route '/reports/{report}'
 */
show.get = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Community\ReportController::show
 * @see app/Http/Controllers/Community/ReportController.php:155
 * @route '/reports/{report}'
 */
show.head = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Community\ReportController::show
 * @see app/Http/Controllers/Community/ReportController.php:155
 * @route '/reports/{report}'
 */
    const showForm = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Community\ReportController::show
 * @see app/Http/Controllers/Community/ReportController.php:155
 * @route '/reports/{report}'
 */
        showForm.get = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Community\ReportController::show
 * @see app/Http/Controllers/Community/ReportController.php:155
 * @route '/reports/{report}'
 */
        showForm.head = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Community\ReportController::submitAdditionalInfo
 * @see app/Http/Controllers/Community/ReportController.php:215
 * @route '/reports/{report}/additional-info'
 */
export const submitAdditionalInfo = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitAdditionalInfo.url(args, options),
    method: 'post',
})

submitAdditionalInfo.definition = {
    methods: ["post"],
    url: '/reports/{report}/additional-info',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Community\ReportController::submitAdditionalInfo
 * @see app/Http/Controllers/Community/ReportController.php:215
 * @route '/reports/{report}/additional-info'
 */
submitAdditionalInfo.url = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { report: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { report: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    report: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        report: typeof args.report === 'object'
                ? args.report.id
                : args.report,
                }

    return submitAdditionalInfo.definition.url
            .replace('{report}', parsedArgs.report.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Community\ReportController::submitAdditionalInfo
 * @see app/Http/Controllers/Community/ReportController.php:215
 * @route '/reports/{report}/additional-info'
 */
submitAdditionalInfo.post = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitAdditionalInfo.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Community\ReportController::submitAdditionalInfo
 * @see app/Http/Controllers/Community/ReportController.php:215
 * @route '/reports/{report}/additional-info'
 */
    const submitAdditionalInfoForm = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submitAdditionalInfo.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Community\ReportController::submitAdditionalInfo
 * @see app/Http/Controllers/Community/ReportController.php:215
 * @route '/reports/{report}/additional-info'
 */
        submitAdditionalInfoForm.post = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submitAdditionalInfo.url(args, options),
            method: 'post',
        })
    
    submitAdditionalInfo.form = submitAdditionalInfoForm
const ReportController = { index, create, store, show, submitAdditionalInfo }

export default ReportController