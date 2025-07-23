import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = () => {
    return {
        title: "HLUG",
        description: "Houston Linux User Groups' Activity Home Page"
    }
}