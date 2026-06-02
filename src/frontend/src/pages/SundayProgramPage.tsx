import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useProgramItems } from "@/hooks/useQueries";
import type { ProgramItem } from "@/types";
import { CalendarDays, Clock } from "lucide-react";

function ProgramSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 8 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
        <div key={i} className="flex gap-4 items-center">
          <Skeleton className="h-12 w-20 rounded-lg flex-shrink-0" />
          <Skeleton className="h-12 flex-1 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

function ProgramRow({ item, index }: { item: ProgramItem; index: number }) {
  return (
    <div
      data-ocid={`sunday-program.item.${index + 1}`}
      className="flex gap-4 group"
    >
      {/* Timeline connector */}
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-secondary/30 transition-colors">
          <span className="text-secondary font-display font-bold text-xs">
            {index + 1}
          </span>
        </div>
        <div className="w-0.5 flex-1 bg-border mt-1" />
      </div>

      {/* Content card */}
      <div className="flex-1 pb-6">
        <div className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <p className="font-display text-base font-semibold text-foreground leading-tight">
                {item.activity}
              </p>
            </div>
            <Badge
              variant="secondary"
              className="flex items-center gap-1 text-secondary-foreground bg-secondary/10 border-secondary/30 flex-shrink-0"
            >
              <Clock className="w-3 h-3" />
              {item.time}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SundayProgramPage() {
  const { data: items, isLoading, error } = useProgramItems();

  const sorted = items
    ? [...items].sort((a, b) => Number(a.order - b.order))
    : [];

  return (
    <div
      data-ocid="sunday-program.page"
      className="max-w-2xl mx-auto px-4 py-10"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center">
            <CalendarDays className="w-5 h-5 text-secondary" />
          </div>
          <Badge variant="outline" className="border-accent/40 text-accent">
            Sunday Service
          </Badge>
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          Sunday Program
        </h1>
        <p className="text-muted-foreground">
          Order of service — follow along during the service.
        </p>
      </div>

      {/* Loading */}
      {isLoading && (
        <div data-ocid="sunday-program.loading_state">
          <ProgramSkeleton />
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          data-ocid="sunday-program.error_state"
          className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 text-center"
        >
          <p className="text-destructive font-medium">
            Failed to load program.
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            Please try refreshing the page.
          </p>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && sorted.length === 0 && (
        <div
          data-ocid="sunday-program.empty_state"
          className="text-center py-16 border border-dashed border-border rounded-2xl bg-muted/20"
        >
          <CalendarDays className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
          <p className="font-display text-lg font-semibold text-foreground mb-1">
            No program items yet
          </p>
          <p className="text-muted-foreground text-sm">
            The Sunday program will appear here once it has been set up.
          </p>
        </div>
      )}

      {/* Timeline */}
      {!isLoading && sorted.length > 0 && (
        <div data-ocid="sunday-program.list" className="relative">
          {sorted.map((item, index) => (
            <ProgramRow key={item.id.toString()} item={item} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
