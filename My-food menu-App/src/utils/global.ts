// Global Variable for Food Menu
export type menuItemType = {
  itemName: string;
  price: string | number; // Number ya string dono le lega
  category: string;
  dietary: string;
  description: string;
  emoji?: string; // Optional rakha hai aage ke liye
};