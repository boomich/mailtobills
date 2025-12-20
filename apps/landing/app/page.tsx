import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@mailtobills/ui";

const HomePage = () => (
  <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-b from-white to-slate-50">
    <Card className="max-w-2xl text-center">
      <CardHeader className="space-y-6">
        <div className="inline-flex items-center justify-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
          Invoice inbox for busy people
        </div>
        <div className="space-y-3">
          <CardTitle className="text-4xl font-bold text-slate-900">MailToBills</CardTitle>
          <CardDescription className="text-lg text-slate-700">
            Forward your invoices. We organize everything.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-center gap-3 pb-8">
        <Button variant="primary">Start free</Button>
        <Button variant="secondary">Talk to us</Button>
      </CardContent>
    </Card>
  </main>
);

export default HomePage;
