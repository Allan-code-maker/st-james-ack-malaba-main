import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddSermon,
  useDeleteSermon,
  useSermons,
  useUpdateSermon,
} from "@/lib/backend";
import type { SermonInput } from "@/lib/backend";
import type { Sermon } from "@/types";
import { Mic, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormValues {
  preacher: string;
  theme: string;
  date: string;
  scriptureRef: string;
  notes: string;
}

function toDateStr(ns: bigint): string {
  const ms = Number(ns / 1_000_000n);
  if (!ms) return "";
  return new Date(ms).toISOString().slice(0, 10);
}

function SermonForm({
  initial,
  onSubmit,
  onCancel,
  loading,
}: {
  initial?: Sermon;
  onSubmit: (v: SermonInput) => void;
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
          preacher: initial.preacher,
          theme: initial.theme,
          date: toDateStr(initial.date),
          scriptureRef: initial.scriptureRef,
          notes: initial.notes,
        }
      : { preacher: "", theme: "", date: "", scriptureRef: "", notes: "" },
  });
  const submit = (v: FormValues) =>
    onSubmit({
      preacher: v.preacher.trim(),
      theme: v.theme.trim(),
      date: BigInt(new Date(v.date).getTime()) * 1_000_000n,
      scriptureRef: v.scriptureRef.trim(),
      notes: v.notes.trim(),
    });
  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="sermon-preacher">Preacher *</Label>
          <Input
            id="sermon-preacher"
            data-ocid="admin.sermon.preacher_input"
            {...register("preacher", { required: "Required" })}
          />
          {errors.preacher && (
            <p className="text-xs text-destructive">
              {errors.preacher.message}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="sermon-theme">Theme *</Label>
          <Input
            id="sermon-theme"
            data-ocid="admin.sermon.theme_input"
            {...register("theme", { required: "Required" })}
          />
          {errors.theme && (
            <p className="text-xs text-destructive">{errors.theme.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="sermon-date">Date *</Label>
          <Input
            id="sermon-date"
            type="date"
            data-ocid="admin.sermon.date_input"
            {...register("date", { required: "Required" })}
          />
          {errors.date && (
            <p className="text-xs text-destructive">{errors.date.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="sermon-scripture">Scripture Reference *</Label>
          <Input
            id="sermon-scripture"
            placeholder="e.g. Romans 8:28"
            data-ocid="admin.sermon.scripture_input"
            {...register("scriptureRef", { required: "Required" })}
          />
          {errors.scriptureRef && (
            <p className="text-xs text-destructive">
              {errors.scriptureRef.message}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="sermon-notes">Notes</Label>
        <Textarea
          id="sermon-notes"
          rows={5}
          data-ocid="admin.sermon.notes_input"
          {...register("notes")}
        />
      </div>
      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={loading}
          data-ocid="admin.sermon.submit_button"
        >
          {loading ? "Saving…" : initial ? "Update Sermon" : "Add Sermon"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          data-ocid="admin.sermon.cancel_button"
        >
          <X size={14} className="mr-1" /> Cancel
        </Button>
      </div>
    </form>
  );
}

export default function AdminSermons() {
  const { data: sermons = [], isLoading } = useSermons();
  const add = useAddSermon();
  const update = useUpdateSermon();
  const del = useDeleteSermon();
  const [editing, setEditing] = useState<Sermon | null>(null);
  const [adding, setAdding] = useState(false);

  const handleAdd = async (input: SermonInput) => {
    await add.mutateAsync(input);
    toast.success("Sermon added");
    setAdding(false);
  };

  const handleUpdate = async (input: SermonInput) => {
    if (!editing) return;
    await update.mutateAsync({ id: editing.id, input });
    toast.success("Sermon updated");
    setEditing(null);
  };

  const handleDelete = async (id: bigint) => {
    if (!confirm("Delete this sermon?")) return;
    await del.mutateAsync(id);
    toast.success("Sermon deleted");
  };

  const formatDate = (ns: bigint) => {
    const ms = Number(ns / 1_000_000n);
    return ms
      ? new Date(ms).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "";
  };

  return (
    <div data-ocid="admin.sermons.section" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">
          Sermons ({sermons.length})
        </h2>
        {!adding && !editing && (
          <Button
            size="sm"
            onClick={() => setAdding(true)}
            data-ocid="admin.sermons.add_button"
          >
            <Plus size={14} className="mr-1" /> Add Sermon
          </Button>
        )}
      </div>

      {(adding || editing) && (
        <Card className="border-primary/30 bg-card">
          <CardContent className="pt-5">
            <SermonForm
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

      {!isLoading && sermons.length === 0 && (
        <div
          data-ocid="admin.sermons.empty_state"
          className="text-center py-12 border border-dashed rounded-lg"
        >
          <Mic size={28} className="mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground text-sm">No sermons yet.</p>
        </div>
      )}

      <div className="space-y-2">
        {sermons.map((s, i) => (
          <div
            key={String(s.id)}
            data-ocid={`admin.sermon.item.${i + 1}`}
            className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{s.theme}</p>
              <p className="text-xs text-muted-foreground">
                {s.preacher} · {formatDate(s.date)}
              </p>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setEditing(s);
                  setAdding(false);
                }}
                data-ocid={`admin.sermon.edit_button.${i + 1}`}
              >
                <Pencil size={14} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() => handleDelete(s.id)}
                data-ocid={`admin.sermon.delete_button.${i + 1}`}
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
