import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = () => {
    return {
        title: "Houston Linux Users Group | Meetups",
        description: "A quick view on potential spots for HLUG's next meetup"
    }
}