import { useState } from "react";
import type { productType } from "../utils/global";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { addProduct } from "../Services/ProductService";

export default function AddProductPage() {

    const navigate = useNavigate();

    const [productData, setProductData] = useState<productType>({
        p_name: "",
        p_price: 0,
        p_stock: 0,
        p_image: "",
        p_category: "",
        p_description: "",
    });

    const productCategory = ["Electronic", "Home & Living", "Sports", "Fashion", "Books"];

    // Shared Tailwind classes for consistent styling
    const labelClasses = "block text-sm font-semibold text-slate-700 mb-1.5";
    const inputClasses = "w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-400";

    const onHandleChange = (event: any) => {
        const { name, value } = event.target;

        setProductData(prev => ({ ...prev, [name]: (name === 'p_price' || name === 'p_stock') ? Number(value) : value }));
    }

    const onHandleSubmit = async (event: any) => {
        event.preventDefault();

        if (!productData.p_name || productData.p_price === 0 || productData.p_stock === 0 || !productData.p_image || !productData.p_category || !productData.p_description) {
            toast.error("All filds are required..");
            return;
        }

        console.log("Product Data : ", productData);

        // add product
        const status = await addProduct(productData);

        if (status) {
            navigate('/view-product');
        }

    }
    return (
        <div className="max-w-3xl mx-auto">
            {/* Page Header */}
            <div className="mb-10 pb-8 border-b border-slate-200">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
                    ➕ Add New Product
                </h1>
                <p className="mt-3 text-lg text-slate-500">
                    Fill in the details below to list a new item in your inventory.
                </p>
            </div>

            {/* Form Card */}
            <form className="space-y-7" onSubmit={onHandleSubmit}>
                {/* Row 1: Product Name */}
                <div className="group">
                    <label className={`${labelClasses} group-focus-within:text-indigo-600`}>Product Name</label>
                    <input
                        type="text"
                        name="p_name"
                        onChange={onHandleChange}
                        placeholder="e.g. Wireless Noise Cancelling Headphones"
                        className={`${inputClasses} group-focus-within:ring-indigo-500/20`}
                    />
                </div>

                {/* Row 2: Price & Stock (Grid) */}
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                    <div className="group">
                        <label className={`${labelClasses} group-focus-within:text-indigo-600`}>Product Price (₹)</label>
                        <input
                            type="number"
                            name="p_price"
                            onChange={onHandleChange}
                            placeholder="999"
                            className={`${inputClasses} group-focus-within:ring-indigo-500/20`}
                        />
                    </div>
                    <div className="group">
                        <label className={`${labelClasses} group-focus-within:text-indigo-600`}>Stock Quantity</label>
                        <input
                            type="number"
                            name="p_stock"
                            onChange={onHandleChange}
                            placeholder="50"
                            className={`${inputClasses} group-focus-within:ring-indigo-500/20`}
                        />
                    </div>
                </div>

                {/* Row 3: Image Link & Category (Grid) */}
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                    <div className="group">
                        <label className={`${labelClasses} group-focus-within:text-indigo-600`}>Product Image URL</label>
                        <input
                            type="text"
                            name="p_image"
                            onChange={onHandleChange}
                            placeholder="https://images.com/product.jpg"
                            className={`${inputClasses} group-focus-within:ring-indigo-500/20`}
                        />
                    </div>
                    <div className="group">
                        <label className={`${labelClasses} group-focus-within:text-indigo-600`}>Product Category</label>
                        <div className="relative">
                            <select 
                                name="p_category" 
                                onChange={onHandleChange} 
                                className={`${inputClasses} appearance-none cursor-pointer group-focus-within:ring-indigo-500/20`}
                            >
                                <option value="">Select a category</option>
                                {productCategory.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Row 4: Description */}
                <div className="group">
                    <label className={`${labelClasses} group-focus-within:text-indigo-600`}>Product Description</label>
                    <textarea
                        name="p_description"
                        rows={5}
                        onChange={onHandleChange}
                        placeholder="Describe the product's features, benefits, and specifications..."
                        className={`${inputClasses} resize-none group-focus-within:ring-indigo-500/20`}
                    ></textarea>
                    <p className="text-xs text-slate-400 mt-2">Provide detailed information to help customers understand your product better.</p>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-4 pt-8 border-t border-slate-100">
                    <button
                        type="button"
                        className="px-6 py-3 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-8 py-3 text-sm font-bold text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-lg shadow-indigo-300 transition-all active:scale-95 flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create Product
                    </button>
                </div>
            </form>
        </div>
    );
}