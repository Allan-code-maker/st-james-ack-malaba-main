import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnnouncements } from "@/lib/backend";
import type { Announcement } from "@/types";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { CalendarDays, ChevronRight, Megaphone, Pin } from "lucide-react";

function formatNano(ns: bigint): string {
  try {
    return format(new Date(Number(ns / 1_000_000n)), "EEEE, d MMMM yyyy");
  } catch {
    return "";
  }
}

function bodyExcerpt(body: string, chars = 140): string {
  return body.length <= chars ? body : `${body.slice(0, chars).trimEnd()}…`;
}

function AnnouncementCard({
  announcement,
  index,
}: {
  announcement: Announcement;
  index: number;
}) {
  return (
    <Link
      to="/announcements/$id"
      params={{ id: announcement.id.toString() }}
      data-ocid={`announcements.item.${index + 1}`}
      className="block group"
    >
      <Card
        className={`border transition-all duration-200 hover:shadow-md ${
          announcement.pinned
            ? "border-primary/40 bg-primary/5 hover:border-primary/60"
            : "border-border bg-card hover:border-primary/30"
        }`}
      >
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                {announcement.pinned && (
                  <Badge className="text-xs bg-primary/15 text-primary border-primary/30 border font-medium">
                    <Pin className="w-3 h-3 mr-1" />
                    Pinned
                  </Badge>
                )}
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CalendarDays className="w-3 h-3" />
                  {formatNano(announcement.createdAt)}
                </span>
              </div>
              <h3 className="font-display text-base font-semibold text-foreground leading-snug mb-1 group-hover:text-primary transition-colors">
                {announcement.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {bodyExcerpt(announcement.body)}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function AnnouncementsPage() {
  const { data: announcements, isLoading } = useAnnouncements();

  const pinned = announcements?.filter((a) => a.pinned) ?? [];
  const unpinned = announcements?.filter((a) => !a.pinned) ?? [];

  const sortNewest = (arr: Announcement[]) =>
    [...arr].sort((a, b) => Number(b.createdAt - a.createdAt));

  const sortedPinned = sortNewest(pinned);
  const sortedUnpinned = sortNewest(unpinned);

  return (
    <div
      data-ocid="announcements.page"
      className="max-w-4xl mx-auto px-4 py-10 space-y-10"
    >
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Megaphone className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground leading-tight">
            Announcements
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Church news, notices, and updates
          </p>
        </div>
      </div>

      {isLoading && (
        <div data-ocid="announcements.loading_state" className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
            <Skeleton key={i} className="h-28 w-full rounded-xl" />
          ))}
        </div>
      )}

      {/* Pinned */}
      {!isLoading && sortedPinned.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Pin className="w-4 h-4 text-primary" />
            <h2 className="font-display text-lg font-semibold text-foreground">
              Pinned
            </h2>
          </div>
          <div className="space-y-2">
            {sortedPinned.map((a, i) => (
              <AnnouncementCard
                key={a.id.toString()}
                announcement={a}
                index={i}
              />
            ))}
          </div>
        </section>
      )}

      {/* All other announcements */}
      {!isLoading && sortedUnpinned.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-display text-lg font-semibold text-foreground">
            {sortedPinned.length > 0 ? "Recent" : "All Announcements"}
          </h2>
          <div className="space-y-2">
            {sortedUnpinned.map((a, i) => (
              <AnnouncementCard
                key={a.id.toString()}
                announcement={a}
                index={sortedPinned.length + i}
              />
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {!isLoading && (!announcements || announcements.length === 0) && (
        <div
          data-ocid="announcements.empty_state"
          className="text-center py-16"
        >
          <Megaphone className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">
            No announcements yet
          </h3>
          <p className="text-muted-foreground">
            Church notices and updates will appear here once posted by the
            admin.
          </p>
        </div>
      )}
    </div>
  );
}
