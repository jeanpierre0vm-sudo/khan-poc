export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white font-sans">

      {/* Header */}
      <header className="border-b border-gray-800 px-8 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Proof of Concept</h1>
            <p className="text-gray-400 text-sm mt-0.5">AI Metadata Agent for PM Content Operations</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-widest">Built by</p>
            <p className="text-sm font-semibold text-white">Victor Meinert</p>
            <a href="mailto:jeanpierre0vm@gmail.com" className="text-xs text-gray-500 hover:text-gray-300 mt-0.5 block">jeanpierre0vm@gmail.com</a>
            <a href="https://www.linkedin.com/in/victormeinert" className="text-xs text-gray-500 hover:text-gray-300 mt-0.5 block">linkedin.com/in/victormeinert</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-8 py-14 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-blue-400 mb-3">The Problem</p>
          <h2 className="text-4xl font-bold leading-tight max-w-3xl">
            1,000 raw videos (no metadata). 100% agentic processing for metadata/SEO.
          </h2>
          <p className="mt-5 text-gray-400 max-w-2xl text-lg leading-relaxed">
            This proof of concept demonstrates an AI-powered pipeline that ingests any raw video, generates a publish-ready metadata package in minutes, and routes output to a small India-based QA team for review.
          </p>
          <div className="mt-8 flex gap-8">
            <div>
              <p className="text-3xl font-bold text-blue-400">4 min</p>
              <p className="text-sm text-gray-500 mt-1">Total processing time</p>
              <p className="text-sm text-gray-500 mt-1">single 14-min video</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-400">5</p>
              <p className="text-sm text-gray-500 mt-1">Metadata outputs generated</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-400">$0.02</p>
              <p className="text-sm text-gray-500 mt-1">Per video in API costs</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-8 py-14 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-10">Proposed Pipeline</p>
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
            {[
              { step: "01", title: "Ingest", desc: "AI Agent pulls video from source URL. No manual download required.", badge: "AI" },
              { step: "02", title: "Transcribe", desc: "Whisper AI converts audio to full text transcript locally. No API cost.", badge: "AI" },
              { step: "03", title: "Generate", desc: "Claude reads transcript and writes all 5 metadata outputs simultaneously.", badge: "AI" },
              { step: "04", title: "QA Review", desc: "India-based reviewer spends 5 min verifying accuracy. Approves or flags.", badge: "Human" },
              { step: "05", title: "Remediation", desc: "QA failures trigger an automatic repair loop. The AI agent ingests Jira feedback, corrects the metadata, and pushes back to QA for final sign-off.", badge: "AI" },
              { step: "06", title: "Publish", desc: "Final QA approval in Jira triggers the AI agent to package the video and metadata and push to the CDN. Editorial handoff from there — no manual upload required.", badge: "AI" },
            ].map(({ step, title, desc, badge }) => (
              <div key={step} className={`relative rounded-xl p-6 border bg-[#0a0f1e] backdrop-blur-sm ${badge === "Human" ? "border-green-500 shadow-[0_0_24px_rgba(34,197,94,0.35)]" : "border-blue-500 shadow-[0_0_24px_rgba(59,130,246,0.35)]"}`}>
                <span className={`absolute top-3 right-3 text-xs font-semibold px-2 py-0.5 rounded-full text-white ${badge === "Human" ? "bg-green-500" : "bg-blue-500"}`}>{badge}</span>
                <p className="text-4xl font-bold text-white mb-3">{step}</p>
                <p className="text-white font-semibold mb-2">{title}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="px-8 py-14 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-10">Proof of Concept</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* BEFORE */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="bg-red-900 text-red-300 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest">Before</span>
                <span className="text-gray-500 text-sm">Original — no metadata</span>
              </div>
              <div className="rounded-xl overflow-hidden border border-gray-800">
                <iframe
                  src="https://archive.org/embed/math-works/Math%20Works%2008%20Relating%20Fractions%20and%20Decimals.mp4"
                  width="100%"
                  height="300"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
              <div className="mt-5 bg-gray-900 rounded-xl p-5 border border-gray-800">
                <p className="text-xs uppercase tracking-widest text-gray-600 mb-3">Original Metadata</p>
                <p className="text-gray-300 font-medium">Math Works 08 Relating Fractions and Decimals</p>
                <p className="text-gray-600 text-sm mt-2">No description.</p>
                <p className="text-gray-600 text-sm mt-1">No timestamps.</p>
                <p className="text-gray-600 text-sm mt-1">No tags.</p>
                <p className="text-gray-600 text-sm mt-1">No thumbnail brief.</p>
              </div>
            </div>

            {/* AFTER */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="bg-green-900 text-green-300 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest">After</span>
                <span className="text-gray-500 text-sm">AI-generated — ready for QA</span>
              </div>
              <div className="space-y-4">

                {/* Thumbnail Image */}
                <div className="bg-gray-900 rounded-xl border border-gray-800">
                  <div className="px-5 pt-5 pb-3">
                    <p className="text-xs uppercase tracking-widest text-gray-600">Thumbnail</p>
                  </div>
                  <div className="overflow-hidden rounded-b-xl">
                    <img src="/math_works_thumbnail.png" alt="AI-generated thumbnail" className="w-full" />
                  </div>
                </div>

                {/* Title */}
                <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                  <p className="text-xs uppercase tracking-widest text-gray-600 mb-2">Title</p>
                  <p className="text-white font-semibold">Fractions to Decimals for Kids | 5th Grade Math Explained</p>
                </div>

                {/* Description */}
                <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                  <p className="text-xs uppercase tracking-widest text-gray-600 mb-2">Description</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Can&apos;t figure out how to turn fractions into decimals? This fun and easy math lesson breaks it all down — step by step — so any 5th grader can understand it!
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed mt-3">
                    In this video, you&apos;ll follow along with Gina as she tries to add up fractions with different denominators to order paint for her school play. Her friend Kate teaches her a super useful trick: convert fractions to decimals by turning the denominator into a power of ten.
                  </p>
                  <div className="mt-3 space-y-1">
                    {[
                      "How to convert fractions to decimals step by step",
                      "Why decimals are based on powers of ten",
                      "The difference between terminating and non-terminating decimals",
                      "How to use a calculator to divide numerator by denominator",
                      "Real-world examples that make fractions and decimals make sense"
                    ].map((item) => (
                      <p key={item} className="text-gray-300 text-sm">✅ {item}</p>
                    ))}
                  </div>
                </div>

                {/* Timestamps */}
                <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                  <p className="text-xs uppercase tracking-widest text-gray-600 mb-3">Timestamps</p>
                  <div className="space-y-2">
                    {[
                      ["00:00", "Introduction – Gina's Fraction Problem"],
                      ["01:45", "Kate Explains How to Convert Fractions to Decimals"],
                      ["03:30", "Making Denominators into Powers of Ten"],
                      ["05:10", "Fractionville and Decimal Town – Animated Story"],
                      ["08:00", "Terminating vs. Non-Terminating Decimals"],
                      ["10:20", "History of Decimals with George at the Ontario Science Center"],
                      ["13:05", "Using a Calculator to Divide Numerator by Denominator"],
                    ].map(([time, label]) => (
                      <div key={time} className="flex gap-3 text-sm">
                        <span className="text-blue-400 font-mono font-semibold w-12 shrink-0">{time}</span>
                        <span className="text-gray-300">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                  <p className="text-xs uppercase tracking-widest text-gray-600 mb-3">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "fractions and decimals", "converting fractions to decimals",
                      "5th grade math", "decimals for kids", "how to convert fractions",
                      "terminating decimals", "powers of ten", "elementary math",
                      "math for kids", "fractions explained", "5th grade fractions",
                      "math homework help", "PBS math", "decimal lesson",
                      "relating fractions and decimals"
                    ].map((tag) => (
                      <span key={tag} className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-700">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Thumbnail Brief */}
                <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                  <p className="text-xs uppercase tracking-widest text-gray-600 mb-2">Thumbnail Brief</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Bright, cheerful classroom or cartoon-style background with bold yellow and blue colors.
                    A friendly illustrated child holding a large fraction (3/4) with an arrow pointing to its
                    decimal equivalent (0.75). Text overlay: <span className="text-white font-semibold">&quot;Fractions → Decimals MADE EASY!&quot;</span> in
                    bold white with dark drop shadow.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p className="text-gray-600 text-sm">Built as a screener submission for Khan Academy India — Project Manager, Content Operations</p>
          <p className="text-gray-600 text-sm">Victor Meinert · June 2026</p>
        </div>
      </footer>

    </main>
  );
}