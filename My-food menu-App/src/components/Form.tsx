import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import type { menuItemType } from '../utils/global'; // Ensure path is correct

type PropsType = {
  menuItems: menuItemType[];
  setMenuItems: React.Dispatch<React.SetStateAction<menuItemType[]>>;
  editItem?: menuItemType;
  editIndex: number | null;
  setEditIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

const FoodMenuForm = ({ menuItems, setMenuItems, editItem, editIndex, setEditIndex }: PropsType) => {
  // Initial Form State
  const initialFormState = {
    itemName: '',
    price: '',
    category: 'Main Course',
    dietary: 'Vegetarian',
    description: '',
  };

  const [formData, setFormData] = useState<menuItemType>(initialFormState);

  // Jab bhi Edit button click hoga, Form me data auto-fill ho jayega
  useEffect(() => {
    if (editItem && editIndex !== null) {
      setFormData(editItem);
    }
  }, [editItem, editIndex]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDietaryChange = (type: string) => {
    setFormData({ ...formData, dietary: type });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editIndex !== null) {
      // Logic for UPDATING existing item
      const updatedMenu = [...menuItems];
      updatedMenu[editIndex] = formData;
      setMenuItems(updatedMenu);
      setEditIndex(null); // Edit mode reset
      toast.success("Menu item updated successfully! 📝");
    } else {
      // Logic for ADDING new item
      setMenuItems([...menuItems, formData]);
      toast.success("New dish added to menu! 🍲");
    }

    // Form clear kar do submit hone ke baad
    setFormData(initialFormState);
  };

  // Clear button ka alag function taaki edit mode bhi cancel ho sake
  const handleClear = () => {
    setFormData(initialFormState);
    setEditIndex(null);
  }

  // Dietary options configuration for smart styling
  const dietaryOptions = [
    { name: 'Vegetarian', icon: '🟢', activeColor: 'bg-green-50 border-green-500 text-green-700' },
    { name: 'Non-Vegetarian', icon: '🔴', activeColor: 'bg-red-50 border-red-500 text-red-700' },
    { name: 'Vegan', icon: '🌿', activeColor: 'bg-green-50 border-green-500 text-green-700' },
    { name: 'Eggitarian', icon: '🟡', activeColor: 'bg-yellow-50 border-yellow-500 text-yellow-700' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl w-full overflow-hidden border border-gray-100 relative">
      
      {/* Top Gradient Accent Line */}
      <div className="h-2 w-full bg-linear-to-r from-orange-500 to-red-600 absolute top-0 left-0"></div>

      <div className="p-8 md:p-10">
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600 mb-2">
            {editIndex !== null ? 'Update Dish Details' : 'Add New Dish'}
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            {editIndex !== null 
              ? 'Make changes to your existing menu item below.' 
              : 'Enter the delicious details to update your restaurant\'s menu.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Top Row: Name and Price */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Dish Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-400">🍽️</span>
                </div>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  placeholder="e.g. Paneer Butter Masala"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all shadow-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-bold">₹</span>
                </div>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="250"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all shadow-sm"
                  required
                />
              </div>
            </div>
          </div>

          {/* Middle Row: Dietary Preference (Custom Chips) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Dietary Preference</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {dietaryOptions.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => handleDietaryChange(option.name)}
                  className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                    formData.dietary === option.name
                      ? option.activeColor + " shadow-md"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  <span>{option.icon}</span>
                  <span>{option.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Middle Row: Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <div className="relative">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all shadow-sm bg-white appearance-none cursor-pointer"
              >
                <option value="Starter">🥘 Starter</option>
                <option value="Main Course">🍛 Main Course</option>
                <option value="Dessert">🍰 Dessert</option>
                <option value="Beverage">🍹 Beverage</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Row: Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Briefly describe the dish ingredients and taste... (e.g., Creamy tomato gravy with soft cottage cheese cubes)"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all shadow-sm resize-none"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse md:flex-row items-center justify-end md:space-x-4 pt-6 border-t border-gray-100 mt-8 gap-4 md:gap-0">
            <button
              type="button"
              className="w-full md:w-auto px-8 py-3 text-gray-500 font-bold bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors focus:ring-2 focus:ring-gray-300 outline-none"
              onClick={handleClear}
            >
              {editIndex !== null ? 'Cancel Edit' : 'Clear Form'}
            </button>
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-linear-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-red-700 hover:-translate-y-1 focus:ring-4 focus:ring-orange-200 transition-all duration-200 shadow-lg"
            >
              {editIndex !== null ? 'Update Menu Item' : 'Save Menu Item'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default FoodMenuForm;