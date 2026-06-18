const sections = [
  {
    id: "experiment",
    label: "The Experiment",
    content: (
      <p className="text-gray-300 text-lg leading-relaxed">
        I treated the screener as a design challenge and a learning experience, not just a test to pass. The conventional answer might be to hire interns and build a manual pipeline. I asked a different question: what if the rote work didn&apos;t need to be done by humans at all? I built a proof of concept to find out.
      </p>
    ),
  },
  {
    id: "method",
    label: "The Method",
    content: (
      <p className="text-gray-300 text-lg leading-relaxed">
        Using my personal Claude Pro account, I sourced public domain educational videos with no existing metadata from the Internet Archive Commons — the same kind of raw video Khan Academy needs to process. I built a Claude-powered agentic pipeline that ingests a video, transcribes it, and generates all five required metadata outputs: SEO title, SEO description, timestamps, tags, and a thumbnail brief. I tested it against a single video. Total processing time: 10 minutes. Total cost: $0.02. I then built this website from scratch using Claude Code — a single prompt produced the full Next.js site, which I refined and deployed to Vercel. Total time from concept to live site: one day.
      </p>
    ),
  },
  {
    id: "why",
    label: "Why This Works",
    content: (
      <div className="space-y-4">
        <p className="text-gray-400 text-base">Four reasons this approach outperforms a manual intern pipeline:</p>
        <div className="space-y-3">
          {[
            ["Accurate", "The video itself contains the SME's exact language, themes, and terminology. Claude generates metadata directly from that source material, not from guesswork."],
            ["Consistent", "Every video goes through the same process. No variation in quality between interns, no training drift, no fatigue."],
            ["Cost-efficient", "$0.02 per video. 1,000 videos costs approximately $20 in API fees. Compare that to three months of intern stipends."],
            ["Scalable", "The same pipeline handles 1 video or 10,000. It can be extended to support localized regional content, multiple languages, and different content types with minimal modification."],
          ].map(([title, detail]) => (
            <div key={title} className="flex gap-4 items-start">
              <span className="text-blue-400 font-bold text-sm mt-1 shrink-0">→</span>
              <p className="text-gray-300 text-base leading-relaxed">
                <span className="text-white font-semibold">{title}</span> — {detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "architecture",
    label: "The Architecture",
    content: (
      <p className="text-gray-300 text-lg leading-relaxed">
        This is not an argument against humans. Subject Matter Experts are irreplaceable — their knowledge, judgment, and voice are the product. What AI replaces is the rote, repetitive data entry that has nothing to do with subject matter expertise. The pipeline is designed so that every piece of AI-generated metadata passes through a human QA review before anything goes live. SMEs create. AI processes. Humans approve. Nothing publishes without sign-off.
      </p>
    ),
  },
  {
    id: "timeline",
    label: "Timeline",
    content: (
      <div className="space-y-3">
        {[
          ["Concept to live deployed site", "1 day"],
          ["Single video fully processed", "10 minutes"],
          ["Cost per video", "$0.02"],
          ["Batch test (10 videos)", "results coming soon"],
        ].map(([metric, value]) => (
          <div key={metric} className="flex items-baseline gap-4">
            <span className="text-blue-400 font-bold text-xl font-mono">{value}</span>
            <span className="text-gray-400 text-sm">{metric}</span>
          </div>
        ))}
      </div>
    ),
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white font-sans">

      <header className="border-b border-gray-800 px-8 py-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-blue-400 mb-3">About</p>
          <h1 className="text-4xl font-bold tracking-tight">How This Was Built</h1>
          <p className="text-gray-400 mt-3 text-lg">Methodology, architecture, and timeline from concept to deployment.</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-8 py-14 space-y-16">
        {sections.map(({ id, label, content }) => (
          <section key={id} className="border-b border-gray-800 pb-16 last:border-0 last:pb-0">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-6">{label}</p>
            {content}
          </section>
        ))}
      </div>

      <footer className="px-8 py-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p className="text-gray-600 text-sm">Built as a screener submission for Khan Academy India — Project Manager, Content Operations</p>
          <p className="text-gray-600 text-sm">Victor Meinert · June 2026</p>
        </div>
      </footer>

    </main>
  );
}
