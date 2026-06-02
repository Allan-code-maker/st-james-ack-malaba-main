import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useYouthItems } from "@/hooks/useQueries";
import type { YouthItem } from "@/types";
import { CalendarDays, Inbox, UserCircle, Users } from "lucide-react";

const CATEGORY_ORDER = ["Programs", "Events", "Announcements"];

function formatDate(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function YouthItemCard({ item, index }: { item: YouthItem; index: number }) {
  return (
    <div
      data-ocid={`youth-ministry.item.${index + 1}`}
      className="bg-card border border-border rounded-xl p-5 hover:border-secondary/50 hover:shadow-sm transition-all space-y-2"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-display font-semibold text-base text-foreground">
          {item.title}
        </h3>
        <Badge variant="secondary" className="text-xs shrink-0">
          {item.category}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {item.description}
      </p>
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-1">
        {item.date !== undefined && (
          <span className="flex items-center gap-1">
            <CalendarDays size={12} />
            {formatDate(item.date)}
          </span>
        )}
        {item.leader && (
          <span className="flex items-center gap-1">
            <UserCircle size={12} />
            {item.leader}
          </span>
        )}
      </div>
    </div>
  );
}

function YouthCategorySection({
  category,
  items,
}: { category: string; items: YouthItem[] }) {
  if (items.length === 0) return null;
  return (
    <section>
      <h2 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2">
        <span className="w-1.5 h-5 rounded-full bg-secondary inline-block" />
        {category}
      </h2>
      <div className="grid gap-3">
        {items.map((item, i) => (
          <YouthItemCard key={item.id.toString()} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

export default function YouthMinistryPage() {
  const { data: items = [], isLoading } = useYouthItems();

  const known = CATEGORY_ORDER.flatMap((cat) => {
    const group = items.filter((i) => i.category === cat);
    return group.length > 0 ? [{ cat, items: group }] : [];
  });
  const knownCats = new Set(CATEGORY_ORDER);
  const other = items
    .filter((i) => !knownCats.has(i.category))
    .reduce<Record<string, YouthItem[]>>((acc, item) => {
      const existing = acc[item.category] ?? [];
      acc[item.category] = [...existing, item];
      return acc;
    }, {});
  const otherGroups = Object.entries(other).map(([cat, grpItems]) => ({
    cat,
    items: grpItems,
  }));
  const groups = [...known, ...otherGroups];

  return (
    <div
      data-ocid="youth-ministry.page"
      className="max-w-4xl mx-auto px-4 py-10 space-y-8"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-secondary/15 border border-secondary/30 flex items-center justify-center">
            <Users size={22} className="text-secondary" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Youth Ministry
            </h1>
            <p className="text-muted-foreground text-sm">
              Programs, events, and youth updates
            </p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div data-ocid="youth-ministry.loading_state" className="space-y-3">
          {[1, 2, 3].map((n) => (
            <Skeleton key={n} className="h-28 w-full rounded-xl" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div
          data-ocid="youth-ministry.empty_state"
          className="flex flex-col items-center gap-3 py-20 text-center"
        >
          <Inbox size={40} className="text-muted-foreground/40" />
          <p className="text-muted-foreground">
            No youth ministry items yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {groups.map(({ cat, items: grpItems }) => (
            <YouthCategorySection key={cat} category={cat} items={grpItems} />
          ))}
        </div>
      )}
    </div>
  );
}
