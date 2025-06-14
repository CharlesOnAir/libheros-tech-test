/*
  Warnings:

  - You are about to drop the `task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_tasks_lists_id_fkey";

-- DropTable
DROP TABLE "task";

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "short_description" TEXT,
    "long_description" TEXT,
    "end_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tasks_lists_id" TEXT,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_tasks_lists_id_fkey" FOREIGN KEY ("tasks_lists_id") REFERENCES "tasks_lists"("id") ON DELETE SET NULL ON UPDATE CASCADE;
