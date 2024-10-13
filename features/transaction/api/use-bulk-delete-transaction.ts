import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useBulkDeleteTransaction = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (json: string[]) => {
      console.log(json);
      try {
        const response = await axios.post("/api/transaction/bulk-delete", json);
        console.log(response.data);
        return await response.data;
      } catch (error) {
        console.error(error);
        throw new Error("Error");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Delete transactions success");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error("Delete transactions failed");
    },
  });
  return mutation;
};
