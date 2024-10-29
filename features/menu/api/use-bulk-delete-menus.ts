import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useBulkDeleteMenus = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (json: string[]) => {
      console.log(json);
      try {
        const response = await axios.post("/api/menu/bulk-delete", json);
        console.log(response.data);
        return await response.data;
      } catch (error) {
        console.error(error);
        throw new Error("Error");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      toast.success("Delete many success");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error("Delete many failed");
    },
  });
  return mutation;
};
