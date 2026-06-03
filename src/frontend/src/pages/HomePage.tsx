import { SectionCard } from "@/components/SectionCard";
import type { SectionMeta } from "@/types";
import { motion } from "motion/react";

const SECTIONS: SectionMeta[] = [
  {
    id: "hymns",
    title: "Digital Hymn Book",
    description:
      "Browse and search Golden Bells hymns. Full lyrics with verse navigation.",
    path: "/hymns",
    icon: "🎵",
    color: "primary",
    badge: "Priority",
  },
  {
    id: "hymns-display",
    title: "Hymn Display",
    description: "Full-screen projection view for congregational singing.",
    path: "/hymns/display",
    icon: "📺",
    color: "primary",
  },
  {
    id: "bible-readings",
    title: "Bible Readings",
    description: "Daily scripture passages and reading of the day.",
    path: "/bible-readings",
    icon: "📖",
    color: "accent",
    badge: "Priority",
  },
  {
    id: "announcements",
    title: "Announcements",
    description: "Church news, notices, and upcoming events from leadership.",
    path: "/announcements",
    icon: "📢",
    color: "secondary",
    badge: "Priority",
  },
  {
    id: "sermon-schedule",
    title: "Sermon Schedule",
    description: "Upcoming sermons with preacher, theme, and Bible references.",
    path: "/sermon-schedule",
    icon: "🎤",
    color: "primary",
  },
  {
    id: "sunday-program",
    title: "Sunday Program",
    description: "Order of service with times and activities for each Sunday.",
    path: "/sunday-program",
    icon: "📅",
    color: "accent",
    badge: "Priority",
  },
  {
    id: "sunday-school",
    title: "Sunday School",
    description:
      "Classes, teachers, schedules, and lecture materials for children.",
    path: "/sunday-school",
    icon: "👶",
    color: "secondary",
  },
  {
    id: "youth-ministry",
    title: "Youth Ministry",
    description: "Programs, events, and updates for the youth fellowship.",
    path: "/youth-ministry",
    icon: "👥",
    color: "primary",
  },
  {
    id: "mothers-union",
    title: "Mothers' Union",
    description:
      "Meetings, programs, and leadership of the women's fellowship.",
    path: "/mothers-union",
    icon: "👩",
    color: "secondary",
  },
  {
    id: "mens-association",
    title: "Men's Association",
    description: "Events, leadership, and activities for men's fellowship.",
    path: "/mens-association",
    icon: "👨",
    color: "primary",
  },
  {
    id: "offering",
    title: "Offering & Tithes",
    description: "M-Pesa and bank details for giving during services.",
    path: "/offering",
    icon: "💰",
    color: "accent",
  },
  {
    id: "service-book",
    title: "Modern Service Book",
    description: "Digital order of service — scrollable during worship.",
    path: "/service-book",
    icon: "📘",
    color: "secondary",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Banner */}
      <section
        className="relative overflow-hidden bg-primary text-primary-foreground"
        style={{ minHeight: "220px" }}
      >
        <img
          src="/assets/generated/church-hero.dim_1200x400.jpg"
          alt="St. James ACK Malaba"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-2">
              Anglican Church of Kenya
            </p>
            <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-3">
              St. James ACK Malaba
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
              Digital Church System — your complete guide to worship, community,
              and scripture.
            </p>
          </motion.div>
        </div>
        {/* Gold accent border at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
      </section>

      {/* Section Grid */}
      <section className="bg-background py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-8 text-center"
          >
            <h2 className="font-display text-2xl font-semibold text-foreground mb-1">
              Church Sections
            </h2>
            <p className="text-muted-foreground text-sm">
              Select a section to explore
            </p>
          </motion.div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {SECTIONS.map((section, i) => (
              <SectionCard key={section.id} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
