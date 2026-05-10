import type { App } from "vue";

import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,   // data stays fresh 5 mins globally
            gcTime: 10 * 60 * 1000,     // cache kept 10 mins after last use
            retry: 2,                    // retry failed requests twice
            refetchOnWindowFocus: true   // refetch when user tabs back in
        }
    }
})

export function useTanstackQuery(app: App) {
    app.use(VueQueryPlugin, { queryClient })
}