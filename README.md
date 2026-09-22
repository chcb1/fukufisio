# Simone Fuku — Fisioterapia Pélvica
**Site institucional** · Campinas, SP  
`simonefukufisio` | [@simonefukufisio](https://instagram.com/simonefukufisio)

---

## Visão geral

Site institucional de uma página (single-page) para clínica de fisioterapia especializada em saúde pélvica. Desenvolvido como HTML/CSS/JS puro, sem dependências de framework, build step ou servidor — deploy direto via Netlify.

**Objetivo principal:** conversão de visitantes em leads via WhatsApp e formulário de contato.

---

## Estrutura do repositório

```
fukufisio/
│
├── index.html          # Página única — todo o site está aqui
│
├── assets/
│   ├── logo.png        # Logo com fundo transparente (222×245 px)
│   └── photo.jpg       # Foto profissional, crop 4:5 (720×900 px)
│
├── netlify.toml        # Config de build, cache e headers de segurança
├── .gitignore
└── README.md
```

> **Regra de ouro:** qualquer alteração de conteúdo acontece em `index.html`.  
> Troca de imagens: substitua o arquivo em `assets/` mantendo o mesmo nome.

---

## Stack técnica

| Camada | Tecnologia | Observação |
|--------|------------|------------|
| Marcação | HTML5 semântico | Single-file, sem template engine |
| Estilo | CSS3 puro — Custom Properties (`var()`) | Sem Tailwind, Bootstrap ou pre-processador |
| Interatividade | JavaScript vanilla (ES6+) | Sem jQuery, sem bundler |
| Tipografia | Google Fonts — **Fraunces** (display serifada) + **Work Sans** (corpo) | Carregadas via CDN, fallbacks definidos |
| Ícones | SVG inline | Sem biblioteca de ícones externa |
| Formulário | Vanilla JS → monta mensagem → abre WhatsApp | Complementar: Netlify Forms (ver seção abaixo) |
| Hospedagem | [Netlify](https://netlify.com) — free tier | Deploy automático via GitHub |
| CI/CD | GitHub Actions implícito via Netlify | Push na `main` → deploy automático |

**Dependências de produção: zero.** O site não carrega nenhuma biblioteca JS em runtime.

---

## Seções do site

| Seção | ID / âncora | Descrição |
|-------|-------------|-----------|
| Header fixo | `#top` | Logo, navegação, CTA "Agendar consulta" |
| Hero | — | Headline, foto profissional, métricas de confiança |
| Sobre | `#sobre` | Card da fisioterapeuta + diferenciais em pills |
| Serviços | `#servicos` | Grid de 8 especialidades |
| Jornada | `#jornada` | Timeline pré / peri / pós-parto |
| Diferenciais | — | 4 pilares do atendimento |
| Contato | `#contato` | Formulário + informações de contato |
| Footer | — | Links, redes sociais, rodapé legal |
| WhatsApp flutuante | — | Botão fixo, presente em todas as telas |

---

## Integração WhatsApp

O número está definido em uma única constante no `<script>` ao final do `index.html`:

```javascript
const WA_NUMBER = "5519991255241"; // 55 (Brasil) + 19 (DDD) + número
```

Para alterar o número: edite apenas essa linha. Todos os botões e o formulário usam essa variável.

O formulário monta uma mensagem personalizada com nome, telefone, área de interesse e observações antes de abrir o WhatsApp.

---

## Netlify Forms (recomendado ativar)

Permite capturar leads mesmo quando o WhatsApp não abre (desktop sem app, iOS bloqueado). Sem backend, sem custo adicional no free tier (100 submissões/mês).

**Para ativar,** localize o `<form>` em `index.html` e adicione dois atributos:

```html
<!-- ANTES -->
<form id="contactForm">

<!-- DEPOIS -->
<form id="contactForm" name="contato" data-netlify="true">
```

Após o deploy, as submissões aparecem em **Netlify → Forms → contato**.  
Configure notificação por e-mail em: **Site settings → Forms → Form notifications**.

---

## Deploy e fluxo de trabalho

### Primeiro deploy

```bash
# 1. Clone o repo (ou faça o push inicial)
git clone https://github.com/chcb1/fukufisio.git
cd fukufisio

# 2. No Netlify: New site → Import from Git → GitHub → chcb1/fukufisio
#    Build command: (deixar em branco)
#    Publish directory: .
#    Branch: main
```

### Publicar uma alteração

```bash
# Edite o index.html (ou substitua um asset em assets/)
git add .
git commit -m "feat: adicionar depoimentos"
git push origin main
# → Netlify detecta o push e faz deploy automático em ~20s
```

### Branches recomendadas

| Branch | Uso |
|--------|-----|
| `main` | Produção — deploy automático |
| `dev` ou `feature/*` | Desenvolvimento — gera preview URL no Netlify |

---

## Domínio customizado (pendente)

Domínio alvo: `simonefukufisio.com.br`

**Passos:**
1. Registrar em [registro.br](https://registro.br) (~R$ 40–50/ano)
2. No Netlify: **Domain management → Add custom domain**
3. No Registro.br: apontar nameservers para os da Netlify, ou criar registro CNAME/ALIAS
4. SSL/HTTPS: gerado automaticamente pelo Netlify (Let's Encrypt) em até 24h

Após configurar, descomentar o redirect `www → apex` no `netlify.toml`.

---

## SEO e Analytics (pendente)

Itens a adicionar em `index.html` antes do `</head>`:

- [ ] **GA4** — tag `G-XXXXXXXXXX` (criar em analytics.google.com)
- [ ] **Open Graph** — `og:title`, `og:description`, `og:image` para compartilhamento social
- [ ] **Schema.org LocalBusiness** — para o Google exibir painel lateral com dados da clínica
- [ ] **Google Search Console** — verificação de propriedade e indexação
- [ ] **Google Business Profile** — cadastro gratuito, maior impacto em busca local

---

## Conteúdo pendente (próximas atualizações)

- [ ] Depoimentos de pacientes (com autorização)
- [ ] Credenciais e formação da Simone (COFFITO, especializações)
- [ ] Endereço ou bairro de atendimento (impacta SEO local)
- [ ] FAQ resumido sobre fisioterapia pélvica
- [ ] Fotos do consultório

---

## Contatos do projeto

| Canal | Dado |
|-------|------|
| WhatsApp | (19) 99125-5241 |
| E-mail | simonefukufisio@gmail.com |
| Instagram | [@simonefukufisio](https://instagram.com/simonefukufisio) |
| Cidade | Campinas, SP |

---

## Histórico de versões

| Versão | Data | Descrição |
|--------|------|-----------|
| 1.0.0 | Jul 2026 | Site inicial — hero, serviços, contato, WhatsApp |
| 1.1.0 | Jul 2026 | Instagram e e-mail adicionados; logo e foto integrados |
| 1.2.0 | Set 2026 | Refatoração: imagens separadas de base64, repo estruturado |
