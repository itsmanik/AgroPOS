import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="flex">
        <Sidebar />
        <div className="w-full mt-12 p-4">
          <Outlet />
        </div>
      </main>
    </>
  );
};
export default MainLayout;
