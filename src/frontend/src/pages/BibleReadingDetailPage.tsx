import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useBibleReading } from "@/lib/backend";
import { Link, useParams } from "@tanstack/react-router";
import { format } from "date-fns";
import { ArrowLeft, BookMarked, BookOpen, Star } from "lucide-react";

function formatNano(ns: bigint): string {
  try {
    return format(new Date(Number(ns / 1_000_000n)), "EEEE, d MMMM yyyy");
  } catch {
    return "";
  }
}

export default function BibleReadingDetailPage() {
  const { id } = useParams({ strict: false }) as { id?: string };
  const readingId = id ? BigInt(id) : undefined;
  const { data: reading, isLoading } = useBibleReading(readingId);

  return (
    <div
      data-ocid="bible-reading-detail.page"
      className="max-w-3xl mx-auto px-4 py-10"
    >
      {/* Back link */}
      <Link
        to="/bible-readings"
        data-ocid="bible-reading-detail.back_link"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Bible Readings
      </Link>

      {isLoading && (
        <div
          data-ocid="bible-reading-detail.loading_state"
          className="space-y-4"
        >
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-40" />
          <div className="mt-8 space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      )}

      {!isLoading && !reading && (
        <div
          data-ocid="bible-reading-detail.error_state"
          className="text-center py-16"
        >
          <BookMarked className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">
            Reading not found
          </h2>
          <p className="text-muted-foreground">
            This scripture passage could not be found.
          </p>
        </div>
      )}

      {!isLoading && reading && (
        <article className="space-y-6">
          {/* Header */}
          <header className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              {reading.isReadingOfDay && (
                <Badge className="bg-accent/20 text-accent-foreground border-accent/40 border font-medium">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Reading of the Day
                </Badge>
              )}
              <span className="text-xs text-muted-foreground">
                {formatNano(reading.createdAt)}
              </span>
            </div>
            <h1 className="font-display text-4xl font-bold text-accent leading-tight">
              {reading.reference}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">Holy Bible - St. James ACK Malaba</span>
            </div>
          </header>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Scripture text */}
          <div
            data-ocid="bible-reading-detail.scripture_text"
            className="rounded-xl bg-muted/40 border border-border p-6 md:p-8"
          >
            <p className="font-body text-lg md:text-xl leading-9 text-foreground whitespace-pre-wrap">
              {reading.text}
            </p>
          </div>

          {/* Footer reference */}
          <footer className="flex items-center gap-2 pt-2">
            <div className="h-1 w-8 rounded-full bg-accent" />
            <span className="font-display font-semibold text-accent">
              {reading.reference}
            </span>
          </footer>
        </article>
      )}
    </div>
  );
}
