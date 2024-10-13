import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useGetTransactions = () => {
    const queryClient = useQuery({
        queryKey: ["transactions"],
        queryFn: async () => {
            const response = await axios.get("/api/transaction")
            return await response.data
        }
    })

    return queryClient
}