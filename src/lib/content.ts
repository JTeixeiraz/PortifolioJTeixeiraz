/**
 * Todo fato aqui vem do vault do Obsidian, do gerador de currículos
 * (~/Downloads/Curriculos_Vagas/configs.py) e da conta do GitHub.
 *
 * Deliberadamente fora, a pedido dele: a contagem de demandas entregues
 * (cresce enquanto ele estiver lá) e qualquer taxa de falha dos sistemas
 * do empregador.
 */

export type Lang = "pt" | "en";
export type Dict<T> = Record<Lang, T>;

export const PROFILE = {
  name: "João Pedro Teixeira",
  handle: "JTeixeiraz",
  github: "https://github.com/JTeixeiraz",
  linkedin: "https://www.linkedin.com/in/joaoteixeirareis",
  vyro: "https://vyro-studio.pages.dev",
  email: "joaopedroteixeirareis@gmail.com",
  location: "Belo Horizonte, MG",
  utc: "UTC−3",
};

export const ROLE: Dict<{
  title: string;
  org: string;
  squad: string;
  since: string;
}> = {
  pt: {
    title: "Desenvolvedor Full Stack · Forward Deployed Engineer",
    org: "XP Educação",
    squad: "Squad de Engenharia de Software",
    since: "Fev 2026 — atual",
  },
  en: {
    title: "Full Stack Developer · Forward Deployed Engineer",
    org: "XP Educação",
    squad: "Software Engineering squad",
    since: "Feb 2026 — present",
  },
};

export const NAV: Dict<{ href: string; label: string }[]> = {
  pt: [
    { href: "#vyro", label: "VYRO" },
    { href: "#oficio", label: "O ofício" },
    { href: "#ia", label: "IA" },
    { href: "#fora", label: "Projetos" },
    { href: "#limite", label: "O limite" },
    { href: "#contato", label: "Contato" },
  ],
  en: [
    { href: "#vyro", label: "VYRO" },
    { href: "#oficio", label: "The craft" },
    { href: "#ia", label: "AI" },
    { href: "#fora", label: "Projects" },
    { href: "#limite", label: "The boundary" },
    { href: "#contato", label: "Contact" },
  ],
};

export const HERO: Dict<{
  kicker: string;
  founder: string;
  line1: string;
  line2: string;
  line3: string;
  body: string;
  ctaWork: string;
  ctaMail: string;
}> = {
  pt: {
    kicker: "Belo Horizonte · disponível para remoto",
    founder: "Fundador da VYRO",
    line1: "Sistemas",
    line2: "que não",
    line3: "podem cair",
    body: "Sou desenvolvedor full stack na squad de Engenharia de Software da XP Educação. Meu trabalho é pegar processo que hoje depende de alguém lembrar de fazer e transformar em código que roda sozinho — e responder por ele quando não roda.",
    ctaWork: "O que eu faço",
    ctaMail: "Falar comigo",
  },
  en: {
    kicker: "Belo Horizonte, Brazil · available for remote work",
    founder: "Founder of VYRO",
    line1: "Systems",
    line2: "that cannot",
    line3: "go down",
    body: "I am a full stack developer in XP Educação's Software Engineering squad. My job is to take a process that currently depends on someone remembering to do it and turn it into code that runs on its own — and to answer for it when it doesn't.",
    ctaWork: "What I do",
    ctaMail: "Get in touch",
  },
};

/**
 * A VYRO é a empresa dele: os produtos são dela, e cada um carrega a própria
 * identidade. A cor de cada produto vive só no palco da tela dele, nunca pinta
 * a página — a VYRO assina embaixo, não por cima.
 */
export type VyroProduct = {
  id: string;
  name: string;
  href: string;
  domain: string;
  /** Captura real: telemóvel em retrato ou janela de desktop. */
  shot: { src: string; width: number; height: number; kind: "phone" | "window" };
  /** O fundo onde a tela assenta, na cor do próprio produto. */
  plate: string;
  status: Dict<string>;
  line: Dict<string>;
  cta: Dict<string>;
};

export const VYRO: Dict<{
  kicker: string;
  heading: string;
  lead: string;
  visit: string;
}> = {
  pt: {
    kicker: "A empresa que eu fundei",
    heading: "Produtos feitos para continuar.",
    lead: "A VYRO projeta, publica e mantém os próprios produtos depois do lançamento: as rejeições da App Store, a migração de terça à noite, o usuário que acha o bug. Três já estão na mão das pessoas.",
    visit: "Conhecer a VYRO",
  },
  en: {
    kicker: "The company I founded",
    heading: "Products made to keep going.",
    lead: "VYRO designs, ships and keeps maintaining its own products after launch: the App Store rejections, the Tuesday-night migration, the user who finds the bug. Three are already in people's hands.",
    visit: "Visit VYRO",
  },
};

export const VYRO_PRODUCTS: VyroProduct[] = [
  {
    id: "birdy",
    name: "Birdy",
    href: "https://birdy-app.pages.dev",
    domain: "birdy-app.pages.dev",
    shot: { src: "/vyro/birdy-inicio.webp", width: 720, height: 1515, kind: "phone" },
    plate: "#13201a",
    status: { pt: "No ar · Google Play e App Store", en: "Live · Google Play and App Store" },
    line: {
      pt: "Do ovo à venda, o aviário no celular: plantel, genética, chocadeira e vendas para quem cria aves.",
      en: "From egg to sale, the aviary on a phone: flock, genetics, incubation and sales for bird breeders.",
    },
    cta: { pt: "Site da Birdy", en: "Birdy's site" },
  },
  {
    id: "lumi",
    name: "LUMI",
    href: "https://lumi-skincare.pages.dev",
    domain: "lumi-skincare.pages.dev",
    shot: { src: "/vyro/lumi-consulta.webp", width: 720, height: 1603, kind: "phone" },
    plate: "#e7e6f1",
    status: { pt: "Teste fechado · Play e TestFlight", en: "Closed testing · Play and TestFlight" },
    line: {
      pt: "Skincare começa com uma conversa: a LUMIA pergunta, e a rotina sai do que você respondeu.",
      en: "Skincare starts with a conversation: LUMIA asks, and the routine comes from what you answered.",
    },
    cta: { pt: "Site da LUMI", en: "LUMI's site" },
  },
  {
    id: "postly",
    name: "Postly",
    href: "https://jteixeiraz.github.io/Postly/",
    domain: "jteixeiraz.github.io/Postly",
    shot: { src: "/vyro/postly-campanha.webp", width: 1440, height: 900, kind: "window" },
    plate: "#ece6da",
    status: { pt: "Open source · MIT", en: "Open source · MIT" },
    line: {
      pt: "Um departamento de marketing que roda na sua máquina, com modelos locais revezando os cargos.",
      en: "A marketing department that runs on your own machine, with local models taking turns at each role.",
    },
    cta: { pt: "Site do Postly", en: "Postly's site" },
  },
];

/** O ofício: o que ele faz na squad, cada um com um exemplo real. */
export type Craft = {
  id: string;
  title: Dict<string>;
  body: Dict<string>;
  example: Dict<{ label: string; text: string }>;
};

export const CRAFT: Craft[] = [
  {
    id: "automatizar",
    title: {
      pt: "Automatizo o que dependia de alguém lembrar",
      en: "I automate what depended on someone remembering",
    },
    body: {
      pt: "Processo manual não escala e não avisa quando falha. Escrevo Azure Functions em Python, com gatilho HTTP e por horário, que assumem a rotina inteira: gerar, assinar, enviar, conferir.",
      en: "A manual process does not scale and does not tell you when it breaks. I write Azure Functions in Python, on HTTP and timer triggers, that take over the whole routine: generate, sign, send, verify.",
    },
    example: {
      pt: {
        label: "Exemplo — emissão de certificados",
        text: "Redesenhei o pipeline de certificados de MBA e pós-graduação. Mapeei três fluxos de emissão distintos espalhados por sistemas legados antes de escrever uma linha, porque errar o desenho ali coloca documento inválido na mão do aluno. Tirei do caminho crítico uma dependência frágil da API do Google Slides e passei a gerar o certificado de trilha final direto.",
      },
      en: {
        label: "Example — certificate issuance",
        text: "I redesigned the MBA and graduate certificate pipeline. I mapped three distinct issuance flows spread across legacy systems before writing a line, because getting that design wrong puts an invalid document in a student's hands. I removed a fragile Google Slides API dependency from the critical path and generated the final track certificate directly instead.",
      },
    },
  },
  {
    id: "ponta-a-ponta",
    title: {
      pt: "Entrego a feature inteira, não a minha parte dela",
      en: "I deliver the whole feature, not my slice of it",
    },
    body: {
      pt: "Tela, API, consulta, migração e deploy. Quando a regra de negócio está errada no banco, não adianta a interface estar bonita — então eu desço até onde o problema realmente está.",
      en: "Screen, API, query, migration and deploy. When the business rule is wrong in the database, a pretty interface fixes nothing — so I go down to where the problem actually is.",
    },
    example: {
      pt: {
        label: "Exemplo — Carteirinha de Estudante",
        text: "Front em Next.js com upload, corte, reposicionamento por arraste e zoom em três breakpoints, gerando PDF e imagem. O portão de negócio antigo confiava numa flag que não bastava, e aluno de curso não regulado recebia carteirinha à qual não tinha direito. Escrevi um endpoint novo de elegibilidade com uma CTE em PostgreSQL que resolve, entre várias tabelas do domínio acadêmico, se existe curso regulado ativo.",
      },
      en: {
        label: "Example — Student ID card",
        text: "A Next.js front end with upload, crop, drag repositioning and zoom across three breakpoints, producing PDF and image. The old business gate trusted a flag that was not sufficient, and students on non-accredited courses were receiving an ID card they were not entitled to. I wrote a new eligibility endpoint with a PostgreSQL CTE that resolves, across several academic-domain tables, whether an active accredited course exists.",
      },
    },
  },
  {
    id: "integrar",
    title: {
      pt: "Faço conversar sistema que não foi feito pra isso",
      en: "I make systems talk that were never built to",
    },
    body: {
      pt: "Boa parte do trabalho é tradução: contrato de dados entre plataformas que ninguém desenhou juntas, com webhooks, retentativa e idempotência para o mesmo evento não valer duas vezes.",
      en: "Much of the work is translation: a data contract between platforms nobody designed together, with webhooks, retries and idempotency so the same event never counts twice.",
    },
    example: {
      pt: {
        label: "Exemplo — contratos, LMS e pagamentos",
        text: "Integrei assinatura digital via D4Sign, plataformas de ensino externas (D2L/Brightspace, Canvas) e o gateway Pagar.me no fluxo de checkout, incluindo a lógica de cancelamento e as regras de elegibilidade de compra. Também normalizei login e CPF de forma case-insensitive, o que corrigiu uma classe real de falha de acesso.",
      },
      en: {
        label: "Example — contracts, LMS and payments",
        text: "I integrated digital signature through D4Sign, external learning platforms (D2L/Brightspace, Canvas) and the Pagar.me gateway into the checkout flow, including cancellation logic and purchase-eligibility rules. I also normalized login and document number case-insensitively, which fixed a real class of sign-in failure.",
      },
    },
  },
  {
    id: "observar",
    title: {
      pt: "Instrumento o que ninguém está olhando",
      en: "I instrument what nobody is watching",
    },
    body: {
      pt: "Rotina agendada falha em silêncio: o painel segue verde porque a requisição respondeu 200. Coloco instrumentação para que erro de negócio apareça como erro, e não só erro de infraestrutura.",
      en: "A scheduled routine fails silently: the dashboard stays green because the request answered 200. I add instrumentation so that a business error shows up as an error, not just an infrastructure one.",
    },
    example: {
      pt: {
        label: "Exemplo — observabilidade das automações",
        text: "Instrumentei as automações críticas com Application Insights, separando falha de negócio de falha de request. Isso trocou 'está tudo verde' por uma leitura honesta do que realmente foi entregue ao aluno, e passou a acusar problema antes de virar ticket de suporte.",
      },
      en: {
        label: "Example — observability for the automations",
        text: "I instrumented the critical automations with Application Insights, separating business failure from request failure. That replaced 'everything is green' with an honest reading of what actually reached the student, and started surfacing problems before they became support tickets.",
      },
    },
  },
  {
    id: "seguranca",
    title: {
      pt: "Trato documento e credencial como superfície de ataque",
      en: "I treat documents and credentials as attack surface",
    },
    body: {
      pt: "Certificado é documento com valor. Se dá pra forjar conhecendo o formato, ele não vale nada — então o segredo tem que estar no servidor, nunca no padrão do código.",
      en: "A certificate is a document with value. If it can be forged by knowing the format, it is worth nothing — so the secret has to live on the server, never in the shape of the code.",
    },
    example: {
      pt: {
        label: "Exemplo — hash de autenticidade e validador",
        text: "Implementei um hash de autenticidade na API de emissão e o serviço público em Next.js que o verifica: qualquer portador confere o documento sem que dado de aluno seja exposto, e forjar um código válido exige o segredo do servidor. Também corrigi uma vulnerabilidade reportada na API da Área do Aluno e documentei credenciais de produção expostas em código versionado, para rotação.",
      },
      en: {
        label: "Example — authenticity hash and validator",
        text: "I implemented an authenticity hash in the issuing API plus the public Next.js service that verifies it: any holder can check a document without student data being exposed, and forging a valid code requires the server-side secret. I also fixed a reported vulnerability in the Student Area API and documented production credentials exposed in versioned code, for rotation.",
      },
    },
  },
  {
    id: "agentes",
    title: {
      pt: "Coloco agente de IA em produção com coleira",
      en: "I put AI agents into production on a leash",
    },
    body: {
      pt: "Modelo classifica bem e decide mal. Uso LLM onde ele acrescenta julgamento, e mantenho o disparo em código determinístico com aprovação humana.",
      en: "A model classifies well and decides badly. I use an LLM where it adds judgment, and keep dispatch in deterministic code behind human approval.",
    },
    example: {
      pt: {
        label: "Exemplo — SustentaBot",
        text: "Projetei e entreguei um agente conversacional no Slack que substitui a reunião de refinamento com o PM: entrevista quem pediu uma pergunta por vez, monta a demanda estruturada, classifica urgência e área de impacto e sugere o dev mais adequado. Memória em duas camadas sobre PostgreSQL, rotação de 22 credenciais de LLM com backoff, assinatura HMAC-SHA256 com proteção contra replay e 34 testes.",
      },
      en: {
        label: "Example — SustentaBot",
        text: "I designed and shipped a Slack conversational agent that replaces the refinement meeting with the product manager: it interviews the requester one question at a time, assembles the structured demand, classifies urgency and impact area, and suggests the best-suited developer. Two-layer memory on PostgreSQL, rotation of 22 LLM credentials with backoff, HMAC-SHA256 signatures with replay protection, and 34 tests.",
      },
    },
  },
];

/** Trabalho fora da XPE: produto próprio e freelance. */
export type Side = {
  id: string;
  name: string;
  tag: Dict<string>;
  summary: Dict<string>;
  points: Dict<string[]>;
  stack: string[];
  /** Onde o projeto pode ser visto de fato. Omitido quando não há superfície pública. */
  link?: { href: string; label: Dict<string> };
};

export const SIDE: Side[] = [
  {
    id: "birdy",
    name: "Birdy",
    tag: { pt: "VYRO · Google Play e App Store", en: "VYRO · Google Play and App Store" },
    summary: {
      pt: "SaaS de gestão de aviário para criadores de aves exóticas. Construí, publiquei e opero: 306 instalações e 141 aparelhos ativos nos primeiros quatro meses, de forma orgânica, com assinatura validada no servidor nas duas lojas.",
      en: "Aviary management SaaS for exotic bird breeders. I built it, shipped it and run it: 306 installs and 141 active devices in the first four months, organically, with subscriptions validated server-side on both stores.",
    },
    points: {
      pt: [
        "Backend híbrido Firebase (Auth, Firestore, App Check) e Supabase (PostgreSQL, Edge Functions), com Third-Party Auth validando o JWT do Firebase para o Row Level Security isolar os dados por usuário.",
        "Motor genético compartilhado entre mobile e desktop cobrindo sete espécies por loci, com simulador de cruzamento, genealogia e coeficiente de endogamia.",
        "Cliente desktop local-first com engine de sincronização própria: fila de saída, tolerância a registro envenenado, ordenação por ancestralidade para satisfazer chaves estrangeiras e reconciliação de exclusões.",
        "Auditoria ofensiva contra o backend de produção com a chave anônima pública do app: leitura e escrita anônimas, vazamento de contagem, enumeração de schema e quatro vetores de forja de JWT. Todos bloqueados, e o que não consegui exercitar ficou escrito como não exercitado.",
      ],
      en: [
        "Hybrid backend on Firebase (Auth, Firestore, App Check) and Supabase (PostgreSQL, Edge Functions), with Third-Party Auth validating the Firebase JWT so Row Level Security isolates data per user.",
        "A genetics engine shared by mobile and desktop covering seven species by loci, with a crossing simulator, pedigree and inbreeding coefficient.",
        "Local-first desktop client with a custom sync engine: outbox queue, poison-pill tolerance, ordering by ancestry to satisfy foreign keys, and deletion reconciliation.",
        "Offensive audit against the production backend using the app's public anonymous key: anonymous read and write, count leakage, schema enumeration and four JWT forgery vectors. All blocked, and what I could not exercise was written down as not exercised.",
      ],
    },
    stack: ["Flutter", "Riverpod", "Drift", "Firebase", "Firestore", "Google Play Billing", "Supabase", "PostgreSQL"],
    link: {
      href: "https://birdy-app.pages.dev",
      label: { pt: "Site da Birdy", en: "Birdy's site" },
    },
  },

  {
    id: "lumi",
    name: "LUMI",
    tag: {
      pt: "VYRO · teste fechado na Google Play e TestFlight",
      en: "VYRO · closed testing on Google Play and TestFlight",
    },
    summary: {
      pt: "App de self-care com uma companheira de IA que conduz uma consulta por conversa e monta a rotina a partir do perfil apurado. Nove idiomas, em teste fechado nas duas lojas.",
      en: "A self-care app with an AI companion that runs a consultation by conversation and assembles the routine from the profile it gathers. Nine languages, in closed testing on both stores.",
    },
    points: {
      pt: [
        "A cadeia de modelos saiu do binário e virou uma Edge Function: o aparelho não conhece o nome de nenhum modelo, as chaves vivem em secrets do servidor, e trocar de provedor deixou de exigir atualização na loja.",
        "Cadeia de fallback com uma regra que a medição ditou: 429 troca de chave, qualquer outra falha troca de modelo — porque estourar cota e trocar de modelo desperdiça as chaves restantes. Elo que sempre estourava o tempo foi removido da cadeia, com o custo medido em segundos.",
        "Saída estruturada em JSON como defesa contra injeção: um modelo que só pode emitir um esquema fechado não consegue emitir instrução, então texto que aparece numa foto ou numa fala é dado, nunca comando.",
        "Backend Supabase (Postgres, Auth, Edge Functions em Deno) com 40 migrações, pgTAP e RLS; imagens em Cloudflare R2; assinaturas reconciliadas diariamente contra a Google Play Developer API por conta de serviço do Google Cloud.",
        "O defeito mais grave que o app teve foi de honestidade, não de código: três telas prometiam que a foto do rosto nunca saía do aparelho, e isso deixou de ser verdade quando a análise foi para o servidor. Corrigido nos nove idiomas.",
      ],
      en: [
        "The model chain moved out of the binary and into an Edge Function: the device knows no model name, keys live in server secrets, and swapping providers no longer requires a store update.",
        "A fallback chain with a rule measurement dictated: a 429 rotates the key, any other failure rotates the model — because burning quota and switching models wastes the remaining keys. A link that always timed out was removed from the chain, with its cost measured in seconds.",
        "Structured JSON output as the defense against injection: a model that can only emit a closed schema cannot emit an instruction, so text appearing in a photo or an utterance is data, never a command.",
        "Supabase backend (Postgres, Auth, Deno Edge Functions) with 40 migrations, pgTAP and RLS; images on Cloudflare R2; subscriptions reconciled daily against the Google Play Developer API through a Google Cloud service account.",
        "The worst defect this app had was one of honesty, not code: three screens promised the face photo never left the device, and that stopped being true when analysis moved to the server. Fixed across all nine languages.",
      ],
    },
    stack: ["Flutter", "Riverpod", "Supabase", "Deno", "PostgreSQL", "Google Cloud", "Cloudflare R2"],
    link: {
      href: "https://lumi-skincare.pages.dev",
      label: { pt: "Site da LUMI", en: "LUMI's site" },
    },
  },

  {
    id: "postly",
    name: "Postly",
    tag: { pt: "VYRO · open source · Linux, macOS e Windows", en: "VYRO · open source · Linux, macOS and Windows" },
    summary: {
      pt: "Aplicativo de desktop que roda um departamento de marketing na própria máquina: cinco cargos de IA se revezam em modelos locais para pesquisar, decidir, produzir, auditar e publicar.",
      en: "A desktop app that runs a marketing department on your own machine: five AI roles take turns on local models to research, decide, produce, audit and publish.",
    },
    points: {
      pt: [
        "A tese é um middleware, não um wrapper de LLM: nunca há dois modelos residentes. A cada troca de cargo o sistema mede a memória livre, escolhe o modelo mais forte que couber, recebe a resposta, descarrega o modelo e passa adiante só a mensagem que atravessa.",
        "O nível do modelo é proporcional ao que o cargo entrega — quem decide precisa raciocinar, quem cumpre briefing pronto não — e essa regra sobrevive à troca de provedor: com Claude Code o eixo vira Opus/Sonnet/Haiku.",
        "Contexto compartilhado em grafo ponderado, sem banco de dados, serializado comprimido em disco.",
        "10.364 linhas de Rust e 8.817 de frontend, 82 testes, clippy sem warnings, releases nos quatro sistemas e um PR aberto no microsoft/winget-pkgs com validação 10/10.",
      ],
      en: [
        "The thesis is a middleware, not an LLM wrapper: there are never two resident models. On each role change the system measures free memory, picks the strongest model that fits, takes the answer, unloads the model and passes along only the message that crosses.",
        "Model tier is proportional to what the role delivers — whoever decides must reason, whoever executes a finished brief need not — and that rule survives a provider swap: on Claude Code the axis becomes Opus/Sonnet/Haiku.",
        "Shared context as a weighted graph, with no database, serialized compressed on disk.",
        "10,364 lines of Rust and 8,817 of frontend, 82 tests, clippy clean, releases on all four systems, and an open PR on microsoft/winget-pkgs that passed validation 10/10.",
      ],
    },
    stack: ["Rust", "Tauri v2", "React", "TypeScript", "Ollama", "Playwright"],
    link: {
      href: "https://github.com/JTeixeiraz/Postly",
      label: { pt: "Ver no GitHub", en: "See on GitHub" },
    },
  },
  {
    id: "induxai",
    name: "InduxAI",
    tag: { pt: "Freelance · API de predição industrial", en: "Freelance · industrial prediction API" },
    summary: {
      pt: "Transformei um script de predição de Machine Learning em API multi-tenant em produção. Prevê cal livre no clínquer de um forno de cimenteira, consumida pelo SaaS do cliente.",
      en: "I turned a Machine Learning prediction script into a multi-tenant production API. It predicts free lime in a cement kiln's clinker, consumed by the client's SaaS.",
    },
    points: {
      pt: [
        "FastAPI com autenticação por API key, cache de modelos thread-safe e erros estruturados por código.",
        "Paridade numérica verificada contra o pipeline original: a API tinha que devolver exatamente o número que o script devolvia.",
        "Imagem Docker de 1,72 GB para 734 MB, removendo dependências de CUDA que o modelo em produção nunca tocava. 27 testes e runbook de deploy entregues junto.",
        "Escopo dito em voz alta no contrato: deploy contratado, treinamento do modelo fora de escopo. O que ficou de fora foi documentado com o motivo.",
      ],
      en: [
        "FastAPI with API-key authentication, a thread-safe model cache and structured error codes.",
        "Numerical parity verified against the original pipeline: the API had to return exactly the number the script returned.",
        "Docker image from 1.72 GB down to 734 MB by removing CUDA dependencies the production model never touched. 27 tests and a deployment runbook delivered alongside.",
        "Scope stated out loud in the contract: deployment contracted, model training out of scope. What was left out was documented with the reason.",
      ],
    },
    stack: ["FastAPI", "XGBoost", "Docker", "Python", "pytest"],
  },

  {
    id: "dcars",
    name: "D'Cars Box",
    tag: { pt: "Freelance · ERP de oficina, entregue", en: "Freelance · workshop ERP, delivered" },
    summary: {
      pt: "ERP desktop sob medida para uma oficina mecânica: orçamento → ordem de serviço → estoque com baixa FIFO → recebimento. Responde a pergunta que nenhum concorrente de prateleira responde — qual fornecedor vendeu peça ruim.",
      en: "A bespoke desktop ERP for a mechanic's workshop: quote → work order → stock with FIFO draw-down → payment. It answers the question no off-the-shelf competitor does — which supplier sold the bad part.",
    },
    points: {
      pt: [
        "29 tabelas, 15 DAOs e 18 módulos de tela sobre SQLite local: o sistema funciona inteiro sem internet, e fala com a rede em três pontos estritamente opcionais — atualização, fotos da vistoria pelo celular e cópia de segurança por e-mail.",
        "26.355 linhas de produção e 14.144 de teste, com 681 casos executados e nenhuma falha; analisador estático limpo.",
        "Rastreio de qualidade por fornecedor atravessando lote, nota e devolução — foi a decisão de modelo de dados que definiu o produto, não uma tela a mais.",
        "Release automatizada por GitHub Actions compilando Windows a cada tag, com atualização automática pelo próprio app.",
      ],
      en: [
        "29 tables, 15 DAOs and 18 screen modules over local SQLite: the system works entirely offline, and reaches the network at three strictly optional points — updates, inspection photos from a phone, and an emailed backup.",
        "26,355 production lines and 14,144 of tests, with 681 cases executed and zero failures; static analysis clean.",
        "Per-supplier quality tracing across batch, invoice and return — that was the data-model decision that defined the product, not one more screen.",
        "Release automation on GitHub Actions building Windows on every tag, with in-app auto-update.",
      ],
    },
    stack: ["Flutter Desktop", "Riverpod", "Drift", "SQLite", "GitHub Actions"],
  },
  {
    id: "portify",
    name: "Portify",
    tag: { pt: "Produto próprio · low-code", en: "Own product · low-code" },
    summary: {
      pt: "Gerador de portfólios: do formulário ao link publicado, sem o usuário tocar em código. Mais de 50 modelos por perfil profissional.",
      en: "A portfolio generator: from form to published link without the user touching code. 50+ templates by professional profile.",
    },
    points: {
      pt: [
        "Front em React/Vite com um editor que monta a página inteira a partir de um formulário guiado, e um sistema de design próprio construído do zero.",
        "Backend em Java/Spring separado do front, com autenticação e persistência dos portfólios publicados.",
        "Cena 3D em React Three Fiber e shaders na landing — foi onde aprendi a orçar GPU num produto real, não num demo.",
        "É o projeto onde o meu vocabulário visual se formou. O sistema de design deste portfólio descende dele.",
      ],
      en: [
        "React/Vite front end with an editor that assembles the whole page from a guided form, plus a design system built from scratch.",
        "Java/Spring backend split from the front end, with authentication and persistence of published portfolios.",
        "A React Three Fiber scene and shaders on the landing page — where I learned to budget GPU in a real product rather than a demo.",
        "It is the project where my visual vocabulary formed. This portfolio's design system descends from it.",
      ],
    },
    stack: ["React", "Vite", "TypeScript", "Three.js", "Java", "Spring Boot"],
  },
];

/**
 * Como ele trabalha com IA. Não é "uso Copilot": é autoria de skills, grafo
 * de conhecimento, engenharia de contexto e orquestração — cada uma com o
 * artefacto que a sustenta.
 */
export type AiPractice = {
  id: string;
  label: Dict<string>;
  title: Dict<string>;
  body: Dict<string>;
  proof: Dict<string>;
};

export const AI_PRACTICES: AiPractice[] = [
  {
    id: "skills",
    label: { pt: "Autoria de skills", en: "Skill authoring" },
    title: {
      pt: "Escrevo as skills que o agente carrega",
      en: "I write the skills the agent loads",
    },
    body: {
      pt: "Uma skill é uma pasta com instruções, scripts e recursos que o agente carrega sob demanda. O mecanismo é divulgação progressiva: no arranque só entram nome e descrição, o corpo do SKILL.md entra quando a tarefa casa, e os ficheiros de apoio só na execução. Escrever a descrição é o trabalho fino — é ela que decide se a skill dispara na hora certa.",
      en: "A skill is a folder of instructions, scripts and resources the agent loads on demand. The mechanism is progressive disclosure: only name and description load at startup, the SKILL.md body loads when a task matches, and supporting files only at execution time. Writing the description is the delicate part — it decides whether the skill fires at the right moment.",
    },
    proof: {
      pt: "Publiquei a design-master no GitHub e mantenho um conjunto próprio instalado localmente.",
      en: "I published design-master on GitHub and maintain my own set installed locally.",
    },
  },
  {
    id: "graph",
    label: { pt: "Engenharia de grafo", en: "Graph engineering" },
    title: {
      pt: "Transformo um repositório inteiro em grafo navegável",
      en: "I turn a whole repository into a navigable graph",
    },
    body: {
      pt: "Escrevi a graphify: pega uma pasta, um repositório ou uma lista de URLs e produz um grafo de conhecimento com nós-deus, detecção de comunidades e trilha de auditoria. Sai em HTML interativo, JSON pronto para GraphRAG e um relatório em linguagem simples. Exporta para Neo4j e FalkorDB, sobe como servidor MCP e escreve um vault de Obsidian.",
      en: "I wrote graphify: it takes a folder, a repository or a list of URLs and produces a knowledge graph with god nodes, community detection and an audit trail. It outputs interactive HTML, GraphRAG-ready JSON and a plain-language report. It exports to Neo4j and FalkorDB, runs as an MCP server, and writes an Obsidian vault.",
    },
    proof: {
      pt: "Um grafo guarda entidades e relações, não pedaços soltos de texto — é o que permite ao agente perguntar por que algo acontece, e não só onde está escrito.",
      en: "A graph stores entities and relationships rather than isolated text chunks — that is what lets an agent ask why something happens, not just where it is written.",
    },
  },
  {
    id: "context",
    label: { pt: "Engenharia de contexto", en: "Context engineering" },
    title: {
      pt: "O prompt é a pergunta; o contexto é o que o agente já sabe",
      en: "The prompt is the question; context is what the agent already knows",
    },
    body: {
      pt: "Engenharia de prompt otimiza como se pergunta e opera a nível de interação. Engenharia de contexto otimiza o que o agente sabe ao responder, e opera a nível de infraestrutura: regras de projeto versionadas, hooks de ciclo de vida, servidores MCP e memória que sobrevive entre sessões. Em produção usam-se as duas, mas só a segunda escala.",
      en: "Prompt engineering optimizes how you ask and works at the interaction level. Context engineering optimizes what the agent knows when it answers, and works at the infrastructure level: versioned project rules, lifecycle hooks, MCP servers and memory that survives across sessions. Production uses both, but only the second one scales.",
    },
    proof: {
      pt: "No SustentaBot isso é memória em duas camadas sobre PostgreSQL, com as contestações humanas reinjetadas nos prompts seguintes.",
      en: "In SustentaBot that means two-layer memory on PostgreSQL, with human disputes re-injected into later prompts.",
    },
  },
  {
    id: "loop",
    label: { pt: "Loop e orquestração", en: "Loops and orchestration" },
    title: {
      pt: "Um agente implementa, outro revisa contra a especificação",
      en: "One agent implements, another reviews against the spec",
    },
    body: {
      pt: "Trabalho com subagentes nomeados que conversam entre si em topologias de pipeline, fan-out e supervisor, dentro de um git worktree isolado. O plano é quebrado em tarefas pequenas, os testes vêm antes da implementação, e a branch inteira passa por uma revisão final antes do merge.",
      en: "I work with named subagents that message each other in pipeline, fan-out and supervisor topologies, inside an isolated git worktree. The plan is broken into small tasks, tests come before implementation, and the whole branch gets a final review before merge.",
    },
    proof: {
      pt: "Na API do InduxAI essa revisão pegou dois defeitos reais antes do merge: um KeyError não tratado que virava 500 sujo e a serialização incompleta de tipos inteiros do NumPy.",
      en: "On the InduxAI API that review caught two real defects before merge: an unhandled KeyError surfacing as a dirty 500, and incomplete serialization of NumPy integer types.",
    },
  },
];

/**
 * As histórias que provam julgamento, não só execução. Cada uma tem origem
 * rastreável no vault — nada aqui foi estimado.
 */
export const EVIDENCE: Dict<{ claim: string; how: string }[]> = {
  pt: [
    {
      claim: "Um identificador errado derrubava toda a escrita",
      how: "O controlo de acesso por linha rejeitava em silêncio. Nada falhava em voz alta — só não chegava.",
    },
    {
      claim: "A sincronização dizia ter funcionado, e não tinha",
      how: "O banco recusava o upsert por falta de restrição única. Descobri comparando contagens, não olhando a interface.",
    },
    {
      claim: "\"Trocar uma logo\" virou o redesenho de três fluxos",
      how: "Um deles era legado órfão, sem repositório. Mapeei antes de tocar em código.",
    },
    {
      claim: "Adiei uma otimização depois de a dimensionar",
      how: "Fiz a conta do volume antes de decidir. Não valia a complexidade ainda — e ficou escrito o gatilho que a torna necessária.",
    },
    {
      claim: "Modelo text-only não enxerga anexo",
      how: "O bot registra o ficheiro, avisa que não leu e pede descrição — em vez de alucinar sobre um print.",
    },
    {
      claim: "700+ commits, contados um a um",
      how: "git log --author nos meus repositórios, somado à mão. É piso, não estimativa.",
    },
    {
      claim: "306 instalações e 141 aparelhos ativos",
      how: "Painel próprio que junta Firebase, Supabase, Google Play e App Store Connect. Número apurado, não lembrado.",
    },
  ],
  en: [
    {
      claim: "One wrong identifier was dropping every write",
      how: "Row-level access control rejected it silently. Nothing failed out loud — it just never arrived.",
    },
    {
      claim: "Sync said it had worked, and it had not",
      how: "The database refused the upsert for want of a unique constraint. I found it by comparing counts, not by looking at the interface.",
    },
    {
      claim: "\"Swap a logo\" became a redesign of three flows",
      how: "One of them was orphaned legacy with no repository. I mapped it before touching code.",
    },
    {
      claim: "I deferred an optimisation after sizing it",
      how: "I did the volume maths before deciding. Not worth the complexity yet — and the trigger that would make it necessary is written down.",
    },
    {
      claim: "A text-only model cannot see an attachment",
      how: "The bot records the file, says it did not read it, and asks for a description — instead of hallucinating about a screenshot.",
    },
    {
      claim: "700+ commits, counted one by one",
      how: "git log --author across my repositories, summed by hand. A floor, not an estimate.",
    },
    {
      claim: "306 installs and 141 active devices",
      how: "My own panel joining Firebase, Supabase, Google Play and App Store Connect. Measured, not remembered.",
    },
  ],
};

export const BOUNDARY: Dict<{
  heading: string;
  lead: string;
  columns: { title: string; body: string }[];
}> = {
  pt: {
    heading: "Onde a automação para",
    lead: "Uso agentes de IA em produção e no meu próprio fluxo todo dia. A parte que exige julgamento não é fazer o modelo escrever código; é decidir o que ele não tem permissão de executar.",
    columns: [
      {
        title: "O modelo sugere",
        body: "No SustentaBot, o modelo classifica urgência, área de impacto e o dev mais adequado. Ele produz sinal.",
      },
      {
        title: "O código determinístico executa",
        body: "O roteamento é Python comum e o disparo exige aprovação explícita do PM. O agente nunca aciona ninguém por conta própria, porque ação automática errada custa o tempo de uma pessoa real.",
      },
      {
        title: "As limitações ficam explícitas",
        body: "Modelo de texto não enxerga anexo. Em vez de alucinar sobre um print que nunca viu, o agente registra o arquivo, avisa que não leu e pede a descrição por escrito.",
      },
      {
        title: "Código gerado é rascunho",
        body: "A API do InduxAI foi construída com subagentes e TDD. A revisão final da branch pegou dois defeitos reais antes do merge: um KeyError não tratado que virava 500 sujo e a serialização incompleta de tipos inteiros do NumPy.",
      },
    ],
  },
  en: {
    heading: "Where automation stops",
    lead: "I run AI agents in production and in my own workflow every day. The part that takes judgment is not getting a model to write code; it is deciding what it is not allowed to execute.",
    columns: [
      {
        title: "The model suggests",
        body: "In SustentaBot the model classifies urgency, impact area and the best-suited developer. It produces signal.",
      },
      {
        title: "Deterministic code executes",
        body: "Routing is ordinary Python and dispatch requires explicit approval from the product manager. The agent never contacts anyone on its own, because a wrong automated action costs a real person's time.",
      },
      {
        title: "Limitations stay explicit",
        body: "A text-only model cannot see an attachment. Rather than hallucinate about a screenshot it never saw, the agent records the file, says it did not read it, and asks for a written description.",
      },
      {
        title: "Generated code is a draft",
        body: "The InduxAI API was built with subagents and TDD. The final branch review caught two real defects before merge: an unhandled KeyError surfacing as a dirty 500, and incomplete serialization of NumPy integer types.",
      },
    ],
  },
};

export const STACK: Dict<{ group: string; items: string[] }[]> = {
  pt: [
    { group: "Front", items: ["React", "Next.js", "TypeScript", "Tailwind", "TanStack Query", "Flutter"] },
    { group: "Back", items: ["Node.js", "Express", "Python", "FastAPI", "Flask", "Django", "C#", "Java"] },
    { group: "Dados", items: ["PostgreSQL", "MongoDB", "Cosmos DB", "Firestore", "SQLite", "CTEs", "RLS"] },
    { group: "Nuvem", items: ["Google Cloud", "Firebase", "Google Play Developer API", "Google Places API", "Pub/Sub", "Azure", "Cloudflare R2"] },
    { group: "Infra", items: ["Azure Functions", "Container Apps", "Azure DevOps", "Docker", "GitHub Actions", "Supabase Edge Functions", "RabbitMQ"] },
    { group: "Arquitetura", items: ["design de sistemas", "event-driven", "idempotência", "filas e retry com backoff", "feature flags", "observabilidade", "multi-tenant", "local-first e sync"] },
    { group: "IA", items: ["Claude API", "Gemini API", "NVIDIA NIM", "tool calling", "saída estruturada", "RAG", "grafo de contexto", "MCP", "orquestração de subagentes"] },
    { group: "Ofício", items: ["TDD", "pytest", "code review", "Application Insights", "SOLID", "Design Patterns", "Scrum"] },
  ],
  en: [
    { group: "Front", items: ["React", "Next.js", "TypeScript", "Tailwind", "TanStack Query", "Flutter"] },
    { group: "Back", items: ["Node.js", "Express", "Python", "FastAPI", "Flask", "Django", "C#", "Java"] },
    { group: "Data", items: ["PostgreSQL", "MongoDB", "Cosmos DB", "Firestore", "SQLite", "CTEs", "RLS"] },
    { group: "Cloud", items: ["Google Cloud", "Firebase", "Google Play Developer API", "Google Places API", "Pub/Sub", "Azure", "Cloudflare R2"] },
    { group: "Infra", items: ["Azure Functions", "Container Apps", "Azure DevOps", "Docker", "GitHub Actions", "Supabase Edge Functions", "RabbitMQ"] },
    { group: "Architecture", items: ["system design", "event-driven", "idempotency", "queues and retry with backoff", "feature flags", "observability", "multi-tenant", "local-first sync"] },
    { group: "AI", items: ["Claude API", "Gemini API", "NVIDIA NIM", "tool calling", "structured output", "RAG", "context graph", "MCP", "subagent orchestration"] },
    { group: "Craft", items: ["TDD", "pytest", "code review", "Application Insights", "SOLID", "Design Patterns", "Scrum"] },
  ],
};

/**
 * A jornada. Três frentes ao mesmo tempo, e não uma escada: o emprego, o
 * produto próprio e o contrato correm em paralelo desde 2025/2026.
 *
 * O vínculo de estágio fica na nota de rodapé — dito uma vez, sem eufemismo
 * e sem manchete. Quem contrata verifica isso na primeira conversa; escondê-lo
 * custaria a credibilidade do resto da página, e anunciá-lo em título faria o
 * trabalho parecer menor do que é.
 */
export const JOURNEY: Dict<{
  lead: string;
  rows: { period: string; role: string; org: string; note: string }[];
  footnote: string;
}> = {
  pt: {
    lead: "Três frentes ao mesmo tempo. Cada uma ensina o que a outra não ensina: a squad ensina a entregar dentro de sistema alheio, o produto próprio ensina a viver com as decisões, e o contrato ensina a dizer o escopo em voz alta.",
    rows: [
      {
        period: "Fev 2026 — atual",
        role: "Desenvolvedor Full Stack · Forward Deployed Engineer",
        org: "XP Educação",
        note: "Squad de Engenharia de Software. Entrego a feature inteira — tela, API, consulta, migração e deploy — e trato integração entre plataformas que ninguém desenhou juntas. Sento com quem pediu, levanto a regra de negócio na fonte e respondo pelo sistema em produção.",
      },
      {
        period: "2026 — atual",
        role: "Fundador",
        org: "Vyro — Birdy, LUMI e Postly",
        note: "SaaS de gestão de aviário publicado no Google Play e na App Store. Construí, publiquei e opero: arquitetura, cobrança, sincronização local-first e a auditoria ofensiva contra o meu próprio backend.",
      },
      {
        period: "2025 — atual",
        role: "Freelance",
        org: "API e produto sob contrato",
        note: "Em paralelo às duas. Entrego o que foi contratado, e o que fica fora de escopo fica documentado com o motivo — foi assim na API de predição industrial da InduxAI.",
      },
    ],
    footnote: "O vínculo na XP Educação é de estágio, dentro da squad de engenharia.",
  },
  en: {
    lead: "Three fronts at once. Each teaches what the others cannot: the squad teaches shipping inside someone else's system, the product teaches living with your own decisions, and the contract teaches saying the scope out loud.",
    rows: [
      {
        period: "Feb 2026 — present",
        role: "Full Stack Developer · Forward Deployed Engineer",
        org: "XP Educação",
        note: "Software Engineering squad. I deliver the whole feature — screen, API, query, migration and deploy — and handle integration between platforms nobody designed together. I sit with the people who asked, gather the business rule at the source, and answer for the system in production.",
      },
      {
        period: "2026 — present",
        role: "Founder",
        org: "Vyro — Birdy, LUMI and Postly",
        note: "Aviary management SaaS shipped on Google Play and the App Store. I built it, shipped it and run it: architecture, billing, local-first sync, and the offensive audit against my own backend.",
      },
      {
        period: "2025 — present",
        role: "Freelance",
        org: "API and product under contract",
        note: "Alongside both. I deliver what was contracted, and what falls outside scope is documented with the reason — that is how InduxAI's industrial prediction API went.",
      },
    ],
    footnote: "The XP Educação role is an internship, inside the engineering squad.",
  },
};

export const BACKGROUND: Dict<{
  heading: string;
  rows: { period: string; title: string; note: string }[];
}> = {
  pt: {
    heading: "Formação",
    rows: [
      { period: "Em andamento", title: "Engenharia de Software", note: "PUC Minas" },
      { period: "2024 – 2025", title: "Técnico em Desenvolvimento de Sistemas", note: "Colégio Cotemig" },
      { period: "11 anos", title: "Inglês avançado", note: "Cultura Inglesa" },
    ],
  },
  en: {
    heading: "Background",
    rows: [
      { period: "In progress", title: "B.S. in Software Engineering", note: "PUC Minas" },
      { period: "2024 – 2025", title: "Technical diploma, Systems Development", note: "Colégio Cotemig" },
      { period: "11 years", title: "Advanced English", note: "Cultura Inglesa" },
    ],
  },
};

export const CONTACT: Dict<{
  heading: string;
  lead: string;
  mailLabel: string;
  githubLabel: string;
  vyroLabel: string;
  note: string;
}> = {
  pt: {
    heading: "Vamos conversar",
    lead: "Se você tem um sistema que precisa aguentar usuário real, me escreva. Respondo em português ou inglês.",
    mailLabel: "Enviar e-mail",
    githubLabel: "Ver o GitHub",
    vyroLabel: "Ver a Vyro",
    note: "Belo Horizonte, MG · UTC−3 · disponível para remoto",
  },
  en: {
    heading: "Let's talk",
    lead: "If you have a system that needs to hold up under real users, write to me. I answer in Portuguese or English.",
    mailLabel: "Send an email",
    githubLabel: "See the GitHub",
    vyroLabel: "See Vyro",
    note: "Belo Horizonte, Brazil · UTC−3 · available for remote work",
  },
};

export const LABELS: Dict<Record<string, string>> = {
  pt: {
    journey: "Jornada",
    craft: "O ofício",
    side: "Projetos",
    ai: "Como eu uso IA",
    evidence: "De onde vem cada número",
    boundary: "O limite",
    stack: "Ferramenta",
    contact: "Contato",
    role: "Cargo",
  },
  en: {
    journey: "Journey",
    craft: "The craft",
    side: "Projects",
    ai: "How I use AI",
    evidence: "Where each number comes from",
    boundary: "The boundary",
    stack: "Tools",
    contact: "Contact",
    role: "Role",
  },
};
