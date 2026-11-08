import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:20
 * @route '/admin'
 */
const AdminDashboardController35f58437d9250c39f332f5e8e70440b7 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: AdminDashboardController35f58437d9250c39f332f5e8e70440b7.url(options),
    method: 'get',
})

AdminDashboardController35f58437d9250c39f332f5e8e70440b7.definition = {
    methods: ["get","head"],
    url: '/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:20
 * @route '/admin'
 */
AdminDashboardController35f58437d9250c39f332f5e8e70440b7.url = (options?: RouteQueryOptions) => {
    return AdminDashboardController35f58437d9250c39f332f5e8e70440b7.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:20
 * @route '/admin'
 */
AdminDashboardController35f58437d9250c39f332f5e8e70440b7.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: AdminDashboardController35f58437d9250c39f332f5e8e70440b7.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:20
 * @route '/admin'
 */
AdminDashboardController35f58437d9250c39f332f5e8e70440b7.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: AdminDashboardController35f58437d9250c39f332f5e8e70440b7.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:20
 * @route '/admin'
 */
    const AdminDashboardController35f58437d9250c39f332f5e8e70440b7Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: AdminDashboardController35f58437d9250c39f332f5e8e70440b7.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:20
 * @route '/admin'
 */
        AdminDashboardController35f58437d9250c39f332f5e8e70440b7Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: AdminDashboardController35f58437d9250c39f332f5e8e70440b7.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:20
 * @route '/admin'
 */
        AdminDashboardController35f58437d9250c39f332f5e8e70440b7Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: AdminDashboardController35f58437d9250c39f332f5e8e70440b7.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    AdminDashboardController35f58437d9250c39f332f5e8e70440b7.form = AdminDashboardController35f58437d9250c39f332f5e8e70440b7Form
    /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:20
 * @route '/admin/dashboard'
 */
const AdminDashboardController750aeb224105761400ee952169bd178c = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: AdminDashboardController750aeb224105761400ee952169bd178c.url(options),
    method: 'get',
})

AdminDashboardController750aeb224105761400ee952169bd178c.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:20
 * @route '/admin/dashboard'
 */
AdminDashboardController750aeb224105761400ee952169bd178c.url = (options?: RouteQueryOptions) => {
    return AdminDashboardController750aeb224105761400ee952169bd178c.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:20
 * @route '/admin/dashboard'
 */
AdminDashboardController750aeb224105761400ee952169bd178c.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: AdminDashboardController750aeb224105761400ee952169bd178c.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:20
 * @route '/admin/dashboard'
 */
AdminDashboardController750aeb224105761400ee952169bd178c.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: AdminDashboardController750aeb224105761400ee952169bd178c.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:20
 * @route '/admin/dashboard'
 */
    const AdminDashboardController750aeb224105761400ee952169bd178cForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: AdminDashboardController750aeb224105761400ee952169bd178c.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:20
 * @route '/admin/dashboard'
 */
        AdminDashboardController750aeb224105761400ee952169bd178cForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: AdminDashboardController750aeb224105761400ee952169bd178c.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:20
 * @route '/admin/dashboard'
 */
        AdminDashboardController750aeb224105761400ee952169bd178cForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: AdminDashboardController750aeb224105761400ee952169bd178c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    AdminDashboardController750aeb224105761400ee952169bd178c.form = AdminDashboardController750aeb224105761400ee952169bd178cForm

/**
* Multiple routes resolve to \App\Http\Controllers\Admin\AdminDashboardController::AdminDashboardController, so this export is a
* dictionary keyed by URI rather than a callable, with the verbs prefixed where two routes share a URI.
* Call a specific route with `AdminDashboardController['<key>'](...)`, or import the route by name from your
* generated `routes/` directory.
*/
const AdminDashboardController = {
    '/admin': AdminDashboardController35f58437d9250c39f332f5e8e70440b7,
    '/admin/dashboard': AdminDashboardController750aeb224105761400ee952169bd178c,
}

export default AdminDashboardController