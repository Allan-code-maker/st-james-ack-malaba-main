import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useOfferingInfo } from "@/hooks/useQueries";
import {
  CheckCheck,
  Copy,
  HandCoins,
  Landmark,
  Smartphone,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy to clipboard"
      className="ml-2 inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
    >
      {copied ? <CheckCheck size={12} /> : <Copy size={12} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

const FALLBACK_OFFERING = {
  mpesaName: "ST JAMES ACK MALABA",
  mpesaNumber: "0700 000 000",
  bankName: "Equity Bank",
  bankAccount: "0123456789001",
  bankBranch: "Malaba Branch",
  instructions:
    "You may give your tithes and offerings through M-Pesa or via bank transfer. For M-Pesa, use the number above and enter your name as the account reference. For bank transfers, use the account details shown. All gifts go directly to supporting God's work at St. James ACK Malaba.",
};

export default function OfferingPage() {
  const { data: offering, isLoading } = useOfferingInfo();
  const info = offering ?? FALLBACK_OFFERING;

  return (
    <div
      data-ocid="offering.page"
      className="max-w-3xl mx-auto px-4 py-10 space-y-8"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/15 border border-accent/30 mb-2">
          <HandCoins size={26} className="text-accent" />
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground">
          Tithes &amp; Offering
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Give generously as you have been blessed. Every contribution supports
          the work of God at St. James ACK Malaba.
        </p>
      </div>

      {isLoading ? (
        <div data-ocid="offering.loading_state" className="space-y-4">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      ) : (
        <>
          {/* M-Pesa Card */}
          <div
            data-ocid="offering.mpesa_card"
            className="rounded-xl border-2 border-secondary/40 bg-secondary/5 p-6 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0">
                <Smartphone size={20} className="text-secondary" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-foreground">
                  M-Pesa
                </h2>
                <Badge variant="secondary" className="text-xs">
                  Instant Transfer
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-card rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Paybill / Till Name
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-mono font-bold text-lg text-foreground tracking-wide">
                    {info.mpesaName}
                  </p>
                  <CopyButton value={info.mpesaName} />
                </div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Phone Number
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-mono font-bold text-lg text-foreground tracking-wide">
                    {info.mpesaNumber}
                  </p>
                  <CopyButton value={info.mpesaNumber} />
                </div>
              </div>
            </div>
          </div>

          {/* Bank Card */}
          <div
            data-ocid="offering.bank_card"
            className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                <Landmark size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-foreground">
                  Bank Transfer
                </h2>
                <Badge variant="outline" className="text-xs">
                  Electronic Funds Transfer
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-card rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Bank Name
                </p>
                <p className="font-semibold text-foreground">{info.bankName}</p>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Account Number
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-mono font-bold text-foreground">
                    {info.bankAccount}
                  </p>
                  <CopyButton value={info.bankAccount} />
                </div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Branch
                </p>
                <p className="font-semibold text-foreground">
                  {info.bankBranch}
                </p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          {info.instructions && (
            <div
              data-ocid="offering.instructions"
              className="rounded-xl bg-muted/40 border border-border p-5 text-sm text-muted-foreground leading-relaxed"
            >
              <p className="font-semibold text-foreground mb-1 text-base">
                How to Give
              </p>
              <p>{info.instructions}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
