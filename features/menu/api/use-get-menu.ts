import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useGetMenu = (id: string) => {
    const queryClient = useQuery({
        queryKey: ["menu"],
        queryFn: async () =>{
            const response = await axios.get(`/api/menu/${id}`)

            if (!response.data) {
                throw new Error("NOT FOUND")
            }

            return response.data
        }
    })
}