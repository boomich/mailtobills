# Design System 0.1

## Propósito
Garantir consistência mínima entre apps e agentes com um kit compacto de identidade visual e primitives simples. Nada de frameworks completos ou temas complexos; apenas o essencial para shippar rápido sem perder coesão.

## Cores
- **Brand:** paleta azul existente (`brand/50-900`) como cor primária.
- **Neutros:** tons de slate do Tailwind para textos, fundos e bordas.
- **Estados:**
  - Sucesso: `green-600`/`green-50`.
  - Aviso: `amber-600`/`amber-50`.
  - Erro: `red-600`/`red-50`.

## Tipografia
- Fonte sans: `Inter` como primeira opção.
- Títulos: peso 700, tamanhos conforme contexto (`text-2xl+`).
- Corpo: `text-base` a `text-sm`, cor `slate-700/800`.
- Labels: `text-sm` ou `text-xs`, peso médio, cor `slate-700`.

## Layout tokens
- **Espaçamentos:** usar escala Tailwind padrão (`2/3/4/6/8/10/12`) para paddings e gaps.
- **Radii:**
  - `sm`: 6px (`0.375rem`)
  - `md`: 8px (`0.5rem`)
  - `lg`: 12px (`0.75rem`)

## Componentes oficiais
- `Button` (variantes primary, secondary; estados de foco e disabled).
- `Input` (ref forward, estados padrão/disabled).
- `Label` (tipografia de formulário).
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` (composição de blocos).
- `EmptyState` (mensagens simples com ação opcional).

## Regras
- Não criar novos primitives sem discussão prévia.
- Reutilizar Tailwind e o preset existente; sem tokens ou temas avançados.
- Manter strings de UI claras; use "N/A" ou "-" para valores ausentes.
