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
            const response = await axios.get("/api/menu")

            if (!response) {
                throw new Error("error")
            }

            // const transformedData = data.data.data.map((menu: any) => ({
            //     id:menu.id,
            //     name: menu.name,
            //     price: menu.price,
            //     // createdAt: menu.createdAt,
            //     // updatedAt: menu.updatedAt,
            // }))
            console.log(response)
            return response.data
        },
    })

    return queryClient
}