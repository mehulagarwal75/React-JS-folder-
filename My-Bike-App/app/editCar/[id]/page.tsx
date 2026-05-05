"use client";

import { carColor, carBrand, carFuel, formCarDataType } from "@/app/utils/type";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function editCarPage() {
    const { id } = useParams();
    const router = useRouter();


    const [formCarData, setFormCarData] = useState<formCarDataType>({
        id: 0,
        carName: "",
        carModel: "",
        carPrice: 0,
        carBrand: "",
        carColor: [],
        carFuel: ""
    });

    const [errorForm, setErrorForm] = useState<any>({});

    useEffect(() => {
        const allCars: formCarDataType[] = JSON.parse(localStorage.getItem('cars') || '[]');

        const carData = allCars.find((car) => car.id === Number(id));

        if (carData) {
            setFormCarData(carData);
        }
    }, []);

    const onHandleChange = (event: any) => {

        // console.log(event.target.value); // "Swift"
        // console.log(event.target.name); // carName

        const { name, value } = event.target;


        setFormCarData(carData => ({ ...carData, [name]: (name === 'carPrice') ? Number(value) : value }));
    }

    const onColorChange = (event: any) => {
        const { value, checked } = event.target;

        setFormCarData(carData => ({ ...carData, carColor: (checked) ? [...carData.carColor, value] : carData.carColor.filter((color) => color !== value) }))  // White !== White

    }

    const validation = () => {
        const error: any = {};

        if (!formCarData.carName.trim()) {
            error.carName = "car name is required...";
        }

        if (!formCarData.carModel.trim()) {
            error.carModel = "car model is required...";
        }

        if (!formCarData.carPrice) {
            error.carPrice = "car price is required...";
        } else if (formCarData.carPrice <= 0) {
            error.carPrice = "car price is invalid...";
        }

        if (!formCarData.carBrand.trim()) {
            error.carBrand = "car brand is required...";
        }

        if (formCarData.carColor.length === 0) {
            error.carColor = "car color is required...";
        }

        if (!formCarData.carFuel.trim()) {
            error.carFuel = "car fuel is required...";
        }

        setErrorForm(error);

        return Object.keys(error).length === 0; // false
    }

    const onSubmit = (event: any) => {
        event.preventDefault();

        if (!validation) {
            return;
        }

        // Edit Logic
        console.log(formCarData);

        let allCars: formCarDataType[] = JSON.parse(localStorage.getItem('cars') || '[]');

        allCars = allCars.map((car) => {
            if (car.id === Number(id)) {
                return formCarData;
            }

            return car;
            // 5810 === 5810
        });

        localStorage.setItem('cars', JSON.stringify(allCars));


        toast.success("Car data updated successfully...");

        router.push('/viewCar');


    }

    return <>
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Car Data</h1>
                    <div className="w-24 h-1 bg-yellow-600 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Form */}
                <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                    {/* Car Name */}
                    <div className="space-y-2">
                        <label htmlFor="carName" className="block text-sm font-semibold text-gray-700">
                            Car Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="carName"
                            id="carName"
                            value={formCarData.carName}
                            onChange={onHandleChange}
                            placeholder="e.g., Swift, City, Nexon"
                            className={`w-full px-4 py-3 border ${errorForm.carName ? 'border-red-600' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200`}
                        />
                        {errorForm.carName && <p className="text-red-600 text-sm">{errorForm.carName}</p>}
                    </div>

                    {/* Car Model */}
                    <div className="space-y-2">
                        <label htmlFor="carModel" className="block text-sm font-semibold text-gray-700">
                            Car Model <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="carModel"
                            id="carModel"
                            value={formCarData.carModel}
                            onChange={onHandleChange}
                            placeholder="e.g., ZXI, VXI, Top End"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                        />
                        {errorForm.carModel && <p className="text-red-600 text-sm">{errorForm.carModel}</p>}
                    </div>

                    {/* Car Price */}
                    <div className="space-y-2">
                        <label htmlFor="carPrice" className="block text-sm font-semibold text-gray-700">
                            Car Price (₹) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="carPrice"
                            id="carPrice"
                            value={formCarData.carPrice}
                            onChange={onHandleChange}
                            placeholder="e.g., 500000"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                        />
                        {errorForm.carPrice && <p className="text-red-600 text-sm">{errorForm.carPrice}</p>}
                    </div>

                    {/* Car Brand */}
                    <div className="space-y-2">
                        <label htmlFor="carBrand" className="block text-sm font-semibold text-gray-700">
                            Car Brand <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="carBrand"
                            id="carBrand"
                            value={formCarData.carBrand}
                            onChange={onHandleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white"
                        >
                            <option value="">Select a brand</option>
                            {carBrand.map((brand, index) => {
                                return <option key={index} value={brand}>{brand}</option>
                            })}
                        </select>
                        {errorForm.carBrand && <p className="text-red-600 text-sm">{errorForm.carBrand}</p>}
                    </div>

                    {/* Car Color */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Car Color <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {carColor.map((color, index) => {
                                return (
                                    <label key={index} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200">
                                        <input
                                            type="checkbox"
                                            name="carColor"
                                            value={color}
                                            checked={formCarData.carColor.includes(color)}
                                            onChange={onColorChange}
                                            className="w-4 h-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                                        />
                                        <span className="text-gray-700 text-sm">{color}</span>
                                    </label>
                                )
                            })}
                            {errorForm.carColor && <p className="text-red-600 text-sm">{errorForm.carColor}</p>}
                        </div>
                    </div>

                    {/* Car Fuel */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Fuel Type <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                            {carFuel.map((fuel, index) => {
                                return (
                                    <label key={index} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200">
                                        <input
                                            type="radio"
                                            name="carFuel"
                                            value={fuel}
                                            checked={formCarData.carFuel === fuel}
                                            onChange={onHandleChange}
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="text-gray-700 text-sm">{fuel}</span>
                                    </label>
                                )
                            })}
                        </div>
                        {errorForm.carFuel && <p className="text-red-600 text-sm">{errorForm.carFuel}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-300 shadow-md"
                        >
                            Update Car to Inventory
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
}