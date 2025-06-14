"use client";
import api from "@/app/utils/axios";
import { AppSidebar } from "@/components/app-sidebar";
import { EmptyState } from "@/components/dashboard/empty-state";
import { PageHeader } from "@/components/dashboard/page-header";
import { ProjectCard } from "@/components/dashboard/project-card";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ClipLoader from "react-spinners/ClipLoader";
import useSWR from "swr";

interface Task {
  id: string;
  title: string;
  status: string;
  description?: string;
}

interface TaskList {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
  createdAt: string;
}

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function Page() {
  const {
    data: taskLists = [],
    isLoading,
    error,
  } = useSWR<TaskList[]>("/tasks/list", fetcher);

  const totalTasks = taskLists.reduce(
    (acc, list) => acc + (list.tasks?.length || 0),
    0
  );
  const completedTasks = taskLists.reduce(
    (acc, list) =>
      acc +
      (list.tasks?.filter((task) => task.status === "completed").length || 0),
    0
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="p-8">
          <PageHeader />
          <div className="flex flex-1 flex-col gap-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <ClipLoader />
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-32">
                <p>Une erreur est survenue lors du chargement des tâches</p>
              </div>
            ) : (
              <>
                <StatsCards
                  totalLists={taskLists.length}
                  completedTasks={completedTasks}
                  totalTasks={totalTasks}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {taskLists.map((taskList) => (
                    <ProjectCard key={taskList.id} {...taskList} />
                  ))}
                </div>

                {taskLists.length === 0 && <EmptyState />}
              </>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
