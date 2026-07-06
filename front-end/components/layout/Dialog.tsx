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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useState } from "react";

interface DialogProps {
  titleButton: string;
  titleContent: string;
  description: string;
  disabled?: boolean;
  className?: string;
  withSelect?: boolean; // <- nova prop opcional
  onConfirm: (paymentType?: string) => void;
}

export function AppDialog({
  titleButton,
  titleContent,
  description,
  disabled = false,
  withSelect = false,
  onConfirm,
}: DialogProps) {
  const [paymentType, setPaymentType] = useState<string>("");

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

        {/* Renderiza o Select apenas se withSelect for true */}
        {withSelect && (
          <div className="py-4">
            <Select onValueChange={setPaymentType}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de pagamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="debito">Débito</SelectItem>
                <SelectItem value="credito">Crédito</SelectItem>
                <SelectItem value="pix">Pix</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>

          <Button
            variant="destructive"
            disabled={disabled || (withSelect && !paymentType)}
            onClick={() => onConfirm(withSelect ? paymentType : undefined)}>
            {disabled ? "Processando..." : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
