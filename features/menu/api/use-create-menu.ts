import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";

type MenuCreateInput = {
  name: string;
  price: number;
  category: string;
};

type ResponseType = {
  id: string;
  name: string;
  price: number;
  categoty: string;
};

export const useCreateMenu = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    // mutationKey: ["menu"],
    mutationFn: async (json: MenuCreateInput): Promise<ResponseType> => {
      const response = await axios.post("/api/menu", json);
      return await response.data;
    },
    onSuccess: () => {
      console.log("success");
      toast.success("Menu created successfully");
      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
    onError: (error: any) => {
      console.error("Error: ", error);
      toast.error("Failed to add new menu");
    },
  });

  return mutation;
};
