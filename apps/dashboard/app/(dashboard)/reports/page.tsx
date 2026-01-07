import { redirect } from "next/navigation";

import { getMonthInfo } from "@/lib/months";

export default function ReportsRedirectPage() {
  redirect(`/m/${getMonthInfo().value}/reports`);
}
