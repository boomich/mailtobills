import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { isLocale, type Locale } from "@mailtobills/i18n";

import {
  LegalLetter,
  type LegalSection,
} from "@/components/legal/legal-letter";

/*
 * Plain-language privacy policy. Every claim here must stay verifiable
 * against the codebase (what is stored, which processors exist). Founder
 * review pending before public launch — see docs/deploy-checklist.md
 * Phase 0.
 */

const UPDATED = "2026-07-19";

const CONTENT: Record<
  Locale,
  { title: string; updatedLabel: string; intro: string; sections: LegalSection[] }
> = {
  en: {
    title: "Privacy Policy",
    updatedLabel: "Effective",
    intro:
      "MailToBills exists to file your expense documents, not to know things about you. This policy lists exactly what we store, where it lives, and how to get it removed. Questions and requests: support@mailtobills.com.",
    sections: [
      {
        title: "Who is responsible",
        paragraphs: [
          "MailToBills is operated from Portugal and is the controller of the personal data described here. For anything in this policy — questions, complaints, requests — write to support@mailtobills.com.",
        ],
      },
      {
        title: "What we store",
        paragraphs: ["We store only what the service needs to work:"],
        list: [
          "Account data: your name, email address, and sign-in credentials (a password hash, or the identifier from Google/GitHub if you sign in with them).",
          "Forwarded email data: sender, subject, message identifiers, dates, and the PDF attachments themselves, filed by Collection Month.",
          "Accountant details you choose to add: their name and email address, used only to deliver your exports.",
          "Billing status from Lemon Squeezy (plan, subscription state). Card and payment details never reach us — Lemon Squeezy is the merchant of record.",
          "Feedback you submit through the product, with your name and email so we can reply.",
          "Basic technical logs and cookieless page analytics — no advertising identifiers, no cross-site tracking, no analytics cookies.",
        ],
      },
      {
        title: "What we do with it",
        paragraphs: [
          "One thing: run the service. We file your documents, show them to you, and export or deliver them where you tell us to. We do not read, parse, or extract data from your documents; we do not sell or rent personal data; we do not use your documents to train AI models; we send no marketing you did not ask for.",
        ],
      },
      {
        title: "Where it lives",
        paragraphs: [
          "Your data is processed by a short list of infrastructure providers, each doing one job:",
          "Some of these providers process data outside the European Economic Area; where they do, transfers rely on GDPR safeguards such as the EU Standard Contractual Clauses.",
        ],
        list: [
          "Convex — database and document storage.",
          "Vercel — application hosting.",
          "Resend — sending your exports and service email.",
          "Lemon Squeezy — payments, as merchant of record.",
          "Asana — the content of feedback you submit, so we can act on it.",
          "Our mail infrastructure — receiving and routing what you forward to your Collection Address.",
        ],
      },
      {
        title: "How long we keep it",
        paragraphs: [
          "Collected documents stay until you delete them or your account — there is no automatic expiry, and also no promise of statutory archiving. When you delete your account, we remove your documents and account data from the service; residual copies in encrypted backups expire on the backup cycle. Deletion requests are honored within 30 days.",
        ],
      },
      {
        title: "Your rights",
        paragraphs: [
          "Under the GDPR you can ask for access to your data, correction, deletion, a portable copy (the monthly export ZIP already is one), restriction, or object to processing. Write to support@mailtobills.com and we will act on it. You can also complain to the CNPD (Comissão Nacional de Proteção de Dados), the Portuguese supervisory authority.",
        ],
      },
      {
        title: "Security",
        paragraphs: [
          "Data is encrypted in transit, access to production systems is limited to the operator, and authentication is handled by maintained industry libraries rather than home-grown crypto. No system is perfectly secure — if a breach ever affects your data, we will tell you directly and promptly.",
        ],
      },
      {
        title: "Changes",
        paragraphs: [
          "If this policy changes in a way that matters, we tell you by email before the change takes effect. The date at the top is the version in force.",
        ],
      },
    ],
  },
  "pt-PT": {
    title: "Política de Privacidade",
    updatedLabel: "Em vigor desde",
    intro:
      "O MailToBills existe para arquivar os seus documentos de despesas, não para saber coisas sobre si. Esta política lista exatamente o que guardamos, onde fica e como pedir a sua remoção. Perguntas e pedidos: support@mailtobills.com.",
    sections: [
      {
        title: "Quem é responsável",
        paragraphs: [
          "O MailToBills é operado a partir de Portugal e é o responsável pelo tratamento dos dados pessoais aqui descritos. Para qualquer assunto desta política — perguntas, reclamações, pedidos — escreva para support@mailtobills.com.",
        ],
      },
      {
        title: "O que guardamos",
        paragraphs: ["Guardamos apenas o que o serviço precisa para funcionar:"],
        list: [
          "Dados de conta: o seu nome, endereço de email e credenciais de acesso (um hash da palavra-passe, ou o identificador da Google/GitHub se entrar por lá).",
          "Dados dos emails reencaminhados: remetente, assunto, identificadores da mensagem, datas e os próprios PDFs anexos, arquivados por Mês de Recolha.",
          "Dados do contabilista que decidir adicionar: nome e email, usados apenas para entregar as suas exportações.",
          "Estado de faturação vindo da Lemon Squeezy (plano, estado da subscrição). Os dados de pagamento nunca chegam até nós — a Lemon Squeezy é o comerciante registado.",
          "Feedback que submeta através do produto, com o seu nome e email para podermos responder.",
          "Registos técnicos básicos e estatísticas de páginas sem cookies — sem identificadores publicitários, sem rastreio entre sites, sem cookies de análise.",
        ],
      },
      {
        title: "O que fazemos com eles",
        paragraphs: [
          "Uma coisa: fazer o serviço funcionar. Arquivamos os seus documentos, mostramos-lhos e exportamo-los ou entregamo-los onde nos indicar. Não lemos, não interpretamos nem extraímos dados dos seus documentos; não vendemos nem alugamos dados pessoais; não usamos os seus documentos para treinar modelos de IA; não enviamos marketing que não pediu.",
        ],
      },
      {
        title: "Onde ficam",
        paragraphs: [
          "Os seus dados são tratados por uma lista curta de fornecedores de infraestrutura, cada um com uma função:",
          "Alguns destes fornecedores tratam dados fora do Espaço Económico Europeu; quando o fazem, as transferências assentam em salvaguardas do RGPD, como as Cláusulas Contratuais-Tipo da UE.",
        ],
        list: [
          "Convex — base de dados e armazenamento de documentos.",
          "Vercel — alojamento da aplicação.",
          "Resend — envio das suas exportações e do email de serviço.",
          "Lemon Squeezy — pagamentos, como comerciante registado.",
          "Asana — o conteúdo do feedback que submete, para podermos agir sobre ele.",
          "A nossa infraestrutura de correio — receção e encaminhamento do que reencaminha para o seu Endereço de Recolha.",
        ],
      },
      {
        title: "Quanto tempo guardamos",
        paragraphs: [
          "Os documentos recolhidos ficam até os apagar, ou até apagar a conta — não há expiração automática, nem promessa de arquivo legal. Quando apaga a conta, removemos os seus documentos e dados do serviço; cópias residuais em backups encriptados expiram com o ciclo de backups. Pedidos de eliminação são cumpridos no prazo de 30 dias.",
        ],
      },
      {
        title: "Os seus direitos",
        paragraphs: [
          "Ao abrigo do RGPD pode pedir acesso aos seus dados, retificação, eliminação, uma cópia portátil (o ZIP de exportação mensal já o é), limitação, ou opor-se ao tratamento. Escreva para support@mailtobills.com e trataremos do pedido. Pode também reclamar junto da CNPD (Comissão Nacional de Proteção de Dados), a autoridade de controlo portuguesa.",
        ],
      },
      {
        title: "Segurança",
        paragraphs: [
          "Os dados são encriptados em trânsito, o acesso aos sistemas de produção está limitado ao operador e a autenticação é feita por bibliotecas de referência mantidas, não por criptografia caseira. Nenhum sistema é perfeitamente seguro — se alguma falha afetar os seus dados, avisamos diretamente e sem demora.",
        ],
      },
      {
        title: "Alterações",
        paragraphs: [
          "Se esta política mudar de forma relevante, avisamos por email antes de a alteração entrar em vigor. A data no topo é a versão em vigor.",
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

export default async function PrivacyPage({
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
      registration="MOD. J-02 · PROTEÇÃO DE DADOS"
      title={content.title}
      updatedLabel={content.updatedLabel}
      updatedDate={UPDATED}
      intro={content.intro}
      sections={content.sections}
      skipLabel={t("skipToContent")}
    />
  );
}
