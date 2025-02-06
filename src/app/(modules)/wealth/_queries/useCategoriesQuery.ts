import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CategoryType } from "../_types/CategoryType";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/wealth/categories`;

// Fetch all categories
export const useFetchCategories = () => {
  return useQuery<CategoryType[]>({
    queryKey: ["categories"],
    queryFn: async (): Promise<CategoryType[]> => {
      const res = await fetch(API_URL);
      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(`Failed to fetch transactions: ${errorMessage}`);
      }
      return res.json();
    },
  });
};

// Add a transaction
export const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (category: Omit<CategoryType, "id">) => {
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(category),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(`Failed to add category: ${errorMessage}`);
      }
      return res.json();
    },
    onSuccess: (newCategory) => {
      queryClient.setQueryData(
        ["categories"],
        (oldCategories: CategoryType[] = []) => [newCategory, ...oldCategories],
      );
    },
    onError: (error) => {
      console.error("Error adding transaction:", error);
    },
  });
};
