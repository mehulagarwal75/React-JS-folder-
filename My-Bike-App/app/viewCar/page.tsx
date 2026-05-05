"use client";

import { useState, useEffect } from "react";
import { formCarDataType } from "../utils/type";
import {
  Bike,
  Fuel,
  IndianRupee,
  Trash2,
  Plus,
  Search,
  Gauge,
  ShieldCheck,
  Zap,
  Settings2,
  Package,
  TrendingUp
} from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ViewCars() {
  const [allCars, setAllCars] = useState<formCarDataType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedCars = localStorage.getItem('cars');
    if (storedCars) {
      setAllCars(JSON.parse(storedCars));
    }
  }, []);

  const deleteCar = (id: number) => {
    const deletedCarData = allCars.filter((car) => car.id !== id);
    setAllCars(deletedCarData);
    localStorage.setItem('cars', JSON.stringify(deletedCarData));
    toast.success("Bike removed from garage");
  };

  // Filter bikes based on search
  const filteredBikes = allCars.filter(car => 
    car.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.carBrand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-stone-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <Bike className="w-14 h-14 text-orange-600 drop-shadow-sm" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">BIKE GARAGE</h1>
          <p className="text-gray-500 font-medium">Manage and monitor your fleet of two-wheelers</p>
          <div className="w-16 h-1.5 bg-orange-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard label="Total Inventory" val={allCars.length.toString()} icon={Bike} color="border-orange-600" text="text-orange-600" />
          <StatCard label="Active Brands" val={new Set(allCars.map(c => c.carBrand)).size.toString()} icon={ShieldCheck} color="border-blue-600" text="text-blue-600" />
          <StatCard label="Fuel Types" val={new Set(allCars.map(c => c.carFuel)).size.toString()} icon={Fuel} color="border-purple-600" text="text-purple-600" />
          <StatCard 
            label="Avg Price" 
            val={`₹${allCars.length > 0 ? Math.round(allCars.reduce((acc, curr) => acc + Number(curr.carPrice), 0) / allCars.length / 100000).toFixed(1) : 0}L`} 
            icon={TrendingUp} color="border-emerald-600" text="text-emerald-600" 
          />
        </div>

        {/* Table Actions */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name or brand..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            />
          </div>
          <button 
            onClick={() => router.push('/addCar')}
            className="w-full sm:w-auto bg-gray-900 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg font-bold"
          >
            <Plus className="w-5 h-5" /> Add New Bike
          </button>
        </div>

        {/* Main Table */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  {['Unit', 'Model & Details', 'Model Year', 'Pricing', 'Fuel', 'Brand', 'Actions'].map((h) => (
                    <th key={h} className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredBikes.length > 0 ? (
                  filteredBikes.map((car, index) => (
                    <tr key={car.id} className="hover:bg-orange-50/30 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-400">#00{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Zap className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <div className="text-sm font-black text-gray-900">{car.carName}</div>
                            <div className="text-xs text-gray-500 font-medium capitalize">{car.carColor.join(", ")}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700">{car.carModel}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-emerald-600 font-black">
                          <IndianRupee className="w-3.5 h-3.5" />
                          <span>{Number(car.carPrice).toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-[10px] font-black uppercase tracking-tight">{car.carFuel}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-xs font-bold text-orange-600 uppercase italic">{car.carBrand}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => router.push(`/editCar/${car.id}`)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <Settings2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteCar(car.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-20 text-center">
                       <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                       <p className="text-gray-400 font-bold">No bikes found in your garage.</p>
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

// Helper component for Stat Cards
function StatCard({ label, val, icon: Icon, color, text }: any) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm p-6 border-b-4 ${color} hover:-translate-y-1 transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">{label}</p>
          <p className="text-3xl font-black text-gray-900">{val}</p>
        </div>
        <Icon className={`w-10 h-10 ${text} opacity-20`} />
      </div>
    </div>
  );
}