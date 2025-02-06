import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CategoryType } from "../_types/CategoryType";
import {
  addCategoryAPI,
  fetchCategoriesAPI,
} from "../_queries/useCategoriesQuery";

export const useFetchCategories = () => {
  return useQuery<CategoryType[]>({
    queryKey: ["categories"],
    queryFn: fetchCategoriesAPI,
    staleTime: 60 * 1000, // cache for 1 min
  });
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (category: Omit<CategoryType, "id">) =>
      addCategoryAPI(category),
    onSuccess: (newCategory) => {
      queryClient.setQueryData(
        ["categories"],
        (oldCategories: CategoryType[]) => [
          ...(oldCategories || []),
          newCategory,
        ],
      ); // refresh category list
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
