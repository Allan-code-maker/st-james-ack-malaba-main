import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useOfferingInfo, useUpdateOfferingInfo } from "@/lib/backend";
import type { OfferingInfo } from "@/types";
import { DollarSign, Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormValues = {
  mpesaName: string;
  mpesaNumber: string;
  bankName: string;
  bankAccount: string;
  bankBranch: string;
  instructions: string;
};

export default function AdminOffering() {
  const { data: info, isLoading } = useOfferingInfo();
  const update = useUpdateOfferingInfo();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      mpesaName: "",
      mpesaNumber: "",
      bankName: "",
      bankAccount: "",
      bankBranch: "",
      instructions: "",
    },
  });

  useEffect(() => {
    if (info) reset(info as FormValues);
  }, [info, reset]);

  const onSubmit = async (v: FormValues) => {
    const payload: OfferingInfo = {
      mpesaName: v.mpesaName.trim(),
      mpesaNumber: v.mpesaNumber.trim(),
      bankName: v.bankName.trim(),
      bankAccount: v.bankAccount.trim(),
      bankBranch: v.bankBranch.trim(),
      instructions: v.instructions.trim(),
    };
    await update.mutateAsync(payload);
    toast.success("Offering info updated");
  };

  if (isLoading)
    return <p className="text-sm text-muted-foreground">Loading…</p>;

  return (
    <div data-ocid="admin.offering.section" className="space-y-6">
      <div className="flex items-center gap-3">
        <DollarSign size={20} className="text-primary" />
        <h2 className="font-display text-lg font-semibold">
          Offering &amp; Tithes Info
        </h2>
      </div>
      <Card className="bg-card border-border">
        <CardContent className="pt-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-muted-foreground mb-2">
                M-Pesa Details
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="mpesa-name">M-Pesa Name *</Label>
                  <Input
                    id="mpesa-name"
                    data-ocid="admin.offering.mpesa_name_input"
                    {...register("mpesaName", { required: "Required" })}
                  />
                  {errors.mpesaName && (
                    <p className="text-xs text-destructive">
                      {errors.mpesaName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="mpesa-number">M-Pesa Number *</Label>
                  <Input
                    id="mpesa-number"
                    data-ocid="admin.offering.mpesa_number_input"
                    {...register("mpesaNumber", { required: "Required" })}
                  />
                  {errors.mpesaNumber && (
                    <p className="text-xs text-destructive">
                      {errors.mpesaNumber.message}
                    </p>
                  )}
                </div>
              </div>
            </fieldset>
            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-muted-foreground mb-2">
                Bank Details
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="bank-name">Bank Name *</Label>
                  <Input
                    id="bank-name"
                    data-ocid="admin.offering.bank_name_input"
                    {...register("bankName", { required: "Required" })}
                  />
                  {errors.bankName && (
                    <p className="text-xs text-destructive">
                      {errors.bankName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bank-account">Account Number *</Label>
                  <Input
                    id="bank-account"
                    data-ocid="admin.offering.bank_account_input"
                    {...register("bankAccount", { required: "Required" })}
                  />
                  {errors.bankAccount && (
                    <p className="text-xs text-destructive">
                      {errors.bankAccount.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bank-branch">Branch</Label>
                  <Input
                    id="bank-branch"
                    data-ocid="admin.offering.bank_branch_input"
                    {...register("bankBranch")}
                  />
                </div>
              </div>
            </fieldset>
            <div className="space-y-1.5">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                rows={4}
                data-ocid="admin.offering.instructions_input"
                {...register("instructions")}
              />
            </div>
            <Button
              type="submit"
              disabled={update.isPending}
              className="gap-2"
              data-ocid="admin.offering.submit_button"
            >
              <Save size={14} />
              {update.isPending ? "Saving…" : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
