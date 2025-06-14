import api from "@/app/utils/axios";
import { Plus } from "lucide-react";
import { useState } from "react";
import { mutate } from "swr";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

interface Task {
  id: string;
  title: string;
  status: string;
  shortDescription?: string;
  longDescription?: string;
  endDate?: string;
}

interface ProjectDetailsSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  tasks: Task[];
  tasksListsId: string;
}

export function ProjectDetailsSheet({
  isOpen,
  onOpenChange,
  title,
  description,
  tasks,
  tasksListsId,
}: ProjectDetailsSheetProps) {
  const completedTasks =
    tasks?.filter((task) => task.status === "completed").length ?? 0;
  const totalTasks = tasks?.length ?? 0;
  const completionPercentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const [showAddForm, setShowAddForm] = useState(false);
  const [localTasks, setLocalTasks] = useState<Task[]>(tasks);
  const [newTask, setNewTask] = useState({
    title: "",
    shortDescription: "",
    longDescription: "",
    endDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setNewTask((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTask = async () => {
    try {
      setIsSubmitting(true);
      const formattedEndDate = newTask.endDate
        ? new Date(newTask.endDate).toISOString()
        : null;
      const response = await api.post("/tasks", {
        ...newTask,
        endDate: formattedEndDate,
        tasksListsId,
      });

      setLocalTasks((prev) => [...prev, response.data]);
      setShowAddForm(false);
      setNewTask({
        title: "",
        shortDescription: "",
        longDescription: "",
        endDate: "",
      });

      await mutate("/tasks/list");
    } catch (error) {
      console.log("Error adding task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTaskCompletion = async (taskId: string) => {
    try {
      const task = localTasks.find((t) => t.id === taskId);
      if (!task) return;

      const newStatus = task.status === "completed" ? "pending" : "completed";
      const endpoint =
        newStatus === "completed"
          ? `/tasks/${taskId}/complete`
          : `/tasks/${taskId}/uncomplete`;

      await api.patch(endpoint);

      setLocalTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );

      await mutate("/tasks/list");
    } catch (error) {
      console.log("Error updating task status:", error);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <SheetTitle className="text-xl font-bold leading-tight">
                {title}
              </SheetTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {completedTasks}/{totalTasks} terminées
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {completionPercentage}% complété
                </Badge>
              </div>
            </div>
          </div>
          <SheetDescription className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-6 p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">
                Ajouter une nouvelle tâche
              </Label>
              {!showAddForm && (
                <Button
                  onClick={() => setShowAddForm(true)}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Nouvelle tâche
                </Button>
              )}
            </div>

            {showAddForm && (
              <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                <div className="space-y-2">
                  <Label
                    htmlFor="task-title"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    Titre de la tâche *
                  </Label>
                  <Input
                    id="task-title"
                    placeholder="Ex: Créer la page de contact"
                    className="text-sm"
                    value={newTask.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="task-short-desc"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    Description courte *
                  </Label>
                  <Input
                    id="task-short-desc"
                    placeholder="Ex: Formulaire de contact avec validation"
                    className="text-sm"
                    value={newTask.shortDescription}
                    onChange={(e) =>
                      handleInputChange("shortDescription", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="task-long-desc"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    Description détaillée
                  </Label>
                  <textarea
                    id="task-long-desc"
                    placeholder="Décrivez en détail ce qui doit être fait, les spécifications techniques, les critères d'acceptation..."
                    className="w-full min-h-[80px] px-3 py-2 text-sm border border-input bg-background rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    rows={3}
                    value={newTask.longDescription}
                    onChange={(e) =>
                      handleInputChange("longDescription", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="task-end-date"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    Date de fin*
                  </Label>
                  <Input
                    id="task-end-date"
                    type="datetime-local"
                    className="text-sm"
                    value={newTask.endDate}
                    onChange={(e) =>
                      handleInputChange("endDate", e.target.value)
                    }
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowAddForm(false);
                      setNewTask({
                        title: "",
                        shortDescription: "",
                        longDescription: "",
                        endDate: "",
                      });
                    }}
                  >
                    Annuler
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleAddTask}
                    disabled={
                      isSubmitting ||
                      !newTask.title ||
                      !newTask.shortDescription
                    }
                  >
                    {isSubmitting ? "Ajout en cours..." : "Ajouter la tâche"}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Liste des tâches */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Tâches ({localTasks.length})
            </Label>

            {localTasks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">Aucune tâche pour le moment</p>
                <p className="text-xs mt-1">
                  Ajoutez votre première tâche ci-dessus
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {localTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 rounded-lg border transition-all hover:shadow-sm ${
                      task.status === "completed"
                        ? "bg-muted/50 border-muted"
                        : "bg-background border-border hover:border-muted-foreground/20"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id={`task-${task.id}`}
                        checked={task.status === "completed"}
                        onCheckedChange={() => toggleTaskCompletion(task.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0 space-y-2">
                        <Label
                          htmlFor={`task-${task.id}`}
                          className={`text-sm font-medium cursor-pointer block ${
                            task.status === "completed"
                              ? "line-through text-muted-foreground"
                              : "text-foreground"
                          }`}
                        >
                          {task.title}
                        </Label>
                        {task.shortDescription && (
                          <p
                            className={`text-xs ${
                              task.status === "completed"
                                ? "text-muted-foreground/70"
                                : "text-muted-foreground"
                            }`}
                          >
                            {task.shortDescription}
                          </p>
                        )}
                        {task.longDescription && (
                          <p
                            className={`text-xs ${
                              task.status === "completed"
                                ? "text-muted-foreground/50"
                                : "text-muted-foreground/70"
                            }`}
                          >
                            {task.longDescription}
                          </p>
                        )}
                        {task.endDate && (
                          <p className="text-xs text-muted-foreground/60">
                            Date limite :{" "}
                            {new Date(task.endDate).toLocaleDateString("fr-FR")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
