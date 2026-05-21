import { createFileRoute } from "@tanstack/react-router";
import {
  LayoutGrid,
  Boxes,
  CalendarRange,
  Send,
  CalendarDays,
  MapPin,
  Users,
  Settings as SettingsIcon,
  Heart,
  Mail,
  Sparkles,
  Coffee,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Artful Archive — Free studio OS for artists" },
      {
        name: "description",
        content:
          "Artful Archive is a free studio operating system for artists: inventory, exhibitions, submissions, calendar, venues and contacts in one quiet place.",
      },
      { property: "og:title", content: "Artful Archive — Free studio OS for artists" },
      {
        property: "og:description",
        content:
          "Catalog every piece, track exhibitions and submissions, manage your calendar, venues and contacts. Free forever.",
      },
    ],
  }),
  component: Index,
});

const sections = [
  {
    icon: LayoutGrid,
    name: "Overview",
    desc: "Your studio at a glance — recent works, upcoming shows, open submissions and the numbers that matter, gathered in one calm dashboard.",
  },
  {
    icon: Boxes,
    name: "Inventory",
    desc: "Every piece, every detail. Search, sort and filter your catalog. Tag works, group collections and follow each piece's history.",
  },
  {
    icon: CalendarRange,
    name: "Exhibitions",
    desc: "Plan shows from first idea to final wall. Track loans, sales, locations and which works travelled where.",
  },
  {
    icon: Send,
    name: "Submissions",
    desc: "Keep open calls, gallery applications and residencies organised. Deadlines, statuses and the works attached — never lost in your inbox again.",
  },
  {
    icon: CalendarDays,
    name: "Calendar",
    desc: "A studio-aware calendar. Openings, deadlines, studio visits and shipping dates living next to your practice, not in another app.",
  },
  {
    icon: MapPin,
    name: "Venues",
    desc: "Galleries, museums, project spaces and fairs — addresses, contacts and the history of what you've shown there.",
  },
  {
    icon: Users,
    name: "Contacts",
    desc: "Curators, collectors, gallerists and friends of the studio. Soft CRM made for artists, not sales teams.",
  },
  {
    icon: SettingsIcon,
    name: "Settings",
    desc: "Make it yours. Studio name, currency, units, tags and the small preferences that turn software into a tool.",
  },
];

function Index() {
  return (
    <main className="min-h-screen">
      {/* Top bar */}
      <header className="h-2 w-full" style={{ background: "var(--gradient-bar)" }} />

      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <nav className="flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <div
              className="grid h-10 w-10 place-items-center rounded-xl"
              style={{ background: "var(--gradient-hero)", boxShadow: "var(--glow-primary)" }}
            >
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg font-semibold">Artful Archive</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Studio OS
              </div>
            </div>
          </div>
          <div className="hidden gap-8 text-sm text-muted-foreground sm:flex">
            <a href="#sections" className="hover:text-foreground">Sections</a>
            <a href="#support" className="hover:text-foreground">Support</a>
            <a href="#contact" className="hover:text-foreground">Contact</a>
          </div>
        </nav>

        {/* Hero */}
        <section className="pt-16 pb-28 sm:pt-24 sm:pb-36">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Free forever — no card, no trial
          </span>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.05] sm:text-7xl">
            A quiet place for{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-hero)" }}
            >
              every piece
            </span>{" "}
            you make.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Artful Archive is a studio operating system for artists — inventory,
            exhibitions, submissions, calendar, venues and contacts. Built by an artist,
            given away freely.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#sections"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:brightness-110"
              style={{ boxShadow: "var(--glow-primary)" }}
            >
              See what's inside
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#support"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:bg-card"
            >
              <Heart className="h-4 w-4" /> Support the project
            </a>
          </div>

          <div className="mt-12 inline-flex items-center gap-3 rounded-2xl border border-border bg-card/60 px-5 py-3 text-sm text-muted-foreground backdrop-blur">
            <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
              $0
            </span>
            Always free for artists. Forever. No paywalled features, no upsells.
          </div>
        </section>

        {/* Sections */}
        <section id="sections" className="scroll-mt-24 pb-28">
          <div className="mb-14 flex items-end justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                The archive
              </div>
              <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">
                Eight rooms, one studio.
              </h2>
            </div>
            <p className="hidden max-w-sm text-sm text-muted-foreground sm:block">
              Each section is a deliberate space for a different part of an artist's
              practice. Use what you need, ignore the rest.
            </p>
          </div>

          <ul className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">
            {sections.map(({ icon: Icon, name, desc }, i) => (
              <li
                key={name}
                className="group relative bg-card p-8 transition hover:bg-secondary"
              >
                <div className="flex items-start gap-5">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-xs tabular-nums text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-2xl font-semibold">{name}</h3>
                    </div>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                      {desc}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Support */}
        <section id="support" className="scroll-mt-24 pb-28">
          <div
            className="relative overflow-hidden rounded-3xl border border-border p-10 sm:p-16"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-30"
              style={{ background: "var(--gradient-hero)" }}
            />
            <div className="absolute inset-0 bg-card/80 backdrop-blur-sm" />

            <div className="relative grid gap-10 sm:grid-cols-[1.4fr_1fr] sm:items-center">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-primary">
                  Support me
                </div>
                <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">
                  Keep the archive free.
                </h2>
                <p className="mt-5 max-w-xl text-muted-foreground">
                  Artful Archive will always be free to use. If it's helped your practice,
                  you can chip in toward hosting, development and the next quiet feature.
                  Every coffee buys another evening of work.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:brightness-110"
                    style={{ boxShadow: "var(--glow-primary)" }}
                  >
                    <Coffee className="h-4 w-4" /> Buy me a coffee
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-medium text-foreground transition hover:bg-secondary"
                  >
                    <Heart className="h-4 w-4 text-primary" /> Become a patron
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background/60 p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  What support buys
                </div>
                <ul className="mt-4 space-y-3 text-sm">
                  {[
                    "Servers, storage, backups",
                    "New sections & integrations",
                    "Honest, ad-free software",
                    "Time to keep it free",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="text-foreground/90">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-24 pb-32">
          <div className="grid gap-12 sm:grid-cols-[1fr_1.2fr] sm:items-end">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Drop me a message
              </div>
              <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">
                Say hello.
              </h2>
              <p className="mt-5 text-muted-foreground">
                Feedback, feature requests, gallery partnerships or just a note from your
                studio — it all lands in the same inbox, and I read every one.
              </p>
            </div>

            <a
              href="mailto:hello@artfularchive.app"
              className="group flex items-center justify-between gap-6 rounded-2xl border border-border bg-card p-6 transition hover:border-primary hover:bg-secondary sm:p-8"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="flex items-center gap-5">
                <div
                  className="grid h-14 w-14 place-items-center rounded-xl text-primary-foreground"
                  style={{ background: "var(--gradient-hero)" }}
                >
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Email
                  </div>
                  <div className="mt-1 font-display text-2xl font-semibold sm:text-3xl">
                    hello@artfularchive.app
                  </div>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
            </a>
          </div>
        </section>

        <footer className="flex flex-col items-start justify-between gap-4 border-t border-border py-10 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Artful Archive — free, forever.</div>
          <div className="flex items-center gap-2">
            Made with <Heart className="h-3.5 w-3.5 text-primary" /> for artists.
          </div>
        </footer>
      </div>
    </main>
  );
}
