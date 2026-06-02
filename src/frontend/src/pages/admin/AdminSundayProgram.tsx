import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useAddProgramItem,
  useDeleteProgramItem,
  useProgramItems,
  useUpdateProgramItem,
} from "@/lib/backend";
import type { ProgramItemInput } from "@/lib/backend";
import type { ProgramItem } from "@/types";
import { Calendar, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormValues {
  time: string;
  activity: string;
  order: string;
}

function ProgramForm({
  initial,
  onSubmit,
  onCancel,
  loading,
}: {
  initial?: ProgramItem;
  onSubmit: (v: ProgramItemInput) => void;
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
          time: initial.time,
          activity: initial.activity,
          order: String(initial.order),
        }
      : { time: "", activity: "", order: "" },
  });
  const submit = (v: FormValues) =>
    onSubmit({
      time: v.time.trim(),
      activity: v.activity.trim(),
      order: BigInt(v.order),
    });
  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="prog-order">Order # *</Label>
          <Input
            id="prog-order"
            type="number"
            min={1}
            data-ocid="admin.program.order_input"
            {...register("order", {
              required: "Required",
              min: { value: 1, message: "≥ 1" },
            })}
          />
          {errors.order && (
            <p className="text-xs text-destructive">{errors.order.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="prog-time">Time *</Label>
          <Input
            id="prog-time"
            placeholder="e.g. 09:00"
            data-ocid="admin.program.time_input"
            {...register("time", { required: "Required" })}
          />
          {errors.time && (
            <p className="text-xs text-destructive">{errors.time.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="prog-activity">Activity *</Label>
          <Input
            id="prog-activity"
            placeholder="e.g. Opening Prayer"
            data-ocid="admin.program.activity_input"
            {...register("activity", { required: "Required" })}
          />
          {errors.activity && (
            <p className="text-xs text-destructive">
              {errors.activity.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={loading}
          data-ocid="admin.program.submit_button"
        >
          {loading ? "Saving…" : initial ? "Update Item" : "Add Item"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          data-ocid="admin.program.cancel_button"
        >
          <X size={14} className="mr-1" /> Cancel
        </Button>
      </div>
    </form>
  );
}

export default function AdminSundayProgram() {
  const { data: items = [], isLoading } = useProgramItems();
  const add = useAddProgramItem();
  const update = useUpdateProgramItem();
  const del = useDeleteProgramItem();
  const [editing, setEditing] = useState<ProgramItem | null>(null);
  const [adding, setAdding] = useState(false);

  const handleAdd = async (input: ProgramItemInput) => {
    await add.mutateAsync(input);
    toast.success("Program item added");
    setAdding(false);
  };

  const handleUpdate = async (input: ProgramItemInput) => {
    if (!editing) return;
    await update.mutateAsync({ id: editing.id, input });
    toast.success("Program item updated");
    setEditing(null);
  };

  const handleDelete = async (id: bigint) => {
    if (!confirm("Delete this program item?")) return;
    await del.mutateAsync(id);
    toast.success("Program item deleted");
  };

  const sorted = [...items].sort((a, b) => Number(a.order - b.order));

  return (
    <div data-ocid="admin.program.section" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">
          Sunday Program ({items.length})
        </h2>
        {!adding && !editing && (
          <Button
            size="sm"
            onClick={() => setAdding(true)}
            data-ocid="admin.program.add_button"
          >
            <Plus size={14} className="mr-1" /> Add Item
          </Button>
        )}
      </div>

      {(adding || editing) && (
        <Card className="border-primary/30 bg-card">
          <CardContent className="pt-5">
            <ProgramForm
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

      {!isLoading && sorted.length === 0 && (
        <div
          data-ocid="admin.program.empty_state"
          className="text-center py-12 border border-dashed rounded-lg"
        >
          <Calendar size={28} className="mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground text-sm">No program items yet.</p>
        </div>
      )}

      <div className="space-y-2">
        {sorted.map((item, i) => (
          <div
            key={String(item.id)}
            data-ocid={`admin.program.item.${i + 1}`}
            className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors"
          >
            <span className="text-xs font-mono bg-muted w-6 h-6 flex items-center justify-center rounded shrink-0">
              {String(item.order)}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{item.activity}</p>
              <p className="text-xs text-muted-foreground">{item.time}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setEditing(item);
                  setAdding(false);
                }}
                data-ocid={`admin.program.edit_button.${i + 1}`}
              >
                <Pencil size={14} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() => handleDelete(item.id)}
                data-ocid={`admin.program.delete_button.${i + 1}`}
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
