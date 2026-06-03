import type { SectionMeta } from "@/types";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

interface SectionCardProps {
  section: SectionMeta;
  index: number;
}

const colorMap: Record<SectionMeta["color"], string> = {
  primary: "bg-primary/10 border-primary/20 text-primary hover:bg-primary/15",
  secondary:
    "bg-secondary/10 border-secondary/20 text-secondary hover:bg-secondary/15",
  accent:
    "bg-accent/10 border-accent/20 text-accent-foreground hover:bg-accent/15",
};

const iconBgMap: Record<SectionMeta["color"], string> = {
  primary: "bg-primary/15 text-primary",
  secondary: "bg-secondary/15 text-secondary",
  accent: "bg-accent/20 text-accent-foreground",
};

export function SectionCard({ section, index }: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        to={section.path}
        className={`group card-elevated flex flex-col gap-3 p-5 border transition-smooth cursor-pointer block no-underline ${colorMap[section.color]}`}
      >
        <div className="flex items-start justify-between">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${iconBgMap[section.color]}`}
          >
            {section.icon}
          </div>
          {section.badge && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent/20 text-accent-foreground border border-accent/30">
              {section.badge}
            </span>
          )}
        </div>
        <div className="min-w-0">
          <h3 className="font-display font-semibold text-base text-foreground truncate group-hover:text-primary transition-colors">
            {section.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 leading-snug line-clamp-2">
            {section.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
