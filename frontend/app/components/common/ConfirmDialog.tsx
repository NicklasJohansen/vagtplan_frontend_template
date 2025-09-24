import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

  
  interface ConfirmDialogProps {
    title: string;
    text: string;
    isOpen: boolean;
    onConfirm: () => Promise<void>;
    onClose: () => void;
  }
  
  export function ConfirmDialog({
    title,
    text,
    isOpen,
    onConfirm,
    onClose,
  }: ConfirmDialogProps) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{text}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="default" onClick={onClose}>
                Annullér
              </Button>
            </DialogClose>
            <Button variant="primary" onClick={onConfirm}>
              Bekræft
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  