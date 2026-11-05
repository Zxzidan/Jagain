import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::index
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:27
 * @route '/opd/tugas'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/opd/tugas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::index
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:27
 * @route '/opd/tugas'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::index
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:27
 * @route '/opd/tugas'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::index
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:27
 * @route '/opd/tugas'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::index
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:27
 * @route '/opd/tugas'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::index
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:27
 * @route '/opd/tugas'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::index
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:27
 * @route '/opd/tugas'
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
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::show
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:100
 * @route '/opd/tugas/{assignment}'
 */
export const show = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/opd/tugas/{assignment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::show
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:100
 * @route '/opd/tugas/{assignment}'
 */
show.url = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { assignment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    assignment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assignment: typeof args.assignment === 'object'
                ? args.assignment.id
                : args.assignment,
                }

    return show.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::show
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:100
 * @route '/opd/tugas/{assignment}'
 */
show.get = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::show
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:100
 * @route '/opd/tugas/{assignment}'
 */
show.head = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::show
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:100
 * @route '/opd/tugas/{assignment}'
 */
    const showForm = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::show
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:100
 * @route '/opd/tugas/{assignment}'
 */
        showForm.get = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::show
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:100
 * @route '/opd/tugas/{assignment}'
 */
        showForm.head = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::respond
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:128
 * @route '/opd/tugas/{assignment}/respon'
 */
export const respond = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: respond.url(args, options),
    method: 'post',
})

respond.definition = {
    methods: ["post"],
    url: '/opd/tugas/{assignment}/respon',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::respond
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:128
 * @route '/opd/tugas/{assignment}/respon'
 */
respond.url = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { assignment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    assignment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assignment: typeof args.assignment === 'object'
                ? args.assignment.id
                : args.assignment,
                }

    return respond.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::respond
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:128
 * @route '/opd/tugas/{assignment}/respon'
 */
respond.post = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: respond.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::respond
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:128
 * @route '/opd/tugas/{assignment}/respon'
 */
    const respondForm = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: respond.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::respond
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:128
 * @route '/opd/tugas/{assignment}/respon'
 */
        respondForm.post = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: respond.url(args, options),
            method: 'post',
        })
    
    respond.form = respondForm
/**
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::updateProgress
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:164
 * @route '/opd/tugas/{assignment}/progres'
 */
export const updateProgress = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateProgress.url(args, options),
    method: 'post',
})

updateProgress.definition = {
    methods: ["post"],
    url: '/opd/tugas/{assignment}/progres',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::updateProgress
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:164
 * @route '/opd/tugas/{assignment}/progres'
 */
updateProgress.url = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { assignment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    assignment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assignment: typeof args.assignment === 'object'
                ? args.assignment.id
                : args.assignment,
                }

    return updateProgress.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::updateProgress
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:164
 * @route '/opd/tugas/{assignment}/progres'
 */
updateProgress.post = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateProgress.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::updateProgress
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:164
 * @route '/opd/tugas/{assignment}/progres'
 */
    const updateProgressForm = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateProgress.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::updateProgress
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:164
 * @route '/opd/tugas/{assignment}/progres'
 */
        updateProgressForm.post = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateProgress.url(args, options),
            method: 'post',
        })
    
    updateProgress.form = updateProgressForm
/**
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::submitReview
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:202
 * @route '/opd/tugas/{assignment}/ajukan-review'
 */
export const submitReview = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitReview.url(args, options),
    method: 'post',
})

submitReview.definition = {
    methods: ["post"],
    url: '/opd/tugas/{assignment}/ajukan-review',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::submitReview
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:202
 * @route '/opd/tugas/{assignment}/ajukan-review'
 */
submitReview.url = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { assignment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    assignment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assignment: typeof args.assignment === 'object'
                ? args.assignment.id
                : args.assignment,
                }

    return submitReview.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::submitReview
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:202
 * @route '/opd/tugas/{assignment}/ajukan-review'
 */
submitReview.post = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitReview.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::submitReview
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:202
 * @route '/opd/tugas/{assignment}/ajukan-review'
 */
    const submitReviewForm = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submitReview.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Agency\AgencyAssignmentController::submitReview
 * @see app/Http/Controllers/Agency/AgencyAssignmentController.php:202
 * @route '/opd/tugas/{assignment}/ajukan-review'
 */
        submitReviewForm.post = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submitReview.url(args, options),
            method: 'post',
        })
    
    submitReview.form = submitReviewForm
const AgencyAssignmentController = { index, show, respond, updateProgress, submitReview }

export default AgencyAssignmentController