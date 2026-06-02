import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddServiceBookItem,
  useDeleteServiceBookItem,
  useServiceBookItems,
  useUpdateServiceBookItem,
} from "@/lib/backend";
import type { ServiceBookItemInput } from "@/lib/backend";
import type { ServiceBookItem } from "@/types";
import { BookOpen, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormValues {
  step: string;
  title: string;
  content: string;
}

function ServiceItemForm({
  initial,
  onSubmit,
  onCancel,
  loading,
}: {
  initial?: ServiceBookItem;
  onSubmit: (v: ServiceBookItemInput) => void;
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
          step: String(initial.step),
          title: initial.title,
          content: initial.content,
        }
      : { step: "", title: "", content: "" },
  });
  const submit = (v: FormValues) =>
    onSubmit({
      step: BigInt(v.step),
      title: v.title.trim(),
      content: v.content.trim(),
    });
  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="step-num">Step Number *</Label>
          <Input
            id="step-num"
            type="number"
            min={1}
            data-ocid="admin.service.step_input"
            {...register("step", {
              required: "Required",
              min: { value: 1, message: "≥ 1" },
            })}
          />
          {errors.step && (
            <p className="text-xs text-destructive">{errors.step.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="step-title">Title *</Label>
          <Input
            id="step-title"
            data-ocid="admin.service.title_input"
            {...register("title", { required: "Required" })}
          />
          {errors.title && (
            <p className="text-xs text-destructive">{errors.title.message}</p>
          )}
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="step-content">Content *</Label>
        <Textarea
          id="step-content"
          rows={6}
          data-ocid="admin.service.content_input"
          {...register("content", { required: "Required" })}
        />
        {errors.content && (
          <p className="text-xs text-destructive">{errors.content.message}</p>
        )}
      </div>
      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={loading}
          data-ocid="admin.service.submit_button"
        >
          {loading ? "Saving…" : initial ? "Update Step" : "Add Step"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          data-ocid="admin.service.cancel_button"
        >
          <X size={14} className="mr-1" /> Cancel
        </Button>
      </div>
    </form>
  );
}

export default function AdminServiceBook() {
  const { data: items = [], isLoading } = useServiceBookItems();
  const add = useAddServiceBookItem();
  const update = useUpdateServiceBookItem();
  const del = useDeleteServiceBookItem();
  const [editing, setEditing] = useState<ServiceBookItem | null>(null);
  const [adding, setAdding] = useState(false);

  const handleAdd = async (input: ServiceBookItemInput) => {
    await add.mutateAsync(input);
    toast.success("Step added");
    setAdding(false);
  };

  const handleUpdate = async (input: ServiceBookItemInput) => {
    if (!editing) return;
    await update.mutateAsync({ id: editing.id, input });
    toast.success("Step updated");
    setEditing(null);
  };

  const handleDelete = async (id: bigint) => {
    if (!confirm("Delete this step?")) return;
    await del.mutateAsync(id);
    toast.success("Step deleted");
  };

  const sorted = [...items].sort((a, b) => Number(a.step - b.step));

  return (
    <div data-ocid="admin.service.section" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">
          Service Book ({items.length} steps)
        </h2>
        {!adding && !editing && (
          <Button
            size="sm"
            onClick={() => setAdding(true)}
            data-ocid="admin.service.add_button"
          >
            <Plus size={14} className="mr-1" /> Add Step
          </Button>
        )}
      </div>

      {(adding || editing) && (
        <Card className="border-primary/30 bg-card">
          <CardContent className="pt-5">
            <ServiceItemForm
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
          data-ocid="admin.service.empty_state"
          className="text-center py-12 border border-dashed rounded-lg"
        >
          <BookOpen size={28} className="mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground text-sm">No steps yet.</p>
        </div>
      )}

      <div className="space-y-2">
        {sorted.map((item, i) => (
          <div
            key={String(item.id)}
            data-ocid={`admin.service.item.${i + 1}`}
            className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors"
          >
            <span className="text-xs font-mono bg-muted w-7 h-7 flex items-center justify-center rounded shrink-0 font-bold">
              {String(item.step)}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{item.title}</p>
              <p className="text-xs text-muted-foreground truncate">
                {item.content.slice(0, 60)}
                {item.content.length > 60 ? "…" : ""}
              </p>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setEditing(item);
                  setAdding(false);
                }}
                data-ocid={`admin.service.edit_button.${i + 1}`}
              >
                <Pencil size={14} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() => handleDelete(item.id)}
                data-ocid={`admin.service.delete_button.${i + 1}`}
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
