import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useClass, useLectureMaterials } from "@/lib/backend";
import { Link } from "@tanstack/react-router";
import { useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Download,
  FileText,
  GraduationCap,
  User,
} from "lucide-react";
import { motion } from "motion/react";

function formatUploadDate(uploadedAt: bigint): string {
  const ms = Number(uploadedAt / 1_000_000n);
  if (!ms) return "Unknown date";
  return new Date(ms).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function MaterialsSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
          key={i}
          className="flex items-center gap-4 p-4 rounded-lg border border-border"
        >
          <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
          </div>
          <Skeleton className="h-9 w-24 shrink-0" />
        </div>
      ))}
    </div>
  );
}

export default function SundaySchoolClassPage() {
  const { id } = useParams({ from: "/sunday-school/$id" });
  const classId = id ? BigInt(id) : undefined;

  const {
    data: cls,
    isLoading: classLoading,
    isError: classError,
  } = useClass(classId);
  const {
    data: materials,
    isLoading: materialsLoading,
    isError: materialsError,
  } = useLectureMaterials(classId);

  return (
    <div data-ocid="sunday-school-class.page" className="min-h-screen">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            to="/sunday-school"
            data-ocid="sunday-school-class.back_link"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5"
          >
            <ArrowLeft className="w-4 h-4" />
            All Classes
          </Link>

          {classLoading && (
            <div
              data-ocid="sunday-school-class.loading_state"
              className="space-y-3"
            >
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          )}

          {classError && (
            <div
              data-ocid="sunday-school-class.error_state"
              className="flex items-center gap-2 text-destructive"
            >
              <AlertCircle className="w-5 h-5" />
              <p>Failed to load class details.</p>
            </div>
          )}

          {!classLoading && !classError && !cls && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <AlertCircle className="w-5 h-5" />
              <p>Class not found.</p>
            </div>
          )}

          {!classLoading && cls && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-secondary/20 p-3 shrink-0">
                  <GraduationCap className="w-6 h-6 text-secondary" />
                </div>
                <div className="min-w-0">
                  <Badge
                    variant="outline"
                    className="mb-2 text-secondary border-secondary/40 bg-secondary/10 text-xs"
                  >
                    Sunday School
                  </Badge>
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground break-words">
                    {cls.name}
                  </h1>
                  <div className="flex flex-wrap gap-4 mt-3">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <User className="w-3.5 h-3.5 text-secondary/70" />
                      <span>{cls.teacher}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="w-3.5 h-3.5 text-secondary/70" />
                      <span>{cls.schedule}</span>
                    </div>
                  </div>
                  {cls.description && (
                    <p className="mt-3 text-muted-foreground text-sm leading-relaxed max-w-2xl">
                      {cls.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Lecture Materials Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-5 h-5 text-secondary" />
          <h2 className="font-display text-xl font-semibold text-foreground">
            Lecture Materials
          </h2>
        </div>

        {materialsLoading && <MaterialsSkeleton />}

        {materialsError && (
          <div
            data-ocid="sunday-school-class.materials_error_state"
            className="flex items-center gap-2 text-destructive py-6"
          >
            <AlertCircle className="w-4 h-4" />
            <p className="text-sm">Failed to load lecture materials.</p>
          </div>
        )}

        {!materialsLoading && !materialsError && materials?.length === 0 && (
          <div
            data-ocid="sunday-school-class.empty_state"
            className="text-center py-16 rounded-xl border border-dashed border-border bg-muted/20"
          >
            <div className="inline-flex rounded-full bg-muted p-4 mb-3">
              <FileText className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="font-display font-medium text-foreground mb-1">
              No Materials Yet
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Lecture notes and materials for this class will appear here once
              uploaded.
            </p>
          </div>
        )}

        {!materialsLoading &&
          !materialsError &&
          materials &&
          materials.length > 0 && (
            <div
              className="space-y-3"
              data-ocid="sunday-school-class.materials_list"
            >
              {materials.map((material, index) => (
                <motion.div
                  key={String(material.id)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.06 }}
                  data-ocid={`sunday-school-class.material.${index + 1}`}
                >
                  <Card className="border-border hover:border-secondary/40 transition-colors bg-card">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-secondary/15 p-2.5 shrink-0">
                          <FileText className="w-5 h-5 text-secondary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {material.title}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 mt-1">
                            <span className="text-xs text-muted-foreground truncate max-w-xs">
                              {material.fileName}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                              <Calendar className="w-3 h-3" />
                              {formatUploadDate(material.uploadedAt)}
                            </span>
                          </div>
                        </div>
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="shrink-0 gap-1.5 border-secondary/40 text-secondary hover:bg-secondary/10"
                          data-ocid={`sunday-school-class.download_button.${index + 1}`}
                        >
                          <a
                            href={material.file.getDirectURL()}
                            download={material.fileName}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Download
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}
