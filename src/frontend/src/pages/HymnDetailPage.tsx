import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useHymn } from "@/lib/backend";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Monitor } from "lucide-react";
import React from "react";

function LyricsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-14 w-24" />
        <Skeleton className="h-8 w-3/5" />
      </div>
      <div className="space-y-3 pt-4">
        {Array.from({ length: 6 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
          <Skeleton key={i} className="h-6 w-full" />
        ))}
      </div>
    </div>
  );
}

export default function HymnDetailPage() {
  const { id } = useParams({ from: "/hymns/$id" });
  const hymnId = React.useMemo(() => {
    try {
      return BigInt(id);
    } catch {
      return 0n;
    }
  }, [id]);

  const { data: hymn, isLoading } = useHymn(hymnId);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Back navigation */}
      <div className="mb-6">
        <Link to="/hymns">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 -ml-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Hymn Book
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <LyricsSkeleton />
      ) : !hymn ? (
        <div className="text-center py-20">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display text-xl font-semibold text-foreground mb-1">
            Hymn not found
          </h2>
          <p className="text-muted-foreground text-sm mb-4">
            This hymn may have been removed or the link may be incorrect.
          </p>
          <Link to="/hymns">
            <Button variant="outline">Browse Hymn Book</Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Hymn header */}
          <div className="mb-8 pb-6 border-b border-border">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span
                  className="text-hymn-number font-display font-bold block leading-none mb-2"
                  aria-label={`Hymn number ${hymn.number}`}
                >
                  {String(hymn.number)}
                </span>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight">
                  {hymn.title}
                </h1>
              </div>
              <Badge
                variant="outline"
                className="text-sm border-accent/40 text-accent-foreground shrink-0 mt-1"
              >
                Golden Bells
              </Badge>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-5">
              <Link
                to="/hymns/display/$id"
                params={{ id: id }}
              >
                <Button className="gap-2">
                  <Monitor className="h-4 w-4" />
                  Full Screen Display
                </Button>
              </Link>
            </div>
          </div>

          {/* Lyrics */}
          <article
            className="prose prose-lg max-w-none"
          >
            <div
              className="font-body text-foreground text-lg md:text-xl leading-relaxed whitespace-pre-wrap"
              style={{ lineHeight: "1.9" }}
            >
              {hymn.lyrics}
            </div>
          </article>

          {/* Footer navigation */}
          <div className="mt-10 pt-6 border-t border-border flex justify-between items-center">
            <Link to="/hymns">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                All Hymns
              </Button>
            </Link>
            <Link
              to="/hymns/display/$id"
              params={{ id: id }}
            >
              <Button variant="secondary" size="sm" className="gap-2">
                <Monitor className="h-4 w-4" />
                Project
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
