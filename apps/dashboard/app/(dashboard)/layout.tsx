import { CounterBar } from "@/components/counter-bar";
import { requireCurrentCustomer } from "@/features/customer/read-model/getCurrentCustomer";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { customer } = await requireCurrentCustomer();

  return (
    <div className="min-h-svh bg-secondary text-foreground">
      <CounterBar
        customer={{ name: customer.name, email: customer.email }}
        collectionAddress="inbox@mailtobills.com"
      />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto min-w-0 max-w-[1160px] overflow-x-hidden px-2.5 pt-8 pb-14 outline-none sm:px-6"
      >
        {children}
      </main>
    </div>
  );
}
