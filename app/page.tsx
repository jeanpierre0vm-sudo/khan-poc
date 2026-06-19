"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

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
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${cls}`}>
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
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors text-xl leading-none z-10"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Thumbnail */}
        <div className="rounded-t-2xl overflow-hidden">
          <img src={thumbnail} alt={video.videoName} className="w-full" />
        </div>

        <div className="p-7 space-y-6">
          {/* Title + status */}
          <div className="flex items-start gap-3 flex-wrap">
            <h2 className="text-white text-2xl font-bold leading-snug flex-1">
              {video.title || video.videoName}
            </h2>
            <QaBadge status={video.qaStatus} />
          </div>

          {/* Watch Video */}
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

          {/* Description */}
          {video.description && (
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Description</p>
              <p className="text-gray-300 text-sm leading-relaxed">{video.description}</p>
            </div>
          )}

          {/* Timestamps */}
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

          {/* Tags */}
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
          <p className="text-gray-400 text-sm mb-8">AI-generated metadata pulled live from Notion. Click any card to view full output.</p>

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
      <footer className="px-8 py-8 border-t border-gray-800">
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
