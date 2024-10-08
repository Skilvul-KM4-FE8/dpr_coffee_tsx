import { useQuery } from "@tanstack/react-query"
import axios from "axios"

type ResponseType = {
    id: string
    name: string
    price: number
}

export const useGetMenus = () => {
    const queryClient = useQuery<ResponseType[]>({
        queryKey: ["menus"],
        queryFn: async () => {
            const data = await axios.get("/api/menu")

            if (!data) {
                throw new Error("error")
            }

            // const transformedData = data.data.data.map((menu: any) => ({
            //     id:menu.id,
            //     name: menu.name,
            //     price: menu.price,
            //     // createdAt: menu.createdAt,
            //     // updatedAt: menu.updatedAt,
            // }))
            console.log({data})
            return data.data.data
        },
    })

    return queryClient
}