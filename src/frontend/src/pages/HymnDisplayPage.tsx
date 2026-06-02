import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useHymn } from "@/lib/backend";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft, Moon, Sun, X, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useState } from "react";

type FontSize = "lg" | "xl" | "2xl" | "3xl" | "4xl";

const SIZES: FontSize[] = ["lg", "xl", "2xl", "3xl", "4xl"];
const SIZE_LABELS: Record<FontSize, string> = {
  lg: "sm",
  xl: "md",
  "2xl": "lg",
  "3xl": "xl",
  "4xl": "2xl",
};
const SIZE_CLASSES: Record<FontSize, string> = {
  lg: "text-lg md:text-xl",
  xl: "text-xl md:text-2xl",
  "2xl": "text-2xl md:text-3xl",
  "3xl": "text-3xl md:text-4xl",
  "4xl": "text-4xl md:text-5xl",
};

export default function HymnDisplayPage() {
  const { id } = useParams({ from: "/hymns/display/$id" });
  const navigate = useNavigate();
  const hymnId = BigInt(id);
  const { data: hymn, isLoading } = useHymn(hymnId);

  const [dark, setDark] = useState(true);
  const [fontSize, setFontSize] = useState<FontSize>("2xl");
  const [controlsVisible, setControlsVisible] = useState(true);

  // Auto-hide controls after 4 seconds of inactivity — re-trigger whenever controls become visible
  useEffect(() => {
    if (!controlsVisible) return;
    const timer = setTimeout(() => setControlsVisible(false), 4000);
    return () => clearTimeout(timer);
  }, [controlsVisible]);

  const showControls = () => setControlsVisible(true);

  const sizeIndex = SIZES.indexOf(fontSize);
  const canIncrease = sizeIndex < SIZES.length - 1;
  const canDecrease = sizeIndex > 0;

  const handleBack = () => {
    navigate({ to: "/hymns/$id", params: { id } });
  };

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: full-screen click to show controls
    <div
      data-ocid="hymn-display.page"
      className={`projection-safe min-h-screen w-full flex flex-col overflow-hidden transition-colors duration-300 ${
        dark
          ? "bg-[oklch(0.08_0.01_265)] text-[oklch(0.97_0.02_90)]"
          : "bg-[oklch(0.98_0.01_90)] text-[oklch(0.12_0.01_265)]"
      }`}
      onClick={showControls}
    >
      {/* Top controls bar */}
      <div
        className={`flex items-center justify-between px-4 md:px-8 py-3 transition-opacity duration-300 ${
          controlsVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        } ${dark ? "border-b border-white/10" : "border-b border-black/10"}`}
      >
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleBack();
            }}
            className="gap-2 text-current hover:bg-white/10"
            data-ocid="hymn-display.back_button"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Detail</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate({ to: "/hymns" });
            }}
            className="gap-2 text-current hover:bg-white/10"
            data-ocid="hymn-display.exit_button"
          >
            <X className="h-4 w-4" />
            <span className="hidden sm:inline">Exit</span>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {/* Font size controls */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={!canDecrease}
            onClick={(e) => {
              e.stopPropagation();
              setFontSize(SIZES[sizeIndex - 1]);
            }}
            className="h-8 w-8 text-current hover:bg-white/10 disabled:opacity-30"
            aria-label="Decrease font size"
            data-ocid="hymn-display.font_decrease"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-xs font-mono opacity-60 w-6 text-center">
            {SIZE_LABELS[fontSize]}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={!canIncrease}
            onClick={(e) => {
              e.stopPropagation();
              setFontSize(SIZES[sizeIndex + 1]);
            }}
            className="h-8 w-8 text-current hover:bg-white/10 disabled:opacity-30"
            aria-label="Increase font size"
            data-ocid="hymn-display.font_increase"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>

          {/* Dark/light toggle */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setDark((d) => !d);
            }}
            className="h-8 w-8 text-current hover:bg-white/10"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            data-ocid="hymn-display.theme_toggle"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-start md:justify-center px-6 md:px-16 py-8 md:py-12 overflow-y-auto">
        {isLoading ? (
          <div
            data-ocid="hymn-display.loading_state"
            className="w-full max-w-4xl space-y-6"
          >
            <Skeleton className="h-20 w-28 bg-white/10" />
            <Skeleton className="h-10 w-3/5 bg-white/10" />
            <div className="space-y-4 pt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                <Skeleton key={i} className="h-8 w-full bg-white/10" />
              ))}
            </div>
          </div>
        ) : !hymn ? (
          <div
            data-ocid="hymn-display.error_state"
            className="text-center py-20 opacity-70"
          >
            <p className="text-2xl mb-4">Hymn not found</p>
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="text-current border-current hover:bg-white/10"
            >
              Go back
            </Button>
          </div>
        ) : (
          <div className="w-full max-w-4xl">
            {/* Hymn number — gold accent */}
            <div
              className="text-hymn-number font-display font-bold leading-none mb-3"
              aria-label={`Hymn number ${hymn.number}`}
            >
              {String(hymn.number)}
            </div>

            {/* Title */}
            <h1
              className={`font-display font-bold mb-8 md:mb-12 leading-tight ${
                fontSize === "4xl"
                  ? "text-3xl md:text-5xl"
                  : "text-2xl md:text-4xl"
              }`}
            >
              {hymn.title}
            </h1>

            {/* Lyrics */}
            <div
              data-ocid="hymn-display.lyrics"
              className={`font-body whitespace-pre-wrap ${SIZE_CLASSES[fontSize]}`}
              style={{ lineHeight: "1.85" }}
            >
              {hymn.lyrics}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
