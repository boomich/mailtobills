import { redirect } from "next/navigation";

import { getMonthInfo } from "@/lib/months";

export default function Page() {
  redirect(`/m/${getMonthInfo().value}`);
}
