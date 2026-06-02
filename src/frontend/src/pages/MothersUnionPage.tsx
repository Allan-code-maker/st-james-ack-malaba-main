import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useMothersItems } from "@/hooks/useQueries";
import type { MothersItem } from "@/types";
import { CalendarDays, HeartHandshake, Inbox, UserCircle } from "lucide-react";

const MOTHERS_CATEGORY_ORDER = ["Meetings", "Programs", "Events"];

function formatDateMs(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function MothersItemCard({
  item,
  index,
}: { item: MothersItem; index: number }) {
  return (
    <div
      data-ocid={`mothers-union.item.${index + 1}`}
      className="bg-card border border-border rounded-xl p-5 hover:border-accent/50 hover:shadow-sm transition-all space-y-2"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-display font-semibold text-base text-foreground">
          {item.title}
        </h3>
        <Badge variant="outline" className="text-xs shrink-0 border-accent/40">
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
            {formatDateMs(item.date)}
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

function MothersCategorySection({
  category,
  items,
}: { category: string; items: MothersItem[] }) {
  if (items.length === 0) return null;
  return (
    <section>
      <h2 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2">
        <span className="w-1.5 h-5 rounded-full bg-accent inline-block" />
        {category}
      </h2>
      <div className="grid gap-3">
        {items.map((item, i) => (
          <MothersItemCard key={item.id.toString()} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

export default function MothersUnionPage() {
  const { data: items = [], isLoading } = useMothersItems();

  const known = MOTHERS_CATEGORY_ORDER.flatMap((cat) => {
    const group = items.filter((i) => i.category === cat);
    return group.length > 0 ? [{ cat, items: group }] : [];
  });
  const knownCats = new Set(MOTHERS_CATEGORY_ORDER);
  const other = items
    .filter((i) => !knownCats.has(i.category))
    .reduce<Record<string, MothersItem[]>>((acc, item) => {
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
      data-ocid="mothers-union.page"
      className="max-w-4xl mx-auto px-4 py-10 space-y-8"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center">
            <HeartHandshake size={22} className="text-accent" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Mothers&#39; Union
            </h1>
            <p className="text-muted-foreground text-sm">
              Meetings, programs, and women&#39;s fellowship
            </p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div data-ocid="mothers-union.loading_state" className="space-y-3">
          {[1, 2, 3].map((n) => (
            <Skeleton key={n} className="h-28 w-full rounded-xl" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div
          data-ocid="mothers-union.empty_state"
          className="flex flex-col items-center gap-3 py-20 text-center"
        >
          <Inbox size={40} className="text-muted-foreground/40" />
          <p className="text-muted-foreground">
            No Mothers&#39; Union items yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {groups.map(({ cat, items: grpItems }) => (
            <MothersCategorySection key={cat} category={cat} items={grpItems} />
          ))}
        </div>
      )}
    </div>
  );
}
