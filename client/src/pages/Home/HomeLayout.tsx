import { Outlet, useNavigate } from "react-router-dom";

const listItems = [
  { id: 1, name: "Web Development", path: "/web-development" },
  { id: 2, name: "Data Science", path: "/data-science" },
  { id: 3, name: "Machine Learning", path: "/machine-learning" },
  { id: 4, name: "Mobile Development", path: "/mobile-development" },
  { id: 5, name: "Game Development", path: "/game-development" },
];

const HomeLayout = () => {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };
  return (
    <div className="flex ">
      <div className="w-[20%] flex shadow-2xl justify-center bg-white h-screen">
        <div className="w-full ">
          <h1 className="font-semibold mt-5 px-3">Choose your field</h1>
          <div className="flex flex-col gap-5 mt-5 w-full">
            <ul className="list-disc flex flex-col divide-y w-full  ">
              {listItems.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleClick(item.path)}
                  className="w-full text-gray-600 hover:text-black text-sm transition-all cursor-pointer list-none p-3  hover:bg-gray-200"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default HomeLayout;
