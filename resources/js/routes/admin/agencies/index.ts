import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import users from './users'
/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::index
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:23
 * @route '/admin/agencies'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/agencies',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::index
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:23
 * @route '/admin/agencies'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::index
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:23
 * @route '/admin/agencies'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::index
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:23
 * @route '/admin/agencies'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::index
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:23
 * @route '/admin/agencies'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::index
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:23
 * @route '/admin/agencies'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::index
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:23
 * @route '/admin/agencies'
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
* @see \App\Http\Controllers\Admin\AdminAgencyController::store
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:75
 * @route '/admin/agencies'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/agencies',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::store
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:75
 * @route '/admin/agencies'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::store
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:75
 * @route '/admin/agencies'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::store
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:75
 * @route '/admin/agencies'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::store
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:75
 * @route '/admin/agencies'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::update
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:108
 * @route '/admin/agencies/{agency}'
 */
export const update = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/agencies/{agency}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::update
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:108
 * @route '/admin/agencies/{agency}'
 */
update.url = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { agency: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { agency: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    agency: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        agency: typeof args.agency === 'object'
                ? args.agency.id
                : args.agency,
                }

    return update.definition.url
            .replace('{agency}', parsedArgs.agency.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::update
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:108
 * @route '/admin/agencies/{agency}'
 */
update.put = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::update
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:108
 * @route '/admin/agencies/{agency}'
 */
    const updateForm = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::update
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:108
 * @route '/admin/agencies/{agency}'
 */
        updateForm.put = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::toggleStatus
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:135
 * @route '/admin/agencies/{agency}/toggle-status'
 */
export const toggleStatus = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleStatus.url(args, options),
    method: 'patch',
})

toggleStatus.definition = {
    methods: ["patch"],
    url: '/admin/agencies/{agency}/toggle-status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::toggleStatus
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:135
 * @route '/admin/agencies/{agency}/toggle-status'
 */
toggleStatus.url = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { agency: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { agency: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    agency: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        agency: typeof args.agency === 'object'
                ? args.agency.id
                : args.agency,
                }

    return toggleStatus.definition.url
            .replace('{agency}', parsedArgs.agency.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::toggleStatus
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:135
 * @route '/admin/agencies/{agency}/toggle-status'
 */
toggleStatus.patch = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleStatus.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::toggleStatus
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:135
 * @route '/admin/agencies/{agency}/toggle-status'
 */
    const toggleStatusForm = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::toggleStatus
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:135
 * @route '/admin/agencies/{agency}/toggle-status'
 */
        toggleStatusForm.patch = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggleStatus.form = toggleStatusForm
const agencies = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
users: Object.assign(users, users),
update: Object.assign(update, update),
toggleStatus: Object.assign(toggleStatus, toggleStatus),
}

export default agencies