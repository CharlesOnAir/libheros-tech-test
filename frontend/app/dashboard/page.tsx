"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Calendar,
  CheckCircle2,
  Circle,
  CircleSlashIcon,
  LayoutDashboard,
  ListIcon,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
}

interface TaskList {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
  color: string;
  createdAt: string;
}

export default function Page() {
  const [taskLists] = useState<TaskList[]>([
    {
      id: "1",
      title: "Projet Site Web",
      description: "Développement du nouveau site web de l'entreprise",
      color: "bg-blue-500",
      createdAt: "2024-01-15",
      tasks: [
        {
          id: "1-1",
          title: "Créer les maquettes",
          completed: true,
          description: "Designs pour desktop et mobile",
        },
        {
          id: "1-2",
          title: "Développer le frontend",
          completed: false,
          description: "React avec TypeScript",
        },
        {
          id: "1-3",
          title: "Intégrer l'API",
          completed: false,
          description: "Connexion avec le backend",
        },
        {
          id: "1-4",
          title: "Tests et déploiement",
          completed: false,
          description: "Tests unitaires et mise en production",
        },
      ],
    },
    {
      id: "2",
      title: "Formation Équipe",
      description: "Programme de formation pour la nouvelle équipe",
      color: "bg-green-500",
      createdAt: "2024-01-10",
      tasks: [
        {
          id: "2-1",
          title: "Préparer le matériel",
          completed: true,
          description: "Supports de cours et exercices",
        },
        {
          id: "2-2",
          title: "Planifier les sessions",
          completed: true,
          description: "Calendrier sur 3 semaines",
        },
        {
          id: "2-3",
          title: "Animer les formations",
          completed: false,
          description: "Sessions de 2h par jour",
        },
        {
          id: "2-4",
          title: "Évaluer les participants",
          completed: false,
          description: "Quiz et projets pratiques",
        },
      ],
    },
    {
      id: "3",
      title: "Migration Base de Données",
      description: "Migration vers la nouvelle infrastructure cloud",
      color: "bg-purple-500",
      createdAt: "2024-01-20",
      tasks: [
        {
          id: "3-1",
          title: "Audit de l'existant",
          completed: false,
          description: "Analyse des données actuelles",
        },
        {
          id: "3-2",
          title: "Préparer l'environnement",
          completed: false,
          description: "Configuration cloud",
        },
        {
          id: "3-3",
          title: "Migrer les données",
          completed: false,
          description: "Transfer sécurisé",
        },
        {
          id: "3-4",
          title: "Tests de validation",
          completed: false,
          description: "Vérification intégrité",
        },
      ],
    },
  ]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                Listes de tâches
              </h1>
              <p className="text-slate-600">
                Gérez vos projets et suivez leur progression
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button className="gap-2 bg-slate-800 hover:bg-slate-700">
                <Plus className="w-4 h-4" />
                Créer une nouvelle liste
              </Button>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-blue-600">
                        Liste de tâches
                      </p>
                      <p className="text-2xl font-bold text-blue-800">3</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <LayoutDashboard className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-gradient-to-r from-emerald-50 to-emerald-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-emerald-600">
                        Liste de tâches terminées
                      </p>
                      <p className="text-2xl font-bold text-emerald-800">
                        3/12
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-gradient-to-r from-red-50 to-red-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-red-600">
                        Liste de tâches non terminées
                      </p>
                      <p className="text-2xl font-bold text-red-800">9</p>
                    </div>
                    <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                      <CircleSlashIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {taskLists.map((project) => {
                return (
                  <Card
                    key={project.id}
                    className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 ${project.color} rounded-lg flex items-center justify-center`}
                          >
                            <ListIcon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-800">
                              {project.title}
                            </h3>
                            <Badge variant="secondary" className="text-xs mt-1">
                              10% complété
                            </Badge>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="text-red-600">
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-slate-600 mb-4">
                        {project.description}
                      </p>

                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-600">Progression</span>
                            <span className="font-medium">3/12 tâches</span>
                          </div>
                          <Progress value={30} className="h-2" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Calendar className="w-4 h-4" />
                            <span>Créé le 20</span>
                          </div>
                          <div className="flex -space-x-2">
                            <Avatar className="w-6 h-6 border-2 border-white">
                              <AvatarFallback className="text-xs bg-slate-200">
                                CS
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {taskLists.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground">
                  <Circle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">
                    Aucune liste de tâches
                  </h3>
                  <p className="text-sm">
                    Créez votre première liste pour commencer à organiser vos
                    projets
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
