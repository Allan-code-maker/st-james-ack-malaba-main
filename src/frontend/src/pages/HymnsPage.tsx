import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useHymns } from "@/lib/backend";
import type { Hymn } from "@/types";
import { Link } from "@tanstack/react-router";
import { BookOpen, Monitor, Music, Search } from "lucide-react";
import { useMemo, useState } from "react";

function HymnCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-3">
      <Skeleton className="h-8 w-12" />
      <Skeleton className="h-5 w-4/5" />
      <Skeleton className="h-8 w-full" />
    </div>
  );
}

function HymnCard({ hymn }: { hymn: Hymn }) {
  return (
    <div
      data-ocid={`hymns.item.${Number(hymn.number)}`}
      className="group rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all duration-200 p-5 flex flex-col gap-3"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-hymn-number font-display font-bold leading-none">
          {String(hymn.number)}
        </span>
        <Badge
          variant="outline"
          className="text-xs border-accent/40 text-accent-foreground shrink-0"
        >
          Golden Bells
        </Badge>
      </div>
      <h3 className="font-body font-semibold text-foreground text-base leading-snug min-h-[2.5rem] line-clamp-2">
        {hymn.title}
      </h3>
      <div className="flex gap-2 mt-auto">
        <Link
          to="/hymns/$id"
          params={{ id: hymn.id.toString() }}
          className="flex-1"
          data-ocid={`hymns.link.${Number(hymn.number)}`}
        >
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-1.5 text-xs"
          >
            <BookOpen className="h-3.5 w-3.5" />
            Read Lyrics
          </Button>
        </Link>
        <Link
          to="/hymns/display/$id"
          params={{ id: hymn.id.toString() }}
          data-ocid={`hymns.project.${Number(hymn.number)}`}
        >
          <Button
            variant="secondary"
            size="sm"
            className="gap-1.5 text-xs"
            title="Project on screen"
          >
            <Monitor className="h-3.5 w-3.5" />
            Project
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function HymnsPage() {
  const [query, setQuery] = useState("");
  const { data: hymns = [], isLoading } = useHymns();

  const filtered = useMemo(() => {
    if (!query.trim()) return hymns;
    const q = query.trim().toLowerCase();
    return hymns.filter((h) => {
      const numMatch = h.number.toString().includes(q);
      const titleMatch = h.title.toLowerCase().includes(q);
      return numMatch || titleMatch;
    });
  }, [hymns, query]);

  return (
    <div data-ocid="hymns.page" className="max-w-5xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
            <Music className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground leading-tight">
              Digital Hymn Book
            </h1>
            <p className="text-muted-foreground text-sm">
              Golden Bells — {isLoading ? "Loading…" : `${hymns.length} hymns`}
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8" data-ocid="hymns.search_input">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          placeholder="Search by hymn number or title…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 h-12 text-base bg-card border-border focus:border-primary"
          aria-label="Search hymns"
        />
        {query && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
            <HymnCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          data-ocid="hymns.empty_state"
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="p-4 rounded-full bg-muted mb-4">
            <Music className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-1">
            {query ? "No hymns found" : "No hymns yet"}
          </h2>
          <p className="text-muted-foreground text-sm max-w-xs">
            {query
              ? `No results for "${query}". Try a different number or title.`
              : "Hymns will appear here once added by the admin."}
          </p>
          {query && (
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => setQuery("")}
            >
              Clear search
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((hymn) => (
            <HymnCard key={hymn.id.toString()} hymn={hymn} />
          ))}
        </div>
      )}
    </div>
  );
}
