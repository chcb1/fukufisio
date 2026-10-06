# Simone Fukushima De Paula — Fisioterapia
**Site institucional** · Campinas, SP
https://simonefukufisio.com.br · [@simonefukufisio](https://instagram.com/simonefukufisio)

---

## Visão geral

Site institucional de uma clínica de fisioterapia especializada em saúde da mulher. HTML, CSS e JavaScript puros, sem framework, sem etapa de build e sem servidor. Publicado pelo Netlify a cada `git push`.

**Objetivo:** transformar visitas em contatos, pelo WhatsApp e pelo formulário.

> ⚠️ **Este repositório é público.** Nunca incluir senhas, chaves, lista de contas e acessos, ou dados de pacientes. O planejamento e o roteiro de segurança ficam no ClickUp (privado).

---

## Estrutura do repositório

```
fukufisio/
├── index.html                    # Página inicial
├── fisioterapia-pelvica/index.html
├── incontinencia-urinaria/index.html
├── pos-parto/index.html
├── pos-cirurgico-estetico/index.html
├── drenagem-linfatica/index.html # Páginas de serviço, publicadas em /nome/
├── 404.html              # Página de erro (endereço não encontrado)
├── css/
│   └── styles.css        # Estilos compartilhados por todas as páginas
├── js/
│   └── site.js           # Script compartilhado: GA4, WhatsApp, formulário, menu
├── assets/
│   ├── logo.png
│   └── simone-fukushima-fisioterapeuta.jpg
├── sitemap.xml           # Lista de páginas para o Google
├── robots.txt
├── netlify.toml          # Cache e cabeçalhos de segurança
├── CHANGELOG.md          # Histórico de versões
└── README.md
```

Novas páginas de serviço seguem o mesmo padrão: `nome-do-servico/index.html`, publicada em `/nome-do-servico/`.

---

## Regras de manutenção

1. **Caminhos sempre a partir da raiz:** `/css/styles.css`, `/js/site.js`, `/assets/...`, `/#contato`. Assim funcionam em qualquer subpágina.
2. **Cabeçalho e rodapé são copiados em cada página.** Estão entre os marcadores `<!-- COMPARTILHADO:CABECALHO:INICIO/FIM -->` e `<!-- COMPARTILHADO:RODAPE:INICIO/FIM -->`. Ao mudar um, mudar em todas as páginas.
3. **Imagem nova = nome de arquivo novo.** As imagens em `/assets/` ficam em cache por 1 ano no navegador. Substituir o arquivo mantendo o nome faz quem já visitou continuar vendo a imagem antiga. Antes de subir, reduzir para no máximo ~900 px de largura e ~200 KB.
4. **Sem estilos nem scripts dentro do HTML.** Estilo vai em `css/styles.css`, comportamento em `js/site.js`. A única exceção são os dados estruturados (`application/ld+json`).
5. **Endereço oficial: `https://simonefukufisio.com.br/` (sem www).** Usar sempre esse em canonical, sitemap e links.
6. **Toda página nova** precisa de: `<title>` até 60 caracteres, meta description, canonical, um `<h1>`, entrada no `sitemap.xml` e registro no `CHANGELOG.md`.
7. **Conteúdo clínico** é revisado pela Simone antes de publicar, sem promessa de resultado (Código de Ética do COFFITO).
8. **Pendências de conteúdo** ficam em blocos com o atributo `data-pendente`. Aparecem destacados só no ambiente de teste e ficam ocultos em produção. Antes de publicar, substituir pelo texto definitivo ou remover o bloco.
9. **Avaliações de pacientes** não são copiadas para o site. O site apenas aponta para o Google, para não associar o nome de pacientes a um tratamento.

---

## Stack técnica

| Camada | Tecnologia |
|--------|------------|
| Marcação | HTML5 semântico |
| Estilo | CSS puro com variáveis (`:root`) |
| Comportamento | JavaScript puro, sem dependências |
| Tipografia | Google Fonts: Fraunces (títulos) + Work Sans (texto) |
| Formulário | Netlify Forms (envio por e-mail) |
| Medição | Google Analytics 4 |
| Hospedagem | Netlify, plano gratuito, deploy automático via GitHub |

---

## Integrações

### WhatsApp
O número fica em um único lugar, em `js/site.js`:

```javascript
var WA = "5519991255241"; // 55 (Brasil) + 19 (DDD) + número
```

Em páginas novas, qualquer link vira botão de WhatsApp com dois atributos:

```html
<a data-wa="Olá, Simone! Quero saber sobre fisioterapia pélvica."
   data-origem="pagina_pelvica" href="/#contato" target="_blank" rel="noopener">Agendar pelo WhatsApp</a>
```

`data-wa` é a mensagem que já vai preenchida. `data-origem` identifica o botão no GA4.

### Google Analytics 4 (`G-YCW4MYYGL5`)

| Evento | Parâmetro | Quando dispara |
|---|---|---|
| `clique_whatsapp` | `origem` | Clique em qualquer link do WhatsApp |
| `envio_formulario` | `servico` | Formulário enviado com sucesso |
| `clique_email` / `clique_instagram` | `origem` | Clique em e-mail ou Instagram |
| `clique_avaliacoes` | `origem` | Clique nos links de avaliações do Google |
| `erro_formulario` | `servico` | Falha no envio do formulário |

`clique_whatsapp` e `envio_formulario` são eventos principais (conversões) no GA4.

### Formulário (Netlify Forms)
Formulário `contato` na página inicial. As mensagens chegam por e-mail e ficam em **Netlify → Forms**. Limite do plano gratuito: 100 envios por mês.

### Google Search Console
Propriedade de domínio verificada por registro DNS TXT, criado em **Netlify → DNS**. Não apagar esse registro.

---

## Publicação

O Netlify publica automaticamente a branch `main`.

```bash
git add .
git commit -m "tipo: descrição curta"
git push
```

**Mudanças maiores** (página nova, alteração de estrutura): usar uma branch e abrir um pull request. O Netlify gera um **link de pré-visualização** para revisar antes de publicar.

```bash
git checkout -b nome-da-mudanca
# ...alterações...
git push -u origin nome-da-mudanca
# abrir o pull request no GitHub; depois de aprovado, fazer o merge na main
```

### Ambientes

| Ambiente | Endereço | Como é publicado |
|---|---|---|
| **Produção** | `simonefukufisio.com.br` | Merge na branch `main` |
| **Teste** | `deploy-preview-N--simonefukufisio.netlify.app` | Pull request aberto no GitHub |

Fora do domínio oficial, o `js/site.js` trata a página como teste:
- não envia dados ao Google Analytics (os eventos aparecem no console do navegador);
- marca o assunto dos e-mails do formulário com `[TESTE]`;
- pede para não ser indexada e mostra o selo "Ambiente de teste".

O envio de teste do formulário ainda conta na cota mensal do Netlify e chega por e-mail, com a marca `[TESTE]`.

**Voltar a uma versão anterior:** Netlify → Deploys → escolher o deploy → **Publish deploy**.

**Pré-visualizar no computador:** os caminhos partem da raiz, então abrir o arquivo direto não carrega estilo nem script. Usar um servidor local:

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

---

## Histórico

Ver [CHANGELOG.md](CHANGELOG.md).
