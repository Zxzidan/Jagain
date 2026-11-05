import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::index
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:23
 * @route '/admin/agencies'
 */
const indexd447157df6851ab73545694818154b75 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexd447157df6851ab73545694818154b75.url(options),
    method: 'get',
})

indexd447157df6851ab73545694818154b75.definition = {
    methods: ["get","head"],
    url: '/admin/agencies',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::index
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:23
 * @route '/admin/agencies'
 */
indexd447157df6851ab73545694818154b75.url = (options?: RouteQueryOptions) => {
    return indexd447157df6851ab73545694818154b75.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::index
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:23
 * @route '/admin/agencies'
 */
indexd447157df6851ab73545694818154b75.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexd447157df6851ab73545694818154b75.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::index
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:23
 * @route '/admin/agencies'
 */
indexd447157df6851ab73545694818154b75.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexd447157df6851ab73545694818154b75.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::index
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:23
 * @route '/admin/agencies'
 */
    const indexd447157df6851ab73545694818154b75Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexd447157df6851ab73545694818154b75.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::index
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:23
 * @route '/admin/agencies'
 */
        indexd447157df6851ab73545694818154b75Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexd447157df6851ab73545694818154b75.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::index
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:23
 * @route '/admin/agencies'
 */
        indexd447157df6851ab73545694818154b75Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexd447157df6851ab73545694818154b75.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexd447157df6851ab73545694818154b75.form = indexd447157df6851ab73545694818154b75Form
    /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::index
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:23
 * @route '/admin/instansi'
 */
const index4e1fa1014130ace8a82e7b73fb0fe04a = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index4e1fa1014130ace8a82e7b73fb0fe04a.url(options),
    method: 'get',
})

index4e1fa1014130ace8a82e7b73fb0fe04a.definition = {
    methods: ["get","head"],
    url: '/admin/instansi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::index
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:23
 * @route '/admin/instansi'
 */
index4e1fa1014130ace8a82e7b73fb0fe04a.url = (options?: RouteQueryOptions) => {
    return index4e1fa1014130ace8a82e7b73fb0fe04a.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::index
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:23
 * @route '/admin/instansi'
 */
index4e1fa1014130ace8a82e7b73fb0fe04a.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index4e1fa1014130ace8a82e7b73fb0fe04a.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::index
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:23
 * @route '/admin/instansi'
 */
index4e1fa1014130ace8a82e7b73fb0fe04a.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index4e1fa1014130ace8a82e7b73fb0fe04a.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::index
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:23
 * @route '/admin/instansi'
 */
    const index4e1fa1014130ace8a82e7b73fb0fe04aForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index4e1fa1014130ace8a82e7b73fb0fe04a.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::index
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:23
 * @route '/admin/instansi'
 */
        index4e1fa1014130ace8a82e7b73fb0fe04aForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index4e1fa1014130ace8a82e7b73fb0fe04a.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::index
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:23
 * @route '/admin/instansi'
 */
        index4e1fa1014130ace8a82e7b73fb0fe04aForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index4e1fa1014130ace8a82e7b73fb0fe04a.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index4e1fa1014130ace8a82e7b73fb0fe04a.form = index4e1fa1014130ace8a82e7b73fb0fe04aForm

/**
* Multiple routes resolve to \App\Http\Controllers\Admin\AdminAgencyController::index, so this export is a
* dictionary keyed by URI rather than a callable, with the verbs prefixed where two routes share a URI.
* Call a specific route with `index['<key>'](...)`, or import the route by name from your
* generated `routes/` directory.
*/
export const index = {
    '/admin/agencies': indexd447157df6851ab73545694818154b75,
    '/admin/instansi': index4e1fa1014130ace8a82e7b73fb0fe04a,
}

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::store
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:75
 * @route '/admin/agencies'
 */
const stored447157df6851ab73545694818154b75 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stored447157df6851ab73545694818154b75.url(options),
    method: 'post',
})

stored447157df6851ab73545694818154b75.definition = {
    methods: ["post"],
    url: '/admin/agencies',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::store
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:75
 * @route '/admin/agencies'
 */
stored447157df6851ab73545694818154b75.url = (options?: RouteQueryOptions) => {
    return stored447157df6851ab73545694818154b75.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::store
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:75
 * @route '/admin/agencies'
 */
stored447157df6851ab73545694818154b75.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stored447157df6851ab73545694818154b75.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::store
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:75
 * @route '/admin/agencies'
 */
    const stored447157df6851ab73545694818154b75Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: stored447157df6851ab73545694818154b75.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::store
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:75
 * @route '/admin/agencies'
 */
        stored447157df6851ab73545694818154b75Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: stored447157df6851ab73545694818154b75.url(options),
            method: 'post',
        })
    
    stored447157df6851ab73545694818154b75.form = stored447157df6851ab73545694818154b75Form
    /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::store
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:75
 * @route '/admin/instansi'
 */
const store4e1fa1014130ace8a82e7b73fb0fe04a = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store4e1fa1014130ace8a82e7b73fb0fe04a.url(options),
    method: 'post',
})

store4e1fa1014130ace8a82e7b73fb0fe04a.definition = {
    methods: ["post"],
    url: '/admin/instansi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::store
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:75
 * @route '/admin/instansi'
 */
store4e1fa1014130ace8a82e7b73fb0fe04a.url = (options?: RouteQueryOptions) => {
    return store4e1fa1014130ace8a82e7b73fb0fe04a.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::store
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:75
 * @route '/admin/instansi'
 */
store4e1fa1014130ace8a82e7b73fb0fe04a.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store4e1fa1014130ace8a82e7b73fb0fe04a.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::store
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:75
 * @route '/admin/instansi'
 */
    const store4e1fa1014130ace8a82e7b73fb0fe04aForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store4e1fa1014130ace8a82e7b73fb0fe04a.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::store
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:75
 * @route '/admin/instansi'
 */
        store4e1fa1014130ace8a82e7b73fb0fe04aForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store4e1fa1014130ace8a82e7b73fb0fe04a.url(options),
            method: 'post',
        })
    
    store4e1fa1014130ace8a82e7b73fb0fe04a.form = store4e1fa1014130ace8a82e7b73fb0fe04aForm

/**
* Multiple routes resolve to \App\Http\Controllers\Admin\AdminAgencyController::store, so this export is a
* dictionary keyed by URI rather than a callable, with the verbs prefixed where two routes share a URI.
* Call a specific route with `store['<key>'](...)`, or import the route by name from your
* generated `routes/` directory.
*/
export const store = {
    '/admin/agencies': stored447157df6851ab73545694818154b75,
    '/admin/instansi': store4e1fa1014130ace8a82e7b73fb0fe04a,
}

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::storeUser
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/agencies/users'
 */
const storeUser085702e98b52f80ee132108b73a57314 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeUser085702e98b52f80ee132108b73a57314.url(options),
    method: 'post',
})

storeUser085702e98b52f80ee132108b73a57314.definition = {
    methods: ["post"],
    url: '/admin/agencies/users',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::storeUser
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/agencies/users'
 */
storeUser085702e98b52f80ee132108b73a57314.url = (options?: RouteQueryOptions) => {
    return storeUser085702e98b52f80ee132108b73a57314.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::storeUser
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/agencies/users'
 */
storeUser085702e98b52f80ee132108b73a57314.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeUser085702e98b52f80ee132108b73a57314.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::storeUser
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/agencies/users'
 */
    const storeUser085702e98b52f80ee132108b73a57314Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeUser085702e98b52f80ee132108b73a57314.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::storeUser
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/agencies/users'
 */
        storeUser085702e98b52f80ee132108b73a57314Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeUser085702e98b52f80ee132108b73a57314.url(options),
            method: 'post',
        })
    
    storeUser085702e98b52f80ee132108b73a57314.form = storeUser085702e98b52f80ee132108b73a57314Form
    /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::storeUser
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/agencies/{agency}/users'
 */
const storeUser25b0901cd9366633f205af51d6895115 = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeUser25b0901cd9366633f205af51d6895115.url(args, options),
    method: 'post',
})

storeUser25b0901cd9366633f205af51d6895115.definition = {
    methods: ["post"],
    url: '/admin/agencies/{agency}/users',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::storeUser
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/agencies/{agency}/users'
 */
storeUser25b0901cd9366633f205af51d6895115.url = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return storeUser25b0901cd9366633f205af51d6895115.definition.url
            .replace('{agency}', parsedArgs.agency.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::storeUser
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/agencies/{agency}/users'
 */
storeUser25b0901cd9366633f205af51d6895115.post = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeUser25b0901cd9366633f205af51d6895115.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::storeUser
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/agencies/{agency}/users'
 */
    const storeUser25b0901cd9366633f205af51d6895115Form = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeUser25b0901cd9366633f205af51d6895115.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::storeUser
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/agencies/{agency}/users'
 */
        storeUser25b0901cd9366633f205af51d6895115Form.post = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeUser25b0901cd9366633f205af51d6895115.url(args, options),
            method: 'post',
        })
    
    storeUser25b0901cd9366633f205af51d6895115.form = storeUser25b0901cd9366633f205af51d6895115Form
    /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::storeUser
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/instansi/users'
 */
const storeUser736a6496dd44563253dc1418efeb4c91 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeUser736a6496dd44563253dc1418efeb4c91.url(options),
    method: 'post',
})

storeUser736a6496dd44563253dc1418efeb4c91.definition = {
    methods: ["post"],
    url: '/admin/instansi/users',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::storeUser
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/instansi/users'
 */
storeUser736a6496dd44563253dc1418efeb4c91.url = (options?: RouteQueryOptions) => {
    return storeUser736a6496dd44563253dc1418efeb4c91.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::storeUser
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/instansi/users'
 */
storeUser736a6496dd44563253dc1418efeb4c91.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeUser736a6496dd44563253dc1418efeb4c91.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::storeUser
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/instansi/users'
 */
    const storeUser736a6496dd44563253dc1418efeb4c91Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeUser736a6496dd44563253dc1418efeb4c91.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::storeUser
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/instansi/users'
 */
        storeUser736a6496dd44563253dc1418efeb4c91Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeUser736a6496dd44563253dc1418efeb4c91.url(options),
            method: 'post',
        })
    
    storeUser736a6496dd44563253dc1418efeb4c91.form = storeUser736a6496dd44563253dc1418efeb4c91Form
    /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::storeUser
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/instansi/{agency}/users'
 */
const storeUser9ae9615fbd21807254b5a9620a117133 = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeUser9ae9615fbd21807254b5a9620a117133.url(args, options),
    method: 'post',
})

storeUser9ae9615fbd21807254b5a9620a117133.definition = {
    methods: ["post"],
    url: '/admin/instansi/{agency}/users',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::storeUser
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/instansi/{agency}/users'
 */
storeUser9ae9615fbd21807254b5a9620a117133.url = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return storeUser9ae9615fbd21807254b5a9620a117133.definition.url
            .replace('{agency}', parsedArgs.agency.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::storeUser
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/instansi/{agency}/users'
 */
storeUser9ae9615fbd21807254b5a9620a117133.post = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeUser9ae9615fbd21807254b5a9620a117133.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::storeUser
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/instansi/{agency}/users'
 */
    const storeUser9ae9615fbd21807254b5a9620a117133Form = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeUser9ae9615fbd21807254b5a9620a117133.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::storeUser
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:163
 * @route '/admin/instansi/{agency}/users'
 */
        storeUser9ae9615fbd21807254b5a9620a117133Form.post = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeUser9ae9615fbd21807254b5a9620a117133.url(args, options),
            method: 'post',
        })
    
    storeUser9ae9615fbd21807254b5a9620a117133.form = storeUser9ae9615fbd21807254b5a9620a117133Form

/**
* Multiple routes resolve to \App\Http\Controllers\Admin\AdminAgencyController::storeUser, so this export is a
* dictionary keyed by URI rather than a callable, with the verbs prefixed where two routes share a URI.
* Call a specific route with `storeUser['<key>'](...)`, or import the route by name from your
* generated `routes/` directory.
*/
export const storeUser = {
    '/admin/agencies/users': storeUser085702e98b52f80ee132108b73a57314,
    '/admin/agencies/{agency}/users': storeUser25b0901cd9366633f205af51d6895115,
    '/admin/instansi/users': storeUser736a6496dd44563253dc1418efeb4c91,
    '/admin/instansi/{agency}/users': storeUser9ae9615fbd21807254b5a9620a117133,
}

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
/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::toggleActive
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:155
 * @route '/admin/instansi/{agency}/toggle'
 */
export const toggleActive = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

toggleActive.definition = {
    methods: ["post"],
    url: '/admin/instansi/{agency}/toggle',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::toggleActive
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:155
 * @route '/admin/instansi/{agency}/toggle'
 */
toggleActive.url = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return toggleActive.definition.url
            .replace('{agency}', parsedArgs.agency.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminAgencyController::toggleActive
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:155
 * @route '/admin/instansi/{agency}/toggle'
 */
toggleActive.post = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::toggleActive
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:155
 * @route '/admin/instansi/{agency}/toggle'
 */
    const toggleActiveForm = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleActive.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminAgencyController::toggleActive
 * @see app/Http/Controllers/Admin/AdminAgencyController.php:155
 * @route '/admin/instansi/{agency}/toggle'
 */
        toggleActiveForm.post = (args: { agency: number | { id: number } } | [agency: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleActive.url(args, options),
            method: 'post',
        })
    
    toggleActive.form = toggleActiveForm
const AdminAgencyController = { index, store, storeUser, update, toggleStatus, toggleActive }

export default AdminAgencyController