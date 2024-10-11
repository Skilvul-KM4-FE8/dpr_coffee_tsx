import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

type CreateTransactionInput = {
    receptionist: string,
    customer: string,
    items: {
        id: string
        name: string
        price: number
        quantity: number
        // createdAt: Date
        // updatedAt: Date
    }[],
    totalPrice: number
}

export const useCreateTransaction = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (json: CreateTransactionInput) => {
            try {
                const response = await axios.post("/api/transaction", json)
                return await response.data            
            } catch (error) {
                console.log(error)
                throw new Error("Error")
            }
        },
        onSuccess: () => {
            toast.success("Transaction successfully added!")
            queryClient.invalidateQueries({queryKey: ["transactions"]})
        },
        onError: (error: any) => {
            console.error("error")
            toast.error("Failed Added transaction")
        }
    })
    return mutation
}