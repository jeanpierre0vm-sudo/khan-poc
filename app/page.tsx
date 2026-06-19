"use client";

import { useState, useEffect, useCallback } from "react";

type Video = {
  id: string;
  videoName: string;
  title: string;
  description: string;
  tags: string;
  timestamps: string;
  qaStatus: string | null;
  videoUrl: string | null;
  processingCost: string;
  duration: string;
};

const THUMBNAIL_MAP: Record<string, string> = {
  "01": "/thumbnails/thumbnail_01_areas_rectangles.svg",
  "02": "/thumbnails/thumbnail_02_identifying_problem.svg",
  "03": "/thumbnails/thumbnail_03_mental_computation.svg",
  "04": "/thumbnails/thumbnail_04_place_value_decimals.svg",
  "05": "/thumbnails/thumbnail_05_geometric_shapes.svg",
  "06": "/thumbnails/thumbnail_06_estimating_rounding.svg",
  "07": "/thumbnails/thumbnail_07_simplifying_problem.svg",
  "08": "/math_works_thumbnail.png",
  "09": "/thumbnails/thumbnail_09_perimeter_area.svg",
  "10": "/thumbnails/thumbnail_10_using_tables.svg",
  "11": "/thumbnails/thumbnail_11_fractions_like_denominators.svg",
};

function getThumbnail(videoName: string): string {
  const match = videoName.match(/Math Works (\d{2})/i);
  const ep = match?.[1] ?? "";
  return THUMBNAIL_MAP[ep] ?? "/math_works_thumbnail.png";
}

function getEpisode(videoName: string): string {
  const match = videoName.match(/Math Works (\d{2})/i);
  return match ? `EP ${match[1]}` : "";
}

function QaBadge({ status }: { status: string | null }) {
  if (!status) return <span className="text-gray-600 text-xs">—</span>;
  const styles: Record<string, string> = {
    Approved: "bg-green-900 text-green-300 border-green-700",
    Pending: "bg-yellow-900 text-yellow-300 border-yellow-700",
    Failed: "bg-red-900 text-red-300 border-red-700",
  };
  const cls = styles[status] ?? "bg-gray-800 text-gray-400 border-gray-700";
  return (
    <span className={"text-xs font-semibold px-2 py-0.5 rounded-full border " + cls}>
      {status}
    </span>
  );
}

function TimestampLine({ line }: { line: string }) {
  const match = line.match(/^(\d{1,2}:\d{2}(?::\d{2})?)\s+(.*)/);
  if (match) {
    return (
      <div className="flex gap-3">
        <span className="text-blue-400 font-mono font-semibold shrink-0">{match[1]}</span>
        <span className="text-gray-300">{match[2]}</span>
      </div>
    );
  }
  return <p className="text-gray-300">{line}</p>;
}

function Modal({ video, onClose }: { video: Video; onClose: () => void }) {
  const thumbnail = getThumbnail(video.videoName);
  const timestampLines = video.timestamps
    ? video.timestamps.split("\n").filter((l) => l.trim())
    : [];
  const tagList = video.tags ? video.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-950 border border-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors text-xl leading-none z-10"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="rounded-t-2xl overflow-hidden">
          <img src={thumbnail} alt={video.videoName} className="w-full" />
        </div>

        <div className="p-7 space-y-6">
          <div className="flex items-start gap-3 flex-wrap">
            <h2 className="text-white text-2xl font-bold leading-snug flex-1">
              {video.title || video.videoName}
            </h2>
            <QaBadge status={video.qaStatus} />
          </div>

          {video.videoUrl && (
            <a
              href={video.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 border border-blue-500 hover:border-blue-400 rounded-lg px-4 py-2 transition-colors"
            >
              Watch Video →
            </a>
          )}

          {video.description && (
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Description</p>
              <p className="text-gray-300 text-sm leading-relaxed">{video.description}</p>
            </div>
          )}

          {timestampLines.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Timestamps</p>
              <div className="space-y-2 text-sm">
                {timestampLines.map((line, i) => (
                  <TimestampLine key={i} line={line} />
                ))}
              </div>
            </div>
          )}

          {tagList.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Tags</p>
              <div className="flex flex-wrap gap-2">
                {tagList.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function VideoCard({ video, onClick }: { video: Video; onClick: () => void }) {
  const thumbnail = getThumbnail(video.videoName);
  const episode = getEpisode(video.videoName);

  return (
    <button
      onClick={onClick}
      className="group bg-gray-900 border border-blue-500/40 rounded-xl overflow-hidden text-left hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
    >
      <div className="overflow-hidden">
        <img
          src={thumbnail}
          alt={video.videoName}
          className="w-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-3">
        {episode && (
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-1 block">
            {episode}
          </span>
        )}
        <p className="text-white text-sm font-semibold leading-snug line-clamp-2">
          {video.title || video.videoName}
        </p>
      </div>
    </button>
  );
}

export default function HomePage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Video | null>(null);

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const sorted = [...data].sort((a: Video, b: Video) => {
          const epA = parseInt(a.videoName.match(/Math Works (\d{2})/i)?.[1] ?? "0", 10);
          const epB = parseInt(b.videoName.match(/Math Works (\d{2})/i)?.[1] ?? "0", 10);
          return epA - epB;
        });
        setVideos(sorted);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const closeModal = useCallback(() => setSelected(null), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeModal]);

  return (
    <main className="min-h-screen bg-gray-950 text-white font-sans">

      {/* Header */}
      <header className="border-b border-gray-800 px-8 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl font-bold text-blue-400">Proof of Concept</h1>
        </div>
      </header>

      {/* Hero */}
      <section className="px-8 py-14 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-3">The Problem</p>
          <h2 className="text-4xl font-bold leading-tight max-w-3xl">
            1,000 raw videos, no metadata. 100% agentic processing for metadata/SEO.
          </h2>
          <p className="mt-5 text-gray-400 max-w-2xl text-lg leading-relaxed">
            This proof of concept demonstrates an AI-powered pipeline that ingests any raw video, generates a publish-ready metadata package in minutes, and routes output to a small QA team for review.
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
          <p className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-10">Proposed Pipeline</p>
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
            {[
              { step: "01", title: "Ingest", desc: "AI Agent pulls video from source URL. No manual download required.", badge: "AI" },
              { step: "02", title: "Transcribe", desc: "Whisper AI converts audio to full text transcript locally. No API cost.", badge: "AI" },
              { step: "03", title: "Generate", desc: "Claude reads transcript and writes all 5 metadata outputs simultaneously.", badge: "AI" },
              { step: "04", title: "QA Review", desc: "QA team reviews for accuracy, approves or flags.", badge: "Human" },
              { step: "05", title: "Remediation", desc: "QA failures trigger an automatic repair loop. The AI agent ingests Jira feedback, corrects the metadata, and pushes back to QA for final sign-off.", badge: "AI" },
              { step: "06", title: "Publish", desc: "Final QA approval in Jira triggers the AI agent to package the video and metadata and push to the CDN.", badge: "AI" },
            ].map(({ step, title, desc, badge }) => (
              <div key={step} className={"relative rounded-xl p-6 border bg-[#0a0f1e] backdrop-blur-sm " + (badge === "Human" ? "border-green-500 shadow-[0_0_24px_rgba(34,197,94,0.35)]" : "border-blue-500 shadow-[0_0_24px_rgba(59,130,246,0.35)]")}>
                <span className={"absolute top-3 right-3 text-xs font-semibold px-2 py-0.5 rounded-full text-white " + (badge === "Human" ? "bg-green-500" : "bg-blue-500")}>{badge}</span>
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
          <p className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-10">Proof of Concept — Automated AI Output</p>
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

      {/* Video Metadata Repository */}
      <section className="px-8 py-14 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-3">Video Metadata Repository - Automated AI Output</p>
          <h2 className="text-2xl font-bold text-white mb-2">Batch Output — 10 Videos</h2>
          <p className="text-gray-400 text-sm mb-8">Click any card to view full output.</p>

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

          {!loading && !error && (
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {videos.map((v) => (
                <VideoCard key={v.id} video={v} onClick={() => setSelected(v)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p className="text-gray-600 text-sm">Built as a screener submission for Khan Academy India — Project Manager, Content Operations</p>
          <p className="text-gray-600 text-sm">Victor Meinert · June 2026</p>
        </div>
      </footer>

      {/* Modal */}
      {selected && <Modal video={selected} onClose={closeModal} />}

    </main>
  );
}
