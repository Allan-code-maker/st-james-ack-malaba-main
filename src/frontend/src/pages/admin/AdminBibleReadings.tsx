import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddBibleReading,
  useBibleReadings,
  useDeleteBibleReading,
  useSetReadingOfDay,
  useUpdateBibleReading,
} from "@/lib/backend";
import type { BibleReadingInput } from "@/lib/backend";
import type { BibleReading } from "@/types";
import { BookOpen, Pencil, Plus, Star, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormValues {
  reference: string;
  text: string;
}

function ReadingForm({
  initial,
  onSubmit,
  onCancel,
  loading,
}: {
  initial?: BibleReading;
  onSubmit: (v: BibleReadingInput) => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initial
      ? { reference: initial.reference, text: initial.text }
      : { reference: "", text: "" },
  });
  const submit = (v: FormValues) =>
    onSubmit({ reference: v.reference.trim(), text: v.text.trim() });
  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="reading-ref">Scripture Reference *</Label>
        <Input
          id="reading-ref"
          placeholder="e.g. John 3:16-17"
          data-ocid="admin.bible.reference_input"
          {...register("reference", { required: "Required" })}
        />
        {errors.reference && (
          <p className="text-xs text-destructive">{errors.reference.message}</p>
        )}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="reading-text">Reading Text *</Label>
        <Textarea
          id="reading-text"
          rows={8}
          data-ocid="admin.bible.text_input"
          {...register("text", { required: "Required" })}
        />
        {errors.text && (
          <p className="text-xs text-destructive">{errors.text.message}</p>
        )}
      </div>
      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={loading}
          data-ocid="admin.bible.submit_button"
        >
          {loading ? "Saving…" : initial ? "Update Reading" : "Add Reading"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          data-ocid="admin.bible.cancel_button"
        >
          <X size={14} className="mr-1" /> Cancel
        </Button>
      </div>
    </form>
  );
}

export default function AdminBibleReadings() {
  const { data: readings = [], isLoading } = useBibleReadings();
  const addReading = useAddBibleReading();
  const updateReading = useUpdateBibleReading();
  const deleteReading = useDeleteBibleReading();
  const setOfDay = useSetReadingOfDay();
  const [editing, setEditing] = useState<BibleReading | null>(null);
  const [adding, setAdding] = useState(false);

  const handleAdd = async (input: BibleReadingInput) => {
    await addReading.mutateAsync(input);
    toast.success("Reading added");
    setAdding(false);
  };

  const handleUpdate = async (input: BibleReadingInput) => {
    if (!editing) return;
    await updateReading.mutateAsync({ id: editing.id, input });
    toast.success("Reading updated");
    setEditing(null);
  };

  const handleDelete = async (id: bigint) => {
    if (!confirm("Delete this reading?")) return;
    await deleteReading.mutateAsync(id);
    toast.success("Reading deleted");
  };

  const handleSetOfDay = async (id: bigint) => {
    await setOfDay.mutateAsync(id);
    toast.success("Set as Reading of the Day");
  };

  return (
    <div data-ocid="admin.bible.section" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">
          Bible Readings ({readings.length})
        </h2>
        {!adding && !editing && (
          <Button
            size="sm"
            onClick={() => setAdding(true)}
            data-ocid="admin.bible.add_button"
          >
            <Plus size={14} className="mr-1" /> Add Reading
          </Button>
        )}
      </div>

      {(adding || editing) && (
        <Card className="border-primary/30 bg-card">
          <CardContent className="pt-5">
            <ReadingForm
              initial={editing ?? undefined}
              onSubmit={editing ? handleUpdate : handleAdd}
              onCancel={() => {
                setAdding(false);
                setEditing(null);
              }}
              loading={addReading.isPending || updateReading.isPending}
            />
          </CardContent>
        </Card>
      )}

      {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}

      {!isLoading && readings.length === 0 && (
        <div
          data-ocid="admin.bible.empty_state"
          className="text-center py-12 border border-dashed rounded-lg"
        >
          <BookOpen size={28} className="mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground text-sm">No readings yet.</p>
        </div>
      )}

      <div className="space-y-2">
        {readings.map((r, i) => (
          <div
            key={String(r.id)}
            data-ocid={`admin.bible.item.${i + 1}`}
            className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors"
          >
            {r.isReadingOfDay && (
              <Badge
                variant="outline"
                className="shrink-0 text-amber-600 border-amber-400 bg-amber-50 dark:bg-amber-950/30 text-xs"
              >
                <Star size={10} className="mr-1" /> Today
              </Badge>
            )}
            <p className="flex-1 font-medium text-sm truncate min-w-0">
              {r.reference}
            </p>
            <div className="flex gap-1 shrink-0 items-center">
              <Button
                size="sm"
                variant="outline"
                className="text-xs h-7 px-2"
                onClick={() => handleSetOfDay(r.id)}
                disabled={r.isReadingOfDay || setOfDay.isPending}
                data-ocid={`admin.bible.set_of_day_button.${i + 1}`}
              >
                Set as Today
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setEditing(r);
                  setAdding(false);
                }}
                data-ocid={`admin.bible.edit_button.${i + 1}`}
              >
                <Pencil size={14} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() => handleDelete(r.id)}
                data-ocid={`admin.bible.delete_button.${i + 1}`}
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
