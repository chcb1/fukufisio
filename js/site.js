/* Simone Fukushima De Paula — script compartilhado por todas as páginas.
   Cada bloco verifica se o elemento existe, pois nem toda página tem formulário. */
(function () {
  "use strict";

  // ── Ambiente ────────────────────────────────────────────────────────
  // Produção é apenas o domínio oficial. Qualquer outro endereço (pré-visualização
  // do Netlify, servidor local) é tratado como TESTE: não envia dados ao Analytics,
  // marca os e-mails do formulário com [TESTE] e pede para não ser indexado.
  var GA_ID = "G-YCW4MYYGL5";
  var HOSTS_PRODUCAO = ["simonefukufisio.com.br", "www.simonefukufisio.com.br"];
  var PRODUCAO = HOSTS_PRODUCAO.indexOf(window.location.hostname) !== -1;

  if (!PRODUCAO) {
    window["ga-disable-" + GA_ID] = true; // chave oficial do Google para desligar o envio

    var robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    document.head.appendChild(robots);

    var aviso = document.createElement("div");
    aviso.className = "aviso-teste";
    aviso.textContent = "Ambiente de teste";
    document.body.appendChild(aviso);
  }

  // ── Google Analytics 4 ──────────────────────────────────────────────
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID);

  function track(evento, params) {
    if (!PRODUCAO && window.console) console.info("[teste] evento GA4 (não enviado):", evento, params || {});
    gtag("event", evento, params || {});
  }

  // ── WhatsApp ────────────────────────────────────────────────────────
  var WA = "5519991255241";
  function waUrl(mensagem) {
    return "https://wa.me/" + WA + "?text=" + encodeURIComponent(mensagem);
  }
  var MSG_PADRAO = "Olá, Simone! Gostaria de agendar uma avaliação.";

  // Links por id (página inicial) e por atributo data-wa (qualquer página).
  // Em páginas de serviço: <a data-wa="Olá! Quero saber sobre ..." data-origem="pagina_pelvica">
  ["heroWaBtn", "floatWaBtn", "infoWaLink", "footerWaLink"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.href = waUrl(MSG_PADRAO);
  });
  document.querySelectorAll("a[data-wa]").forEach(function (el) {
    el.href = waUrl(el.getAttribute("data-wa") || MSG_PADRAO);
  });

  // ── Rastreamento de cliques (GA4) ───────────────────────────────────
  var ORIGEM_POR_ID = {
    heroWaBtn: "hero",
    floatWaBtn: "botao_flutuante",
    infoWaLink: "contato",
    footerWaLink: "rodape",
    successWaLink: "pos_formulario"
  };
  function origemDoLink(a) {
    if (a.dataset.origem) return a.dataset.origem;
    if (ORIGEM_POR_ID[a.id]) return ORIGEM_POR_ID[a.id];
    if (a.closest("footer")) return "rodape";
    if (a.closest("#contato")) return "contato";
    return "outro";
  }
  // Delegação: cobre também links criados depois (ex.: confirmação do formulário)
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[href]");
    if (!a) return;
    var href = a.getAttribute("href") || "";
    var origem = origemDoLink(a);
    if (href.indexOf("wa.me") !== -1)              track("clique_whatsapp", { origem: origem });
    else if (href.indexOf("mailto:") === 0)        track("clique_email", { origem: origem });
    else if (href.indexOf("instagram.com") !== -1) track("clique_instagram", { origem: origem });
  });

  // ── Formulário de contato (Netlify Forms) ───────────────────────────
  function escaparHtml(texto) {
    var mapa = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return texto.replace(/[&<>"']/g, function (c) { return mapa[c]; });
  }

  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector("button[type=submit]");
      var nome = document.getElementById("nome").value.trim();
      var assunto = document.getElementById("assunto").value;

      // Assunto do e-mail: serviço + nome (com marca [TESTE] fora da produção)
      document.getElementById("emailSubject").value =
        (PRODUCAO ? "" : "[TESTE] ") + "[Site] " + assunto + " — " + nome;

      btn.textContent = "Enviando...";
      btn.disabled = true;

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString()
      })
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          track("envio_formulario", { servico: assunto });
          form.innerHTML =
            '<div class="form-ok">' +
              '<div class="form-ok-icon">' +
                '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#6a7a66" stroke-width="2" stroke-linecap="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>' +
              "</div>" +
              "<h3>Mensagem recebida!</h3>" +
              '<p class="form-ok-text">Obrigada pelo contato, <strong>' + escaparHtml(nome) + "</strong>.<br>" +
                "Entraremos em contato em breve para dar continuidade ao seu atendimento.</p>" +
              '<p class="form-ok-alt">Precisa de resposta rápida? ' +
                '<a href="' + waUrl("Olá, Simone! Acabei de enviar uma mensagem pelo site.") + '" id="successWaLink" target="_blank" rel="noopener">Fale pelo WhatsApp</a></p>' +
            "</div>";
        })
        .catch(function () {
          track("erro_formulario", { servico: assunto });
          btn.textContent = "Erro ao enviar. Tente pelo WhatsApp.";
          btn.disabled = false;
        });
    });
  }

  // ── Cabeçalho: sombra ao rolar ──────────────────────────────────────
  var hdr = document.getElementById("hdr");
  if (hdr) {
    var aoRolar = function () { hdr.classList.toggle("scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", aoRolar, { passive: true });
    aoRolar();
  }

  // ── Menu no celular ─────────────────────────────────────────────────
  var ham = document.getElementById("ham");
  var drawer = document.getElementById("drawer");
  if (ham && drawer) {
    var definirMenu = function (aberto) {
      drawer.classList.toggle("open", aberto);
      ham.setAttribute("aria-expanded", aberto ? "true" : "false");
    };
    ham.setAttribute("aria-controls", "drawer");
    ham.setAttribute("aria-expanded", "false");
    ham.addEventListener("click", function () { definirMenu(!drawer.classList.contains("open")); });
    drawer.addEventListener("click", function (e) { if (e.target.closest("a")) definirMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") definirMenu(false); });
  }

  // ── Ano no rodapé ───────────────────────────────────────────────────
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();
})();
