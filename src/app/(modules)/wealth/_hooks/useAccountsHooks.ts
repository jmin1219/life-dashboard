import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AccountType } from "../_types/AccountType";
import { addAccountAPI, fetchAccountsApi } from "../_queries/useAccountsQuery";

export const useFetchAccounts = () => {
  return useQuery<AccountType[]>({
    queryKey: ["accounts"],
    queryFn: fetchAccountsApi,
    staleTime: 60 * 1000, // cache for 1 min
  });
};

export const useAddAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (account: Omit<AccountType, "id">) => addAccountAPI(account),
    onSuccess: (newAccount) => {
      queryClient.setQueryData(["accounts"], (oldAccounts: AccountType[]) => [
        ...(oldAccounts || []),
        newAccount,
      ]); // refresh account list
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};
