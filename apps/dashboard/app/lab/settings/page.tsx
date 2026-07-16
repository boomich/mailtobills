import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@mailtobills/ui/components/button";
import { CarimboDefs } from "@mailtobills/ui/components/carimbo";
import { Input } from "@mailtobills/ui/components/input";
import { PostmarkMini } from "@mailtobills/ui/components/postmark";

import { CopyChip } from "../copy-chip";
import { SaveDemo } from "./save-demo";

/*
 * DASHBOARD LAB — settings as one printed form (MOD. C-02), mock data,
 * dev only. Every setting on a single legible sheet: numbered sections,
 * ruled fields, PRO gates anchoring to the plan section (§6), save
 * feedback printed in postal blue.
 */

export const metadata: Metadata = {
  title: "LAB — settings form",
  robots: { index: false },
};

function FormHead({ n, title, note }: { n: string; title: string; note?: string }) {
  return (
    <header className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
      <span className="grid size-7 shrink-0 place-items-center border-[1.5px] border-foreground pt-px font-mono text-[13px] leading-none font-bold">
        {n}
      </span>
      <h2 className="font-display text-lg font-bold tracking-[0.11em] uppercase [font-stretch:86%]">
        {title}
      </h2>
      {note && (
        <span className="ml-auto font-mono text-[10px] tracking-[0.08em] text-muted-foreground uppercase">
          {note}
        </span>
      )}
    </header>
  );
}

function ProTag() {
  return (
    <a
      href="#plano"
      className="inline-flex items-center border-[1.5px] border-primary px-1.5 py-0.5 font-display text-[9.5px] font-bold tracking-[0.14em] text-primary uppercase [font-stretch:88%] transition-colors hover:bg-primary hover:text-primary-foreground"
    >
      Pro
    </a>
  );
}

function FieldLabelCaps({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-display text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase [font-stretch:80%]">
      {children}
    </span>
  );
}

export default function SettingsLabPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <div className="min-h-svh bg-secondary text-foreground">
      <CarimboDefs />

      <header className="border-b border-foreground bg-background">
        <div className="mx-auto flex h-14 max-w-[1160px] items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <PostmarkMini className="size-6 text-foreground" />
            <span className="font-display text-[15px] font-bold [font-stretch:105%] max-sm:hidden">
              MailToBills
            </span>
          </div>
          <Link
            href="/lab"
            className="font-display text-[11px] font-semibold tracking-[0.12em] text-muted-foreground uppercase [font-stretch:88%] hover:text-foreground"
          >
            ← Julho 2026
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[860px] px-2.5 py-10 sm:px-6">
        <article className="border border-foreground bg-background shadow-[8px_8px_0_0_oklch(0.27_0.025_268/0.12)]">
          <header className="border-b-2 border-foreground px-5 pt-7 pb-5 sm:px-9">
            <div
              className="mb-1.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase"
              aria-hidden
            >
              MOD. C-02 · FICHA DO CLIENTE
            </div>
            <h1 className="font-display text-3xl font-extrabold tracking-[-0.01em] [font-stretch:112%] sm:text-4xl">
              Definições
            </h1>
          </header>

          {/* 1 · collection address */}
          <section className="border-b border-border px-5 py-8 sm:px-9">
            <FormHead n="1" title="Endereço de recolha" />
            <div className="max-w-[520px]">
              <CopyChip value="vitor.4f2a@in.mailtobills.com" />
              <p className="mt-2.5 text-[13px] text-muted-foreground">
                Encaminhe faturas, recibos e contas para este endereço. É
                privado e não pode ser alterado.
              </p>
            </div>
          </section>

          {/* 2 · trusted senders */}
          <section className="border-b border-border px-5 py-8 sm:px-9">
            <FormHead n="2" title="Remetentes de confiança" />
            <p className="mb-5 max-w-[54ch] text-[13.5px] text-muted-foreground">
              Só emails encaminhados destes endereços são aceites na sua
              recolha.
            </p>
            <ul className="max-w-[560px] border-t-2 border-foreground">
              <li className="flex items-baseline justify-between gap-4 border-b border-border py-3">
                <span className="font-mono text-[13px] font-bold">
                  contato@vitorsouza.com
                </span>
                <span className="font-mono text-[9.5px] tracking-[0.12em] text-muted-foreground uppercase">
                  Principal
                </span>
              </li>
              <li className="flex flex-wrap items-center justify-between gap-3 border-b border-border py-3">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <Input
                    placeholder="outro@endereco.pt"
                    className="h-9 max-w-[280px] font-mono text-[13px]"
                    disabled
                  />
                  <Button variant="outline" size="sm" disabled>
                    Adicionar
                  </Button>
                </div>
                <span className="flex items-center gap-2 text-[12.5px] text-muted-foreground">
                  Endereços adicionais verificados <ProTag />
                </span>
              </li>
            </ul>
          </section>

          {/* 3 · accountant */}
          <section className="border-b border-border px-5 py-8 sm:px-9">
            <FormHead n="3" title="Contabilista" />
            <div className="grid max-w-[560px] gap-5">
              <label className="grid gap-1.5">
                <FieldLabelCaps>Nome (opcional)</FieldLabelCaps>
                <Input defaultValue="Maria Contas" className="max-w-[320px]" />
              </label>
              <label className="grid gap-1.5">
                <FieldLabelCaps>Email do contabilista</FieldLabelCaps>
                <Input
                  defaultValue="maria@contascertas.pt"
                  type="email"
                  className="max-w-[320px] font-mono text-[13px]"
                />
              </label>
              <p className="text-[12.5px] text-muted-foreground">
                As exportações enviadas diretamente vão para este endereço,
                com cópia para si.
              </p>
              <SaveDemo />
            </div>
          </section>

          {/* 4 · export schedule (Free state: locked, honest, one-click path) */}
          <section className="border-b border-border px-5 py-8 sm:px-9">
            <FormHead n="4" title="Exportação agendada" note="PRO" />
            <div className="flex max-w-[560px] flex-wrap items-center justify-between gap-4 border border-dashed border-foreground/40 px-5 py-4">
              <p className="max-w-[36ch] text-[13.5px] text-muted-foreground">
                Todos os meses, no dia que escolher, o mês anterior segue
                sozinho para o contabilista — com cópia para si.
              </p>
              <Button asChild size="sm">
                <a href="#plano">Ativar com o Pro</a>
              </Button>
            </div>
          </section>

          {/* 5 · preferences */}
          <section className="border-b border-border px-5 py-8 sm:px-9">
            <FormHead n="5" title="Preferências" />
            <div className="grid max-w-[560px] gap-1.5">
              <FieldLabelCaps>Idioma do painel</FieldLabelCaps>
              <select
                className="h-10 max-w-[220px] border border-input bg-background px-3 font-mono text-[13px] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                defaultValue="pt-PT"
              >
                <option value="pt-PT">Português (Portugal)</option>
                <option value="en">English</option>
              </select>
            </div>
          </section>

          {/* 6 · plan & billing */}
          <section id="plano" className="scroll-mt-16 px-5 py-8 sm:px-9">
            <FormHead n="6" title="Plano e faturação" note="EUR · IVA EXCL." />
            <div className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display text-[13px] font-bold tracking-[0.12em] uppercase [font-stretch:88%]">
                Plano atual: Gratuito
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">
                recolha ilimitada · exportação manual
              </span>
            </div>
            <div className="max-w-[560px] border-[1.5px] border-foreground">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border bg-secondary px-5 py-3.5">
                <span className="font-display text-[13px] font-bold tracking-[0.12em] uppercase [font-stretch:88%]">
                  Pro
                </span>
                <span className="flex items-baseline gap-1.5">
                  <span className="font-mono text-2xl font-bold">9 €</span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    por mês
                  </span>
                </span>
              </div>
              <ul className="px-5 py-4">
                {[
                  "Envio das exportações diretamente ao contabilista",
                  "Exportação agendada — todos os meses, sozinha",
                  "Endereços de reencaminhamento adicionais",
                ].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-baseline gap-3 border-b border-border py-2 text-[13.5px] last:border-b-0"
                  >
                    <span className="font-mono text-[11px] font-bold text-primary">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="border-t border-border px-5 py-4">
                <Button className="max-sm:w-full">
                  Aderir ao Pro — 9 €/mês
                </Button>
                <p className="mt-2.5 font-mono text-[10px] tracking-[0.08em] text-muted-foreground">
                  Cancele quando quiser. Os seus documentos continuam seus.
                </p>
              </div>
            </div>
          </section>
        </article>

        <p className="mt-6 text-center font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
          LAB · PROTÓTIPO COM DADOS FICTÍCIOS · NÃO É UMA SUPERFÍCIE DO PRODUTO
        </p>
      </main>
    </div>
  );
}
