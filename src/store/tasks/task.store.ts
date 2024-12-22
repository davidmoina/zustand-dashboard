import { create, StateCreator } from "zustand";
import { Task, TaskStatus } from "../../interfaces/task.interface";
import { devtools, persist } from "zustand/middleware";
// import { produce } from "immer";
import { immer } from "zustand/middleware/immer";

interface TaskState {
  tasks: Record<string, Task>;
  draggingTaskId?: string;
}

interface TaskActions {
  addTask(title: string, status: TaskStatus): void;
  getTasksByStatus(status: TaskStatus): Task[];
  setDraggingTaskId(taskId: string): void;
  removeDraggingTaskId(): void;
  changeTaskStatus(taskId: string, status: TaskStatus): void;
  onTaskDrop(status: TaskStatus): void;
  totalTasks(): number;
}

const storeApi: StateCreator<
  TaskState & TaskActions,
  [["zustand/immer", never], ["zustand/devtools", never]]
> = (set, get) => ({
  draggingTaskId: undefined,
  tasks: {
    "ABC-1": {
      id: "ABC-1",
      title: "Task 1",
      status: "open",
    },
    "ABC-2": {
      id: "ABC-2",
      title: "Task 2",
      status: "in-progress",
    },
    "ABC-3": {
      id: "ABC-3",
      title: "Task 3",
      status: "done",
    },
    "ABC-4": {
      id: "ABC-4",
      title: "Task 4",
      status: "open",
    },
  },
  addTask: (title: string, status: TaskStatus) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      status,
    };

    set(
      (state) => {
        state.tasks[newTask.id] = newTask;
      },
      false,
      "addTask"
    );

    // with immer and produce
    // set(
    //   produce((state: TaskState) => {
    //     state.tasks[newTask.id] = newTask;
    //   })
    // );

    // without immer
    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [newTask.id]: newTask,
    //   },
    // }));
  },
  getTasksByStatus: (status: TaskStatus) => {
    const tasks = get().tasks;

    return Object.values(tasks).filter((task) => task.status === status);
  },
  setDraggingTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId }, false, "setDragging");
  },
  removeDraggingTaskId: () => {
    set({ draggingTaskId: undefined }, false, "removeDraggingTaskId");
  },
  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    set(
      (state) => {
        state.tasks[taskId].status = status;
      },
      false,
      "changeTaskStatus"
    );
  },
  onTaskDrop: (status: TaskStatus) => {
    const draggingTaskId = get().draggingTaskId;
    if (!draggingTaskId) return;

    get().changeTaskStatus(draggingTaskId, status);
    get().removeDraggingTaskId();
  },
  totalTasks: () => {
    return Object.keys(get().tasks).length;
  },
});

export const useTaskStore = create<TaskState & TaskActions>()(
  devtools(persist(immer(storeApi), { name: "task-storage" }))
);
