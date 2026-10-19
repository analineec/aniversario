# LOVE.EXE — Guia de Personalização

O site LOVE.EXE foi criado como um presente de aniversário para a Lucilly, com fotos, músicas, mensagens e algumas surpresas escondidas.

Neste guia estão as instruções para personalizar o site, trocar os arquivos e publicá-lo na internet.

## Estrutura dos arquivos

```text
love-exe/
├── index.html
├── style.css
├── app.js
└── assets/
    ├── img/
    │   ├── mem1.jpg
    │   ├── mem2.jpg
    │   └── ...
    └── audio/
        ├── musica1.mp3
        ├── musica2.mp3
        └── musica3.mp3
```

- `index.html`: estrutura das páginas.
- `style.css`: cores, fontes e aparência do site.
- `app.js`: interações, mensagens e configurações.
- `assets/img/`: fotos utilizadas no site.
- `assets/audio/`: músicas e efeitos sonoros.

## Como adicionar as fotos

1. Coloque as fotos na pasta `assets/img/`.
2. Renomeie os arquivos para `mem1.jpg`, `mem2.jpg` e assim por diante, até `mem8.jpg`.
3. Confira se os nomes dos arquivos correspondem aos utilizados no código.

O site aceita imagens nos formatos JPG, JPEG, PNG e WEBP, desde que o código esteja configurado para localizar os arquivos corretamente.

## Como trocar as músicas

Coloque os arquivos de áudio na pasta `assets/audio/` e nomeie-os como `musica1.mp3`, `musica2.mp3` e `musica3.mp3`.

Para alterar os nomes das músicas e dos artistas exibidos na tela, abra o arquivo `app.js` e procure pela variável `playlist`:

```javascript
const playlist = [
  {
    file: 'assets/audio/musica1.mp3',
    name: 'O Mundo Acaba Hoje',
    artist: 'Pitty ♡'
  },
  {
    file: 'assets/audio/musica2.mp3',
    name: 'Música 2',
    artist: 'para você ♡'
  },
  {
    file: 'assets/audio/musica3.mp3',
    name: 'Música 3',
    artist: 'para você ♡'
  },
];
```

Substitua os nomes pelos das músicas escolhidas. Se algum arquivo de áudio não estiver disponível, o site também pode gerar efeitos sonoros retrô automaticamente, conforme a implementação do código.

## Como editar a carta de aniversário

Para personalizar a mensagem exibida na seção da casa, abra o `app.js` e procure pela variável `lines`.

```javascript
const lines = [
  'Feliz 26 anos pra minha pessoa favorita.',
  '',
  '8 anos depois… e você ainda continua',
];
```

Edite as frases como preferir. As linhas vazias podem ser usadas para separar os parágrafos.

## Como alterar as mensagens das estrelas

No arquivo `app.js`, procure pela variável `starMessages`. É nela que ficam as mensagens exibidas ao interagir com as estrelas.

Você pode substituir os textos pelas lembranças, frases ou mensagens que quiser.

## Como mudar a senha

Procure no `app.js` pela linha:

```javascript
const SENHA = 'baunilha';
```

Troque `baunilha` pela palavra escolhida. Lembre-se de manter as aspas e respeitar a sintaxe do JavaScript.

**Importante:** essa senha funciona como uma interação do site, não como um mecanismo seguro para proteger informações privadas.

## Como personalizar as cores

Abra o arquivo `style.css` e procure pelas variáveis no início do arquivo:

```css
:root {
  --pink: #ffb3d1;
  --lilac: #d4b8e0;
  --cream: #fff5e6;
  --bg: #0d0a14;
}
```

Altere os códigos de cores para mudar a aparência do site. As variáveis representam o rosa principal, o lilás, o tom creme e o fundo escuro.

## Como publicar o site

### Netlify Drop

1. Acesse https://app.netlify.com/drop.
2. Arraste a pasta do projeto para a área indicada.
3. Aguarde a publicação e copie o link gerado.

### GitHub Pages

1. Crie um repositório no GitHub.
2. Envie os arquivos do projeto.
3. Acesse as configurações do repositório e habilite o GitHub Pages.
4. Aguarde a publicação do site.

### Executar no computador

Se quiser abrir o projeto localmente, você pode iniciar um servidor usando Python.

No terminal, entre na pasta `love-exe` e execute:

```bash
python -m http.server 8080
```

Depois, acesse http://localhost:8080 no navegador.

Usar um servidor local também ajuda a evitar problemas com o carregamento de alguns recursos, como os arquivos de áudio.

## Surpresas escondidas

O site conta com algumas interações extras:

- **Código Konami:** sequência de teclas que revela uma mensagem secreta.
- **Estrelas:** seis estrelas com mensagens escondidas.
- **Floresta das Memórias:** fotos que podem ser desbloqueadas ao clicar.
- **Lago:** uma surpresa final após clicar em “Sim ♡”.

## Sobre o projeto

O LOVE.EXE foi desenvolvido especialmente para comemorar o aniversário da Lucilly. A proposta é reunir fotos, músicas e mensagens em um só lugar, criando uma experiência personalizada com referências à história de vocês.
