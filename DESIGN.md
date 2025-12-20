# MailToBills Design System 0.1

## Propósito
Um kit mínimo para garantir consistência visual entre landing, dashboard e futuros agentes. O foco é clareza, acessibilidade básica e reuso das mesmas primitives de UI sem criar um framework complexo.

## Cores
- **Brand (primária):** usar a paleta `brand` do Tailwind preset para ações principais.
- **Neutros (Slate):** usar `slate` do Tailwind para textos, bordas e fundos neutros.
- **Estados:**
  - Sucesso: tons `green-50/100/600`.
  - Aviso: tons `amber-50/100/600`.
  - Erro: tons `red-50/100/600`.
  - Informações/passivos: `blue-50/100/600` ou `slate-500/600` quando mais discreto.

## Tipografia
- Fonte base: `Inter`, fallback para a pilha sans padrão.
- Títulos: peso 600–700, tamanhos a partir de `text-xl` para seções e `text-3xl+` para heróis.
- Corpo: `text-sm` ou `text-base`, peso 400–500, cor `text-slate-700/800`.
- Labels: `text-sm` ou `text-xs`, peso 500, cor `text-slate-700` com contraste suficiente.

## Layout Tokens
- **Espaçamentos:** usar escala Tailwind (`2/3/4/6/8/10/12/16`) para padding e gaps. Priorizar 3–6 para cartões e formulários compactos.
- **Raios:**
  - `sm`: 0.375rem
  - `md`: 0.5rem
  - `lg`: 0.75rem
  - Cartões e inputs devem usar `md` por padrão.

## Componentes oficiais (0.1)
- `Button` (variantes primary, secondary; estado disabled e focus-visible).
- `Input` (campo base com suporte a disabled e `className`).
- `Label` (texto de rótulo consistente).
- `Card` (com subcomponentes `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`).
- `EmptyState` (título, descrição opcional e ação opcional).

## Regras de evolução
- Não criar novos primitives sem discussão prévia. Expandir apenas se cobrir caso de uso real e compartilhado entre apps.
