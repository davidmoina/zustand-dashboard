import {
  IoAccessibilityOutline,
  IoHeartOutline,
  IoInformationOutline,
  IoListOutline,
  IoLockClosedOutline,
  IoPawOutline,
} from "react-icons/io5";
import { WhiteCard } from "../../components";
import { useBearStore } from "../../store/bears/bears.store";
import { usePersonStore } from "../../store/person/person.store";
import { useTaskStore } from "../../store/tasks/task.store";
import { RequestInfo } from "../../components/shared/request-info/RequestInfo";
import { useAuthStore } from "../../store/auth/auth.store";

export const Dashboard = () => {
  const totalBears = useBearStore((state) => state.totalBears);
  const firstName = usePersonStore((state) => state.firstName);
  const totalTasks = useTaskStore((state) => state.totalTasks);
  const userEmail = useAuthStore((state) => state.user?.email);

  return (
    <>
      <h1>Dashboard</h1>
      <p>Información colectiva de varios stores de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <WhiteCard centered>
          <IoPawOutline size={50} className="text-indigo-600" />
          <h2>Osos</h2>
          <p>{totalBears()}</p>
        </WhiteCard>

        <WhiteCard centered>
          <IoAccessibilityOutline size={50} className="text-indigo-600" />
          <h2>Persona</h2>
          <p>{firstName}</p>
        </WhiteCard>

        <WhiteCard centered>
          <IoListOutline size={50} className="text-indigo-600" />
          <h2>Tareas</h2>
          <p>{totalTasks()}</p>
        </WhiteCard>

        <WhiteCard centered>
          <IoHeartOutline size={50} className="text-indigo-600" />
          <h2>Boda</h2>
          <p>Información</p>
        </WhiteCard>

        <WhiteCard centered>
          <IoLockClosedOutline size={50} className="text-indigo-600" />
          <h2>Auth</h2>
          <p>{userEmail}</p>
        </WhiteCard>
        <WhiteCard centered className="col-span-3">
          <IoInformationOutline size={50} className="text-indigo-600" />
          <h2>Request</h2>
          <RequestInfo />
        </WhiteCard>
      </div>
    </>
  );
};
