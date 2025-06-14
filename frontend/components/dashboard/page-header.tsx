import api from "@/app/utils/axios";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { mutate } from "swr";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Textarea } from "../ui/textarea";
import showToast from "../ui/toast";

export function PageHeader() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [taskListDatas, setTaskListDatas] = useState({
    title: "",
    description: "",
  });

  const handleCancel = () => {
    setTaskListDatas({
      title: "",
      description: "",
    });
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await api.post("/tasks/list", taskListDatas);
      showToast({
        type: "success",
        message: "Liste de tâches créée avec succès",
      });
      handleCancel();
      await mutate("/tasks/list");
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Listes de tâches
        </h1>
        <p className="text-slate-600">
          Gérez vos projets et suivez leur progression
        </p>
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button className="gap-2 bg-slate-800 hover:bg-slate-700">
            <Plus className="w-4 h-4" />
            Créer une nouvelle liste de tâches
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="font-bold">
              Créer une nouvelle liste de tâches
            </SheetTitle>
            <SheetDescription>
              Ajoutez un titre et une description pour votre nouvelle liste de
              tâches.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 p-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                placeholder="Entrez le titre de votre liste"
                value={taskListDatas.title}
                required
                onChange={(e) =>
                  setTaskListDatas({
                    ...taskListDatas,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description courte</Label>
              <Textarea
                id="description"
                placeholder="Ajoutez une courte description"
                value={taskListDatas.description}
                required
                onChange={(e) =>
                  setTaskListDatas({
                    ...taskListDatas,
                    description: e.target.value,
                  })
                }
                rows={3}
              />
            </div>
          </div>
          <SheetFooter className="gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Annuler
            </Button>
            <Button onClick={handleSubmit}>
              {isLoading ? <ClipLoader size={13} color="#ffffff" /> : "Créer"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
