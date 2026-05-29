"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import HeatmapPreview from "@/components/landing/HeatmapPreview";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const FEATURES = [
  {
    index: "01",
    title: "A daily log",
    body: "Check off your habits with a single tap. Move through any day, past or future — everything saves the moment you do.",
  },
  {
    index: "02",
    title: "A living calendar",
    body: "Each day deepens as you complete more of it. Your month becomes a quiet portrait of how consistent you've been.",
  },
  {
    index: "03",
    title: "A streak to keep",
    body: "Finish everything in a day to extend your streak. One unbroken line is the only progress bar you need.",
  },
];

export default function LandingPage() {
  return (
    <div className="relative">
      {/* Top bar */}
      <header className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-6">
        <Logo />
        <Button asChild variant="outline" size="lg">
          <Link href="/log">Open app</Link>
        </Button>
      </header>

      {/* Hero */}
      <section className="mx-auto w-full max-w-3xl px-6 pt-20 pb-12 text-center sm:pt-28">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.p
            variants={fadeUp}
            className="mb-6 text-xs uppercase tracking-[0.28em] text-muted-foreground"
          >
            Local-first habit tracker
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl font-semibold leading-[1.04] tracking-tight text-balance sm:text-7xl"
          >
            The quiet discipline of{" "}
            <span className="italic font-normal">showing up.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty"
          >
            Signal is a calm place to keep your habits — a daily log, a calendar
            that fills in as you go, and a streak worth protecting. No account.
            Your data never leaves your browser.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Button asChild size="lg">
              <Link href="/log">
                Start tracking
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/calendar">See the calendar</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Calendar showcase */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mx-auto w-full max-w-3xl px-6 py-12"
      >
        <figure className="rounded-2xl border border-border bg-card p-6 sm:p-9 lift">
          <HeatmapPreview />
          <figcaption className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
            <span>A year of showing up.</span>
            <span className="flex items-center gap-2 text-xs">
              Less
              <span className="size-3.5 rounded-[5px] border border-border" />
              <span className="size-3.5 rounded-[5px] bg-ink/30" />
              <span className="size-3.5 rounded-[5px] bg-ink/60" />
              <span className="size-3.5 rounded-[5px] bg-ink" />
              More
            </span>
          </figcaption>
        </figure>
      </motion.section>

      {/* Features */}
      <section className="mx-auto w-full max-w-4xl px-6 py-12">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          {FEATURES.map(({ index, title, body }) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              className="bg-card p-7"
            >
              <div className="font-display text-sm text-muted-foreground">{index}</div>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="mx-auto w-full max-w-2xl px-6 py-20 text-center">
        <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Begin today.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Add a habit, check it off, come back tomorrow. That&apos;s the whole
          practice.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/log">
            Open Signal
            <ArrowRight />
          </Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-4 border-t border-border px-6 py-8 text-sm text-muted-foreground sm:flex-row">
        <Logo />
        <p>Local-first · No account · Your data stays in your browser.</p>
      </footer>
    </div>
  );
}
