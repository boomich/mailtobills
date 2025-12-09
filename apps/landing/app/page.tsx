import { Button } from "@mailtobills/ui";

const HomePage = () => (
  <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-b from-white to-slate-50">
    <div className="max-w-2xl text-center space-y-6">
      <div className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
        Invoice inbox for busy people
      </div>
      <div className="space-y-3">
        <h1 className="text-4xl font-bold text-slate-900">MailToBills</h1>
        <p className="text-lg text-slate-700">
          Forward your invoices. We organize everything.
        </p>
      </div>
      <div className="flex items-center justify-center gap-3">
        <Button variant="primary">Start free</Button>
        <Button variant="secondary">Talk to us</Button>
      </div>
    </div>
  </main>
);

export default HomePage;
