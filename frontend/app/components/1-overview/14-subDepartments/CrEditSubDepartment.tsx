import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { ColorPickerWithRecent } from "../../ui/colorgridpicker";
import { SubDepartment } from "~/pages/1-overview/14-SubDepartmentsPage";

export type SubdepartmentFormFields = {
  name?: string;
  description?: string;
  color?: string;
};

type CrEditSubdepartmentModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitSubdepartment: (data: SubdepartmentFormFields) => void;
  existingSubdepartment?: SubDepartment | undefined;
  onClose: () => void;
};

export const CrEditSubdepartmentModal = ({
  open,
  onOpenChange,
  onSubmitSubdepartment,
  existingSubdepartment,
  onClose,
}: CrEditSubdepartmentModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<SubdepartmentFormFields>({
    mode: "onSubmit",        // ✅ validate only when submitting
    reValidateMode: "onChange", // ✅ after submit, revalidate on change
    defaultValues: {
      name: "",
      description: "",
      color: "#EB1313",
    },
  });

  useEffect(() => {
    if (open) {
      if (existingSubdepartment) {
        reset(existingSubdepartment);
      } else {
        reset({
          name: "",
          description: "",
          color: "",
        });
      }
    }
  }, [open, existingSubdepartment, reset]);

  const onSubmit = (data: SubdepartmentFormFields) => {
    onSubmitSubdepartment(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>
              {existingSubdepartment ? "Redigér afsnit: " : "Nyt afsnit: "}
            </DialogTitle>
            <DialogDescription>
              {existingSubdepartment
                ? "Redigér detaljer for afsnit: "
                : "Udfyld formen for at oprette et nyt afsnit: "}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Navn</Label>
            <Input
              id="name"
              {...register("name", {
                required: "Navn er påkrævet",
              })}
            />
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="description">Beskrivelse</Label>
            <Input
              id="description"
              {...register("description", {
                required: "Beskrivelse er påkrævet",
              })}
            />
            {errors.description && (
              <span className="text-sm text-red-500">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="color"></Label>
            <Controller
              name="color"
              
              control={control}
              rules={{ required: "Vælg en farve" }}
              render={({ field }) => (
                <ColorPickerWithRecent
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.color && (
              <span className="text-sm text-red-500">
                {errors.color.message}
              </span>
            )}
          </div>

          <DialogFooter>
            <Button variant="primary" type="submit">
              Bekræft
            </Button>
            <DialogClose asChild>
              <Button variant="default" type="button" onClick={onClose}>
                Annuller
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
