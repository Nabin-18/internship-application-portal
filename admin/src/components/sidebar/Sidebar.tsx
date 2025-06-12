import { Link, useLocation } from "react-router-dom";
import { Pencil, LayoutDashboard } from "lucide-react";

const listItems = [
  { name: "Create Post", url: "create-post", icon: Pencil },
  { name: "Dashboard", url: "dashboard", icon: LayoutDashboard },
  {
    name:"Client Data" ,url:"client-data", icon: LayoutDashboard
  }
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="flex w-full flex-col space-y-2 mt-4 ">
      {listItems.map((item, key) => {
        const isActive = location.pathname.includes(item.url);
        const Icon = item.icon;

        return (
          <Link to={item.url} key={key}>
            <div
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-[2px] transition-all duration-200 cursor-pointer 
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-800 hover:bg-blue-100 hover:text-blue-700"
                }`}
            >
              <Icon className="w-5 h-5" />
              <p className="text-base font-medium">{item.name}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
