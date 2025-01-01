import { SidebarContext } from "./Sidebar";
import { useContext } from "react";
import { NavLink } from "react-router";

const SidebarItem = ({ icon, text, active, isExpanded, to }) => {
  const context = useContext(SidebarContext);
  return (
    <NavLink
      className={(props) => {
        return `flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer ${
          props.isActive ? "bg-primary text-white" : "text-gray-600"
        }`;
      }}
      to={to}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          context ? "w-44 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
    </NavLink>
  );
};
export default SidebarItem;
