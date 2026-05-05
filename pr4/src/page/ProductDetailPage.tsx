import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { fetchSingleProduct, addToCart } from "../Services/ProductService";
import { toast } from "react-toastify";
import type { productFetchType } from "../utils/global";
import { BiCartAdd } from "react-icons/bi";

export default function ProductDetailPage() {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [productData, setProductData] = useState<productFetchType | null>(null);

    useEffect(() => {
        if (productId) {
            getSingleProduct();
        }
    }, [productId]); // Added dependency array to stop infinite loops

    const getSingleProduct = async () => {
        const data = await fetchSingleProduct(productId || "");
        setProductData(data);
    };

    if (!productData) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
            {/* Navigation & Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="mb-8 flex items-center text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Products
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* Left Column: Image Gallery View */}
                <div className="relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/50 group">
                    <img
                        src={productData.p_image}
                        alt={productData.p_name}
                        className="w-full h-auto object-cover min-h-400px max-h-600px group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="bg-linear-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                            {productData.p_category}
                        </span>
                    </div>
                </div>

                {/* Right Column: Product Info */}
                <div className="flex flex-col space-y-8">
                    <div className="border-b border-slate-100 pb-8">
                        <h1 className="text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                            {productData.p_name}
                        </h1>
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Price</p>
                                <span className="text-4xl font-black text-indigo-600">
                                    ₹{Number(productData.p_price).toLocaleString()}
                                </span>
                            </div>
                            <span className={`px-4 py-2 rounded-xl text-sm font-bold ${productData.p_stock > 0 ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-red-100 text-red-700 border border-red-200'
                                }`}>
                                {productData.p_stock > 0 ? `✓ In Stock (${productData.p_stock} units)` : '✕ Out of Stock'}
                            </span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            About this product
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            {productData.p_description}
                        </p>
                    </div>

                    {/* Action Area */}
                    <div className="pt-8 space-y-4 border-t border-slate-100">
                        <div className="flex gap-4">
                            <button
                                onClick={async () => {
                                    const ok = await addToCart({ ...productData, quantity: 1 });
                                    if (ok) toast.success("Added to cart!");
                                    else toast.error("Failed to add to cart");
                                }}
                                className="flex-1 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-300 transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 text-lg"
                            >
                                <BiCartAdd className="h-6 w-6" />
                                Add to Cart
                            </button>
                            <button className="p-4 bg-slate-50 border-2 border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 rounded-2xl transition-all hover:scale-110 active:scale-95">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>

                        <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100">
                            <p className="text-sm text-indigo-700 font-medium flex items-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
                                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0015.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"></path>
                                </svg>
                                Free shipping on orders over ₹1,000 • 100% Genuine Products
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}