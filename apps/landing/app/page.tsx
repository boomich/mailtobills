import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@mailtobills/ui";

const HomePage = () => (
  <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-b from-white to-slate-50">
    <Card className="max-w-2xl w-full bg-white/80 backdrop-blur">
      <CardHeader className="text-center">
        <div className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
          Invoice inbox for busy people
        </div>
        <CardTitle className="text-4xl font-bold text-slate-900">MailToBills</CardTitle>
        <CardDescription className="text-lg text-slate-700">
          Forward your invoices. We organize everything.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pb-6">
        <div className="grid gap-3 text-sm text-slate-700 md:grid-cols-2">
          <div className="rounded-md bg-slate-50 p-3">
            <p className="font-semibold text-slate-900">Centralize invoices</p>
            <p className="text-slate-600">Send PDFs to one inbox and keep them ready for export.</p>
          </div>
          <div className="rounded-md bg-slate-50 p-3">
            <p className="font-semibold text-slate-900">Share with your accountant</p>
            <p className="text-slate-600">Export files and metadata without manual sorting.</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:justify-center">
          <Button variant="primary">Start free</Button>
          <Button variant="secondary">Talk to us</Button>
        </div>
      </CardContent>
    </Card>
  </main>
);

export default HomePage;
