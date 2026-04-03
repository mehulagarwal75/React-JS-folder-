import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toast CSS zaroori hai
import Form from "./components/Form";
import Table from "./components/Table";
import { useState, useEffect } from "react";
import type { menuItemType } from "./utils/global";

export default function App() {
  // 1. Initial State from LocalStorage (students ki jagah menuItems kar diya)
  const [menuItems, setMenuItems] = useState<menuItemType[]>(
    JSON.parse(localStorage.getItem("menuItems") || "[]")
  );

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<menuItemType>();

  // 2. UseEffect me dependency [menuItems] daal di, taaki har change pe save ho
  useEffect(() => {
    console.log("Updated Menu Items : ", menuItems);
    localStorage.setItem("menuItems", JSON.stringify(menuItems));
  }, [menuItems]); 

  // 3. Delete Logic
  const deleteItem = (index: number) => {
    setMenuItems((prevItems) => prevItems.filter((_, i) => i !== index));
    toast.error("Dish removed from menu! 🗑️", { theme: "colored" });
  };

  // 4. Update Logic
  const updateItem = (index: number) => {
    setEditIndex(index);
    setEditItem(menuItems[index]);
    // Smoothly scroll to top jab koi edit dabaye
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Background theme change to match food vibe */}
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        {/* max-w-7xl kiya taaki table ko pura space mile */}
        <div className="max-w-7xl mx-auto space-y-12">
          
          <Form
            menuItems={menuItems}
            setMenuItems={setMenuItems}
            editItem={editItem}
            editIndex={editIndex}
            setEditIndex={setEditIndex}
          />

          <Table
            menuItems={menuItems}
            deleteItem={deleteItem}
            updateItem={updateItem}
          />

        </div>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </>
  );
}