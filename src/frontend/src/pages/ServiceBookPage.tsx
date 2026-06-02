import { Skeleton } from "@/components/ui/skeleton";
import { useServiceBookItems } from "@/hooks/useQueries";
import type { ServiceBookItem } from "@/types";
import { BookOpenText, Inbox } from "lucide-react";

function StepCard({ item }: { item: ServiceBookItem }) {
  const stepNum = Number(item.step);
  return (
    <div
      data-ocid={`service-book.item.${stepNum}`}
      className="flex gap-4 group"
    >
      <div className="flex flex-col items-center shrink-0">
        <div className="w-9 h-9 rounded-full bg-primary/15 border-2 border-primary/30 flex items-center justify-center font-bold text-primary text-sm group-hover:bg-primary/25 transition-colors">
          {stepNum}
        </div>
        <div className="flex-1 w-0.5 bg-border mt-2 min-h-4" />
      </div>
      <div className="bg-card border border-border rounded-xl p-5 flex-1 mb-4 group-hover:border-primary/30 transition-colors">
        <h3 className="font-display font-semibold text-base text-foreground mb-2">
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
          {item.content}
        </p>
      </div>
    </div>
  );
}

export default function ServiceBookPage() {
  const { data: rawItems = [], isLoading } = useServiceBookItems();
  const items = [...rawItems].sort((a, b) =>
    a.step < b.step ? -1 : a.step > b.step ? 1 : 0,
  );

  return (
    <div
      data-ocid="service-book.page"
      className="max-w-3xl mx-auto px-4 py-10 space-y-8"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center">
            <BookOpenText size={22} className="text-primary" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Modern Service Book
            </h1>
            <p className="text-muted-foreground text-sm">
              Step-by-step order of service
            </p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div data-ocid="service-book.loading_state" className="space-y-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="flex gap-4">
              <Skeleton className="w-9 h-9 rounded-full shrink-0" />
              <Skeleton className="h-24 flex-1 rounded-xl" />
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div
          data-ocid="service-book.empty_state"
          className="flex flex-col items-center gap-3 py-20 text-center"
        >
          <Inbox size={40} className="text-muted-foreground/40" />
          <p className="text-muted-foreground">
            No service book items yet. The admin can add them from the
            dashboard.
          </p>
        </div>
      ) : (
        <div data-ocid="service-book.list">
          {items.map((item) => (
            <StepCard key={item.id.toString()} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
