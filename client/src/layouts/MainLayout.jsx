import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="flex">
        <Sidebar />
        <div className="w-full mt-12 pt-4 px-4 bg-[#F4F4F4]">
          <Outlet />
        </div>
      </main>
    </>
  );
};
export default MainLayout;
