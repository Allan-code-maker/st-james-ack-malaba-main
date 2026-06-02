import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddMensItem,
  useDeleteMensItem,
  useMensItems,
  useUpdateMensItem,
} from "@/lib/backend";
import type { MensItemInput } from "@/lib/backend";
import type { MensItem } from "@/types";
import { Pencil, Plus, Trash2, Users2, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CATEGORIES = ["Events", "Activities", "Meetings"];

interface FormValues {
  title: string;
  description: string;
  leader: string;
  category: string;
  date: string;
}

function ItemForm({
  initial,
  onSubmit,
  onCancel,
  loading,
}: {
  initial?: MensItem;
  onSubmit: (v: MensItemInput) => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initial
      ? {
          title: initial.title,
          description: initial.description,
          leader: initial.leader,
          category: initial.category,
          date: initial.date
            ? new Date(Number(initial.date / 1_000_000n))
                .toISOString()
                .slice(0, 10)
            : "",
        }
      : {
          title: "",
          description: "",
          leader: "",
          category: CATEGORIES[0],
          date: "",
        },
  });
  const submit = (v: FormValues) =>
    onSubmit({
      title: v.title.trim(),
      description: v.description.trim(),
      leader: v.leader.trim(),
      category: v.category,
      date: v.date
        ? BigInt(new Date(v.date).getTime()) * 1_000_000n
        : undefined,
    });
  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Title *</Label>
          <Input
            data-ocid="admin.mens.title_input"
            {...register("title", { required: "Required" })}
          />
          {errors.title && (
            <p className="text-xs text-destructive">{errors.title.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label>Category *</Label>
          <select
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            data-ocid="admin.mens.category_select"
            {...register("category", { required: true })}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label>Leader</Label>
          <Input data-ocid="admin.mens.leader_input" {...register("leader")} />
        </div>
        <div className="space-y-1.5">
          <Label>Date (optional)</Label>
          <Input
            type="date"
            data-ocid="admin.mens.date_input"
            {...register("date")}
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label>Description</Label>
        <Textarea
          rows={4}
          data-ocid="admin.mens.description_input"
          {...register("description")}
        />
      </div>
      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={loading}
          data-ocid="admin.mens.submit_button"
        >
          {loading ? "Saving…" : initial ? "Update" : "Add Item"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          data-ocid="admin.mens.cancel_button"
        >
          <X size={14} className="mr-1" /> Cancel
        </Button>
      </div>
    </form>
  );
}

export default function AdminMensAssociation() {
  const { data: items = [], isLoading } = useMensItems();
  const add = useAddMensItem();
  const update = useUpdateMensItem();
  const del = useDeleteMensItem();
  const [editing, setEditing] = useState<MensItem | null>(null);
  const [adding, setAdding] = useState(false);

  const handleAdd = async (input: MensItemInput) => {
    await add.mutateAsync(input);
    toast.success("Item added");
    setAdding(false);
  };

  const handleUpdate = async (input: MensItemInput) => {
    if (!editing) return;
    await update.mutateAsync({ id: editing.id, input });
    toast.success("Item updated");
    setEditing(null);
  };

  const handleDelete = async (id: bigint) => {
    if (!confirm("Delete this item?")) return;
    await del.mutateAsync(id);
    toast.success("Item deleted");
  };

  return (
    <div data-ocid="admin.mens.section" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">
          Men&apos;s Association ({items.length})
        </h2>
        {!adding && !editing && (
          <Button
            size="sm"
            onClick={() => setAdding(true)}
            data-ocid="admin.mens.add_button"
          >
            <Plus size={14} className="mr-1" /> Add Item
          </Button>
        )}
      </div>

      {(adding || editing) && (
        <Card className="border-primary/30 bg-card">
          <CardContent className="pt-5">
            <ItemForm
              initial={editing ?? undefined}
              onSubmit={editing ? handleUpdate : handleAdd}
              onCancel={() => {
                setAdding(false);
                setEditing(null);
              }}
              loading={add.isPending || update.isPending}
            />
          </CardContent>
        </Card>
      )}

      {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}

      {!isLoading && items.length === 0 && (
        <div
          data-ocid="admin.mens.empty_state"
          className="text-center py-12 border border-dashed rounded-lg"
        >
          <Users2 size={28} className="mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground text-sm">No items yet.</p>
        </div>
      )}

      <div className="space-y-2">
        {items.map((item, i) => (
          <div
            key={String(item.id)}
            data-ocid={`admin.mens.item.${i + 1}`}
            className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-sm truncate">{item.title}</p>
                <Badge variant="outline" className="text-xs shrink-0">
                  {item.category}
                </Badge>
              </div>
              {item.leader && (
                <p className="text-xs text-muted-foreground">{item.leader}</p>
              )}
            </div>
            <div className="flex gap-1 shrink-0">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setEditing(item);
                  setAdding(false);
                }}
                data-ocid={`admin.mens.edit_button.${i + 1}`}
              >
                <Pencil size={14} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() => handleDelete(item.id)}
                data-ocid={`admin.mens.delete_button.${i + 1}`}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
