# SS Clínica — Landing Page

Landing page estática, responsiva e pronta para publicação.

## Estrutura

- `index.html` — conteúdo da página
- `assets/css/styles.css` — identidade visual e responsividade
- `assets/js/script.js` — menu, abas, FAQ, modal e formulário para WhatsApp
- `assets/img/` — marca, retrato e composições editoriais

## Como visualizar

Abra o arquivo `index.html` no navegador ou publique a pasta em serviços como Vercel, Netlify ou hospedagem tradicional.

Para testar localmente com um servidor:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Antes de publicar

1. Substitua as três composições da seção **A clínica** por fotografias profissionais reais, mantendo os mesmos nomes de arquivos ou alterando os caminhos no HTML.
2. Confirme com a clínica o texto de formação, convênios, procedimentos e endereço.
3. O formulário não armazena dados: ele monta uma mensagem e abre o WhatsApp.
4. O número usado nos botões é **(91) 9 9924-4443**.

## Identidade visual

- Títulos: Newsreader
- Textos: Manrope
- Fundo creme, verde profundo e bronze suave
- Animações discretas e suporte a `prefers-reduced-motion`
