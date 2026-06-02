import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddAnnouncement,
  useAnnouncements,
  useDeleteAnnouncement,
  useUpdateAnnouncement,
} from "@/lib/backend";
import type { AnnouncementInput } from "@/lib/backend";
import type { Announcement } from "@/types";
import { Megaphone, Pencil, Pin, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormValues {
  title: string;
  body: string;
  pinned: boolean;
}

function AnnouncementForm({
  initial,
  onSubmit,
  onCancel,
  loading,
}: {
  initial?: Announcement;
  onSubmit: (v: AnnouncementInput) => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initial
      ? { title: initial.title, body: initial.body, pinned: initial.pinned }
      : { title: "", body: "", pinned: false },
  });
  const pinned = watch("pinned");
  const submit = (v: FormValues) =>
    onSubmit({ title: v.title.trim(), body: v.body.trim(), pinned: v.pinned });
  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="ann-title">Title *</Label>
        <Input
          id="ann-title"
          data-ocid="admin.ann.title_input"
          {...register("title", { required: "Required" })}
        />
        {errors.title && (
          <p className="text-xs text-destructive">{errors.title.message}</p>
        )}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="ann-body">Body *</Label>
        <Textarea
          id="ann-body"
          rows={5}
          data-ocid="admin.ann.textarea"
          {...register("body", { required: "Required" })}
        />
        {errors.body && (
          <p className="text-xs text-destructive">{errors.body.message}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="ann-pinned"
          checked={pinned}
          onCheckedChange={(v) => setValue("pinned", !!v)}
          data-ocid="admin.ann.pinned_checkbox"
        />
        <Label htmlFor="ann-pinned" className="cursor-pointer">
          Pin this announcement
        </Label>
      </div>
      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={loading}
          data-ocid="admin.ann.submit_button"
        >
          {loading ? "Saving…" : initial ? "Update" : "Add Announcement"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          data-ocid="admin.ann.cancel_button"
        >
          <X size={14} className="mr-1" /> Cancel
        </Button>
      </div>
    </form>
  );
}

export default function AdminAnnouncements() {
  const { data: announcements = [], isLoading } = useAnnouncements();
  const add = useAddAnnouncement();
  const update = useUpdateAnnouncement();
  const del = useDeleteAnnouncement();
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [adding, setAdding] = useState(false);

  const handleAdd = async (input: AnnouncementInput) => {
    await add.mutateAsync(input);
    toast.success("Announcement added");
    setAdding(false);
  };

  const handleUpdate = async (input: AnnouncementInput) => {
    if (!editing) return;
    await update.mutateAsync({ id: editing.id, input });
    toast.success("Announcement updated");
    setEditing(null);
  };

  const handleDelete = async (id: bigint) => {
    if (!confirm("Delete this announcement?")) return;
    await del.mutateAsync(id);
    toast.success("Announcement deleted");
  };

  const sorted = [...announcements].sort(
    (a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0),
  );

  return (
    <div data-ocid="admin.announcements.section" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">
          Announcements ({announcements.length})
        </h2>
        {!adding && !editing && (
          <Button
            size="sm"
            onClick={() => setAdding(true)}
            data-ocid="admin.announcements.add_button"
          >
            <Plus size={14} className="mr-1" /> Add
          </Button>
        )}
      </div>

      {(adding || editing) && (
        <Card className="border-primary/30 bg-card">
          <CardContent className="pt-5">
            <AnnouncementForm
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
          data-ocid="admin.announcements.empty_state"
          className="text-center py-12 border border-dashed rounded-lg"
        >
          <Megaphone size={28} className="mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground text-sm">No announcements yet.</p>
        </div>
      )}

      <div className="space-y-2">
        {sorted.map((a, i) => (
          <div
            key={String(a.id)}
            data-ocid={`admin.ann.item.${i + 1}`}
            className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors"
          >
            {a.pinned && <Pin size={13} className="shrink-0 text-primary" />}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{a.title}</p>
              {a.pinned && (
                <Badge variant="outline" className="text-xs mt-0.5">
                  Pinned
                </Badge>
              )}
            </div>
            <div className="flex gap-1 shrink-0">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setEditing(a);
                  setAdding(false);
                }}
                data-ocid={`admin.ann.edit_button.${i + 1}`}
              >
                <Pencil size={14} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() => handleDelete(a.id)}
                data-ocid={`admin.ann.delete_button.${i + 1}`}
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
