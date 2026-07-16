import "server-only";

import { fetchQuery } from "convex/nextjs";

import { api } from "@mailtobills/convex/_generated/api";

import { getCustomerAuthToken } from "@/features/customer/read-model/getCurrentCustomer";

export type CollectionYearRegister = {
  counts: number[];
  earliestYear: number;
};

export async function getCollectionYearRegister(
  year: number,
): Promise<CollectionYearRegister> {
  const token = await getCustomerAuthToken();

  return await fetchQuery(
    api.expenseDocuments.getCollectionYearRegister,
    { year },
    { token: token ?? undefined },
  );
}
