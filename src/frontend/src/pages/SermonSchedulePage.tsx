import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useSermons } from "@/hooks/useQueries";
import type { Sermon } from "@/types";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { BookOpen, Calendar, ChevronRight, Mic } from "lucide-react";

function formatSermonDate(nanos: bigint): string {
  try {
    const ms = Number(nanos / 1_000_000n);
    return format(new Date(ms), "MMMM d, yyyy");
  } catch {
    return "Date TBD";
  }
}

function SermonCard({ sermon, index }: { sermon: Sermon; index: number }) {
  return (
    <Link
      to="/sermon-schedule/$id"
      params={{ id: sermon.id.toString() }}
      data-ocid={`sermon-schedule.item.${index + 1}`}
      className="block group"
    >
      <div className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg hover:border-secondary/40 transition-all duration-200">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Theme/title */}
            <h2 className="font-display text-lg font-bold text-foreground truncate mb-1 group-hover:text-secondary transition-colors">
              {sermon.theme}
            </h2>

            {/* Preacher */}
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
              <Mic className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{sermon.preacher}</span>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-xs border-accent/30 text-accent"
              >
                <BookOpen className="w-3 h-3" />
                {sermon.scriptureRef}
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-xs border-secondary/30 text-secondary"
              >
                <Calendar className="w-3 h-3" />
                {formatSermonDate(sermon.date)}
              </Badge>
            </div>
          </div>

          <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-secondary group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
        </div>

        {sermon.notes && (
          <p className="mt-3 text-sm text-muted-foreground line-clamp-2 border-t border-border pt-3">
            {sermon.notes}
          </p>
        )}
      </div>
    </Link>
  );
}

function SermonSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
        <Skeleton key={i} className="h-32 w-full rounded-2xl" />
      ))}
    </div>
  );
}

export default function SermonSchedulePage() {
  const { data: sermons, isLoading, error } = useSermons();

  const sorted = sermons
    ? [...sermons].sort((a, b) => Number(b.date - a.date))
    : [];

  return (
    <div
      data-ocid="sermon-schedule.page"
      className="max-w-2xl mx-auto px-4 py-10"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center">
            <Mic className="w-5 h-5 text-secondary" />
          </div>
          <Badge variant="outline" className="border-accent/40 text-accent">
            Preaching
          </Badge>
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          Sermon Schedule
        </h1>
        <p className="text-muted-foreground">
          Upcoming and recent sermons — preacher, theme, scripture, and notes.
        </p>
      </div>

      {/* Loading */}
      {isLoading && (
        <div data-ocid="sermon-schedule.loading_state">
          <SermonSkeleton />
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          data-ocid="sermon-schedule.error_state"
          className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 text-center"
        >
          <p className="text-destructive font-medium">
            Failed to load sermons.
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            Please try refreshing the page.
          </p>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !error && sorted.length === 0 && (
        <div
          data-ocid="sermon-schedule.empty_state"
          className="text-center py-16 border border-dashed border-border rounded-2xl bg-muted/20"
        >
          <Mic className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
          <p className="font-display text-lg font-semibold text-foreground mb-1">
            No sermons scheduled yet
          </p>
          <p className="text-muted-foreground text-sm">
            Upcoming sermons will appear here once added by the admin.
          </p>
        </div>
      )}

      {/* List */}
      {!isLoading && sorted.length > 0 && (
        <div data-ocid="sermon-schedule.list" className="space-y-4">
          {sorted.map((sermon, index) => (
            <SermonCard
              key={sermon.id.toString()}
              sermon={sermon}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
