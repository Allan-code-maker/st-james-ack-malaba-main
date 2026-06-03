import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useBibleReadings } from "@/lib/backend";
import { formatNano, excerpt } from "@/lib/utils";
import type { BibleReading } from "@/types";
import { Link } from "@tanstack/react-router";
import { BookMarked, BookOpen, ChevronRight, Star } from "lucide-react";

function ReadingCard({
  reading,
  index,
}: { reading: BibleReading; index: number }) {
  return (
    <Link
      to="/bible-readings/$id"
      params={{ id: reading.id.toString() }}
      className="block group"
    >
      <Card className="border border-border hover:border-primary/50 transition-all duration-200 hover:shadow-md bg-card">
        <CardContent className="p-4 flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
            <BookMarked className="w-4 h-4 text-secondary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-display font-semibold text-accent text-sm leading-tight">
                {reading.reference}
              </span>
              {reading.isReadingOfDay && (
                <Badge className="text-xs bg-primary/10 text-primary border-primary/30 border">
                  Today
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
              {excerpt(reading.text)}
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1.5">
              {formatNano(reading.createdAt)}
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
        </CardContent>
      </Card>
    </Link>
  );
}

export default function BibleReadingsPage() {
  const { data: readings, isLoading } = useBibleReadings();

  const readingOfDay = readings?.find((r) => r.isReadingOfDay);
  const others = readings?.filter((r) => !r.isReadingOfDay) ?? [];

  return (
    <div
      className="max-w-4xl mx-auto px-4 py-10 space-y-10"
    >
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground leading-tight">
            Bible Readings
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Scripture passages for St. James ACK Malaba
          </p>
        </div>
      </div>

      {/* Reading of the Day - featured */}
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
      ) : readingOfDay ? (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-accent fill-accent" />
            <h2 className="font-display text-lg font-semibold text-foreground">
              Reading of the Day
            </h2>
          </div>
          <Link
            to="/bible-readings/$id"
            params={{ id: readingOfDay.id.toString() }}
            className="block group"
          >
            <div className="relative rounded-2xl overflow-hidden border border-primary/30 bg-gradient-to-br from-primary/8 via-card to-accent/8 p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50">
              <div className="absolute top-4 right-4">
                <Badge className="bg-accent/20 text-accent-foreground border-accent/40 border font-medium text-xs">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Today's Reading
                </Badge>
              </div>
              <div className="mb-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1">
                  {formatNano(readingOfDay.createdAt)}
                </p>
                <h3 className="font-display text-2xl font-bold text-accent leading-tight">
                  {readingOfDay.reference}
                </h3>
              </div>
              <p className="text-foreground/80 leading-relaxed text-base line-clamp-4">
                {readingOfDay.text}
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-primary text-sm font-medium group-hover:gap-2.5 transition-all">
                <BookOpen className="w-4 h-4" />
                <span>Read full passage</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </section>
      ) : null}

      {/* All other readings */}
      {!isLoading && others.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-display text-lg font-semibold text-foreground">
            {readingOfDay ? "Other Passages" : "Scripture Passages"}
          </h2>
          <div className="space-y-2">
            {others.map((r, i) => (
              <ReadingCard key={r.id.toString()} reading={r} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {!isLoading && (!readings || readings.length === 0) && (
        <div
          className="text-center py-16"
        >
          <BookOpen className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">
            No readings yet
          </h3>
          <p className="text-muted-foreground">
            Scripture passages will appear here once added by the admin.
          </p>
        </div>
      )}
    </div>
  );
}
