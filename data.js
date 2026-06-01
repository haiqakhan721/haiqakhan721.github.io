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
      description: "This one started as an internship task and ended up in production, which was wild. It reads resumes and pulls out the important bits (name, skills, experience, education) and structures them neatly for the bank's hiring system. Getting it stable enough to actually deploy was the hardest part. Containerised with Docker and deployed as a microservice.",
      stack: ["Python", "NLP", "spaCy", "TensorFlow", "Docker", "GCP Cloud Run"],
      metrics: { deployment: "Production", client: "UBL", infra: "Cloud Run" },
      demo: "#",
      github: "https://github.com/haiqakhan721/resume-parser",
      color: "#4ec9b0",
      outline: ["class ResumeParser", "  extract_entities()", "  structure_data()", "  validate_output()", "  deploy_service()", "REPO → github_link()"]
    },
    {
      id: "docver",
      file: "document_verification.py",
      name: "Document Verification",
      tagline: "Multi-model ML pipeline that authenticates documents and verifies identities for UBL",
      description: "Part of the same UBL production system as the resume parser. The repo covers five ML tasks running as separate containerised services: document verification to catch fake or altered files, face verification, psychometric scoring, Urdu transcription, and CV parsing. Each model is wrapped in Docker and deployed to Google Cloud Platform Cloud Run so they scale independently. Built this to make the pipeline robust enough that bad inputs get caught before they cause real problems downstream.",
      stack: ["Python", "Docker", "GCP Cloud Run", "Computer Vision", "NLP", "Pydantic"],
      metrics: { models: "5 ML tasks", deployment: "GCP Cloud Run", client: "UBL" },
      demo: "#",
      github: "https://github.com/haiqakhan721/document-verification",
      color: "#26c6da",
      outline: ["class DocVerifier", "  verify_document()", "  face_verification()", "  psychometric_score()", "  urdu_transcribe()", "REPO → github_link()"]
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
    { hash: "d4f0c3e", msg: "feat: document verification pipeline — 5 ML models on GCP Cloud Run", date: "3 months ago",  branch: "feature/docver",  color: "#26c6da" },
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
  open [project]   — open a project (parser / docver / rag / asr / coder / style)
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
[3] doc_verifier    — 5 ML models on GCP Cloud Run, UBL
[4] rag_pipeline    — FastAPI + ChromaDB + Groq, deployed
[5] whisper_urdu    — Fine-tuned Whisper, Urdu ASR
[6] clinical_coder  — 3-agent A2A medical coding, F1=0.748
[7] neural_style    — VGG19 style transfer, TensorFlow

Run: open [urdu | parser | docver | rag | asr | coder | style]`,
    github: "Opening GitHub... → github.com/haiqakhan721",
    contact: null,
  }
};
