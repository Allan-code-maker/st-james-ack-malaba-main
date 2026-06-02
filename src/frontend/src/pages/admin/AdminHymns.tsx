import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddHymn,
  useDeleteHymn,
  useHymns,
  useUpdateHymn,
} from "@/lib/backend";
import type { HymnInput } from "@/lib/backend";
import type { Hymn } from "@/types";
import { Music, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormValues {
  number: string;
  title: string;
  lyrics: string;
}

function HymnForm({
  initial,
  onSubmit,
  onCancel,
  loading,
}: {
  initial?: Hymn;
  onSubmit: (v: HymnInput) => void;
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
          number: String(initial.number),
          title: initial.title,
          lyrics: initial.lyrics,
        }
      : { number: "", title: "", lyrics: "" },
  });

  const submit = (v: FormValues) =>
    onSubmit({
      number: BigInt(v.number),
      title: v.title.trim(),
      lyrics: v.lyrics.trim(),
    });

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="hymn-number">Hymn Number *</Label>
          <Input
            id="hymn-number"
            type="number"
            min={1}
            data-ocid="admin.hymn.number_input"
            {...register("number", {
              required: "Required",
              min: { value: 1, message: "Must be ≥ 1" },
            })}
          />
          {errors.number && (
            <p className="text-xs text-destructive">{errors.number.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="hymn-title">Title *</Label>
          <Input
            id="hymn-title"
            data-ocid="admin.hymn.title_input"
            {...register("title", { required: "Required" })}
          />
          {errors.title && (
            <p className="text-xs text-destructive">{errors.title.message}</p>
          )}
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="hymn-lyrics">Lyrics *</Label>
        <Textarea
          id="hymn-lyrics"
          rows={8}
          data-ocid="admin.hymn.lyrics_input"
          {...register("lyrics", { required: "Required" })}
        />
        {errors.lyrics && (
          <p className="text-xs text-destructive">{errors.lyrics.message}</p>
        )}
      </div>
      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={loading}
          data-ocid="admin.hymn.submit_button"
        >
          {loading ? "Saving…" : initial ? "Update Hymn" : "Add Hymn"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          data-ocid="admin.hymn.cancel_button"
        >
          <X size={14} className="mr-1" /> Cancel
        </Button>
      </div>
    </form>
  );
}

export default function AdminHymns() {
  const { data: hymns = [], isLoading } = useHymns();
  const addHymn = useAddHymn();
  const updateHymn = useUpdateHymn();
  const deleteHymn = useDeleteHymn();
  const [editing, setEditing] = useState<Hymn | null>(null);
  const [adding, setAdding] = useState(false);

  const handleAdd = async (input: HymnInput) => {
    await addHymn.mutateAsync(input);
    toast.success("Hymn added");
    setAdding(false);
  };

  const handleUpdate = async (input: HymnInput) => {
    if (!editing) return;
    await updateHymn.mutateAsync({ id: editing.id, input });
    toast.success("Hymn updated");
    setEditing(null);
  };

  const handleDelete = async (id: bigint) => {
    if (!confirm("Delete this hymn?")) return;
    await deleteHymn.mutateAsync(id);
    toast.success("Hymn deleted");
  };

  const sorted = [...hymns].sort((a, b) => Number(a.number - b.number));

  return (
    <div data-ocid="admin.hymns.section" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">
          Hymns ({hymns.length})
        </h2>
        {!adding && !editing && (
          <Button
            size="sm"
            onClick={() => setAdding(true)}
            data-ocid="admin.hymns.add_button"
          >
            <Plus size={14} className="mr-1" /> Add Hymn
          </Button>
        )}
      </div>

      {(adding || editing) && (
        <Card className="border-primary/30 bg-card">
          <CardContent className="pt-5">
            <HymnForm
              initial={editing ?? undefined}
              onSubmit={editing ? handleUpdate : handleAdd}
              onCancel={() => {
                setAdding(false);
                setEditing(null);
              }}
              loading={addHymn.isPending || updateHymn.isPending}
            />
          </CardContent>
        </Card>
      )}

      {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}

      {!isLoading && sorted.length === 0 && (
        <div
          data-ocid="admin.hymns.empty_state"
          className="text-center py-12 border border-dashed rounded-lg"
        >
          <Music size={28} className="mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground text-sm">
            No hymns yet. Add one above.
          </p>
        </div>
      )}

      <div className="space-y-2">
        {sorted.map((hymn, i) => (
          <div
            key={String(hymn.id)}
            data-ocid={`admin.hymn.item.${i + 1}`}
            className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors"
          >
            <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded shrink-0">
              #{String(hymn.number)}
            </span>
            <p className="flex-1 font-medium text-sm truncate min-w-0">
              {hymn.title}
            </p>
            <div className="flex gap-1 shrink-0">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setEditing(hymn);
                  setAdding(false);
                }}
                data-ocid={`admin.hymn.edit_button.${i + 1}`}
              >
                <Pencil size={14} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() => handleDelete(hymn.id)}
                data-ocid={`admin.hymn.delete_button.${i + 1}`}
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
