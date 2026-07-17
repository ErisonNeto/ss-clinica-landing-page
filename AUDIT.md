# Auditoria técnica — SS Clínica

## Principais causas identificadas

### Responsividade

- O layout dependia de alturas e larguras rígidas em componentes visuais grandes.
- Havia poucos pontos de quebra para cobrir celulares pequenos, tablets em retrato e tablets em paisagem.
- Alguns grids não protegiam seus itens com `minmax(0, 1fr)` e `min-width: 0`, o que pode causar overflow com textos maiores.
- A navegação móvel não possuía CTA dentro do próprio menu.
- Elementos fixos não consideravam as áreas seguras de aparelhos com notch.

### CSS

- Tokens de cor, espaços, raios e transições estavam incompletos, exigindo valores repetidos.
- Estados de hover eram aplicados também em telas touch.
- As animações deixavam conteúdo invisível quando o JavaScript não carregava.
- Faltavam estados de foco consistentes para navegação por teclado.

### HTML e acessibilidade

- A navegação principal não usava lista semântica.
- Informações de credenciais e formação eram grupos de `div`, embora fossem pares de termo e descrição.
- Botões do FAQ e tratamentos não declaravam `type`.
- O FAQ não relacionava cada botão à sua resposta por `aria-controls` e `aria-labelledby`.
- Algumas seções não tinham um heading próprio.
- O formulário usava labels envolvendo os campos, mas sem pares explícitos `for` e `id`.

### JavaScript

- O menu não bloqueava o scroll do fundo.
- Não fechava ao clicar fora, pressionar Escape ou mudar para desktop.
- Não restaurava o foco após fechar.
- As abas aceitavam apenas setas horizontais e não tratavam Home/End.
- Não havia fallback para `IntersectionObserver`.
- O formulário não executava validação explícita antes de abrir o WhatsApp.

## Melhorias aplicadas

- Grid e Flexbox refatorados com colunas flexíveis e proteção contra overflow.
- Breakpoints em 1152 px, 960 px, 672 px e 380 px, além de ajuste para paisagem com pouca altura.
- Tipografia e espaçamentos fluidos com `clamp()`.
- Navegação móvel completa, com CTA, bloqueio de scroll, clique externo, Escape e gerenciamento de foco.
- `scroll-padding` e `scroll-margin` sincronizados com a altura real do cabeçalho.
- Semântica revisada com `header`, `nav`, `main`, `section`, `article`, `figure`, `figcaption`, `dl`, `dt`, `dd`, `address` e hierarquia lógica de headings.
- Atributos de acessibilidade revisados em abas, FAQ, modal, imagens e formulário.
- Conteúdo permanece visível sem JavaScript.
- Hover restrito a dispositivos com mouse; suporte a `prefers-reduced-motion` mantido.
- Modal com limite de altura e rolagem interna em telas menores.
- Formulário com validação e fallback quando o navegador bloqueia nova aba.
- CSS reorganizado por componentes, com variáveis reutilizáveis e comentários de manutenção.

## Resultado dos testes

- Nenhum overflow horizontal nos sete viewports testados.
- Nenhum erro de JavaScript durante os fluxos testados.
- Menu, abas, FAQ, modal e formulário funcionando em desktop, tablet e mobile.
- IDs únicos e referências internas/ARIA válidas.
