import Link from "next/link";

export default function ScreenerPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white font-sans">

      {/* Header */}
      <header className="border-b border-gray-800 px-8 py-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-blue-400 mb-3">Screener</p>
          <h1 className="text-4xl font-bold tracking-tight">Khan Academy PM Content Operations</h1>
          <p className="text-gray-400 mt-2 text-lg">Screener Proposal</p>
          <p className="text-gray-500 mt-1 text-sm">Victor Meinert | June 2026</p>
          <div className="mt-6 max-w-3xl space-y-4">
            <p className="text-gray-400 text-base leading-relaxed italic">
              While the brief calls for an intern-based workflow, this proposal presents a faster, more scalable, lower-cost alternative that uses AI to eliminate the production bottleneck entirely, and a working proof of concept to back it up.
            </p>
            <p className="text-gray-400 text-base leading-relaxed italic">
              This proposal recommends a solution that utilizes agentic agents to process all raw video content to automatically generate the required metadata/SEO. AI generates, and humans verify. The result is 1,000 videos published in under three months at a measurable cost savings and a new agentic pipeline for Khan Academy that can scale beyond 1k videos to 10k, or 100k.
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              A successful proof of concept has been completed and can be accessed at{" "}
              <Link href="/poc" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">
                /poc
              </Link>
              .
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-8 py-14 space-y-20">

        {/* Section 1 */}
        <section className="border-b border-gray-800 pb-20">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-6">Section 1</p>
          <h2 className="text-2xl font-bold text-white mb-12">Workflow &amp; Capacity Planning</h2>

          {/* Phase 1 */}
          <div className="mb-12">
            <div className="flex flex-wrap items-baseline gap-3 mb-6">
              <h3 className="text-white font-semibold text-lg">Phase 1: Infrastructure &amp; Foundation</h3>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 border border-blue-400 rounded-full px-3 py-0.5">Weeks 1-3</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 border border-gray-600 rounded-full px-3 py-0.5">PM owns</span>
            </div>
            <ul className="space-y-2 mb-5">
              {[
                "Build, context, test, and harden the AI metadata agentic engine (recommend Claude)*",
                "Setup Jira: states, automations, Review Time Allowance (RTA), escalation triggers, reports, etc.",
                "SME Advisor board: Assemble knowledge base from SME documentation + platform standards",
                "Publish end-to-end pipeline documentation that covers responsibility assignment framework (RACI). Includes all stakeholders: IT/SME/QA/CMS/PM, + business owners.",
                "Stand up cloud storage, security, and asset access controls, CMS, etc.",
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start text-gray-300 text-base leading-relaxed">
                  <span className="text-blue-400 font-bold shrink-0 mt-0.5">→</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-gray-500 text-sm italic mb-8">
              Proprietary information and data will not be shared back to the AI provider.
            </p>

            <div className="bg-[#0a0f1e] border border-blue-500 shadow-[0_0_24px_rgba(59,130,246,0.2)] rounded-xl p-6">
              <p className="text-xs uppercase tracking-widest text-blue-400 mb-3">MVP Gate</p>
              <p className="text-gray-300 text-base leading-relaxed mb-3">
                Phase 1 closes with a formal end-to-end content test: a 10% subset of actual Khan Academy raw videos run through the system and every element of the system is exercised, every stakeholder is actively engaged. This MVP cycle is the key mitigation mechanism for shielding SMEs from unnecessary or uncontrolled distraction during the live production phase and is expected to be the highest SME time commitment. SMEs from each subject area will provide hands-on review of MVP outputs and provide feedback and explicit approval before production begins. Iterate as necessary.
              </p>
              <p className="text-gray-300 text-base leading-relaxed">
                Because the processing solution uses the SMEs actual content (their words, their concepts already in the videos) there should be a high level of confidence that the outputs will be consistently contextually accurate and therefore high value.
              </p>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="mb-12">
            <div className="flex flex-wrap items-baseline gap-3 mb-6">
              <h3 className="text-white font-semibold text-lg">Phase 2: Agentic Asset Processing</h3>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 border border-blue-400 rounded-full px-3 py-0.5">Fully Automated</span>
            </div>
            <p className="text-gray-400 text-base mb-4">All 1,000 videos enter the pipeline as a bulk run.</p>
            <ul className="space-y-2 mb-5">
              {[
                "Agent ingests each video and transcribes audio",
                "Generates 5 outputs: title, SEO description, timestamps, tags, thumbnail brief",
                "Deposits video + metadata to structured cloud storage",
                "Auto-creates a Jira ticket, links the asset, notifies QA team with status: Ready for Review",
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start text-gray-300 text-base leading-relaxed">
                  <span className="text-blue-400 font-bold shrink-0 mt-0.5">→</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-gray-400 text-base leading-relaxed mb-2">
              Estimated token cost for 1,000 videos in API fees: <span className="text-white font-semibold">~$50 and 8 days</span>
            </p>
            <p className="text-gray-400 text-base leading-relaxed">
              Could also be staged if desired to reduce risk, but compute cost is low enough to not prioritise chunking.
            </p>
          </div>

          {/* Phase 3 */}
          <div className="mb-12">
            <div className="flex flex-wrap items-baseline gap-3 mb-6">
              <h3 className="text-white font-semibold text-lg">Phase 3: QA Review</h3>
              <span className="text-xs font-semibold uppercase tracking-widest text-green-400 border border-green-500 rounded-full px-3 py-0.5">Human Gate</span>
            </div>
            <p className="text-gray-300 text-base leading-relaxed mb-6">
              QA interns verify AI outputs. Each ticket has a built-in Review Time Allowance (RTA), the total budgeted time per asset covering initial review, defect logging, and re-review. Enforced natively in Jira.
            </p>
            <div className="space-y-3 mb-5">
              {[
                ["Standard RTA", "20 minutes per video"],
                ["Exception ceiling", "30 minutes for complex or high-defect videos"],
                ["Remediation", "AI agent re-generates flagged outputs, QA reviewer re-reviews (does not rewrite)"],
                ["SME spot check", "SME spotchecks outputs for content accuracy patterns"],
                ["Full escalation", "triggered only when data hallucinations occur or content is factually ambiguous beyond the knowledge base"],
              ].map(([label, detail]) => (
                <div key={label} className="flex gap-3 items-start text-base leading-relaxed">
                  <span className="text-blue-400 font-bold shrink-0 mt-0.5">→</span>
                  <p className="text-gray-300">
                    <span className="text-white font-semibold">{label}</span>: {detail}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-base leading-relaxed">
              Extra validation could be achieved with agentic agents running SEO routines against CMS outputs.
            </p>
          </div>

          {/* Phase 4 */}
          <div className="mb-12">
            <div className="flex flex-wrap items-baseline gap-3 mb-6">
              <h3 className="text-white font-semibold text-lg">Phase 4: Agentic Publishing</h3>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 border border-blue-400 rounded-full px-3 py-0.5">Fully Automated</span>
            </div>
            <p className="text-gray-300 text-base leading-relaxed">
              Approved tickets trigger the publishing agent. Video and metadata push to the Khan Academy CMS. Ticket closes. PM maintains a notification bridge so CMS stakeholders know what&apos;s inbound.
            </p>
          </div>

          {/* Total System Time */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-5">Total System Time Per Video</p>
            <div className="space-y-3 mb-4">
              {[
                ["~4 min", "Metadata processing and output", "automated"],
                ["20 min", "QA review (RTA), human-only phase", "human only"],
                ["~1 min", "Publishing", "automated"],
              ].map(([time, label, type]) => (
                <div key={label} className="flex items-baseline gap-4">
                  <span className="text-blue-400 font-bold text-xl font-mono w-16 shrink-0">{time}</span>
                  <span className="text-gray-300 text-base">{label}</span>
                  <span className={`text-xs font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full ${type === "human only" ? "text-green-400 bg-green-950" : "text-blue-400 bg-blue-950"}`}>{type}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-base leading-relaxed">
              Total: <span className="text-white font-semibold">~30 minutes per video.</span> 20 minutes is human. All else automated.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section>
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-6">Section 2</p>
          <h2 className="text-2xl font-bold text-white mb-6">Resource Pitch &amp; Budgeting</h2>
          <p className="text-gray-300 text-base leading-relaxed mb-8">
            Because interns verify rather than produce, 3 reviewers are sufficient to cover 1,000 videos in under three months with significant capacity to spare. Infrastructure for AI compute may require IT support and scalable (AWS) cloud infrastructure so cost there is tbd but should be minimal. Cost for AI infrastructure can be amortized across future projects.
          </p>

          {/* QA Pod */}
          <div className="mb-8">
            <div className="space-y-2 mb-6">
              {[
                "3 India-based QA reviewers",
                "Stipend: 17,500 INR/month (~$184 USD), current India market rate for content ops / QA roles",
                "Duration: under 3 months",
              ].map((item) => (
                <div key={item} className="flex gap-3 items-start text-gray-300 text-base leading-relaxed">
                  <span className="text-blue-400 font-bold shrink-0 mt-0.5">→</span>
                  {item}
                </div>
              ))}
            </div>
            <p className="text-gray-300 text-base font-semibold">
              Total QA pod cost: ~$1,800 USD | AI API cost: ~$50 | Total: ~$2,000
            </p>
          </div>

          {/* Capacity */}
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-5">Capacity</p>
            <p className="text-gray-400 text-base leading-relaxed mb-5">
              If we assume the project is required to reach 100% completion in exactly 3 months and the system architecture consumes 3 weeks of that budget, this proposal targets a 6 week QA phase.
            </p>
            <div className="space-y-2 mb-5">
              {[
                "Intern RTA = 20 min/video",
                "3 QA Interns x 30 billable hrs/wk = 90 hrs/wk",
                "Throughput Potential = 270 videos/wk",
                "6wk Capacity = ~1,620 videos",
              ].map((item) => (
                <div key={item} className="flex gap-3 items-start text-gray-300 text-base leading-relaxed">
                  <span className="text-blue-400 font-bold shrink-0 mt-0.5">→</span>
                  {item}
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-base leading-relaxed mb-2">
              Capacity buffer to be applied to initial training/ramp-up and defect loops, re-reviews.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              90 hours x 60 min = 5,400 min divided by 20 min per video = 270 videos/week
            </p>
          </div>

          {/* SME Time */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-5">SME Time Commitment</p>
            <p className="text-gray-400 text-base leading-relaxed mb-5">
              Full transparency on what this model asks of SME stakeholders:
            </p>
            <div className="space-y-2 mb-4">
              {[
                "Knowledge base + agent training: 1 day per SME, one time (Phase 1)",
                "MVP Gate review and approval: ~2 days per SME, one time (Phase 1)",
                "Spot checks every 10th video: ~5 min x 100 checks = 1 day total (Phase 3) (tbd necessary)",
                "Full escalations: volume tbd, calibrated after MVP Gate",
              ].map((item) => (
                <div key={item} className="flex gap-3 items-start text-gray-300 text-base leading-relaxed">
                  <span className="text-blue-400 font-bold shrink-0 mt-0.5">→</span>
                  {item}
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-base leading-relaxed">
              Total per SME controlled capacity commitment: <span className="text-white font-semibold">~3-4 days across 3 months.</span>
            </p>
          </div>
        </section>

      </div>

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
