/* =========================================================================
   COLÉGIO SISTEMA — Design Tokens
   Variáveis CSS: cores, tipografia, espaçamento, raios, sombras, movimento.
   Importe em qualquer arquivo:  @import url("tokens.css");
   ========================================================================= */

/* House typefaces — padrões de marca do Colégio Sistema:
   · Sistema Sans → Outfit          (display, geométrica, caixa baixa)
   · Sistema Text → Manrope         (corpo, humanista, tela)
   · Sistema Mono → JetBrains Mono  (código, matrículas, horários) */
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap");

:root {
  /* -----------------------------------------------------------------------
     CORES DA MARCA — direto do logo
     ----------------------------------------------------------------------- */
  --brand-blue:   #0003ff;  /* ultramarino elétrico do wordmark */
  --brand-yellow: #ffce00;  /* amarelo do ponto do "a"          */
  --brand-white:  #ffffff;

  /* -----------------------------------------------------------------------
     ESCALA BLUE — centrada no azul de marca (600 = marca)
     ----------------------------------------------------------------------- */
  --blue-50:   #eef0ff;
  --blue-100:  #dde1ff;
  --blue-200:  #b4bcfd;
  --blue-300:  #8089fb;
  --blue-400:  #4a55fa;
  --blue-500:  #2a30f8;
  --blue-600:  #0003ff;   /* MARCA */
  --blue-700:  #0002cc;
  --blue-800:  #000299;
  --blue-900:  #00016b;
  --blue-950:  #000040;

  /* -----------------------------------------------------------------------
     ESCALA YELLOW — centrada no amarelo de marca (400 = marca)
     ----------------------------------------------------------------------- */
  --yellow-50:   #fffae6;
  --yellow-100:  #fff2b8;
  --yellow-200:  #ffe680;
  --yellow-300:  #ffd84d;
  --yellow-400:  #ffce00;   /* MARCA */
  --yellow-500:  #d9ae00;
  --yellow-600:  #a88500;
  --yellow-700:  #7a6000;

  /* -----------------------------------------------------------------------
     INK / NEUTROS — levemente azulados, coesos com o azul de marca
     ----------------------------------------------------------------------- */
  --ink-950: #050720;
  --ink-900: #0a0f2c;   /* nosso "preto" — nunca use #000 */
  --ink-800: #161c40;
  --ink-700: #2a3055;
  --ink-600: #444a72;
  --ink-500: #6b7191;
  --ink-400: #9097b0;
  --ink-300: #b8bdcd;
  --ink-200: #d4d7e3;
  --ink-100: #e7e9f1;
  --ink-50:  #f2f4f9;
  --paper:   #fafbff;   /* fundo padrão do app */
  --white:   #ffffff;

  /* -----------------------------------------------------------------------
     CORES SEMÂNTICAS
     ----------------------------------------------------------------------- */
  --success: #1aa86a;
  --warning: #f59e0b;
  --danger:  #e5384b;
  --info:    var(--blue-600);

  /* -----------------------------------------------------------------------
     SUPERFÍCIE / TEXTO (light)
     ----------------------------------------------------------------------- */
  --bg-app:        var(--paper);
  --bg-surface:    var(--white);
  --bg-sunken:     var(--ink-50);
  --bg-inverse:    var(--blue-950);
  --bg-brand:      var(--brand-blue);

  --fg-1:          var(--ink-900);   /* texto primário */
  --fg-2:          var(--ink-700);   /* secundário     */
  --fg-3:          var(--ink-500);   /* terciário/meta */
  --fg-muted:      var(--ink-400);
  --fg-on-brand:   var(--white);
  --fg-on-yellow:  var(--ink-900);
  --fg-link:       var(--blue-600);

  --border-1: var(--ink-100);   /* hairline sutil */
  --border-2: var(--ink-200);   /* padrão         */
  --border-3: var(--ink-300);   /* proeminente    */
  --border-brand: var(--brand-blue);

  /* -----------------------------------------------------------------------
     FAMÍLIAS TIPOGRÁFICAS
     ----------------------------------------------------------------------- */
  --font-display: "Outfit", ui-sans-serif, system-ui, sans-serif;               /* Sistema Sans */
  --font-body:    "Manrope", ui-sans-serif, system-ui, sans-serif;              /* Sistema Text */
  --font-mono:    "JetBrains Mono", ui-monospace, "SFMono-Regular", monospace;  /* Sistema Mono */

  /* -----------------------------------------------------------------------
     ESCALA TIPOGRÁFICA (rem assume root 16px)
     ----------------------------------------------------------------------- */
  --fs-xs:   0.75rem;   /* 12 */
  --fs-sm:   0.875rem;  /* 14 */
  --fs-md:   1rem;      /* 16 */
  --fs-lg:   1.125rem;  /* 18 */
  --fs-xl:   1.375rem;  /* 22 */
  --fs-2xl:  1.75rem;   /* 28 */
  --fs-3xl:  2.25rem;   /* 36 */
  --fs-4xl:  3rem;      /* 48 */
  --fs-5xl:  4rem;      /* 64 */
  --fs-6xl:  5.5rem;    /* 88 */

  --lh-tight:  1.05;
  --lh-snug:   1.2;
  --lh-normal: 1.45;
  --lh-loose:  1.65;

  --tracking-tight:  -0.02em;
  --tracking-snug:   -0.01em;
  --tracking-normal: 0;
  --tracking-wide:   0.04em;
  --tracking-caps:   0.12em;

  /* -----------------------------------------------------------------------
     ESCALA DE ESPAÇAMENTO (base 4px)
     ----------------------------------------------------------------------- */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;

  /* -----------------------------------------------------------------------
     RAIOS — generosos, redondos (curvas suaves do wordmark)
     ----------------------------------------------------------------------- */
  --radius-xs:   4px;
  --radius-sm:   8px;
  --radius-md:   12px;   /* inputs, botões */
  --radius-lg:   18px;   /* cards padrão   */
  --radius-xl:   24px;   /* cards grandes, modais */
  --radius-2xl:  32px;   /* hero blocks    */
  --radius-pill: 999px;

  /* -----------------------------------------------------------------------
     SOMBRAS — soft, tom azulado para coesão
     ----------------------------------------------------------------------- */
  --shadow-xs: 0 1px 2px rgba(10, 15, 44, 0.06);
  --shadow-sm: 0 2px 6px rgba(10, 15, 44, 0.06), 0 1px 2px rgba(10, 15, 44, 0.04);
  --shadow-md: 0 8px 20px rgba(10, 15, 44, 0.08), 0 2px 6px rgba(10, 15, 44, 0.05);
  --shadow-lg: 0 18px 40px rgba(10, 15, 44, 0.10), 0 4px 12px rgba(10, 15, 44, 0.06);
  --shadow-xl: 0 32px 80px rgba(0, 3, 255, 0.14);    /* glow azul de marca */

  --shadow-brand:  0 12px 28px rgba(0, 3, 255, 0.32);
  --shadow-yellow: 0 12px 28px rgba(255, 206, 0, 0.40);
  --shadow-inset:  inset 0 1px 0 rgba(255, 255, 255, 0.5);

  /* -----------------------------------------------------------------------
     EASING & MOVIMENTO
     ----------------------------------------------------------------------- */
  --ease-out:    cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);

  --dur-fast: 120ms;
  --dur-base: 220ms;
  --dur-slow: 400ms;
}
