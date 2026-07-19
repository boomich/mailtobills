import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { isLocale, type Locale } from "@mailtobills/i18n";

import {
  LegalLetter,
  type LegalSection,
} from "@/components/legal/legal-letter";

/*
 * Plain-language terms, drafted to be verifiable against the product
 * (CONTEXT.md is binding for domain terms; the Free Plan is unlimited).
 * Founder review pending before public launch — see docs/deploy-checklist.md
 * Phase 0.
 */

const UPDATED = "2026-07-19";

const CONTENT: Record<
  Locale,
  { title: string; updatedLabel: string; intro: string; sections: LegalSection[] }
> = {
  en: {
    title: "Terms of Service",
    updatedLabel: "Effective",
    intro:
      "These terms are written to be read. They cover what MailToBills does, what it costs, and what each of us promises the other. If anything here is unclear, write to support@mailtobills.com and we will answer in plain language too.",
    sections: [
      {
        title: "The service",
        paragraphs: [
          "MailToBills gives you a private Collection Address. Emails you forward to it have their PDF attachments collected, filed under the Collection Month they arrived in, and made available to browse and export. At month end you can download an Accountant Export — a ZIP with each document's primary PDF and a CSV manifest — or, on the Pro Plan, have it emailed to your accountant.",
          "MailToBills deliberately does not read, parse, or extract data from your documents. It is not accounting, tax, or legal advice, and it is not a statutory archiving service — your accountant and your own records remain the authority.",
        ],
      },
      {
        title: "Your account",
        paragraphs: [
          "An account belongs to one person. Keep your credentials safe and your account email accurate — it doubles as the trusted sender for forwarded documents, so a wrong email means rejected forwards.",
        ],
      },
      {
        title: "Acceptable use",
        paragraphs: [
          "Only forward documents you have the right to store, and use the service for its purpose: organizing expense documents. We may suspend accounts used for unlawful content, abuse of the collection infrastructure, or attempts to disrupt the service — with notice, unless the abuse makes that impracticable.",
        ],
      },
      {
        title: "Plans and billing",
        paragraphs: [
          "The Free Plan is free forever and includes unlimited document collection and manual export download. The Pro Plan (€9/month at the time of writing) adds direct sending to your accountant, the automatic Export Schedule, and additional verified forwarding addresses.",
          "Payments are processed by Lemon Squeezy as merchant of record; they handle the checkout, invoicing, and VAT. You can cancel anytime from the billing portal — Pro remains active until the end of the paid period, then your account continues on the Free Plan with all documents intact. Price changes are announced by email in advance and never apply retroactively to a period you have already paid.",
        ],
      },
      {
        title: "Your documents",
        paragraphs: [
          "Your documents are yours. You give us only the permission needed to store, display, and export them for you — nothing more. You can download everything at any time via monthly exports, and when you delete a document or your account, we delete it from the service.",
        ],
      },
      {
        title: "Availability and liability",
        paragraphs: [
          "MailToBills is provided as is. We work to keep it reliable, but we do not promise uninterrupted availability, and we are not liable for indirect damages — including consequences of a document not being collected or an export not being delivered. Our total liability is capped at the amount you paid us in the twelve months before the claim. Nothing in these terms limits liability that cannot lawfully be limited.",
          "Because forwarding can fail silently on either side, verify at month end that your dossier is complete before handing it to your accountant.",
        ],
      },
      {
        title: "Ending things",
        paragraphs: [
          "You can stop using MailToBills at any time and ask us to delete your account and everything in it by writing to support@mailtobills.com. We may terminate accounts that breach these terms, with notice where practicable.",
        ],
      },
      {
        title: "Changes and law",
        paragraphs: [
          "If these terms change in a way that matters, we tell you by email before the change takes effect. These terms are governed by Portuguese law, and disputes belong to the courts of Portugal — though writing to us first is faster for everyone.",
        ],
      },
    ],
  },
  "pt-PT": {
    title: "Termos de Serviço",
    updatedLabel: "Em vigor desde",
    intro:
      "Estes termos foram escritos para serem lidos. Explicam o que o MailToBills faz, quanto custa e o que cada um de nós promete ao outro. Se algo não estiver claro, escreva para support@mailtobills.com e respondemos também em linguagem simples.",
    sections: [
      {
        title: "O serviço",
        paragraphs: [
          "O MailToBills dá-lhe um Endereço de Recolha privado. Os emails que reencaminhar para lá têm os PDFs anexos recolhidos, arquivados no Mês de Recolha em que chegaram e disponíveis para consultar e exportar. No fim do mês pode descarregar uma Exportação para o Contabilista — um ZIP com o PDF principal de cada documento e um manifesto CSV — ou, no plano Pro, enviá-la por email diretamente ao contabilista.",
          "O MailToBills deliberadamente não lê, não interpreta e não extrai dados dos seus documentos. Não é aconselhamento contabilístico, fiscal ou jurídico, nem um serviço de arquivo legal — o seu contabilista e os seus próprios registos continuam a ser a autoridade.",
        ],
      },
      {
        title: "A sua conta",
        paragraphs: [
          "Uma conta pertence a uma pessoa. Guarde as suas credenciais em segurança e mantenha o email da conta correto — é também o remetente de confiança dos documentos reencaminhados, pelo que um email errado significa reencaminhamentos rejeitados.",
        ],
      },
      {
        title: "Utilização aceitável",
        paragraphs: [
          "Reencaminhe apenas documentos que tem o direito de guardar e use o serviço para o seu propósito: organizar documentos de despesas. Podemos suspender contas usadas para conteúdo ilícito, abuso da infraestrutura de recolha ou tentativas de perturbar o serviço — com aviso prévio, salvo se o abuso o tornar impraticável.",
        ],
      },
      {
        title: "Planos e pagamentos",
        paragraphs: [
          "O plano Free é gratuito para sempre e inclui recolha ilimitada de documentos e transferência manual das exportações. O plano Pro (€9/mês à data desta versão) acrescenta o envio direto ao contabilista, o Agendamento de Exportação automático e endereços de reencaminhamento adicionais verificados.",
          "Os pagamentos são processados pela Lemon Squeezy como comerciante registado (merchant of record); é ela que trata do checkout, da faturação e do IVA. Pode cancelar em qualquer altura no portal de faturação — o Pro mantém-se ativo até ao fim do período pago e depois a conta continua no plano Free com todos os documentos intactos. Alterações de preço são anunciadas por email com antecedência e nunca se aplicam retroativamente a um período já pago.",
        ],
      },
      {
        title: "Os seus documentos",
        paragraphs: [
          "Os seus documentos são seus. Dá-nos apenas a permissão necessária para os guardar, mostrar e exportar por si — nada mais. Pode descarregar tudo em qualquer altura através das exportações mensais e, quando apaga um documento ou a conta, apagamo-lo do serviço.",
        ],
      },
      {
        title: "Disponibilidade e responsabilidade",
        paragraphs: [
          "O MailToBills é fornecido tal como está. Trabalhamos para que seja fiável, mas não prometemos disponibilidade ininterrupta e não somos responsáveis por danos indiretos — incluindo as consequências de um documento não recolhido ou de uma exportação não entregue. A nossa responsabilidade total está limitada ao valor que nos pagou nos doze meses anteriores à reclamação. Nada nestes termos limita responsabilidade que não possa legalmente ser limitada.",
          "Como o reencaminhamento pode falhar silenciosamente de qualquer um dos lados, confirme no fim do mês que o dossier está completo antes de o entregar ao contabilista.",
        ],
      },
      {
        title: "Terminar",
        paragraphs: [
          "Pode deixar de usar o MailToBills em qualquer altura e pedir-nos que apaguemos a sua conta e tudo o que ela contém escrevendo para support@mailtobills.com. Podemos terminar contas que violem estes termos, com aviso prévio sempre que praticável.",
        ],
      },
      {
        title: "Alterações e lei aplicável",
        paragraphs: [
          "Se estes termos mudarem de forma relevante, avisamos por email antes de a alteração entrar em vigor. Estes termos regem-se pela lei portuguesa e os litígios pertencem aos tribunais portugueses — embora escrever-nos primeiro seja mais rápido para toda a gente.",
        ],
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return {
    title: CONTENT[locale].title,
    description: CONTENT[locale].intro,
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("Accessibility");
  const content = CONTENT[locale];

  return (
    <LegalLetter
      registration="MOD. J-01 · CONDIÇÕES DE SERVIÇO"
      title={content.title}
      updatedLabel={content.updatedLabel}
      updatedDate={UPDATED}
      intro={content.intro}
      sections={content.sections}
      skipLabel={t("skipToContent")}
    />
  );
}
