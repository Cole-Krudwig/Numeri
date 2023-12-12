import { useState } from "react";

// list of renders
const Menu = [
  {
    id: 1,
    title: "tab 1",
    content: "This is tab 1 content",
    color: "text-pink-600",
  },
  {
    id: 2,
    title: "tab 2",
    content: "This is tab 2 content",
    color: "text-red-600",
  },
  {
    id: 3,
    title: "tab 3",
    content: "This is tab 3 content",
    color: "text-blue-600",
  },
  {
    id: 4,
    title: "tab 4",
    content: "This is tab 4 content",
    color: "text-green-600",
  },
];

export default function Navbar() {
  const [activeindex, setActiveIndex] = useState(1);
  const handleClick = (index: number) => setActiveIndex(index);
  const checkActive = (index: number, className: string) =>
    activeindex === index ? className : "";

  return (
    <>
      <div>
        <div className="bg-indigo-400 flex space-x-8 rounded-lg px-4 py-2">
          {Menu.map((item) => (
            <button
              key={item.id}
              className={`${checkActive(
                item.id,
                "text-blue-600 border-b-2 border-white"
              )}`}
              onClick={() => handleClick(item.id)}
            >
              {item.title}
            </button>
          ))}
        </div>
        <div className="w-full bg-green-200">
          {Menu.map((item) => (
            <div
              key={item.id}
              className={`${item.color} panel ${checkActive(
                item.id,
                "active"
              )}`}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
