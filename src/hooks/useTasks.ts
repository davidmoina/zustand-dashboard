import { DragEvent, useState } from "react";
import Swal from "sweetalert2";
import { useTaskStore } from "../store/tasks/task.store";
import { TaskStatus } from "../interfaces/task.interface";

interface Options {
  statusValue: TaskStatus;
}

export const useTasks = ({ statusValue }: Options) => {
  const draggingTaskId = useTaskStore((state) => state.draggingTaskId);
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
  const addTask = useTaskStore((state) => state.addTask);

  const [onDragOver, setOnDragOver] = useState(false);

  const handleAddTask = async () => {
    const { isConfirmed, value } = await Swal.fire({
      title: "Nueva tarea",
      input: "text",
      inputLabel: "Nombre de la tarea",
      inputPlaceholder: "Ingrese el nombre de la tarea",
      showCancelButton: true,
      confirmButtonText: "Añadir",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "Por favor ingrese el nombre de la tarea";
        }
      },
    });

    if (!isConfirmed) return;

    addTask(value, statusValue);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);

    onTaskDrop(statusValue);
  };

  return {
    draggingTaskId,
    onTaskDrop,
    addTask,
    onDragOver,
    handleAddTask,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};
