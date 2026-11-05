import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AdminReportController::index
 * @see app/Http/Controllers/Admin/AdminReportController.php:26
 * @route '/admin/reports'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminReportController::index
 * @see app/Http/Controllers/Admin/AdminReportController.php:26
 * @route '/admin/reports'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminReportController::index
 * @see app/Http/Controllers/Admin/AdminReportController.php:26
 * @route '/admin/reports'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminReportController::index
 * @see app/Http/Controllers/Admin/AdminReportController.php:26
 * @route '/admin/reports'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminReportController::index
 * @see app/Http/Controllers/Admin/AdminReportController.php:26
 * @route '/admin/reports'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminReportController::index
 * @see app/Http/Controllers/Admin/AdminReportController.php:26
 * @route '/admin/reports'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminReportController::index
 * @see app/Http/Controllers/Admin/AdminReportController.php:26
 * @route '/admin/reports'
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
* @see \App\Http\Controllers\Admin\AdminReportController::show
 * @see app/Http/Controllers/Admin/AdminReportController.php:112
 * @route '/admin/reports/{report}'
 */
export const show = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/reports/{report}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminReportController::show
 * @see app/Http/Controllers/Admin/AdminReportController.php:112
 * @route '/admin/reports/{report}'
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
* @see \App\Http\Controllers\Admin\AdminReportController::show
 * @see app/Http/Controllers/Admin/AdminReportController.php:112
 * @route '/admin/reports/{report}'
 */
show.get = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminReportController::show
 * @see app/Http/Controllers/Admin/AdminReportController.php:112
 * @route '/admin/reports/{report}'
 */
show.head = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminReportController::show
 * @see app/Http/Controllers/Admin/AdminReportController.php:112
 * @route '/admin/reports/{report}'
 */
    const showForm = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminReportController::show
 * @see app/Http/Controllers/Admin/AdminReportController.php:112
 * @route '/admin/reports/{report}'
 */
        showForm.get = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminReportController::show
 * @see app/Http/Controllers/Admin/AdminReportController.php:112
 * @route '/admin/reports/{report}'
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
* @see \App\Http\Controllers\Admin\AdminReportController::transition
 * @see app/Http/Controllers/Admin/AdminReportController.php:168
 * @route '/admin/reports/{report}/transitions'
 */
export const transition = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: transition.url(args, options),
    method: 'post',
})

transition.definition = {
    methods: ["post"],
    url: '/admin/reports/{report}/transitions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdminReportController::transition
 * @see app/Http/Controllers/Admin/AdminReportController.php:168
 * @route '/admin/reports/{report}/transitions'
 */
transition.url = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return transition.definition.url
            .replace('{report}', parsedArgs.report.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminReportController::transition
 * @see app/Http/Controllers/Admin/AdminReportController.php:168
 * @route '/admin/reports/{report}/transitions'
 */
transition.post = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: transition.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AdminReportController::transition
 * @see app/Http/Controllers/Admin/AdminReportController.php:168
 * @route '/admin/reports/{report}/transitions'
 */
    const transitionForm = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: transition.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminReportController::transition
 * @see app/Http/Controllers/Admin/AdminReportController.php:168
 * @route '/admin/reports/{report}/transitions'
 */
        transitionForm.post = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: transition.url(args, options),
            method: 'post',
        })
    
    transition.form = transitionForm
/**
* @see \App\Http\Controllers\Admin\AdminReportController::assign
 * @see app/Http/Controllers/Admin/AdminReportController.php:198
 * @route '/admin/reports/{report}/assignments'
 */
export const assign = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assign.url(args, options),
    method: 'post',
})

assign.definition = {
    methods: ["post"],
    url: '/admin/reports/{report}/assignments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdminReportController::assign
 * @see app/Http/Controllers/Admin/AdminReportController.php:198
 * @route '/admin/reports/{report}/assignments'
 */
assign.url = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return assign.definition.url
            .replace('{report}', parsedArgs.report.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminReportController::assign
 * @see app/Http/Controllers/Admin/AdminReportController.php:198
 * @route '/admin/reports/{report}/assignments'
 */
assign.post = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assign.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AdminReportController::assign
 * @see app/Http/Controllers/Admin/AdminReportController.php:198
 * @route '/admin/reports/{report}/assignments'
 */
    const assignForm = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: assign.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminReportController::assign
 * @see app/Http/Controllers/Admin/AdminReportController.php:198
 * @route '/admin/reports/{report}/assignments'
 */
        assignForm.post = (args: { report: number | { id: number } } | [report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: assign.url(args, options),
            method: 'post',
        })
    
    assign.form = assignForm
const reports = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
transition: Object.assign(transition, transition),
assign: Object.assign(assign, assign),
}

export default reports