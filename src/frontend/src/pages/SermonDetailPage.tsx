import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSermon } from "@/hooks/useQueries";
import { Link, useParams } from "@tanstack/react-router";
import { format } from "date-fns";
import { ArrowLeft, BookOpen, Calendar, FileText, Mic } from "lucide-react";

function formatSermonDate(nanos: bigint): string {
  try {
    const ms = Number(nanos / 1_000_000n);
    return format(new Date(ms), "EEEE, MMMM d, yyyy");
  } catch {
    return "Date TBD";
  }
}

function DetailSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-5 w-1/3" />
      <div className="flex gap-3">
        <Skeleton className="h-7 w-32 rounded-full" />
        <Skeleton className="h-7 w-32 rounded-full" />
      </div>
      <Skeleton className="h-40 w-full rounded-xl" />
    </div>
  );
}

export default function SermonDetailPage() {
  const { id } = useParams({ from: "/sermon-schedule/$id" });
  const sermonId = BigInt(id);
  const { data: sermon, isLoading, error } = useSermon(sermonId);

  return (
    <div
      data-ocid="sermon-detail.page"
      className="max-w-2xl mx-auto px-4 py-10"
    >
      {/* Back nav */}
      <div className="mb-6">
        <Button
          asChild
          variant="ghost"
          size="sm"
          data-ocid="sermon-detail.back_button"
          className="text-muted-foreground hover:text-foreground -ml-2"
        >
          <Link to="/sermon-schedule">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Sermons
          </Link>
        </Button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div data-ocid="sermon-detail.loading_state">
          <DetailSkeleton />
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          data-ocid="sermon-detail.error_state"
          className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 text-center"
        >
          <p className="text-destructive font-medium">Failed to load sermon.</p>
          <p className="text-muted-foreground text-sm mt-1">
            Please try refreshing the page.
          </p>
        </div>
      )}

      {/* Not found */}
      {!isLoading && !error && !sermon && (
        <div
          data-ocid="sermon-detail.empty_state"
          className="text-center py-16 border border-dashed border-border rounded-2xl bg-muted/20"
        >
          <FileText className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
          <p className="font-display text-lg font-semibold text-foreground mb-1">
            Sermon not found
          </p>
          <p className="text-muted-foreground text-sm mb-4">
            This sermon may have been removed.
          </p>
          <Button asChild variant="outline" size="sm">
            <Link to="/sermon-schedule">View all sermons</Link>
          </Button>
        </div>
      )}

      {/* Detail */}
      {!isLoading && sermon && (
        <div data-ocid="sermon-detail.card" className="space-y-6">
          {/* Title area */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-lg bg-secondary/15 flex items-center justify-center">
                <Mic className="w-4 h-4 text-secondary" />
              </div>
              <Badge variant="outline" className="border-accent/40 text-accent">
                Sermon
              </Badge>
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground leading-tight mb-2">
              {sermon.theme}
            </h1>
            <p className="text-lg text-muted-foreground">
              Preached by{" "}
              <span className="text-foreground font-medium">
                {sermon.preacher}
              </span>
            </p>
          </div>

          {/* Meta badges */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-xl px-4 py-2.5">
              <BookOpen className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="text-sm font-medium text-foreground">
                {sermon.scriptureRef}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-secondary/10 border border-secondary/20 rounded-xl px-4 py-2.5">
              <Calendar className="w-4 h-4 text-secondary flex-shrink-0" />
              <span className="text-sm font-medium text-foreground">
                {formatSermonDate(sermon.date)}
              </span>
            </div>
          </div>

          {/* Notes */}
          {sermon.notes ? (
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <h2 className="font-display text-base font-semibold text-foreground">
                  Sermon Notes
                </h2>
              </div>
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {sermon.notes}
              </p>
            </div>
          ) : (
            <div className="bg-muted/20 border border-dashed border-border rounded-2xl p-6 text-center">
              <p className="text-muted-foreground text-sm">
                No notes available for this sermon.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
