import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, CircleSlashIcon, LayoutDashboard } from "lucide-react";

interface StatsCardsProps {
  totalLists: number;
  completedTasks: number;
  totalTasks: number;
}

export function StatsCards({
  totalLists,
  completedTasks,
  totalTasks,
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-blue-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-blue-600">Liste de tâches</p>
              <p className="text-2xl font-bold text-blue-800">{totalLists}</p>
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
                {completedTasks}/{totalTasks}
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
              <p className="text-2xl font-bold text-red-800">
                {totalTasks - completedTasks}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <CircleSlashIcon className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
