/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Edit, Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteFeaturedCategory, deleteProduct } from "@/helper/index";
import { useTransition } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const FeaturedCategoryTable = ({ categories }: any) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();


  const handleDelete = (id: string) => {
    startTransition(async () => {
      try {
        const res = await deleteFeaturedCategory(id);

        if (!res?.success) {
          toast.error(res?.message ?? "Failed to delete featured category");
          return;
        }

        toast.success(res.message ?? "Featured category deleted");
      } catch (error: any) {
        toast.error("Server crashed while deleting");
      }
    });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category Name</TableHead>
            <TableHead>slug</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.length > 0 ? (
            categories.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.slug}</TableCell>

                <TableCell className="flex gap-2">
                 
                  

                  {/* DELETE */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" disabled={isPending}>
                        <Trash2 size={16} className="text-red-500" />
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete featured category permanently?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                          This action cannot be undone. The category and all its
                          data will be permanently removed.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel disabled={isPending}>
                          Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction
                          disabled={isPending}
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          {isPending ? (
                            <Loader2 className="animate-spin" size={16} />
                          ) : (
                            "Delete"
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-24 text-center text-gray-600 font-semibold"
              >
                No Featured Categories found..
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default FeaturedCategoryTable;
