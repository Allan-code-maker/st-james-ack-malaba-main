import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useMensItems } from "@/hooks/useQueries";
import type { MensItem } from "@/types";
import { CalendarDays, Inbox, UserCircle, UserSquare2 } from "lucide-react";

const MENS_CATEGORY_ORDER = ["Events", "Activities", "Meetings"];

function formatDateMs(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function MensItemCard({ item, index }: { item: MensItem; index: number }) {
  return (
    <div
      data-ocid={`mens-association.item.${index + 1}`}
      className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 hover:shadow-sm transition-all space-y-2"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-display font-semibold text-base text-foreground">
          {item.title}
        </h3>
        <Badge className="text-xs shrink-0">{item.category}</Badge>
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

function MensCategorySection({
  category,
  items,
}: { category: string; items: MensItem[] }) {
  if (items.length === 0) return null;
  return (
    <section>
      <h2 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2">
        <span className="w-1.5 h-5 rounded-full bg-primary inline-block" />
        {category}
      </h2>
      <div className="grid gap-3">
        {items.map((item, i) => (
          <MensItemCard key={item.id.toString()} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

export default function MensAssociationPage() {
  const { data: items = [], isLoading } = useMensItems();

  const known = MENS_CATEGORY_ORDER.flatMap((cat) => {
    const group = items.filter((i) => i.category === cat);
    return group.length > 0 ? [{ cat, items: group }] : [];
  });
  const knownCats = new Set(MENS_CATEGORY_ORDER);
  const other = items
    .filter((i) => !knownCats.has(i.category))
    .reduce<Record<string, MensItem[]>>((acc, item) => {
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
      data-ocid="mens-association.page"
      className="max-w-4xl mx-auto px-4 py-10 space-y-8"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center">
            <UserSquare2 size={22} className="text-primary" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Men&#39;s Association
            </h1>
            <p className="text-muted-foreground text-sm">
              Events, leadership, and men&#39;s fellowship
            </p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div data-ocid="mens-association.loading_state" className="space-y-3">
          {[1, 2, 3].map((n) => (
            <Skeleton key={n} className="h-28 w-full rounded-xl" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div
          data-ocid="mens-association.empty_state"
          className="flex flex-col items-center gap-3 py-20 text-center"
        >
          <Inbox size={40} className="text-muted-foreground/40" />
          <p className="text-muted-foreground">
            No Men&#39;s Association items yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {groups.map(({ cat, items: grpItems }) => (
            <MensCategorySection key={cat} category={cat} items={grpItems} />
          ))}
        </div>
      )}
    </div>
  );
}
