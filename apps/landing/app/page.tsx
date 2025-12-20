import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@mailtobills/ui";

const HomePage = () => (
  <main className="min-h-screen flex items-center justify-center px-6 py-16 bg-gradient-to-b from-white to-slate-50">
    <Card className="w-full max-w-2xl text-center">
      <CardHeader className="items-center space-y-4">
        <div className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
          Invoice inbox for busy people
        </div>
        <CardTitle className="text-4xl">MailToBills</CardTitle>
        <CardDescription className="text-lg text-slate-700">
          Forward your invoices. We organize everything.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center gap-3">
          <Button variant="primary">Start free</Button>
          <Button variant="secondary">Talk to us</Button>
        </div>
      </CardContent>
    </Card>
  </main>
);

export default HomePage;
