# MailToBills – Agents Guide

## 1. Contexto do Projeto

MailToBills é um micro-SaaS para freelancers e pequenas empresas:

> O usuário encaminha faturas por email, nós organizamos tudo.

MVP:

- Receber invoices via email (n8n)
- Guardar ficheiros e metadados
- Expor tudo num dashboard simples
- Permitir export (zip/csv) para o contabilista

Este repositório é um monorepo gerido com **pnpm** + **Turborepo**.

## 2. Estrutura do Monorepo

- `apps/landing`

  - Next.js (TS)
  - Marketing site público
  - Foco em clareza, não em enfeite.

- `apps/dashboard`

  - Next.js (TS)
  - Área autenticada (ligada ao Convex)
  - Lista de invoices, download, export.

- `backend/convex`

  - Backend e database usando Convex
  - Mutations, queries e schema de invoices, users, files.

- `packages/ui`

  - Componentes React compartilhados (design system leve)
  - Tailwind + shadcn.

- `packages/types`

  - Tipos compartilhados (e.g. `Invoice`, `User`, `EmailMetadata`).

- `packages/config`

  - Configurações compartilhadas (ESLint, tsconfig, etc).

- `workflows/n8n`
  - Workflows exportados em JSON para ingestão de emails e anexos.

## 3. Tecnologias e Ferramentas

- **Package manager:** pnpm (não trocar para npm/yarn).
- **Monorepo:** Turborepo (`turbo.json`).
- **Frontend:** Next.js + TypeScript.
- **Styling:** Tailwind CSS + shadcn/ui no dashboard.
- **Backend:** Convex (auth, db, functions).
- **Automação:** n8n (ingestão de emails, anexos, chamadas HTTP para Convex).
- **Infra futura:** provavelmente Hetzner / S3 compatible para storage.

## 4. Princípios de Código

Quando editar ou criar código neste repo, siga estas regras:

1. **TypeScript first**

   - Código novo em TS.
   - Tipos explícitos em bordas de módulo e APIs.

2. **Async/await e Promises**

   - Use `async/await`.
   - Sempre trate erros com `try/catch` ou `.catch` bem pensado.

3. **Erro e logging**

   - No MVP: `console.error` e `console.log` centralizados em helpers.
   - Evitar silenciar erros.
   - Em Convex: lançar erros claros ou retornar `Result` estruturado.

4. **Reutilização**

   - Prefira criar helpers em `packages/*` em vez de duplicar lógica.
   - Use bibliotecas consolidadas (zod, date-fns, etc.) em vez de reinventar.

5. **Sem placeholders vazios**

   - Não deixar TODOs que quebrem fluxo.
   - Se algo não for implementado ainda, comente claramente e mantenha o app compilando.

6. **Front-end**

   - Componentes funcionais com hooks.
   - Organização por feature sempre que possível.
   - Evitar over-engineering no MVP (sem state machines gigantes sem necessidade).

7. **Convex**
   - Schema em `backend/convex/schema.ts`.
   - Mutations e queries bem nomeadas (`invoices/create`, `invoices/listForUser`).
   - Autorização simples, mas explícita (checar `userId`).

## 5. Fluxo Principal do Produto (MVP)

1. Usuário encaminha email para `inbox@mailtobills.com`.
2. n8n captura o email:
   - Lê anexos PDF.
   - Faz upload para storage (ou Convex file storage).
   - Chama mutation do Convex com:
     - `userId`
     - `fileId`
     - `originalFilename`
     - `receivedAt`
     - `rawEmailMetadata` (opcional no MVP).
3. Dashboard:
   - Autenticação básica (Convex Auth ou similar).
   - Listagem de invoices do usuário.
   - Ações:
     - Download do PDF.
     - Export (zip/csv) de um período.

## 6. Como os agentes devem operar

- **Pode fazer:**

  - Criar/editar arquivos em `apps/*`, `backend/convex`, `packages/*`.
  - Refatorar código para ficar mais limpo e tipado.
  - Adicionar testes leves quando fizer sentido.
  - Sugerir novas abstrações só se simplificarem o código.

- **Não deve fazer:**
  - Mudar o package manager (manter `pnpm`).
  - Trocar stack (não migrar de Convex para outro backend).
  - Introduzir dependências grandes sem motivo (ex: Redux, Nest, etc.).
  - Criar features grandes que não foram pedidas (escopo controlado).

## 7. Comandos úteis

- Instalar dependências:
  - `pnpm install`
- Desenvolvimento (tudo junto):
  - `pnpm dev`
- Build:
  - `pnpm build`
- Lint:
  - `pnpm lint`

## 8. Estilo de Pull Request / Commits

- Mensagens claras e descritivas.
- Escopo pequeno sempre que possível:
  - ex: `feat(dashboard): list invoices`, `chore(convex): add invoices schema`.

Se tiver dúvida entre algo simples que funciona e algo “elegante” mas complexo, prefira o **simples que funciona**.
