import { useShallow } from "zustand/shallow";
import { JiraTasks } from "../../components";
import { useTaskStore } from "../../store/tasks/task.store";

export const JiraPage = () => {
  const pendingTasks = useTaskStore(
    useShallow((state) => state.getTasksByStatus("open"))
  );
  const inProgressTasks = useTaskStore(
    useShallow((state) => state.getTasksByStatus("in-progress"))
  );
  const doneTasks = useTaskStore(
    useShallow((state) => state.getTasksByStatus("done"))
  );

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <JiraTasks title="Pendientes" statusValue="open" tasks={pendingTasks} />

        <JiraTasks
          title="En progreso"
          statusValue="in-progress"
          tasks={inProgressTasks}
        />

        <JiraTasks title="Terminadas" statusValue="done" tasks={doneTasks} />
      </div>
    </>
  );
};
