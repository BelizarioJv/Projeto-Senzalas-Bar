import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface DialogProps {
  titleButton: string;
  titleContent: string;
  description: string;
  disabled?: boolean;
  onConfirm: () => void;
}

export function AppDialog({
  titleButton,
  titleContent,
  description,
  disabled = false,
  onConfirm,
}: DialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">{titleButton}</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{titleContent}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>

          <Button variant="destructive" disabled={disabled} onClick={onConfirm}>
            {disabled ? "Excluindo..." : "Confirmar exclusão"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
