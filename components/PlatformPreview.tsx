"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Wrench,
  MessageSquare,
  FileText,
  Receipt,
  Check,
  Clock,
  type LucideIcon,
} from "lucide-react";

type Status = "handled" | "scheduled" | "approval";

type Activity = {
  icon: LucideIcon;
  title: string;
  detail: string;
  unit: string;
  time: string;
  status: Status;
};

const ACTIVITY: Activity[] = [
  {
    icon: Wrench,
    title: "Leak reported",
    detail: "Routed to ProTech Plumbing · scheduled Thu 9:00 AM",
    unit: "Unit 4B",
    time: "2m ago",
    status: "scheduled",
  },
  {
    icon: MessageSquare,
    title: "Tenant question about rent",
    detail: "Drafted and sent a reply with their balance",
    unit: "Unit 12C",
    time: "8m ago",
    status: "handled",
  },
  {
    icon: FileText,
    title: "Lease renewal ready",
    detail: "Drafted with current terms — waiting for your sign-off",
    unit: "Unit 7A",
    time: "21m ago",
    status: "approval",
  },
  {
    icon: Receipt,
    title: "Vendor invoice matched",
    detail: "Checked against work order #1182 · cleared to pay",
    unit: "ProTech",
    time: "34m ago",
    status: "handled",
  },
];

const STATUS_STYLES: Record<
  Status,
  { label: string; className: string; icon: LucideIcon }
> = {
  handled: {
    label: "Handled",
    className:
      "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/25",
    icon: Check,
  },
  scheduled: {
    label: "Scheduled",
    className: "bg-heading/5 text-heading ring-heading/15",
    icon: Clock,
  },
  approval: {
    label: "Needs your OK",
    className: "bg-accent/15 text-accent ring-accent/40",
    icon: Clock,
  },
};

export default function PlatformPreview() {
  const reduce = useReducedMotion();

  return (
    <div className="rounded-2xl border border-line bg-card shadow-[0_30px_60px_-30px_rgba(11,20,82,0.22)]">
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
          </span>
          <span className="text-[13px] font-semibold text-heading">
            Novaric Console
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-faint">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            {!reduce && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Live
        </span>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 divide-x divide-line border-b border-line bg-band/60">
        {[
          { v: "47", l: "Handled today" },
          { v: "3", l: "Waiting on you" },
          { v: "6.2h", l: "Time saved" },
        ].map((s) => (
          <div key={s.l} className="px-4 py-3 text-center">
            <p className="text-xl font-semibold text-heading">{s.v}</p>
            <p className="mt-0.5 text-[11px] uppercase tracking-wide text-faint">
              {s.l}
            </p>
          </div>
        ))}
      </div>

      {/* Activity feed */}
      <ul className="divide-y divide-line">
        {ACTIVITY.map((a, i) => {
          const status = STATUS_STYLES[a.status];
          return (
            <motion.li
              key={a.title}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.15 + i * 0.12 }}
              className="flex items-start gap-3.5 px-5 py-4"
            >
              <span
                className={`mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                  a.status === "approval"
                    ? "bg-accent/15 text-accent"
                    : "bg-heading/5 text-heading"
                }`}
              >
                <a.icon size={17} strokeWidth={1.75} aria-hidden="true" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate text-[14px] font-semibold text-heading">
                    {a.title}
                  </p>
                  <span className="shrink-0 text-[11px] text-faint">
                    {a.time}
                  </span>
                </div>
                <p className="mt-0.5 text-[13px] leading-snug text-body">
                  {a.detail}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${status.className}`}
                  >
                    <status.icon size={11} strokeWidth={2.5} />
                    {status.label}
                  </span>
                  <span className="text-[11px] text-faint">{a.unit}</span>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>

      <p className="border-t border-line px-5 py-3 text-center text-[12px] text-faint">
        Agents handle the routine. You approve what matters.
      </p>
    </div>
  );
}
