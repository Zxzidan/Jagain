import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::storeGeneral
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/agencies/users'
 */
export const storeGeneral = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeGeneral.url(options),
    method: 'post',
})

storeGeneral.definition = {
    methods: ["post"],
    url: '/admin/agencies/users',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::storeGeneral
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/agencies/users'
 */
storeGeneral.url = (options?: RouteQueryOptions) => {
    return storeGeneral.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::storeGeneral
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/agencies/users'
 */
storeGeneral.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeGeneral.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::storeGeneral
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/agencies/users'
 */
    const storeGeneralForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeGeneral.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::storeGeneral
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/agencies/users'
 */
        storeGeneralForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeGeneral.url(options),
            method: 'post',
        })
    
    storeGeneral.form = storeGeneralForm
/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::store
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/agencies/{agency}/users'
 */
export const store = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/agencies/{agency}/users',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::store
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/agencies/{agency}/users'
 */
store.url = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{agency}', parsedArgs.agency.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::store
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/agencies/{agency}/users'
 */
store.post = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::store
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/agencies/{agency}/users'
 */
    const storeForm = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::store
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/agencies/{agency}/users'
 */
        storeForm.post = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const users = {
    storeGeneral: Object.assign(storeGeneral, storeGeneral),
store: Object.assign(store, store),
}

export default users