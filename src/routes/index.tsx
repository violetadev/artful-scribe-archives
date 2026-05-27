import { useState } from "react";
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
  Coffee,
  ArrowRight,
  ArrowLeft,
  Download,
  X,
  type LucideIcon,
} from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { studioIconUrl } from "@/lib/brand";
import { studioRelease } from "@/lib/release";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Studio — Free art management software for artists" },
      {
        name: "description",
        content:
          "Studio is a free studio software made by an artist for artists: inventory, exhibitions, submissions, calendar, venues and contacts in one place.",
      },
      { property: "og:title", content: "Studio — Free Studio for artists" },
      {
        property: "og:description",
        content:
          "Catalog every piece, track exhibitions and submissions, manage your calendar, venues and contacts. With offline data, only you have access to it. Free forever.",
      },
      { property: "og:image", content: studioIconUrl },
      { name: "twitter:image", content: studioIconUrl },
    ],
  }),
  component: Index,
});

type Section = {
  icon: LucideIcon;
  name: string;
  desc: string;
  detail: string[];
  images: { src?: string; alt: string }[];
};

const sections: Section[] = [
  {
    icon: LayoutGrid,
    name: "Overview",
    desc: "Your studio at a glance. See recent works, upcoming shows, open submissions and the numbers that matter, gathered in one dashboard.",
    detail: [
      "The overview is your morning coffee view: what you made recently, what's on the wall soon, and which deadlines are creeping up.",
      "Stop juggling between apps, emails and sheets and jump straight into inventory, exhibitions or submissions.",
    ],
    images: [
      { src: "/sections/studio-overview.png", alt: "Overview dashboard" },
    ],
  },
  {
    icon: Boxes,
    name: "Inventory",
    desc: "All your artworks in one place. Search, sort and filter your catalog. Add images, tag sales, organize by custom tags, export as CSV and follow each artwork's history.",
    detail: [
      "Catalog every piece with photos, dimensions, medium, location, related contacts, sale status and more. Custom tags let you group work the way you think about it: series, year, medium, or whatever fits your practice.",
      "Filtered search makes it easy to pull up works for a portfolio, insurance list, or a last-minute submission. You can also export your inventory as CSV to share, backup, print or whatever you need it for.",
    ],
    images: [
      { src: "/sections/studio-inventory.png", alt: "Inventory grid with artwork thumbnails" },
      { src: "/sections/studio-inventory-add.png", alt: "Artwork detail with tags and history" },
    ],
  },
  {
    icon: CalendarRange,
    name: "Exhibitions",
    desc: "Track shows from start to end. Track artworks, delivery and pick up dates, venues and more.",
    detail: [
      "From proposal to post-show pickup, keep each show's artworks, install notes, delivery and pickup dates in one record linked to the venue.",
      "See which pieces you need to deliver or pick up and when. Have a clear view of exhibitions start and end dates and submissions deadlines.",
    ],
    images: [
      { src: "/sections/exhibitions.png", alt: "Exhibition timeline" },
      { src: "/sections/exhibitions-add.png", alt: "Works assigned to a show" },
    ],
  },
  {
    icon: Send,
    name: "Submissions",
    desc: "Keep open calls, gallery applications and residencies organised. Deadlines, statuses and the works submitted.",
    detail: [
      "Track open calls, gallery applications and residencies with deadlines, fees, status, results and the pieces you submitted.",
      "It will all sync to the calendar view, where you can track all your events in one place.",
    ],
    images: [
      { src: "/sections/studio-submissions.png", alt: "Submissions list with deadlines" },
      { src: "/sections/studio-submissions-add.png", alt: "Submission detail with attached works" },
    ],
  },
  {
    icon: CalendarDays,
    name: "Calendar",
    desc: "A studio-aware calendar. Openings, deadlines, studio visits and shipping dates living next to your practice, not in another app.",
    detail: [
      "Openings, deadlines, and shipping dates live beside your catalog, not in a generic calendar.",
      "Events can link to exhibitions, submissions and venues so context travels with the date. You can also export your calendar to Google or Apple Calendar.",
    ],
    images: [
      { src: "/sections/studio-calendar.png", alt: "Month view with studio events" },
      { src: "/sections/studio-calendar-2.png", alt: "Exhibition and submission events with date detail panel" },
    ],
  },
  {
    icon: MapPin,
    name: "Venues",
    desc: "Galleries, museums, project spaces and fairs. All the addresses, contacts and the history of what you've shown there.",
    detail: [
      "Store galleries, museums, project spaces and fairs with addresses, contacts and notes from past conversations.",
      "You can tie any contact, artwork, exhibition and submission back to a venue, so you build a history of where your work has lived.",
    ],
    images: [
      { src: "/sections/studio-venues.png", alt: "Venues list" },
      { src: "/sections/studio-venues-edit.png", alt: "Venue profile with show history" },
    ],
  },
  {
    icon: Users,
    name: "Contacts",
    desc: "Curators, collectors, gallerists and friends of your studio. You can add as many contacts as you want, and tag them with notes, related artworks, related venues and links.",
    detail: [
      "Curators, collectors, gallerists and studio allies — with notes, related artworks, venues and links so context stays attached to the person.",
      "Tag and filter contacts when you're planning a show, mailing a preview, or following up after an open studio.",
    ],
    images: [
      { src: "/sections/studio-contacts.png", alt: "Contacts list" },
      { src: "/sections/studio-contacts-add.png", alt: "Contact detail with linked works" },
    ],
  },
  {
    icon: SettingsIcon,
    name: "Settings",
    desc: "Save your name to get a personalized welcome message and select your currency. Import and export all your data in a few clicks.",
    detail: [
      "Personalize your welcome message, select your currency and keep your data portable.",
      "Export everything for backup or migration; import when you're setting up on a new machine. Your data stays on your device and only you have access to it.",
    ],
    images: [
      { src: "/sections/studio-settings.png", alt: "Settings and profile" },
      { src: "/sections/studio-settings-currency.png", alt: "Import and export" },
    ],
  },
];

function SectionImage({ image, index }: { image: Section["images"][number]; index: number }) {
  if (image.src) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="block w-full cursor-zoom-in overflow-hidden rounded-xl border border-border text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="aspect-video w-full object-cover transition hover:brightness-95"
            />
          </button>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="bg-black/90" />
          <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-[min(98vw,1800px)] max-w-none -translate-x-1/2 -translate-y-1/2 border-0 bg-transparent p-1 shadow-none outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
            <DialogTitle className="sr-only">{image.alt}</DialogTitle>
            <img
              src={image.src}
              alt={image.alt}
              className="max-h-[94vh] w-full rounded-lg object-contain"
            />
            <DialogPrimitive.Close
              type="button"
              className="absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>
    );
  }

  return (
    <div
      className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-secondary/40 px-4 text-center"
      style={{
        backgroundImage:
          index % 2 === 0
            ? "linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--card)) 100%)"
            : "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--secondary)) 100%)",
      }}
    >
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Image</span>
      <span className="max-w-xs text-sm text-muted-foreground">{image.alt}</span>
    </div>
  );
}

const privacyPolicySections = [
  {
    title: "1. Data controller",
    body: "The developer of this application is the data controller for the purposes of applicable data protection laws.",
  },
  {
    title: "2. No data collection or processing",
    body: "This application does not collect, store, transmit, or process any personal data.\n\nAll data created or entered in the application is stored locally on your device. It is not accessible to the developer or any third party.",
  },
  {
    title: "3. Local storage",
    body: "All content, settings, and user-generated data remain on your device only. No data is uploaded to external servers or cloud services.\n\nYou retain full control over this data and may delete it at any time by using the application’s features or uninstalling the application.",
  },
  {
    title: "4. No tracking or analytics",
    body: "This application does not use analytics tools, advertising identifiers, cookies, or any tracking technologies.\n\nUser activity is not monitored or recorded.",
  },
  {
    title: "5. No third-party access",
    body: "The application does not share data with third parties, as no personal data is collected or transmitted.\n\nNo external services are integrated for data processing.",
  },
  {
    title: "6. Legal basis (GDPR)",
    body: "As no personal data is collected or processed, the requirements of the General Data Protection Regulation (GDPR) related to data processing, storage, or transfer do not apply in practice.",
  },
  {
    title: "7. Security",
    body: "All data remains stored locally on the user’s device. Security of data depends on the user’s device and operating system security measures.",
  },
  {
    title: "8. Changes to this policy",
    body: "This Privacy Policy may be updated from time to time. Any changes will be reflected within the application or its distribution listing.",
  },
  {
    title: "9. Contact",
    body: "If you have any questions about this Privacy Policy, you can contact the developer using the contact details provided in the application or its store listing.",
  },
] as const;

function PrivacyPolicyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="w-fit underline-offset-4 transition hover:text-foreground hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Privacy Policy
        </button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[85vh] max-w-2xl flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl">
        <DialogHeader className="shrink-0 border-b border-border px-6 py-5 text-left">
          <DialogTitle>Privacy Policy</DialogTitle>
          <p className="text-sm text-muted-foreground">Effective date: May 23, 2026</p>
        </DialogHeader>
        <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-6 py-5 text-sm text-muted-foreground">
          <p>
            This Privacy Policy explains how this application handles information when you use
            it.
          </p>
          {privacyPolicySections.map((section) => (
            <section key={section.title}>
              <h3 className="font-medium text-foreground">{section.title}</h3>
              {section.body.split("\n\n").map((paragraph) => (
                <p key={paragraph} className="mt-2">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SectionDetail({
  section,
  index,
  onClose,
}: {
  section: Section;
  index: number;
  onClose: () => void;
}) {
  const Icon = section.icon;

  return (
    <div className="absolute inset-0 z-10 flex flex-col bg-card animate-in fade-in duration-200">
      <div className="sticky top-0 z-20 flex shrink-0 items-center justify-between gap-4 border-b border-border bg-card/95 px-6 py-4 backdrop-blur sm:px-8">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4" />
          All sections
        </button>
        <span className="text-xs tabular-nums text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-8 sm:px-10 sm:py-10">
        <div className="flex items-start gap-5">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-3xl font-semibold sm:text-4xl">{section.name}</h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {section.desc}
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-4 text-base leading-relaxed text-foreground/90 sm:text-lg">
          {section.detail.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {section.images.map((image, i) => (
            <SectionImage key={image.alt} image={image} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

const releaseDateLabel = format(parseISO(studioRelease.releasedAt), "MMMM d, yyyy");

const downloadButtonClass =
  "inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition hover:brightness-110 sm:w-auto";

function WindowsDownloadDialog({ downloadUrl }: { downloadUrl: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={downloadButtonClass}
          style={{ boxShadow: "var(--glow-primary)" }}
        >
          <Download className="h-4 w-4" />
          Download for Windows
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg gap-4">
        <DialogHeader>
          <DialogTitle>Installing on Windows</DialogTitle>
        </DialogHeader>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Due to the high cost of getting an official certificate for the app, Windows might warn
          you that this is an unrecognized app. To install it, press{" "}
          <span className="font-medium text-foreground">More info</span> — a{" "}
          <span className="font-medium text-foreground">Run anyway</span> button will appear so you
          can continue.
        </p>
        <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
          <DialogClose asChild>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:bg-card sm:w-auto"
            >
              Cancel
            </button>
          </DialogClose>
          <DialogClose asChild>
            <a
              href={downloadUrl}
              className={downloadButtonClass}
              style={{ boxShadow: "var(--glow-primary)" }}
            >
              <Download className="h-4 w-4" />
              Download
            </a>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function MacDownloadDialog({ downloadUrl }: { downloadUrl: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={downloadButtonClass}
          style={{ boxShadow: "var(--glow-primary)" }}
        >
          <Download className="h-4 w-4" />
          Download for macOS
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg gap-4">
        <DialogHeader>
          <DialogTitle>Installing on macOS</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            macOS may block Studio the first time you open it because it isn&apos;t notarized due
            to the high cost of an Apple Developer Program membership.
          </p>
          <p>
            To open it, try launching Studio once, then go to{" "}
            <span className="font-medium text-foreground">System Settings</span> →{" "}
            <span className="font-medium text-foreground">Privacy & Security</span> and click{" "}
            <span className="font-medium text-foreground">Open Anyway</span> under the security
            message. After that, reopen Studio and confirm{" "}
            <span className="font-medium text-foreground">Open</span>.
          </p>
        </div>
        <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
          <DialogClose asChild>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:bg-card sm:w-auto"
            >
              Cancel
            </button>
          </DialogClose>
          <DialogClose asChild>
            <a
              href={downloadUrl}
              className={downloadButtonClass}
              style={{ boxShadow: "var(--glow-primary)" }}
            >
              <Download className="h-4 w-4" />
              Download
            </a>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Index() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { windows: windowsDownloadUrl, mac: macDownloadUrl } = studioRelease.downloads;
  const hasDownloads = windowsDownloadUrl.length > 0 || macDownloadUrl.length > 0;

  return (
    <main className="min-h-screen">
      {/* Top bar */}
      <header className="h-2 w-full" style={{ background: "var(--gradient-bar)" }} />

      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <nav className="flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <img
              src={studioIconUrl}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-xl"
              style={{ boxShadow: "var(--glow-primary)" }}
            />
            <div className="leading-tight">
              <div className="font-display text-lg font-semibold">Studio</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Studio by Saki - Free Art Management Software
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden gap-8 text-sm text-muted-foreground sm:flex">
              <a href="#sections" className="hover:text-foreground">The App</a>
              <a href="#support" className="hover:text-foreground">Support the project</a>
              <a href="#contact" className="hover:text-foreground">Contact</a>
            </div>
            <a
              href="#download"
              className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:brightness-110"
              style={{ boxShadow: "var(--glow-primary)" }}
            >
              Download
            </a>
          </div>
        </nav>

        {/* Hero */}
        <section className="pt-16 pb-28 sm:pt-24 sm:pb-36">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Free forever — no card, no trial
          </span>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.05] sm:text-7xl">
            Your own place for{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-hero)" }}
            >
              your art
            </span>{" "}
            practice.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Studio is a free art management software for artists. It helps you manage your inventory,
            exhibitions, submissions, calendar, venues and contacts. Built by an artist who happens to be a software engineer.
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
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                The App
              </div>
              <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">
                Manage your art practice in one place.
              </h2>
            </div>
          <div className="mt-6 flex items-end justify-between gap-6">
            <p className="hidden max-w-l text-sm text-muted-foreground sm:block">
              I created this software for my own needs and I know software can be expensive, and artists can't always afford to pay for tools they need. Also I like free stuff, and I know you do, too. So I made Studio completely free.
            </p>
          </div>
            <p className="mb-14 mt-6 hidden max-w-l text-sm text-muted-foreground sm:block italic text-muted-foreground">
              Note: There is no tracking, or analytics, or anything like that. Your data is stored locally on your device and only you have access to it, nobody else unless you share the exported files with them.
            </p>

          <div className="relative overflow-hidden rounded-3xl border border-border">
            <ul
              className={cn(
                "grid gap-px bg-border sm:grid-cols-2",
                expandedIndex !== null && "pointer-events-none select-none",
              )}
              aria-hidden={expandedIndex !== null}
            >
              {sections.map(({ icon: Icon, name, desc }, i) => (
                <li key={name} className="bg-card">
                  <button
                    type="button"
                    onClick={() => setExpandedIndex(i)}
                    className="group relative flex w-full cursor-pointer items-start gap-5 p-8 text-left transition hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    aria-expanded={expandedIndex === i}
                  >
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
                  </button>
                </li>
              ))}
            </ul>

            {expandedIndex !== null && (
              <SectionDetail
                section={sections[expandedIndex]}
                index={expandedIndex}
                onClose={() => setExpandedIndex(null)}
              />
            )}
          </div>
        </section>

        {/* Download */}
        <section id="download" className="scroll-mt-24 pb-28">
          <div
            className="relative overflow-hidden rounded-3xl border border-border p-10 sm:p-14"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-20"
              style={{ background: "var(--gradient-hero)" }}
            />
            <div className="absolute inset-0 bg-card/90 backdrop-blur-sm" />

            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Get Studio
                </div>
                <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">
                  Download the app.
                </h2>
                <p className="mt-5 max-w-xl text-muted-foreground">
                  Install Studio on your computer and keep your practice data offline, on your
                  machine. No account required — free forever.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background/70 p-6 sm:p-8">
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Version
                    </dt>
                    <dd className="mt-1 font-display text-2xl font-semibold tabular-nums">
                      v{studioRelease.version}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Released
                    </dt>
                    <dd className="mt-1 font-display text-2xl font-semibold">
                      {releaseDateLabel}
                    </dd>
                  </div>
                </dl>

                <p className="mt-4 text-sm text-muted-foreground">
                  Windows & macOS · offline data stays on your device
                </p>

                {hasDownloads ? (
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    {windowsDownloadUrl.length > 0 ? (
                      <WindowsDownloadDialog downloadUrl={windowsDownloadUrl} />
                    ) : null}
                    {macDownloadUrl.length > 0 ? (
                      <MacDownloadDialog downloadUrl={macDownloadUrl} />
                    ) : null}
                  </div>
                ) : (
                  <p className="mt-6 rounded-xl border border-dashed border-border bg-secondary/30 px-4 py-3 text-sm text-muted-foreground">
                    Add your installer URL in{" "}
                    <code className="text-foreground/90">src/lib/release.ts</code> when the build
                    is ready.
                  </p>
                )}
              </div>
            </div>
          </div>
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
                  Support Free Software
                </h2>
                <p className="mt-5 max-w-xl text-muted-foreground">
                  Studio will always be free to use. If it's helped your practice,
                  you can chip in towards maintanence, development of the next feature (or software!).
                  Every coffee buys another evening of work. It would also mean a lot if you checked out my art!
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="https://pay.sumup.com/b2c/QZ09BCAE"
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:brightness-110"
                    style={{ boxShadow: "var(--glow-primary)" }}
                  >
                    <Coffee className="h-4 w-4" /> Buy me a coffee
                  </a>
                  <a
                    href="https://www.instagram.com/collagequeendom/"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-medium text-foreground transition hover:bg-secondary"
                  >
                    <Heart className="h-4 w-4 text-primary" /> Check out my art
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
          <div className="flex flex-col flex-wrap gap-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0 lg:max-w-md lg:flex-1">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Drop me a message
              </div>
              <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">
                Say hello.
              </h2>
              <p className="mt-5 text-muted-foreground">
                Feedback, feature requests, bug reports or just a note to say hello... it all lands in the same inbox, and I read every one.
              </p>
            </div>

            <a
              href="mailto:collagequeendom@gmail.com"
              className="group flex min-w-0 flex-1 flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 transition hover:border-primary hover:bg-secondary sm:p-8 lg:max-w-xl"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-4 sm:gap-5">
                <div
                  className="grid h-14 w-14 shrink-0 place-items-center rounded-xl text-primary-foreground"
                  style={{ background: "var(--gradient-hero)" }}
                >
                  <Mail className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Email
                  </div>
                  <div className="mt-1 break-all font-display text-lg font-semibold sm:text-xl">
                    collagequeendom@gmail.com
                  </div>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
            </a>
          </div>
        </section>

        <footer className="flex flex-col items-start justify-between gap-4 border-t border-border py-10 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <div className="flex flex-col gap-2">
            <div>© {new Date().getFullYear()} Studio by Saki — free, forever.</div>
            <PrivacyPolicyDialog />
          </div>
          <div className="flex items-center gap-2">
            Made with <Heart className="h-3.5 w-3.5 text-primary" /> for artists.
          </div>
        </footer>
      </div>
    </main>
  );
}
