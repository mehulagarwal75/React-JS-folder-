import React, { useEffect, useState } from "react";

// Types define kar diye for strong typing
export type MenuItemType = {
  itemName: string;
  price: string | number;
  category: string;
  dietary: string;
  description: string;
};

type PropsType = {
  menuItems: MenuItemType[];
  deleteItem: (index: number) => void;
  updateItem: (index: number) => void;
};

export default function FoodMenuTable({
  menuItems = [], // Default empty array to prevent crashes
  deleteItem,
  updateItem,
}: PropsType) {
  const [numberOfCategories, setNumberOfCategories] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    // Unique categories count nikalne ke liye
    const categories = new Set(menuItems.map((item) => item.category));
    setNumberOfCategories(categories.size);
  }, [menuItems]);

  const filterMenu = menuItems.filter((item) => {
    return (
      item.itemName.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.dietary.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      {/* Header Section */}
      <div className="text-center mb-10 mt-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 mb-2">
          Restaurant Menu
        </h1>
        <p className="text-gray-600 text-lg">
          Manage and track all your delicious offerings
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6 transform hover:-translate-y-1 hover:shadow-lg transition duration-300 border-b-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Items</p>
              <p className="text-3xl font-bold text-gray-800">
                {menuItems.length}
              </p>
            </div>
            <div className="bg-orange-100 rounded-full p-3">
              <span className="text-2xl">🍔</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 transform hover:-translate-y-1 hover:shadow-lg transition duration-300 border-b-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Vegetarian</p>
              <p className="text-3xl font-bold text-gray-800">
                {menuItems.filter((item) => item.dietary === "Vegetarian").length}
              </p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
              <span className="text-2xl">🥗</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 transform hover:-translate-y-1 hover:shadow-lg transition duration-300 border-b-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Non-Vegetarian</p>
              <p className="text-3xl font-bold text-gray-800">
                {menuItems.filter((item) => item.dietary === "Non-Vegetarian").length}
              </p>
            </div>
            <div className="bg-red-100 rounded-full p-3">
              <span className="text-2xl">🍗</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 transform hover:-translate-y-1 hover:shadow-lg transition duration-300 border-b-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Categories</p>
              <p className="text-3xl font-bold text-gray-800">{numberOfCategories}</p>
            </div>
            <div className="bg-yellow-100 rounded-full p-3">
              <span className="text-2xl">📋</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md mb-8 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <input
                type="text"
                placeholder="Search by dish name, category, or dietary preference..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium rounded-lg hover:from-orange-600 hover:to-red-600 transition duration-300 shadow-md">
              + Add New Item
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left">
              <thead className="bg-gradient-to-r from-orange-50 to-orange-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
                    No.
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Dish Name
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Dietary
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100">
                {filterMenu.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="hover:bg-orange-50 transition duration-200 group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">
                        {item.itemName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
                        ₹{item.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium border border-gray-200">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full border ${
                            item.dietary === "Vegetarian" || item.dietary === "Vegan"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : item.dietary === "Non-Vegetarian"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : "bg-yellow-50 text-yellow-700 border-yellow-200"
                          }`}
                        >
                          <span className="mr-1">
                            {item.dietary === "Vegetarian" || item.dietary === "Vegan" ? "🟢" : item.dietary === "Non-Vegetarian" ? "🔴" : "🟡"}
                          </span>
                          {item.dietary}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                        <span className="line-clamp-2" title={item.description}>{item.description || "No description provided."}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          {/* Edit Button */}
                          <button
                            onClick={() => updateItem(index)}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"
                            title="Edit Item"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                            </svg>
                          </button>
                          {/* Delete Button */}
                          <button
                            onClick={() => deleteItem(index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                            title="Delete Item"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {/* Empty State */}
                {filterMenu.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-4xl mb-3">🍽️</span>
                        <p className="text-gray-500 text-lg font-medium">No menu items found</p>
                        <p className="text-gray-400 text-sm mt-1">Try adjusting your search or add a new dish.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}