import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useClasses } from "@/lib/backend";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronRight,
  Clock,
  GraduationCap,
  User,
} from "lucide-react";
import { motion } from "motion/react";

function ClassCardSkeleton() {
  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2 mt-1" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-8 w-28 mt-2" />
      </CardContent>
    </Card>
  );
}

export default function SundaySchoolPage() {
  const { data: classes, isLoading, isError } = useClasses();

  return (
    <div data-ocid="sunday-school.page" className="min-h-screen">
      {/* Hero Banner */}
      <div className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-start gap-4"
          >
            <div className="rounded-xl bg-secondary/20 p-3 shrink-0">
              <GraduationCap className="w-8 h-8 text-secondary" />
            </div>
            <div>
              <Badge
                variant="outline"
                className="mb-2 text-secondary border-secondary/40 bg-secondary/10"
              >
                Children&apos;s Ministry
              </Badge>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Sunday School
              </h1>
              <p className="text-muted-foreground mt-2 max-w-xl">
                Nurturing young hearts in faith through Bible-based education,
                worship, and fellowship at St. James ACK Malaba.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        {isLoading && (
          <div
            data-ocid="sunday-school.loading_state"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
              <ClassCardSkeleton key={i} />
            ))}
          </div>
        )}

        {isError && (
          <div
            data-ocid="sunday-school.error_state"
            className="text-center py-16"
          >
            <p className="text-destructive font-medium">
              Failed to load classes. Please try again.
            </p>
          </div>
        )}

        {!isLoading && !isError && classes?.length === 0 && (
          <div
            data-ocid="sunday-school.empty_state"
            className="text-center py-20"
          >
            <div className="inline-flex rounded-full bg-muted p-5 mb-4">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              No Classes Yet
            </h2>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Sunday School classes will appear here once they are added by the
              admin.
            </p>
          </div>
        )}

        {!isLoading && !isError && classes && classes.length > 0 && (
          <>
            <h2 className="font-display text-xl font-semibold text-foreground mb-6">
              {classes.length} {classes.length === 1 ? "Class" : "Classes"}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {classes.map((cls, index) => (
                <motion.div
                  key={String(cls.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  data-ocid={`sunday-school.item.${index + 1}`}
                >
                  <Link to="/sunday-school/$id" params={{ id: String(cls.id) }}>
                    <Card className="group h-full border-border hover:border-secondary/50 hover:shadow-md transition-all duration-200 cursor-pointer bg-card">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-display font-semibold text-lg text-foreground leading-snug group-hover:text-secondary transition-colors">
                            {cls.name}
                          </h3>
                          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1 group-hover:text-secondary transition-colors" />
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="w-3.5 h-3.5 shrink-0 text-secondary/70" />
                          <span className="truncate">{cls.teacher}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-3.5 h-3.5 shrink-0 text-secondary/70" />
                          <span className="truncate">{cls.schedule}</span>
                        </div>
                        {cls.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2 border-t border-border pt-3">
                            {cls.description}
                          </p>
                        )}
                        <div className="pt-1">
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-secondary">
                            <BookOpen className="w-3 h-3" />
                            View Materials
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
