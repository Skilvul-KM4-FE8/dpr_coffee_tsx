import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDeleteMenu } from "@/features/menu/api/use-delete-menu";
import { useOpenMenu } from "@/features/menu/hooks/use-open-menu";
import { useConfirm } from "@/hooks/use-confirm";
import { MoreHorizontal } from "lucide-react";

export type Menu = {
    id: string;
    // price: number;
    // author: string;
    // status: string
    name: string;
    price: number;
  };

export const ActionCell = ({ payment }: { payment: Menu }) => {
    const { onOpen } = useOpenMenu(); // Hook can be used here
    const deleteMutation = useDeleteMenu(payment.id!);
    const [DialogConfirm, Confirm] = useConfirm("Apakah Anda yakin?", "Anda akan menghapus menu ini");
  
    const handleDeleteMenu = async () => {
      const ok = await Confirm();
      if (ok) {
        deleteMutation.mutate();
      }
      return null;
    };
  
    return (
      <>
        <DialogConfirm />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Buka menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>Salin ID menu ini</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onOpen(payment.id)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDeleteMenu}>Hapus</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  };