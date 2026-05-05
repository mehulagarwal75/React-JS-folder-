import { useEffect, useState } from "react";
import type { productFetchType } from "../utils/global";
import { deleteProduct, fetchAllProducts } from "../Services/ProductService";
import { useNavigate } from "react-router";

export default function ViewProductPage() {
    const [allProducts, setAllProduct] = useState<productFetchType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemPerPage, setItemPerPage] = useState(10);

    const navigate = useNavigate();

    const totalItems = allProducts.length; // totalItems = 51
    const totalPages = Math.ceil(totalItems / itemPerPage); // totalPages = 51 / 10 = 5.1 = 6

    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;


    console.log("Total Item : ", totalItems);
    console.log("Total Pages : ", totalPages);
    console.log("Start Index : ", startIndex); // 0
    console.log("End Index : ", endIndex); // 10

    const currentProducts = allProducts.slice(startIndex, endIndex);

    console.log("Current Products : ", currentProducts);
    console.log("Total : ", [...Array(totalPages)]); // []



    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        const allProductData = await fetchAllProducts();
        setAllProduct(allProductData);
    };

    return (
        <div className="container mx-auto py-8">
            {/* Page Heading */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 pb-6 border-b border-slate-200">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900">Product Inventory</h1>
                    <p className="text-slate-500 text-sm mt-2">Manage your catalog and stock levels efficiently</p>
                </div>
                <div className="bg-linear-to-r from-indigo-50 to-purple-50 px-6 py-3 rounded-xl border border-indigo-200 shadow-sm">
                    <span className="text-slate-600 text-sm font-medium">Total Products: </span>
                    <span className="font-bold text-indigo-600 text-lg">{currentProducts.length} of {totalItems}</span>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden mb-8">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-linear-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-600">No.</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-600">Product</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-600">Category</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-600">Price</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-600">Stock</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-600">Description</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-600 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {currentProducts.length > 0 ? (
                                currentProducts.map((product, index) => (
                                    <tr key={product.id || index} className="hover:bg-indigo-50/50 transition-colors group">
                                        <td className="px-6 py-4 text-sm font-medium text-slate-400">
                                            {startIndex + index + 1}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={product.p_image}
                                                    alt={product.p_name}
                                                    className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-200 group-hover:shadow-md transition-shadow"
                                                />
                                                <span className="font-semibold text-slate-800">{product.p_name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-linear-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-200">
                                                {product.p_category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-indigo-600">
                                            ₹{Number(product.p_price).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${product.p_stock < 10 ? 'bg-red-50 text-red-600' : product.p_stock < 20 ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                                {product.p_stock} units
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-slate-500 max-w-200px truncate" title={product.p_description}>
                                                {product.p_description}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center items-center gap-2">
                                                <button onClick={() => navigate(`/edit-product/${product.id}`)} className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-all hover:scale-110" title="Edit">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
                                                    </svg>
                                                </button>
                                                <button onClick={() => deleteProduct(product.id)} className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-all hover:scale-110" title="Delete">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center">
                                        <div className="inline-flex flex-col items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                            <p className="text-slate-500 font-medium text-lg">No products found</p>
                                            <p className="text-slate-400 text-sm">Add a new product to get started</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white rounded-xl p-6 border border-slate-100">
                {/* Items Per Page Selector */}
                <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-slate-600">Show:</label>
                    <select 
                        onChange={(event) => {
                            setItemPerPage(Number(event.target.value));
                            setCurrentPage(1);
                        }}
                        className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 font-semibold hover:border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                    >
                        <option value={10}>10 per page</option>
                        <option value={20}>20 per page</option>
                        <option value={50}>50 per page</option>
                        <option value={100}>100 per page</option>
                    </select>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${currentPage === 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-100 text-slate-700 hover:bg-indigo-600 hover:text-white'}`}
                    >
                        ← Prev
                    </button>
                    
                    <div className="flex gap-1">
                        {[...Array(totalPages)].map((_, index) => (
                            <button 
                                key={index + 1}
                                onClick={() => setCurrentPage(index + 1)} 
                                className={`px-3 py-2 rounded-lg font-semibold transition-all ${currentPage === index + 1 ? 'bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    
                    <button 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${currentPage === totalPages ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-100 text-slate-700 hover:bg-indigo-600 hover:text-white'}`}
                    >
                        Next →
                    </button>
                </div>

                {/* Page Info */}
                <div className="text-sm text-slate-600 font-medium">
                    Page <span className="font-bold text-indigo-600">{currentPage}</span> of <span className="font-bold text-indigo-600">{totalPages}</span>
                </div>
            </div>
        </div>
    );
}