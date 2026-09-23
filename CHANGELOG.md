# Changelog

Todas as mudanças relevantes do projeto são documentadas aqui.  
Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).

---

## [1.5.0] - 2026-09-23
### Adicionado — SEO e Analytics
- **Google Analytics 4** integrado (`G-YCW4MYYGL5`) no `<head>`
- **Canonical URL** apontando para `https://www.simonefukufisio.com.br`
- **Open Graph** completo: título, descrição, imagem, URL e locale `pt_BR`
- **Twitter/X Card** (`summary_large_image`) para compartilhamento
- **Schema.org `MedicalBusiness`**: nome, descrição, telefone, e-mail, endereço, coordenadas, horário, Instagram e imagem — habilita painel lateral no Google
- **`sitemap.xml`** gerado na raiz — pronto para submeter no Search Console
- **`robots.txt`** criado na raiz com referência ao sitemap
- Placeholder comentado para tag do Google Search Console (preencher após passo 2)

### Pendente
- Descomentar `<meta name="google-site-verification">` após obter tag no Search Console
- Submeter `sitemap.xml` no Search Console após verificação de propriedade
- Atualizar `lastmod` do sitemap a cada deploy com mudanças de conteúdo relevante

---

## [1.4.0] - 2026-09-23
### Corrigido
- Header reconstruído em layout 3-zone com CSS Grid (`auto | 1fr | auto`) — logo à esquerda, nav centralizado, botão à direita
- `white-space:nowrap` no nome do logo — impedia quebra de linha em duas linhas
- Removidos links de navegação duplicados que existiam no HTML (dois `nav-links`)
- Botão "Agendar consulta" realinhado corretamente na zona direita do header

### Melhorado (UI geral)
- Menu mobile refeito como drawer lateral separado, com função `closeDrawer()` limpa
- Tipografia revisada em todas as seções: tamanhos, espaçamentos e line-height
- Cards de diferenciais ganharam borda e hover sutil
- Credencial da Simone virou badge estilizada (fundo branco + borda), mais legível
- Ícones dos info-cards de contato menores e mais refinados
- Paleta levemente ajustada: rosa mais quente, verde mais cinza — combinação mais sofisticada
- Diferencial "Flexibilidade de horários" substituído por "Atendimento domiciliar" — diferencial real e específico

---

## [1.3.0] - 2026-09-22
### Conteúdo
- Nome completo atualizado para **Simone Fukushima De Paula** em todo o site (header, footer, título da aba, alt das imagens)
- Eyebrow do hero atualizado para **Fisioterapeuta Dermatofuncional e Especialista em Saúde da Mulher — Campinas**
- Headline do hero: "saúde da mulher" → "vida da mulher"
- Lead do hero simplificado: **Atendimento acolhedor e humanizado**
- Card sobre (esquerda): credenciais CREFITO/3: 223045-F e RQE: 1100261118 adicionadas
- Card sobre: formação pela Unicamp e Santa Casa de Misericórdia de São Paulo
- Card sobre: frase de posicionamento em itálico com destaque visual
- Coluna sobre (direita): subtópicos **Na área pélvica** e **No pós-cirúrgico** adicionados
- Pills da seção sobre atualizadas: "+20 anos cuidando de mulheres" e "Atendimento domiciliar"
- Serviço **Consultoria de amamentação** → **Orientação em amamentação** com texto revisado
- Serviço **Pós-cirúrgico integrado** → **Pós-cirúrgico** com texto revisado
- Novo serviço adicionado: **Pós-cirúrgico estético**
- Serviço **Laserterapia clínica** → **Laserterapia**
- Select do formulário de contato sincronizado com os novos nomes dos serviços

---

## [1.2.0] - 2026-09-22
### Infraestrutura
- Repositório GitHub criado: `github.com/chcb1/fukufisio`
- Imagens extraídas do HTML (base64) para `assets/` — HTML reduziu de 392 KB para 30 KB
- `netlify.toml` criado com headers de segurança (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) e regras de cache por tipo de arquivo
- `.gitignore` adicionado
- `README.md` criado com documentação técnica completa (stack, estrutura, fluxo de deploy, integrações)
- Projeto Netlify renomeado para `fukufisio` e conectado ao repositório GitHub
- Deploy automático via push na branch `main` ativo

---

## [1.1.0] - 2026-07-08
### Adicionado
- Instagram `@simonefukufisio` adicionado na seção de contato e no rodapé
- E-mail `simonefukufisio@gmail.com` adicionado na seção de contato e no rodapé
- Logo da clínica integrado: fundo branco removido (transparente), aplicado no header e footer
- Foto profissional integrada: crop 4:5 (rosto a meia-altura do corpo), aplicada no hero
- Paleta de cores recalibrada nos tons exatos do logo (blush rosado + tinta escura)

---

## [1.0.0] - 2026-07-08
### Lançamento inicial
- Site institucional single-page completo
- Seções: header fixo, hero, sobre, serviços (8 especialidades), jornada pré/peri/pós-parto, diferenciais, contato, footer
- Formulário de contato que monta mensagem personalizada e abre WhatsApp
- Botão WhatsApp flutuante com animação pulse em todas as telas
- Design responsivo com breakpoints em 980px e 720px
- Menu hambúrguer no mobile
- Tipografia: Fraunces (display) + Work Sans (corpo)
- Hospedagem: Netlify (via upload direto — Netlify Drop)
