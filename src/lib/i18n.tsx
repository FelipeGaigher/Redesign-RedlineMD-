import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "pt";

const en = {
  nav: {
    links: [
      { id: "how", label: "How it works" },
      { id: "checks", label: "What we check" },
      { id: "faq", label: "FAQ" },
    ],
    cta: "Review my contract",
    home: "Redline MD home",
    langLabel: "Language",
  },
  hero: {
    eyebrow: "AI contract review for new physicians",
    title: ["Don’t sign your first contract", "blind."],
    sub: ["Redline MD flags the clauses that cost new doctors ", "$10,000+", " in tail insurance and unfair terms, for a flat ", "$199", "."],
    cta: "Upload your contract",
    secondary: "See a sample report",
    assurances: ["Risk preview in under a minute, full review in 24h", "Encrypted, deleted after review", "Money-back guarantee"],
    scroll: "Scroll for the numbers",
    photoAlt: "A young physician in scrubs reading her employment contract at home",
  },
  price: { flat: "flat", vs: "vs", legal: "legal review", start: "Start now", includes: "Up to 3 contracts · up to 30 pages each" },
  contract: {
    aria: "Example: Redline MD striking a physician-paid tail coverage clause and proposing employer-paid coverage",
    file: "Physician_Employment_Agreement.pdf",
    page: "p. 14 / 28",
    section: "§ 7.3 Professional liability",
    before: "Upon termination of this Agreement for any reason, ",
    struck: "Physician shall be solely responsible for obtaining and paying for extended reporting (“tail”) coverage",
    inserted: "Employer shall provide and pay for tail coverage at no cost to Physician",
    after: " for claims arising from services rendered during the term.",
    risk: "Risk:",
    exposure: "exposure",
    advice: "You pay for tail coverage when you leave. Ask the employer to cover it.",
    checks: ["Non-compete", "Tail coverage", "Termination"],
  },
  marquee: {
    label: "Built for residents and fellows in",
    items: ["Emergency medicine", "Family medicine", "Internal medicine", "Anesthesiology", "Radiology", "Pediatrics", "General surgery", "Psychiatry", "Hospital medicine", "OB-GYN", "Cardiology", "Orthopedics"],
  },
  stats: ["flat price, no hourly billing", "for the full redlined review", "contracts reviewed so far", "typical tail-coverage exposure"],
  how: {
    eyebrow: "How it works",
    title: "From upload to redline in 24 hours.",
    sub: "Three steps, no calls and no billable hours. You stay in control of what you send to the employer.",
    items: [
      { name: "Upload", heading: "Send it the way you have it", body: "PDF, Word or a photo of each page, from your laptop or from your phone between shifts. Encrypted on arrival." },
      { name: "Review", heading: "AI flags what costs you money", body: "Tail coverage, non-compete radius, termination terms and call schedule, compared with your specialty. Each risk comes with a dollar estimate." },
      { name: "Negotiate", heading: "Get your redline and a script", body: "A redlined copy with suggested language, a full financial analysis of every flagged term, and a ready-to-send script for your recruiter." },
    ],
    cta: "Upload your contract",
    mock: {
      files: ["Offer_Letter_Mercy.pdf", "Agreement_p1-28.jpg"],
      ready: "Encrypted · ready for review",
      scriptTo: "To: recruiter@mercyhealth.org",
      scriptSubject: "Re: Physician Employment Agreement",
      scriptBody: ["Thank you for the offer. Before signing, I’d like to discuss two terms:", "§ 7.3: I’d ask that the employer provide tail coverage, as is common for this role.", "§ 9.1: Could we reduce the non-compete radius from 25 to 10 miles?"],
      scriptCopy: "Copy script",
      finTitle: "Full financial analysis",
      finRows: [["Tail coverage", "$12,000"], ["Non-compete buyout", "$4,500"], ["Below-median base", "$18,000/yr"]],
      finTotal: ["Exposure if signed as-is", "$34,500"],
      riskTitle: "3 risks found",
      riskRows: ["§ 7.3 Tail coverage, physician-paid", "§ 9.1 Non-compete, 25 miles / 2 years", "§ 4.2 Base salary below specialty median"],
      phoneTitle: "Upload from your phone",
      phoneCamera: "Take a photo of each page",
    },
  },
  checks: {
    eyebrow: "What we check",
    title: "Every clause, read against what doctors in your specialty actually get.",
    body: "Redline MD reads the whole agreement, compares each term with specialty and state benchmarks, and flags only what is worth negotiating.",
    cols: ["Your contract", "Redline MD", "What we flag"],
    sources: ["Employment agreement", "Specialty benchmarks", "State law"],
    counter: "clauses reviewed",
    findings: [
      { title: "Tail coverage", detail: "Physician-paid · ~$12,000 exposure", tag: "Risk" },
      { title: "Non-compete", detail: "25 miles · 2 years after exit", tag: "Risk" },
      { title: "Base salary", detail: "Below specialty median", tag: "Review" },
    ],
    analyzing: "Analyzing",
  },
  roi: {
    title: "One review. Thousands protected.",
    stats: [
      "Flat price, no hourly billing",
      "Typical attorney contract review",
      "Average tail insurance trap we help you avoid",
    ],
    placeholder: "(placeholder)",
    barsTitle: "Same contract, two prices",
    bars: ["Redline MD", "Attorney review"],
    tail: ["And the clause you didn’t catch: physician-paid tail coverage typically runs ", "$10,000 or more", " when you leave your first job."],
    howTitle: "From upload to redline in 24 hours.",
    steps: [
      { title: "Upload your contract", body: "PDF, Word or a photo of each page. From your laptop, or from your phone between shifts." },
      { title: "AI flags the risky clauses", body: "Tail coverage, non-compete radius, termination terms, call schedule, and the protections that are missing." },
      { title: "Get your redline and a script", body: "A marked-up copy with suggested language, plus a negotiation script you can send to your recruiter." },
    ],
    cta: "Upload your contract, $199",
    photoAlt: "A resident in a hospital corridor photographing his contract pages with his phone",
  },
  trust: {
    title: "Built with input from physicians and healthcare attorneys.",
    board: "Advisory board, placeholder until names are confirmed",
    items: [
      { title: "AES-256 encryption", body: "In transit and at rest. SOC 2 Type I, ISO 27001 and GDPR." },
      { title: "Deleted after review", body: "Your contract is not kept or reused." },
      { title: "Never shared", body: "Your employer never knows you asked." },
    ],
  },
  testimonials: {
    title: "Doctors who read before signing.",
    label: "Illustrative testimonial",
    aria: "Testimonials",
    items: [
      { quote: "The tail clause was buried on page 14. I would have signed it. They covered it after one email.", name: "Emergency medicine, PGY-3" },
      { quote: "I didn’t know the non-compete radius was negotiable. The script told me exactly what to ask for.", name: "Family medicine, new attending" },
    ],
  },
  faq: {
    title: "Questions doctors ask",
    cta: "Upload your contract",
    items: [
      { q: "Is this legal advice?", a: "No. Redline MD is an AI-powered review tool that explains your contract and suggests language to negotiate. It does not create an attorney-client relationship. If your situation needs a lawyer, we tell you, and we tell you which questions to bring." },
      { q: "What contracts do you review?", a: "Physician employment agreements for residents, fellows and new attendings: hospital, private practice and academic offers, up to 30 pages." },
      { q: "How is my data handled?", a: "Files are encrypted in transit and at rest, used only to produce your review, and deleted afterward. We never contact or share anything with your employer." },
      { q: "What if I need a lawyer after?", a: "Your review is the brief a lawyer would ask for. Bring it to a healthcare attorney and you’ll spend fewer billable hours, because the risks are already mapped." },
    ],
  },
  footer: {
    tagline: "Medical contract review",
    disclaimer: "Redline MD is not a law firm and does not provide legal advice.",
    links: "Privacy · Terms · contact@redlinemd.ai",
    credit: "Design concept by Felipe Gaigher for the Foundey design challenge.",
  },
  bands: {
    residents: {
      title: "Your first attending offer arrives in the middle of residency.",
      body: "Between 80-hour weeks, nobody reads 28 pages of legal terms. That is the gap Redline MD closes.",
    },
    sign: {
      title: "Read it before you sign it.",
      body: "Upload your contract and see the first risk in under a minute.",
      cta: "Upload your contract",
    },
  },
  mobileBar: { vs: "flat · vs $500+", cta: "Upload contract" },
  upload: {
    title: "Upload your contract",
    titleDone: "Here’s what we found",
    sub: "Free risk preview in under a minute. Pay only for the full review.",
    close: "Close",
    dropDesktop: "Drag your contract here",
    dropActive: "Drop to start your review",
    dropMobile: "Choose a file or take a photo",
    browse: "or click to browse · ",
    formats: "PDF, Word or photos · up to 30 pages",
    noFile: "Contract not on this device?",
    noFileAction: " Email me a secure upload link.",
    security: "AES-256 encryption in transit and at rest. Deleted after your review.",
    uploading: "Encrypting and uploading…",
    progress: "Upload progress",
    checks: ["Reading contract…", "Checking tail coverage…", "Reviewing non-compete…", "Comparing termination terms…"],
    found: "3 risks found",
    findings: [
      { title: "Tail coverage is physician-paid", detail: "Est. exposure ~$12,000 when you leave" },
      { title: "Non-compete radius", detail: "Unlocked in your full review" },
      { title: "Termination without cause", detail: "Unlocked in your full review" },
    ],
    locked: "Locked",
    buy: "Get full review for $199",
    buyNote: "Redlined copy, full financial analysis and negotiation script within 24 hours.",
    checkoutNote: "Checkout would open here. Out of scope for this design concept.",
    emailLabel: "Where should we send your secure upload link?",
    emailPlaceholder: "you@hospital.org",
    emailSend: "Send me the link",
    emailBack: "Back to upload",
    sentTitle: "Link sent",
    sentBody: "Open it on the computer where your contract is. The link is valid for 7 days.",
  },
};

type Dict = typeof en;

const pt: Dict = {
  nav: {
    links: [
      { id: "how", label: "Como funciona" },
      { id: "checks", label: "O que conferimos" },
      { id: "faq", label: "Dúvidas" },
    ],
    cta: "Revisar meu contrato",
    home: "Redline MD, início",
    langLabel: "Idioma",
  },
  hero: {
    eyebrow: "Revisão de contrato com IA para médicos recém-formados",
    title: ["Não assine seu primeiro contrato", "no escuro."],
    sub: ["O Redline MD aponta as cláusulas que custam ", "US$ 10.000+", " em seguro de cauda e termos injustos a médicos em início de carreira, por um preço fixo de ", "US$ 199", "."],
    cta: "Enviar meu contrato",
    secondary: "Ver um relatório de exemplo",
    assurances: ["Prévia dos riscos em menos de um minuto, revisão completa em 24h", "Criptografado e excluído após a revisão", "Garantia de reembolso"],
    scroll: "Role para ver os números",
    photoAlt: "Uma médica jovem de pijama cirúrgico lendo o contrato de trabalho em casa",
  },
  price: { flat: "fixo", vs: "contra", legal: "de advogado", start: "Começar", includes: "Até 3 contratos · até 30 páginas cada" },
  contract: {
    aria: "Exemplo: o Redline MD risca a cláusula que põe o seguro de cauda na conta do médico e propõe que o empregador pague",
    file: "Contrato_de_Trabalho_Medico.pdf",
    page: "p. 14 / 28",
    section: "§ 7.3 Responsabilidade profissional",
    before: "Na rescisão deste Contrato, por qualquer motivo, ",
    struck: "o Médico será o único responsável por contratar e pagar a cobertura estendida (“seguro de cauda”)",
    inserted: "o Empregador contratará e pagará a cobertura de cauda, sem custo para o Médico,",
    after: " para reclamações sobre serviços prestados durante a vigência.",
    risk: "Risco:",
    exposure: "de exposição",
    advice: "Você paga o seguro de cauda quando sair. Peça ao empregador para cobrir.",
    checks: ["Não concorrência", "Seguro de cauda", "Rescisão"],
  },
  marquee: {
    label: "Feito para residentes e fellows de",
    items: ["Medicina de emergência", "Medicina de família", "Clínica médica", "Anestesiologia", "Radiologia", "Pediatria", "Cirurgia geral", "Psiquiatria", "Medicina hospitalar", "Ginecologia e obstetrícia", "Cardiologia", "Ortopedia"],
  },
  stats: ["preço fixo, sem cobrança por hora", "para a revisão completa marcada", "contratos revisados até hoje", "exposição típica com seguro de cauda"],
  how: {
    eyebrow: "Como funciona",
    title: "Do envio à revisão marcada em 24 horas.",
    sub: "Três passos, sem ligação e sem hora cobrada. Você decide o que envia ao empregador.",
    items: [
      { name: "Enviar", heading: "Mande do jeito que você tem", body: "PDF, Word ou foto de cada página, do notebook ou do celular entre um plantão e outro. Criptografado ao chegar." },
      { name: "Revisar", heading: "A IA aponta o que custa dinheiro", body: "Seguro de cauda, raio de não concorrência, regras de rescisão e escala de sobreaviso, comparados com a sua especialidade. Cada risco vem com uma estimativa em dólar." },
      { name: "Negociar", heading: "Receba a revisão e um roteiro", body: "Uma cópia marcada com a redação sugerida, uma análise financeira completa de cada termo apontado e um roteiro pronto para enviar ao recrutador." },
    ],
    cta: "Enviar meu contrato",
    mock: {
      files: ["Proposta_Mercy.pdf", "Contrato_p1-28.jpg"],
      ready: "Criptografado · pronto para revisão",
      scriptTo: "Para: recruiter@mercyhealth.org",
      scriptSubject: "Re: Contrato de trabalho médico",
      scriptBody: ["Obrigado pela proposta. Antes de assinar, gostaria de conversar sobre dois termos:", "§ 7.3: peço que o empregador cubra o seguro de cauda, como é comum para esta função.", "§ 9.1: podemos reduzir o raio de não concorrência de 25 para 10 milhas?"],
      scriptCopy: "Copiar roteiro",
      finTitle: "Análise financeira completa",
      finRows: [["Seguro de cauda", "US$ 12.000"], ["Multa de não concorrência", "US$ 4.500"], ["Salário abaixo da mediana", "US$ 18.000/ano"]],
      finTotal: ["Exposição se assinar como está", "US$ 34.500"],
      riskTitle: "3 riscos encontrados",
      riskRows: ["§ 7.3 Seguro de cauda pago pelo médico", "§ 9.1 Não concorrência, 25 milhas / 2 anos", "§ 4.2 Salário base abaixo da mediana"],
      phoneTitle: "Envie pelo celular",
      phoneCamera: "Tire uma foto de cada página",
    },
  },
  checks: {
    eyebrow: "O que conferimos",
    title: "Cada cláusula, comparada com o que médicos da sua especialidade realmente recebem.",
    body: "O Redline MD lê o contrato inteiro, compara cada termo com referências da especialidade e do estado, e aponta só o que vale negociar.",
    cols: ["Seu contrato", "Redline MD", "O que apontamos"],
    sources: ["Contrato de trabalho", "Referências da especialidade", "Lei estadual"],
    counter: "cláusulas revisadas",
    findings: [
      { title: "Seguro de cauda", detail: "Pago pelo médico · ~US$ 12.000 de exposição", tag: "Risco" },
      { title: "Não concorrência", detail: "25 milhas · 2 anos após a saída", tag: "Risco" },
      { title: "Salário base", detail: "Abaixo da mediana da especialidade", tag: "Revisar" },
    ],
    analyzing: "Analisando",
  },
  roi: {
    title: "Uma revisão. Milhares protegidos.",
    stats: [
      "Preço fixo, sem cobrança por hora",
      "Revisão típica com advogado",
      "Armadilha média de seguro de cauda que ajudamos a evitar",
    ],
    placeholder: "(a confirmar)",
    barsTitle: "Mesmo contrato, dois preços",
    bars: ["Redline MD", "Advogado"],
    tail: ["E a cláusula que passou: o seguro de cauda pago pelo médico costuma custar ", "US$ 10.000 ou mais", " quando você sai do primeiro emprego."],
    howTitle: "Do envio à revisão marcada em 24 horas.",
    steps: [
      { title: "Envie seu contrato", body: "PDF, Word ou foto de cada página. Do notebook ou do celular, entre um plantão e outro." },
      { title: "A IA aponta as cláusulas de risco", body: "Seguro de cauda, raio de não concorrência, regras de rescisão, escala de sobreaviso e as proteções que faltam." },
      { title: "Receba a revisão e um roteiro", body: "Uma cópia marcada com a redação sugerida e um roteiro de negociação para enviar ao recrutador." },
    ],
    cta: "Enviar meu contrato, US$ 199",
    photoAlt: "Um residente no corredor do hospital fotografando as páginas do contrato com o celular",
  },
  trust: {
    title: "Feito com a contribuição de médicos e advogados da área da saúde.",
    board: "Conselho consultivo, a confirmar os nomes",
    items: [
      { title: "Criptografia AES-256", body: "Na transmissão e no armazenamento. SOC 2 Tipo I, ISO 27001 e GDPR." },
      { title: "Excluído após a revisão", body: "Seu contrato não fica guardado nem é reutilizado." },
      { title: "Nunca compartilhado", body: "Seu empregador nunca fica sabendo que você pediu." },
    ],
  },
  testimonials: {
    title: "Médicos que leram antes de assinar.",
    label: "Depoimento ilustrativo",
    aria: "Depoimentos",
    items: [
      { quote: "A cláusula do seguro de cauda estava escondida na página 14. Eu teria assinado. Cobriram depois de um e-mail.", name: "Medicina de emergência, R3" },
      { quote: "Eu não sabia que o raio de não concorrência era negociável. O roteiro disse exatamente o que pedir.", name: "Medicina de família, recém-contratado" },
    ],
  },
  faq: {
    title: "Perguntas que médicos fazem",
    cta: "Enviar meu contrato",
    items: [
      { q: "Isso é aconselhamento jurídico?", a: "Não. O Redline MD é uma ferramenta de revisão com IA que explica o seu contrato e sugere a redação para negociar. Ela não cria relação entre advogado e cliente. Se o seu caso precisar de um advogado, avisamos, e dizemos quais perguntas levar." },
      { q: "Quais contratos vocês revisam?", a: "Contratos de trabalho médico para residentes, fellows e médicos recém-contratados: ofertas de hospital, clínica e instituição acadêmica, com até 30 páginas." },
      { q: "Como meus dados são tratados?", a: "Os arquivos são criptografados na transmissão e no armazenamento, usados só para produzir a sua revisão e excluídos depois. Nunca falamos nem compartilhamos nada com o seu empregador." },
      { q: "E se eu precisar de um advogado depois?", a: "A sua revisão é o resumo que um advogado pediria. Leve-a a um advogado da área da saúde e você paga menos horas, porque os riscos já estão mapeados." },
    ],
  },
  footer: {
    tagline: "Revisão de contrato médico",
    disclaimer: "O Redline MD não é um escritório de advocacia e não presta aconselhamento jurídico.",
    links: "Privacidade · Termos · contact@redlinemd.ai",
    credit: "Conceito de design por Felipe Gaigher para o desafio de design da Foundey.",
  },
  bands: {
    residents: {
      title: "A primeira proposta de emprego chega no meio da residência.",
      body: "Entre semanas de 80 horas, ninguém lê 28 páginas de termos jurídicos. É essa lacuna que o Redline MD fecha.",
    },
    sign: {
      title: "Leia antes de assinar.",
      body: "Envie seu contrato e veja o primeiro risco em menos de um minuto.",
      cta: "Enviar meu contrato",
    },
  },
  mobileBar: { vs: "fixo · contra US$ 500+", cta: "Enviar contrato" },
  upload: {
    title: "Envie seu contrato",
    titleDone: "O que encontramos",
    sub: "Prévia gratuita dos riscos em menos de um minuto. Você só paga pela revisão completa.",
    close: "Fechar",
    dropDesktop: "Arraste seu contrato para cá",
    dropActive: "Solte para começar a revisão",
    dropMobile: "Escolha um arquivo ou tire uma foto",
    browse: "ou clique para procurar · ",
    formats: "PDF, Word ou fotos · até 30 páginas",
    noFile: "O contrato não está neste aparelho?",
    noFileAction: " Receba por e-mail um link seguro para enviar.",
    security: "Criptografia AES-256 na transmissão e no armazenamento. Excluído após a revisão.",
    uploading: "Criptografando e enviando…",
    progress: "Progresso do envio",
    checks: ["Lendo o contrato…", "Conferindo o seguro de cauda…", "Revisando a não concorrência…", "Comparando as regras de rescisão…"],
    found: "3 riscos encontrados",
    findings: [
      { title: "Seguro de cauda pago pelo médico", detail: "Exposição estimada de ~US$ 12.000 ao sair" },
      { title: "Raio de não concorrência", detail: "Liberado na revisão completa" },
      { title: "Rescisão sem justa causa", detail: "Liberado na revisão completa" },
    ],
    locked: "Bloqueado",
    buy: "Receber a revisão completa por US$ 199",
    buyNote: "Cópia marcada, análise financeira completa e roteiro de negociação em até 24 horas.",
    checkoutNote: "O pagamento abriria aqui. Fora do escopo deste conceito de design.",
    emailLabel: "Para onde enviamos o link seguro?",
    emailPlaceholder: "voce@hospital.org",
    emailSend: "Enviar o link",
    emailBack: "Voltar para o envio",
    sentTitle: "Link enviado",
    sentBody: "Abra no computador onde está o seu contrato. O link vale por 7 dias.",
  },
};

const DICTS: Record<Lang, Dict> = { en, pt };
const STORAGE_KEY = "redline-lang";

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "pt") return saved;
  } catch {
    /* storage blocked: fall through to the browser language */
  }
  return navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en";
}

type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void };
const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* the choice just won't persist */
    }
  };

  return <LangCtx.Provider value={{ lang, t: DICTS[lang], setLang }}>{children}</LangCtx.Provider>;
}

export function useT() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useT must be used inside LangProvider");
  return ctx;
}
