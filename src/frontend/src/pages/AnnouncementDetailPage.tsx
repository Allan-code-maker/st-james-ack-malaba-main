import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnnouncement } from "@/lib/backend";
import { Link, useParams } from "@tanstack/react-router";
import { format } from "date-fns";
import { ArrowLeft, CalendarDays, Megaphone, Pin } from "lucide-react";

function formatNano(ns: bigint): string {
  try {
    return format(new Date(Number(ns / 1_000_000n)), "EEEE, d MMMM yyyy");
  } catch {
    return "";
  }
}

export default function AnnouncementDetailPage() {
  const { id } = useParams({ strict: false }) as { id?: string };
  const announcementId = id ? BigInt(id) : undefined;
  const { data: announcement, isLoading } = useAnnouncement(announcementId);

  return (
    <div
      data-ocid="announcement-detail.page"
      className="max-w-3xl mx-auto px-4 py-10"
    >
      {/* Back link */}
      <Link
        to="/announcements"
        data-ocid="announcement-detail.back_link"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Announcements
      </Link>

      {isLoading && (
        <div
          data-ocid="announcement-detail.loading_state"
          className="space-y-4"
        >
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-36" />
          </div>
          <Skeleton className="h-10 w-3/4" />
          <div className="mt-6 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      )}

      {!isLoading && !announcement && (
        <div
          data-ocid="announcement-detail.error_state"
          className="text-center py-16"
        >
          <Megaphone className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">
            Announcement not found
          </h2>
          <p className="text-muted-foreground">
            This announcement could not be found.
          </p>
        </div>
      )}

      {!isLoading && announcement && (
        <article className="space-y-6">
          {/* Header */}
          <header className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              {announcement.pinned && (
                <Badge className="bg-primary/15 text-primary border-primary/30 border font-medium">
                  <Pin className="w-3 h-3 mr-1" />
                  Pinned Announcement
                </Badge>
              )}
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CalendarDays className="w-4 h-4" />
                {formatNano(announcement.createdAt)}
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
              {announcement.title}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Megaphone className="w-4 h-4" />
              <span className="text-sm">St. James ACK Malaba</span>
            </div>
          </header>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Body */}
          <div
            data-ocid="announcement-detail.body_text"
            className="rounded-xl bg-muted/30 border border-border p-6 md:p-8"
          >
            <p className="font-body text-base md:text-lg leading-8 text-foreground whitespace-pre-wrap">
              {announcement.body}
            </p>
          </div>

          {/* Footer */}
          {announcement.pinned && (
            <footer className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
              <Pin className="w-4 h-4 text-primary" />
              <span>This announcement has been pinned by the admin</span>
            </footer>
          )}
        </article>
      )}
    </div>
  );
}
