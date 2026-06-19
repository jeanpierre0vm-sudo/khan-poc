"use client";

import Link from "next/link";

const pages = [
  {
    href: "/about",
    label: "About",
    description: "How this was built, the methodology, and the timeline from concept to deployment.",
  },
  {
    href: "/poc",
    label: "Proof of Concept",
    description: "A live demonstration: one raw video processed into five complete metadata outputs in 10 minutes for $0.02.",
  },
  {
    href: "/screener",
    label: "Screener",
    description: "My written responses to the three screener questions: workflow design, resource planning, and QA protocol.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white font-sans">

      {/* Hero */}
      <section className="px-8 py-20 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-blue-400 mb-4">Screener Submission — Khan Academy</p>
          <h1 className="text-5xl font-bold leading-tight tracking-tight max-w-3xl">
            Project Manager, Content Operations
          </h1>
          <div className="mt-6 flex flex-col gap-1">
            <p className="text-base text-gray-300 font-semibold">Victor Meinert</p>
            <a
              href="mailto:jeanpierre0vm@gmail.com"
              className="text-base text-blue-400 hover:text-blue-300 transition-colors"
            >
              jeanpierre0vm@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/victormeinert"
              className="text-base text-blue-400 hover:text-blue-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/victormeinert
            </a>
          </div>
        </div>
      </section>

      {/* What This Is */}
      <section className="px-8 py-14 border-b border-gray-800">
        <div className="max-w-6xl mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-6">What This Is</p>
          <p className="text-gray-300 text-lg leading-relaxed">
            This site is my response to the screener that accompanied that application. Rather than answer the questions on paper, I built a working proof of concept: a fully agentic AI pipeline that processes raw video into publication-ready metadata in minutes, at low cost, at any scale.
          </p>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="px-8 py-14 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-10">What You&apos;ll Find Here</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pages.map(({ href, label, description }) => (
              <div
                key={href}
                className="bg-[#0a0f1e] border border-gray-800 rounded-xl p-7 flex flex-col gap-4 hover:border-blue-500 hover:shadow-[0_0_24px_rgba(59,130,246,0.2)] transition-all"
              >
                <h2 className="text-white font-bold text-xl tracking-tight">{label}</h2>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">{description}</p>
                <Link
                  href={href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors mt-2"
                >
                  View {label} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p className="text-gray-600 text-sm">Built as a screener submission for Khan Academy India — Project Manager, Content Operations</p>
          <p className="text-gray-600 text-sm">Victor Meinert · June 2026</p>
        </div>
      </footer>

    </main>
  );
}
