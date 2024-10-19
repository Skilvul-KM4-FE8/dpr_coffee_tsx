import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type ResponseType = {
  id: string;
  name: string;
  price: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
};

export const useGetMenu = (id?: string) => {
  const queryClient = useQuery<ResponseType>({
    enabled: !!id,
    queryKey: ["menu", id],
    queryFn: async () => {
      const response = await axios.get(`/api/menu/${id}`);

      if (!response.data) {
        throw new Error("NOT FOUND");
      }

      return response.data;
    },
  });

  return queryClient;
};
