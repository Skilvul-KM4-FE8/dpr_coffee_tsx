import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

type MenuEditInput = {
    name: string
    price: number
}

type ResType = {
    id: string
    name: string
    price: number
    createdAt: Date
    updatedAt: Date
}

export const useEditMenu = (id: string) => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (json: MenuEditInput): Promise<ResType> => {
            try {
                const response = await axios.patch(`api/menu/${id}`, json)
                console.log(response)
                return response.data
            } catch (error) {
                console.error(error)
                throw new Error("error")
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["menus"]})
            queryClient.invalidateQueries({queryKey: ["menu"]})
            toast.success("Menu edited successfully!")
        },
        onError: (error: any) => {
            console.error("Error :", error)
            toast.error("Failed to edit menu")
        }
    })

    return mutation
}