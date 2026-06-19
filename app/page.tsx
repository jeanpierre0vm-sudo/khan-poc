"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

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

type Video = {
  id: string;
  videoName: string;
  title: string;
  tags: string;
  timestamps: string;
  qaStatus: string | null;
  videoUrl: string | null;
  processingCost: string;
  duration: string;
};

function QaBadge({ status }: { status: string | null }) {
  if (!status) return <span className="text-gray-600 text-xs">—</span>;
  const styles: Record<string, string> = {
    Approved: "bg-green-900 text-green-300 border-green-700",
    Pending: "bg-yellow-900 text-yellow-300 border-yellow-700",
    Failed: "bg-red-900 text-red-300 border-red-700",
  };
  const cls = styles[status] ?? "bg-gray-800 text-gray-400 border-gray-700";
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${cls}`}>
      {status}
    </span>
  );
}

function VideoTable({ videos }: { videos: Video[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden">
      {/* Table header */}
      <div className="grid grid-cols-[2fr_3fr_1fr_1fr_1fr] gap-4 px-5 py-3 bg-gray-900 border-b border-gray-800 text-xs uppercase tracking-widest text-gray-500">
        <span>Video Name</span>
        <span>AI-Generated Title</span>
        <span>Duration</span>
        <span>QA Status</span>
        <span>Cost</span>
      </div>

      {videos.map((v) => {
        const isOpen = expanded === v.id;
        return (
          <div key={v.id} className="border-b border-gray-800 last:border-0">
            {/* Row */}
            <button
              onClick={() => setExpanded(isOpen ? null : v.id)}
              className="w-full grid grid-cols-[2fr_3fr_1fr_1fr_1fr] gap-4 px-5 py-4 text-left hover:bg-gray-900 transition-colors items-center"
            >
              <span className="text-gray-200 text-sm font-medium truncate">{v.videoName}</span>
              <span className="text-gray-400 text-sm truncate">{v.title || "—"}</span>
              <span className="text-gray-500 text-sm">{v.duration || "—"}</span>
              <span><QaBadge status={v.qaStatus} /></span>
              <span className="text-gray-500 text-sm flex items-center justify-between">
                {v.processingCost || "—"}
                <span className="text-gray-700 ml-2">{isOpen ? "▲" : "▼"}</span>
              </span>
            </button>

            {/* Expanded detail */}
            {isOpen && (
              <div className="px-5 pb-5 bg-gray-900 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Timestamps</p>
                  <pre className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-mono">
                    {v.timestamps || "No timestamps available."}
                  </pre>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {v.tags
                      ? v.tags.split(",").map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-700"
                          >
                            {tag.trim()}
                          </span>
                        ))
                      : <span className="text-gray-600 text-sm">No tags available.</span>
                    }
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function HomePage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

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

      {/* Video Metadata Repository */}
      <section className="px-8 py-14 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Video Metadata Repository</p>
          <h2 className="text-2xl font-bold text-white mb-2">Batch Output — 10 Videos</h2>
          <p className="text-gray-400 text-sm mb-8">AI-generated metadata for each video, pulled live from Notion. Click any row to expand timestamps and tags.</p>

          {loading && (
            <div className="flex items-center gap-3 text-gray-500 py-12">
              <div className="w-4 h-4 border-2 border-gray-600 border-t-blue-400 rounded-full animate-spin" />
              <span className="text-sm">Loading from Notion...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-950 border border-red-800 rounded-xl px-5 py-4 text-red-300 text-sm">
              Failed to load videos: {error}
            </div>
          )}

          {!loading && !error && <VideoTable videos={videos} />}
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
