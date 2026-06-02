import { ExternalBlob } from "@/backend";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddClass,
  useAddLectureMaterial,
  useClasses,
  useDeleteClass,
  useDeleteLectureMaterial,
  useLectureMaterials,
  useUpdateClass,
} from "@/lib/backend";
import type { ClassInput, LectureMaterialInput } from "@/lib/backend";
import type { Class } from "@/types";
import {
  FileText,
  GraduationCap,
  Pencil,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ClassFormValues {
  name: string;
  teacher: string;
  description: string;
  schedule: string;
}

function ClassForm({
  initial,
  onSubmit,
  onCancel,
  loading,
}: {
  initial?: Class;
  onSubmit: (v: ClassInput) => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassFormValues>({
    defaultValues: initial
      ? {
          name: initial.name,
          teacher: initial.teacher,
          description: initial.description,
          schedule: initial.schedule,
        }
      : { name: "", teacher: "", description: "", schedule: "" },
  });
  const submit = (v: ClassFormValues) =>
    onSubmit({
      name: v.name.trim(),
      teacher: v.teacher.trim(),
      description: v.description.trim(),
      schedule: v.schedule.trim(),
    });
  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Class Name *</Label>
          <Input
            data-ocid="admin.school.class_name_input"
            {...register("name", { required: "Required" })}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label>Teacher *</Label>
          <Input
            data-ocid="admin.school.teacher_input"
            {...register("teacher", { required: "Required" })}
          />
          {errors.teacher && (
            <p className="text-xs text-destructive">{errors.teacher.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label>Schedule</Label>
          <Input
            placeholder="e.g. Sundays 9:00–10:00 AM"
            data-ocid="admin.school.schedule_input"
            {...register("schedule")}
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label>Description</Label>
          <Textarea
            rows={3}
            data-ocid="admin.school.description_input"
            {...register("description")}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={loading}
          data-ocid="admin.school.class_submit_button"
        >
          {loading ? "Saving…" : initial ? "Update Class" : "Add Class"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          data-ocid="admin.school.class_cancel_button"
        >
          <X size={14} className="mr-1" /> Cancel
        </Button>
      </div>
    </form>
  );
}

function MaterialsPanel({ classId }: { classId: bigint }) {
  const { data: materials = [], isLoading } = useLectureMaterials(classId);
  const addMaterial = useAddLectureMaterial();
  const deleteMaterial = useDeleteLectureMaterial();
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    if (!title.trim() || !file) {
      toast.error("Provide a title and file");
      return;
    }
    try {
      setUploading(true);
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((p) =>
        setProgress(p),
      );
      const input: LectureMaterialInput = {
        classId,
        title: title.trim(),
        fileName: file.name,
        file: blob,
      };
      await addMaterial.mutateAsync(input);
      toast.success("Material uploaded");
      setTitle("");
      setFile(null);
      setProgress(0);
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: bigint) => {
    if (!confirm("Delete this material?")) return;
    await deleteMaterial.mutateAsync({ id, classId });
    toast.success("Material deleted");
  };

  return (
    <div className="ml-4 mt-3 space-y-3">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
        Lecture Materials
      </p>

      {isLoading && <p className="text-xs text-muted-foreground">Loading…</p>}

      {materials.map((m, i) => (
        <div
          key={String(m.id)}
          data-ocid={`admin.school.material.${i + 1}`}
          className="flex items-center gap-2 p-2 rounded-lg border border-border bg-muted/30 text-sm"
        >
          <FileText size={14} className="shrink-0 text-secondary" />
          <span className="flex-1 truncate min-w-0">{m.title}</span>
          <span className="text-xs text-muted-foreground shrink-0 truncate max-w-[120px]">
            {m.fileName}
          </span>
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 text-destructive hover:text-destructive shrink-0"
            onClick={() => handleDelete(m.id)}
            data-ocid={`admin.school.material_delete_button.${i + 1}`}
          >
            <Trash2 size={12} />
          </Button>
        </div>
      ))}

      <div className="space-y-2 pt-1">
        <div className="flex gap-2">
          <Input
            placeholder="Material title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-8 text-sm"
            data-ocid="admin.school.material_title_input"
          />
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="file"
            accept=".pdf,.doc,.docx,.ppt,.pptx"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="text-xs flex-1 file:mr-2 file:text-xs file:rounded file:border-0 file:bg-muted file:text-foreground file:px-2 file:py-1"
            data-ocid="admin.school.material_file_input"
          />
          <Button
            size="sm"
            onClick={handleUpload}
            disabled={uploading || !file || !title.trim()}
            className="h-8 text-xs shrink-0"
            data-ocid="admin.school.upload_button"
          >
            {uploading ? (
              `${Math.round(progress)}%`
            ) : (
              <>
                <Upload size={12} className="mr-1" />
                Upload
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function AdminSundaySchool() {
  const { data: classes = [], isLoading } = useClasses();
  const addClass = useAddClass();
  const updateClass = useUpdateClass();
  const deleteClass = useDeleteClass();
  const [editing, setEditing] = useState<Class | null>(null);
  const [adding, setAdding] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleAdd = async (input: ClassInput) => {
    await addClass.mutateAsync(input);
    toast.success("Class added");
    setAdding(false);
  };

  const handleUpdate = async (input: ClassInput) => {
    if (!editing) return;
    await updateClass.mutateAsync({ id: editing.id, input });
    toast.success("Class updated");
    setEditing(null);
  };

  const handleDelete = async (id: bigint) => {
    if (!confirm("Delete this class and all its materials?")) return;
    await deleteClass.mutateAsync(id);
    toast.success("Class deleted");
  };

  return (
    <div data-ocid="admin.school.section" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">
          Sunday School Classes ({classes.length})
        </h2>
        {!adding && !editing && (
          <Button
            size="sm"
            onClick={() => setAdding(true)}
            data-ocid="admin.school.add_class_button"
          >
            <Plus size={14} className="mr-1" /> Add Class
          </Button>
        )}
      </div>

      {(adding || editing) && (
        <Card className="border-primary/30 bg-card">
          <CardContent className="pt-5">
            <ClassForm
              initial={editing ?? undefined}
              onSubmit={editing ? handleUpdate : handleAdd}
              onCancel={() => {
                setAdding(false);
                setEditing(null);
              }}
              loading={addClass.isPending || updateClass.isPending}
            />
          </CardContent>
        </Card>
      )}

      {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}

      {!isLoading && classes.length === 0 && (
        <div
          data-ocid="admin.school.empty_state"
          className="text-center py-12 border border-dashed rounded-lg"
        >
          <GraduationCap
            size={28}
            className="mx-auto text-muted-foreground mb-2"
          />
          <p className="text-muted-foreground text-sm">No classes yet.</p>
        </div>
      )}

      <div className="space-y-3">
        {classes.map((cls, i) => (
          <Card
            key={String(cls.id)}
            data-ocid={`admin.school.class.${i + 1}`}
            className="border-border bg-card"
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{cls.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {cls.teacher} · {cls.schedule}
                  </p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs"
                    onClick={() =>
                      setExpanded(
                        expanded === String(cls.id) ? null : String(cls.id),
                      )
                    }
                    data-ocid={`admin.school.materials_toggle.${i + 1}`}
                  >
                    {expanded === String(cls.id)
                      ? "Hide Materials"
                      : "Materials"}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      setEditing(cls);
                      setAdding(false);
                    }}
                    data-ocid={`admin.school.edit_button.${i + 1}`}
                  >
                    <Pencil size={14} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(cls.id)}
                    data-ocid={`admin.school.delete_button.${i + 1}`}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
              {expanded === String(cls.id) && (
                <>
                  <Separator className="my-3" />
                  <MaterialsPanel classId={cls.id} />
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
