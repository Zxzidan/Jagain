import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AdminReportController::index
 * @see app/Http/Controllers/Admin/AdminReportController.php:26
 * @route '/admin/reports'
 */
const indexf32b5bd5940752871d5bf97794f0c32e = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexf32b5bd5940752871d5bf97794f0c32e.url(options),
    method: 'get',
})

indexf32b5bd5940752871d5bf97794f0c32e.definition = {
    methods: ["get","head"],
    url: '/admin/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminReportController::index
 * @see app/Http/Controllers/Admin/AdminReportController.php:26
 * @route '/admin/reports'
 */
indexf32b5bd5940752871d5bf97794f0c32e.url = (options?: RouteQueryOptions) => {
    return indexf32b5bd5940752871d5bf97794f0c32e.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminReportController::index
 * @see app/Http/Controllers/Admin/AdminReportController.php:26
 * @route '/admin/reports'
 */
indexf32b5bd5940752871d5bf97794f0c32e.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexf32b5bd5940752871d5bf97794f0c32e.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminReportController::index
 * @see app/Http/Controllers/Admin/AdminReportController.php:26
 * @route '/admin/reports'
 */
indexf32b5bd5940752871d5bf97794f0c32e.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexf32b5bd5940752871d5bf97794f0c32e.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminReportController::index
 * @see app/Http/Controllers/Admin/AdminReportController.php:26
 * @route '/admin/reports'
 */
    const indexf32b5bd5940752871d5bf97794f0c32eForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexf32b5bd5940752871d5bf97794f0c32e.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminReportController::index
 * @see app/Http/Controllers/Admin/AdminReportController.php:26
 * @route '/admin/reports'
 */
        indexf32b5bd5940752871d5bf97794f0c32eForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexf32b5bd5940752871d5bf97794f0c32e.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminReportController::index
 * @see app/Http/Controllers/Admin/AdminReportController.php:26
 * @route '/admin/reports'
 */
        indexf32b5bd5940752871d5bf97794f0c32eForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexf32b5bd5940752871d5bf97794f0c32e.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexf32b5bd5940752871d5bf97794f0c32e.form = indexf32b5bd5940752871d5bf97794f0c32eForm
    /**
* @see \App\Http\Controllers\Admin\AdminReportController::index
 * @see app/Http/Controllers/Admin/AdminReportController.php:26
 * @route '/admin/laporan'
 */
const indexd21d60fec31be5b248e5fbf425ed2587 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexd21d60fec31be5b248e5fbf425ed2587.url(options),
    method: 'get',
})

indexd21d60fec31be5b248e5fbf425ed2587.definition = {
    methods: ["get","head"],
    url: '/admin/laporan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminReportController::index
 * @see app/Http/Controllers/Admin/AdminReportController.php:26
 * @route '/admin/laporan'
 */
indexd21d60fec31be5b248e5fbf425ed2587.url = (options?: RouteQueryOptions) => {
    return indexd21d60fec31be5b248e5fbf425ed2587.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminReportController::index
 * @see app/Http/Controllers/Admin/AdminReportController.php:26
 * @route '/admin/laporan'
 */
indexd21d60fec31be5b248e5fbf425ed2587.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexd21d60fec31be5b248e5fbf425ed2587.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminReportController::index
 * @see app/Http/Controllers/Admin/AdminReportController.php:26
 * @route '/admin/laporan'
 */
indexd21d60fec31be5b248e5fbf425ed2587.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexd21d60fec31be5b248e5fbf425ed2587.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminReportController::index
 * @see app/Http/Controllers/Admin/AdminReportController.php:26
 * @route '/admin/laporan'
 */
    const indexd21d60fec31be5b248e5fbf425ed2587Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexd21d60fec31be5b248e5fbf425ed2587.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminReportController::index
 * @see app/Http/Controllers/Admin/AdminReportController.php:26
 * @route '/admin/laporan'
 */
        indexd21d60fec31be5b248e5fbf425ed2587Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexd21d60fec31be5b248e5fbf425ed2587.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminReportController::index
 * @see app/Http/Controllers/Admin/AdminReportController.php:26
 * @route '/admin/laporan'
 */
        indexd21d60fec31be5b248e5fbf425ed2587Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexd21d60fec31be5b248e5fbf425ed2587.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexd21d60fec31be5b248e5fbf425ed2587.form = indexd21d60fec31be5b248e5fbf425ed2587Form

/**
* Multiple routes resolve to \App\Http\Controllers\Admin\AdminReportController::index, so this export is a
* dictionary keyed by URI rather than a callable, with the verbs prefixed where two routes share a URI.
* Call a specific route with `index['<key>'](...)`, or import the route by name from your
* generated `routes/` directory.
*/
export const index = {
    '/admin/reports': indexf32b5bd5940752871d5bf97794f0c32e,
    '/admin/laporan': indexd21d60fec31be5b248e5fbf425ed2587,
}

/**
* @see \App\Http\Controllers\Admin\AdminReportController::show
 * @see app/Http/Controllers/Admin/AdminReportController.php:112
 * @route '/admin/reports/{report}'
 */
const show591c3d088e8b50f98d85164c4d0c499b = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show591c3d088e8b50f98d85164c4d0c499b.url(args, options),
    method: 'get',
})

show591c3d088e8b50f98d85164c4d0c499b.definition = {
    methods: ["get","head"],
    url: '/admin/reports/{report}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminReportController::show
 * @see app/Http/Controllers/Admin/AdminReportController.php:112
 * @route '/admin/reports/{report}'
 */
show591c3d088e8b50f98d85164c4d0c499b.url = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show591c3d088e8b50f98d85164c4d0c499b.definition.url
            .replace('{report}', parsedArgs.report.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminReportController::show
 * @see app/Http/Controllers/Admin/AdminReportController.php:112
 * @route '/admin/reports/{report}'
 */
show591c3d088e8b50f98d85164c4d0c499b.get = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show591c3d088e8b50f98d85164c4d0c499b.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminReportController::show
 * @see app/Http/Controllers/Admin/AdminReportController.php:112
 * @route '/admin/reports/{report}'
 */
show591c3d088e8b50f98d85164c4d0c499b.head = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show591c3d088e8b50f98d85164c4d0c499b.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminReportController::show
 * @see app/Http/Controllers/Admin/AdminReportController.php:112
 * @route '/admin/reports/{report}'
 */
    const show591c3d088e8b50f98d85164c4d0c499bForm = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show591c3d088e8b50f98d85164c4d0c499b.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminReportController::show
 * @see app/Http/Controllers/Admin/AdminReportController.php:112
 * @route '/admin/reports/{report}'
 */
        show591c3d088e8b50f98d85164c4d0c499bForm.get = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show591c3d088e8b50f98d85164c4d0c499b.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminReportController::show
 * @see app/Http/Controllers/Admin/AdminReportController.php:112
 * @route '/admin/reports/{report}'
 */
        show591c3d088e8b50f98d85164c4d0c499bForm.head = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show591c3d088e8b50f98d85164c4d0c499b.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show591c3d088e8b50f98d85164c4d0c499b.form = show591c3d088e8b50f98d85164c4d0c499bForm
    /**
* @see \App\Http\Controllers\Admin\AdminReportController::show
 * @see app/Http/Controllers/Admin/AdminReportController.php:112
 * @route '/admin/laporan/{report}'
 */
const show320e09fd42dfdb6909b098691fcd5065 = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show320e09fd42dfdb6909b098691fcd5065.url(args, options),
    method: 'get',
})

show320e09fd42dfdb6909b098691fcd5065.definition = {
    methods: ["get","head"],
    url: '/admin/laporan/{report}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminReportController::show
 * @see app/Http/Controllers/Admin/AdminReportController.php:112
 * @route '/admin/laporan/{report}'
 */
show320e09fd42dfdb6909b098691fcd5065.url = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show320e09fd42dfdb6909b098691fcd5065.definition.url
            .replace('{report}', parsedArgs.report.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminReportController::show
 * @see app/Http/Controllers/Admin/AdminReportController.php:112
 * @route '/admin/laporan/{report}'
 */
show320e09fd42dfdb6909b098691fcd5065.get = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show320e09fd42dfdb6909b098691fcd5065.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminReportController::show
 * @see app/Http/Controllers/Admin/AdminReportController.php:112
 * @route '/admin/laporan/{report}'
 */
show320e09fd42dfdb6909b098691fcd5065.head = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show320e09fd42dfdb6909b098691fcd5065.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminReportController::show
 * @see app/Http/Controllers/Admin/AdminReportController.php:112
 * @route '/admin/laporan/{report}'
 */
    const show320e09fd42dfdb6909b098691fcd5065Form = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show320e09fd42dfdb6909b098691fcd5065.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminReportController::show
 * @see app/Http/Controllers/Admin/AdminReportController.php:112
 * @route '/admin/laporan/{report}'
 */
        show320e09fd42dfdb6909b098691fcd5065Form.get = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show320e09fd42dfdb6909b098691fcd5065.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminReportController::show
 * @see app/Http/Controllers/Admin/AdminReportController.php:112
 * @route '/admin/laporan/{report}'
 */
        show320e09fd42dfdb6909b098691fcd5065Form.head = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show320e09fd42dfdb6909b098691fcd5065.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show320e09fd42dfdb6909b098691fcd5065.form = show320e09fd42dfdb6909b098691fcd5065Form

/**
* Multiple routes resolve to \App\Http\Controllers\Admin\AdminReportController::show, so this export is a
* dictionary keyed by URI rather than a callable, with the verbs prefixed where two routes share a URI.
* Call a specific route with `show['<key>'](...)`, or import the route by name from your
* generated `routes/` directory.
*/
export const show = {
    '/admin/reports/{report}': show591c3d088e8b50f98d85164c4d0c499b,
    '/admin/laporan/{report}': show320e09fd42dfdb6909b098691fcd5065,
}

/**
* @see \App\Http\Controllers\Admin\AdminReportController::transition
 * @see app/Http/Controllers/Admin/AdminReportController.php:168
 * @route '/admin/reports/{report}/transitions'
 */
const transitiondcb169241e573948182d8768a503792f = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: transitiondcb169241e573948182d8768a503792f.url(args, options),
    method: 'post',
})

transitiondcb169241e573948182d8768a503792f.definition = {
    methods: ["post"],
    url: '/admin/reports/{report}/transitions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdminReportController::transition
 * @see app/Http/Controllers/Admin/AdminReportController.php:168
 * @route '/admin/reports/{report}/transitions'
 */
transitiondcb169241e573948182d8768a503792f.url = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return transitiondcb169241e573948182d8768a503792f.definition.url
            .replace('{report}', parsedArgs.report.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminReportController::transition
 * @see app/Http/Controllers/Admin/AdminReportController.php:168
 * @route '/admin/reports/{report}/transitions'
 */
transitiondcb169241e573948182d8768a503792f.post = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: transitiondcb169241e573948182d8768a503792f.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AdminReportController::transition
 * @see app/Http/Controllers/Admin/AdminReportController.php:168
 * @route '/admin/reports/{report}/transitions'
 */
    const transitiondcb169241e573948182d8768a503792fForm = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: transitiondcb169241e573948182d8768a503792f.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminReportController::transition
 * @see app/Http/Controllers/Admin/AdminReportController.php:168
 * @route '/admin/reports/{report}/transitions'
 */
        transitiondcb169241e573948182d8768a503792fForm.post = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: transitiondcb169241e573948182d8768a503792f.url(args, options),
            method: 'post',
        })
    
    transitiondcb169241e573948182d8768a503792f.form = transitiondcb169241e573948182d8768a503792fForm
    /**
* @see \App\Http\Controllers\Admin\AdminReportController::transition
 * @see app/Http/Controllers/Admin/AdminReportController.php:168
 * @route '/admin/laporan/{report}/status'
 */
const transition4ae78ab43df3c6bd281eed07416d8d25 = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: transition4ae78ab43df3c6bd281eed07416d8d25.url(args, options),
    method: 'post',
})

transition4ae78ab43df3c6bd281eed07416d8d25.definition = {
    methods: ["post"],
    url: '/admin/laporan/{report}/status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdminReportController::transition
 * @see app/Http/Controllers/Admin/AdminReportController.php:168
 * @route '/admin/laporan/{report}/status'
 */
transition4ae78ab43df3c6bd281eed07416d8d25.url = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return transition4ae78ab43df3c6bd281eed07416d8d25.definition.url
            .replace('{report}', parsedArgs.report.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminReportController::transition
 * @see app/Http/Controllers/Admin/AdminReportController.php:168
 * @route '/admin/laporan/{report}/status'
 */
transition4ae78ab43df3c6bd281eed07416d8d25.post = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: transition4ae78ab43df3c6bd281eed07416d8d25.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AdminReportController::transition
 * @see app/Http/Controllers/Admin/AdminReportController.php:168
 * @route '/admin/laporan/{report}/status'
 */
    const transition4ae78ab43df3c6bd281eed07416d8d25Form = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: transition4ae78ab43df3c6bd281eed07416d8d25.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminReportController::transition
 * @see app/Http/Controllers/Admin/AdminReportController.php:168
 * @route '/admin/laporan/{report}/status'
 */
        transition4ae78ab43df3c6bd281eed07416d8d25Form.post = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: transition4ae78ab43df3c6bd281eed07416d8d25.url(args, options),
            method: 'post',
        })
    
    transition4ae78ab43df3c6bd281eed07416d8d25.form = transition4ae78ab43df3c6bd281eed07416d8d25Form

/**
* Multiple routes resolve to \App\Http\Controllers\Admin\AdminReportController::transition, so this export is a
* dictionary keyed by URI rather than a callable, with the verbs prefixed where two routes share a URI.
* Call a specific route with `transition['<key>'](...)`, or import the route by name from your
* generated `routes/` directory.
*/
export const transition = {
    '/admin/reports/{report}/transitions': transitiondcb169241e573948182d8768a503792f,
    '/admin/laporan/{report}/status': transition4ae78ab43df3c6bd281eed07416d8d25,
}

/**
* @see \App\Http\Controllers\Admin\AdminReportController::assign
 * @see app/Http/Controllers/Admin/AdminReportController.php:198
 * @route '/admin/reports/{report}/assignments'
 */
const assignadda280c3f90d4a568df4f241ded96bf = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignadda280c3f90d4a568df4f241ded96bf.url(args, options),
    method: 'post',
})

assignadda280c3f90d4a568df4f241ded96bf.definition = {
    methods: ["post"],
    url: '/admin/reports/{report}/assignments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdminReportController::assign
 * @see app/Http/Controllers/Admin/AdminReportController.php:198
 * @route '/admin/reports/{report}/assignments'
 */
assignadda280c3f90d4a568df4f241ded96bf.url = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return assignadda280c3f90d4a568df4f241ded96bf.definition.url
            .replace('{report}', parsedArgs.report.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminReportController::assign
 * @see app/Http/Controllers/Admin/AdminReportController.php:198
 * @route '/admin/reports/{report}/assignments'
 */
assignadda280c3f90d4a568df4f241ded96bf.post = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignadda280c3f90d4a568df4f241ded96bf.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AdminReportController::assign
 * @see app/Http/Controllers/Admin/AdminReportController.php:198
 * @route '/admin/reports/{report}/assignments'
 */
    const assignadda280c3f90d4a568df4f241ded96bfForm = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: assignadda280c3f90d4a568df4f241ded96bf.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminReportController::assign
 * @see app/Http/Controllers/Admin/AdminReportController.php:198
 * @route '/admin/reports/{report}/assignments'
 */
        assignadda280c3f90d4a568df4f241ded96bfForm.post = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: assignadda280c3f90d4a568df4f241ded96bf.url(args, options),
            method: 'post',
        })
    
    assignadda280c3f90d4a568df4f241ded96bf.form = assignadda280c3f90d4a568df4f241ded96bfForm
    /**
* @see \App\Http\Controllers\Admin\AdminReportController::assign
 * @see app/Http/Controllers/Admin/AdminReportController.php:198
 * @route '/admin/laporan/{report}/assign'
 */
const assign3290379e89734ab6f33ad8a8fd46192f = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assign3290379e89734ab6f33ad8a8fd46192f.url(args, options),
    method: 'post',
})

assign3290379e89734ab6f33ad8a8fd46192f.definition = {
    methods: ["post"],
    url: '/admin/laporan/{report}/assign',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdminReportController::assign
 * @see app/Http/Controllers/Admin/AdminReportController.php:198
 * @route '/admin/laporan/{report}/assign'
 */
assign3290379e89734ab6f33ad8a8fd46192f.url = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return assign3290379e89734ab6f33ad8a8fd46192f.definition.url
            .replace('{report}', parsedArgs.report.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminReportController::assign
 * @see app/Http/Controllers/Admin/AdminReportController.php:198
 * @route '/admin/laporan/{report}/assign'
 */
assign3290379e89734ab6f33ad8a8fd46192f.post = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assign3290379e89734ab6f33ad8a8fd46192f.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AdminReportController::assign
 * @see app/Http/Controllers/Admin/AdminReportController.php:198
 * @route '/admin/laporan/{report}/assign'
 */
    const assign3290379e89734ab6f33ad8a8fd46192fForm = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: assign3290379e89734ab6f33ad8a8fd46192f.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminReportController::assign
 * @see app/Http/Controllers/Admin/AdminReportController.php:198
 * @route '/admin/laporan/{report}/assign'
 */
        assign3290379e89734ab6f33ad8a8fd46192fForm.post = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: assign3290379e89734ab6f33ad8a8fd46192f.url(args, options),
            method: 'post',
        })
    
    assign3290379e89734ab6f33ad8a8fd46192f.form = assign3290379e89734ab6f33ad8a8fd46192fForm

/**
* Multiple routes resolve to \App\Http\Controllers\Admin\AdminReportController::assign, so this export is a
* dictionary keyed by URI rather than a callable, with the verbs prefixed where two routes share a URI.
* Call a specific route with `assign['<key>'](...)`, or import the route by name from your
* generated `routes/` directory.
*/
export const assign = {
    '/admin/reports/{report}/assignments': assignadda280c3f90d4a568df4f241ded96bf,
    '/admin/laporan/{report}/assign': assign3290379e89734ab6f33ad8a8fd46192f,
}

const AdminReportController = { index, show, transition, assign }

export default AdminReportController