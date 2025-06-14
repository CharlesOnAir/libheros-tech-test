import { Circle } from "lucide-react";

export function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="text-muted-foreground">
        <Circle className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-medium mb-2">Aucune liste de tâches</h3>
        <p className="text-sm">
          Créez votre première liste pour commencer à organiser vos projets
        </p>
      </div>
    </div>
  );
}
