import { useEffect, useState } from "react";
import { fetchAllProducts } from "../Services/ProductService";
import type { productFetchType } from "../utils/global";
import { Link } from "react-router";

export default function HomePage() {
    const [allProducts, setAllProducts] = useState<productFetchType[]>([]);
    const [allCategories, setAllCategories] = useState<string[]>([]);
    const [filterCategory, setFilterCategory] = useState<string>("All");

    useEffect(() => {
        getAllProductData();
    }, []);

    useEffect(() => {

        let allCategory: any = new Set(allProducts.map((product) => product.p_category));

        allCategory = Array.from(allCategory);

        console.log("All Category : ", allCategory);// []

        setAllCategories(["All", ...allCategory]);

    }, [allProducts]);



    const getAllProductData = async () => {
        const allProductData = await fetchAllProducts();
        setAllProducts(allProductData);
    };

    const filterProducts = (filterCategory === "All")
        ? allProducts
        : allProducts.filter((product) => product.p_category === filterCategory);



    return (
        <div className="bg-linear-to-br from-slate-50 via-white to-slate-50 min-h-screen pb-12">
            {/* Hero Section */}
            <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 mb-12">
                <div className="max-w-7xl mx-auto py-16 px-4 text-center">
                    <h1 className="text-5xl font-extrabold text-white tracking-tight sm:text-6xl">
                        Featured <span className="bg-linear-to-r from-amber-200 to-amber-300 bg-clip-text text-transparent">Products</span>
                    </h1>
                    <p className="mt-4 text-lg text-indigo-100 max-w-2xl mx-auto">
                        Discover our handpicked collection of premium items selected just for you.
                    </p>
                </div>
            </div>

            {/* Category Filter Section */}
            <div className="max-w-7xl mx-auto px-4 mb-12">
                <div className="flex flex-wrap gap-3 justify-center">
                    {allCategories.map((category, index) => {
                        const isActive = filterCategory === category;
                        return (
                            <button 
                                key={index} 
                                onClick={() => setFilterCategory(category)}
                                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                                    isActive 
                                        ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-300 ring-2 ring-indigo-300" 
                                        : "bg-white text-slate-700 border-2 border-slate-200 hover:border-indigo-300 hover:shadow-md"
                                }`}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filterProducts.map((product, index) => (
                        <Link key={product.id || index} to={`product-detail/${product.id}`}>
                            <div className="group bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full hover:border-indigo-300 hover:-translate-y-1">
                                {/* Image Container */}
                                <div className="relative aspect-square overflow-hidden bg-linear-to-br from-slate-100 to-slate-200">
                                    <img
                                        src={product.p_image}
                                        alt={product.p_name}
                                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className="bg-white/95 backdrop-blur-md text-indigo-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg border border-indigo-100">
                                            {product.p_category}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Product Info */}
                                <div className="p-5 flex flex-col grow">
                                    <div className="mb-2">
                                        <h2 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                            {product.p_name}
                                        </h2>
                                    </div>

                                    <p className="text-slate-500 text-sm line-clamp-2 mb-4 grow">
                                        {product.p_description}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Price</span>
                                            <span className="text-xl font-black text-indigo-600">₹{Number(product.p_price).toLocaleString()}</span>
                                        </div>

                                        <button className="bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-2.5 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-90 group/btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover/btn:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {filterProducts.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-indigo-100 to-purple-100 text-indigo-400 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <p className="text-slate-600 font-semibold text-lg">No products available</p>
                        <p className="text-slate-400 text-sm mt-1">Try selecting a different category</p>
                    </div>
                )}
            </div>
        </div>
    );
}