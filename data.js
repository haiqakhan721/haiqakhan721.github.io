// ============================================================
// EDIT THIS FILE TO CUSTOMIZE YOUR PORTFOLIO
// ============================================================

const PORTFOLIO = {
  name: "Haiqa Khan",
  role: "ML Engineer · NLP · LLMs · Agentic AI",
  location: "Karachi, Pakistan",
  email: "haiqakhan721@gmail.com",
  github: "github.com/haiqakhan721",
  linkedin: "linkedin.com/in/haiqa-khannn",
  status: "open_to_work",
  initials: "HK",
  bio: `CS student at FAST-NUCES with industry experience in machine
learning and NLP. Currently at Syslab, where I build and deploy ML
systems for real clients. My work spans LLM fine-tuning for
low-resource languages, agentic AI pipelines, and end-to-end RAG
systems. I focus on building things that work in production, not
just in notebooks.`,

  education: [
    {
      degree: "BS Computer Science",
      institution: "FAST-NUCES, Karachi",
      year: "2022 – June 2026",
      gpa: "In Progress",
      focus: "Machine Learning, Deep Learning, NLP, AI"
    }
  ],

  projects: [
    {
      id: "urdu",
      file: "urdu_ustad.py",
      name: "Urdu Ustad (FYP)",
      tagline: "An AI tutor for Pakistani students, teaching in Urdu with a RAG backbone to keep it honest",
      description: "My final year project. Fine-tuned a small language model on a custom Urdu curriculum dataset using LoRA adapters so it stays lightweight and cheap to run. The RAG pipeline is what keeps it grounded, answers come from the actual source material rather than whatever the model feels like saying. Built the entire system end-to-end: Urdu text cleaning, tokenization, SLM inference, RAG retrieval, and a video delivery API. It's deployed and being used by real students.",
      stack: ["Python", "Transformers", "PEFT/LoRA", "RAG", "FastAPI", "Ollama"],
      metrics: { type: "FYP", approach: "LoRA + RAG", status: "Deployed" },
      demo: "#",
      github: "#",
      color: "#7e57c2",
      outline: ["class UrduUstad", "  fine_tune_lora()", "  rag_retrieve()", "  generate_answer()", "  video_api()", "DEMO → demo_link()"]
    },
    {
      id: "parser",
      file: "resume_parser.py",
      name: "NLP Resume Parser",
      tagline: "Built during my Syslab internship, now live at United Bank Limited",
      description: "This one started as an internship task and ended up in production, which was wild. It reads resumes and pulls out the important bits (name, skills, experience, education) and structures them neatly for the bank's hiring system. I also had to build in document verification so it could flag sketchy or altered files. Getting it stable enough to actually deploy was the hardest part.",
      stack: ["Python", "NLP", "spaCy", "TensorFlow", "MLOps", "AWS"],
      metrics: { accuracy: "High", deployment: "Production", client: "UBL" },
      demo: "#",
      github: "#",
      color: "#4ec9b0",
      outline: ["class ResumeParser", "  extract_entities()", "  verify_document()", "  structure_data()", "  deploy_model()", "DEMO → demo_link()"]
    },
    {
      id: "style",
      file: "neural_style.py",
      name: "Neural Style Transfer",
      tagline: "Make any photo look like a painting using deep learning",
      description: "You give it two images: one for content, one for style, and it blends them together. Think your photo but painted like a Van Gogh. Under the hood it uses VGG19 to understand what's in each image, Gram matrices to capture the texture and feel of the style, then slowly adjusts the output image until it looks right. Genuinely one of the more satisfying projects to test because you can actually see it working.",
      stack: ["Python", "TensorFlow", "VGG19", "CNN", "NumPy", "Matplotlib"],
      metrics: { model: "VGG19", technique: "Gram Matrix", method: "Gradient Descent" },
      demo: "#",
      github: "#",
      color: "#c586c0",
      outline: ["class StyleTransfer", "  load_vgg19()", "  gram_matrix()", "  compute_loss()", "  optimize()", "DEMO → demo_link()"]
    },
    {
      id: "ludo",
      file: "ludo_ai.py",
      name: "Ludo AI (Minimax)",
      tagline: "Classic Ludo but the AI opponent actually thinks a few moves ahead",
      description: "Standard Ludo except the AI doesn't just roll and move randomly. It uses Minimax to look ahead and pick the move that gives it the best shot at winning. Five players makes the game tree surprisingly complex, which was a fun problem to work through. The AI won't always beat you, but it'll definitely make you think.",
      stack: ["Python", "Minimax", "Decision Trees", "Game Theory", "AI"],
      metrics: { players: "5", algorithm: "Minimax", strategy: "Decision Tree" },
      demo: "#",
      github: "#",
      color: "#f05133",
      outline: ["class LudoAI", "  minimax(state)", "  evaluate(board)", "  get_moves()", "  best_move()", "DEMO → demo_link()"]
    },
    {
      id: "rag",
      file: "rag_pipeline.py",
      name: "RAG Pipeline",
      tagline: "Upload your docs, ask questions, get answers backed by actual sources",
      description: "Built a full RAG pipeline from scratch that you can point at your own documents. Upload a PDF or DOCX, it gets chunked and embedded locally using sentence-transformers (no external API calls needed for that part), then stored in ChromaDB. When you ask a question it pulls the most relevant chunks and hands them to a Groq LLM which generates a grounded answer with source attribution so you know where the answer came from. Wrapped it all in FastAPI, containerised with Docker, and deployed to Hugging Face Spaces.",
      stack: ["Python", "FastAPI", "ChromaDB", "Groq", "Sentence Transformers", "Docker"],
      metrics: { input: "PDF / DOCX", embeddings: "Local", deployment: "HF Spaces" },
      demo: "#",
      github: "https://github.com/haiqakhan721/rag-pipeline",
      color: "#66bb6a",
      outline: ["class RAGPipeline", "  ingest_docs()", "  embed_chunks()", "  query_vector_db()", "  generate_answer()", "REPO → github_link()"]
    },
    {
      id: "asr",
      file: "whisper_urdu_asr.py",
      name: "Whisper Urdu ASR",
      tagline: "Teaching Whisper to actually understand Pakistani Urdu",
      description: "Whisper is great but scores above 90% WER on Urdu out of the box, which is basically unusable. I fine-tuned it on Mozilla Common Voice 17 (around 220 hours of Urdu audio) and added custom data augmentation plus YouTube-scraped conversational audio to make it actually robust beyond read-speech. Evaluated with WER and deployed as a live inference app on Hugging Face Spaces. The fine-tuning closes the gap substantially.",
      stack: ["Python", "PyTorch", "Hugging Face", "Whisper", "Transformers", "Common Voice 17"],
      metrics: { base_model: "Whisper-small", steps: "4,000", dataset: "CV-17 Urdu" },
      demo: "#",
      github: "https://github.com/haiqakhan721/whisper-urdu-asr",
      color: "#ffa726",
      outline: ["class UrduASR", "  load_whisper()", "  fine_tune()", "  evaluate_wer()", "  export_pipeline()", "REPO → github_link()"]
    },
    {
      id: "coder",
      file: "clinical_coder.py",
      name: "Agentic Clinical Coder",
      tagline: "Three AI agents that work together to read doctor's notes and assign medical codes",
      description: "The problem: if you dump a doctor's note plus 200 medical codes into one big LLM prompt, small models just fall apart. My fix was to split the job across three agents. One reads the note and extracts symptoms, one searches a vector database for matching codes, and one makes the final decision. They pass structured JSON between each other so nothing gets lost or hallucinated. I benchmarked 4 models (Llama 3.1 8B, Llama 3 8B, Gemma2 9B, DeepSeek-R1-Distill) across 437 clinical queries. Best result was F1 0.748 with 100% format adherence, about a 65% relative improvement over single-prompt baselines on the same model sizes.",
      stack: ["Python", "Groq API", "ChromaDB", "Pydantic", "RAG", "LLM Agents", "ICPC-2"],
      metrics: { f1_score: "0.748", format_adherence: "100%", dataset: "437 queries" },
      demo: "#",
      github: "https://github.com/haiqakhan721/agentic-clinical-coder",
      color: "#29b6f6",
      outline: ["class AgenticCoder", "  extractor_agent()", "  rag_retriever()", "  selector_agent()", "  a2a_protocol()", "REPO → github_link()"]
    }
  ],

  skills: {
    languages: [
      { name: "Python",     level: 92, years: 3, color: "#3572A5" },
      { name: "C++",        level: 78, years: 3, color: "#f34b7d" },
      { name: "JavaScript", level: 60, years: 2, color: "#f7df1e" },
      { name: "SQL",        level: 62, years: 2, color: "#e38c00" }
    ],
    frameworks: [
      { name: "HuggingFace",  level: 85, years: 2, color: "#ff9d00" },
      { name: "PEFT / LoRA",  level: 80, years: 1, color: "#7e57c2" },
      { name: "LangChain",    level: 72, years: 1, color: "#29b6f6" },
      { name: "FastAPI",      level: 78, years: 1, color: "#4ec9b0" }
    ],
    tools: [
      { name: "Docker",           level: 72, years: 1 },
      { name: "ChromaDB",         level: 80, years: 1 },
      { name: "Groq / Ollama",    level: 78, years: 1 },
      { name: "Git",              level: 82, years: 3 }
    ]
  },

  gitLog: [
    { hash: "m3c4d5e", msg: "feat: RAG pipeline — FastAPI + ChromaDB + Groq, deployed to HF Spaces", date: "just now",    branch: "main",            color: "#66bb6a" },
    { hash: "l2b3c4d", msg: "feat: whisper urdu ASR — fine-tuned on Common Voice 17 🎙️", date: "3 days ago",  branch: "main",            color: "#ffa726" },
    { hash: "k1a2b3c", msg: "feat: agentic clinical coder — 3-agent A2A, F1=0.748 🏥", date: "1 week ago",   branch: "main",            color: "#29b6f6" },
    { hash: "n4d5e6f", msg: "feat: urdu ustad FYP — LoRA fine-tune + RAG + video API 🇵🇰", date: "2 weeks ago",  branch: "feature/fyp",     color: "#7e57c2" },
    { hash: "a1f3c2d", msg: "feat: deployed resume parser to production (UBL) 🚀", date: "1 week ago",   branch: "main",            color: "#4ec9b0" },
    { hash: "b2e4f5a", msg: "feat: added document verification module with 99%+ accuracy", date: "3 weeks ago",  branch: "main",            color: "#f05133" },
    { hash: "c3d7e6b", msg: "feat: neural style transfer — VGG19 + Gram matrix pipeline", date: "2 months ago",  branch: "feature/style",   color: "#c586c0" },
    { hash: "d4f0c3e", msg: "feat: minimax AI for 5-player ludo game", date: "3 months ago",  branch: "feature/ludo",    color: "#f05133" },
    { hash: "e5a1b2c", msg: "feat: MLOps pipeline — model monitoring & tuning", date: "4 months ago",  branch: "feature/mlops",   color: "#4ec9b0" },
    { hash: "f6c5d8a", msg: "chore: started ML internship at Syslab 💼", date: "11 months ago", branch: "main",            color: "#dcdcaa" },
    { hash: "g7e2f3b", msg: "feat: snake game in C++ with linked list body segments", date: "1 year ago",    branch: "feature/snake",   color: "#9cdcfe" },
    { hash: "h8b6c9d", msg: "feat: student management system — full CRUD + OOP", date: "2 years ago",   branch: "feature/mgmt",    color: "#858585" },
    { hash: "i9f8e2a", msg: "init: enrolled at FAST-NUCES, started CS degree", date: "3 years ago",   branch: "main",            color: "#858585" },
    { hash: "j0c4a7e", msg: "feat: completed A-Levels — 2As, 2Bs 🎓", date: "3 years ago",   branch: "origin",          color: "#9cdcfe" }
  ],

  terminalCommands: {
    help: `Available commands:
  ls               — list all sections
  cat about.txt    — read my bio
  cat skills.json  — view my tech stack
  python projects  — list all projects
  open [project]   — open a project (parser / style / ludo / rag / asr / coder)
  contact          — get in touch
  github           — open GitHub profile
  clear / cls      — clear terminal`,
    ls: `    Directory: C:\\Haiqa\\Portfolio

Mode    Name
----    ----
d----   about_me/
d----   projects/
d----   skills/
-a---   resume.pdf
-a---   contact.sh
-a---   welcome.py`,
    "python projects": `Found 7 projects:
[1] urdu_ustad      — FYP, LoRA fine-tune + RAG, deployed
[2] resume_parser   — NLP resume parsing, UBL production
[3] rag_pipeline    — FastAPI + ChromaDB + Groq, deployed
[4] whisper_urdu    — Fine-tuned Whisper, Urdu ASR
[5] clinical_coder  — 3-agent A2A medical coding, F1=0.748
[6] neural_style    — VGG19 style transfer, TensorFlow
[7] ludo_ai         — Minimax AI, 5-player game

Run: open [urdu | parser | rag | asr | coder | style | ludo]`,
    github: "Opening GitHub... → github.com/haiqakhan721",
    contact: null,
  }
};
