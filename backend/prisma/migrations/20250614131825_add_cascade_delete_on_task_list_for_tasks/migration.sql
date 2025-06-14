-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_tasks_lists_id_fkey";

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_tasks_lists_id_fkey" FOREIGN KEY ("tasks_lists_id") REFERENCES "tasks_lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
