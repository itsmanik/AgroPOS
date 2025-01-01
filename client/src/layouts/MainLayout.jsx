import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar/Sidebar";

const MainLayout = () => {
  return (
    <main className="flex">
      <Sidebar />
      <Outlet />
    </main>
  );
};
export default MainLayout;
