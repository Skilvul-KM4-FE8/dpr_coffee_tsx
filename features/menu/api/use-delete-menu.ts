import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

// type ResponsePrism = Prisma.MenuGetPayload<{}>

export const useDeleteMenu = (id?: string) => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async () => {
            try {
                const response = await axios.delete(`/api/menu/${id}`)
                console.log(response)
                return await response.data
            } catch (error) {
                console.error(error)
                throw new Error("Failed to delete menu")
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["menus"]})
            toast.success("The menu deleted successfully")
        },
        onError: () => {
            toast.error("Unable to delete this menu")
        }
    })

    return mutation
}