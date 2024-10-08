import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useGetMenus = () => {
    const queryClient = useQuery({
        queryKey: ["menus"],
        queryFn: async () => {
            const response = axios.get("/api/menu")

            if (!response) {
                throw new Error("error")
            }

            console.log(response)
            return response
        },
    })

    return queryClient
}