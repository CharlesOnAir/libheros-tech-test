import api from "@/app/utils/axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Calendar, ListIcon, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { DeleteConfirmationModal } from "../ui/delete-confirmation-modal";
import showToast from "../ui/toast";
import { ProjectDetailsSheet } from "./project-details-sheet";

interface Task {
  id: string;
  title: string;
  status: string;
  description?: string;
}

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
  createdAt: string;
}

export function ProjectCard({
  id,
  title,
  description,
  tasks,
  createdAt,
}: ProjectCardProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { mutate } = useSWRConfig();
  const completedTasks = tasks?.filter(
    (task) => task.status === "completed"
  ).length;
  const totalTasks = tasks?.length;
  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/list/${id}`);
      showToast({
        type: "success",
        message: "Liste de tâches supprimée avec succès",
      });
      setIsDeleteModalOpen(false);
      mutate("/tasks/list");
    } catch (error) {
      console.log(error);
      showToast({
        type: "error",
        message:
          "Une erreur est survenue lors de la suppression de la liste de tâches",
      });
    }
  };

  return (
    <>
      <Card
        className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white cursor-pointer"
        onClick={() => setIsSheetOpen(true)}
      >
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <ListIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">{title}</h3>
                <Badge variant="secondary" className="text-xs mt-1">
                  {Math.round(progress)}% complété
                </Badge>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDeleteModalOpen(true);
                  }}
                  className="text-red-600"
                >
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-slate-600 mb-4">{description}</p>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Progression</span>
                <span className="font-medium">
                  {completedTasks}/{totalTasks} tâches
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Calendar className="w-4 h-4" />
              <span>Créé le {new Date(createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <ProjectDetailsSheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        title={title}
        description={description}
        tasks={tasks}
        tasksListsId={id}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Supprimer la liste de tâches"
        description="Êtes-vous sûr de vouloir supprimer cette liste de tâches ? Toutes les tâches de cette liste seront supprimées. Cette action est irréversible."
      />
    </>
  );
}
