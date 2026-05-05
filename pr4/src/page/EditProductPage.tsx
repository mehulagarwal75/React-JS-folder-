import { useEffect, useState } from "react";
import { type productFetchType } from "../utils/global";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { fetchSingleProduct, updateProduct } from "../Services/ProductService";

export default function EditProductPage() {

    const { productId } = useParams();
    const navigate = useNavigate();


    const [productData, setProductData] = useState<productFetchType>({
        id: "",
        p_name: "",
        p_price: 0,
        p_stock: 0,
        p_image: "abc",
        p_category: "",
        p_description: "",
    });

    const productCategory = ["Electronic", "Home & Living", "Sports", "Fashion"];

    // Shared Tailwind classes for consistent styling
    const labelClasses = "block text-sm font-semibold text-slate-700 mb-1.5";
    const inputClasses = "w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-400";

    useEffect(() => {
        if (productId) {
            getSingleProductData();
        }
    }, [productId]);

    async function getSingleProductData() {
        const data = await fetchSingleProduct(productId || "");

        setProductData(data);
    }

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

        // update product

        const status = await updateProduct(productData);

        if (status) {
            navigate('/view-product');
        }

    }
    return (
        <div className="max-w-3xl mx-auto">
            {/* Page Header */}
            <div className="mb-10 pb-8 border-b border-slate-200">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
                    ✏️ Update Product
                </h1>
                <p className="mt-3 text-lg text-slate-500">
                    Modify the product details to keep your inventory up to date.
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
                        value={productData.p_name}
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
                            value={productData.p_price}
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
                            value={productData.p_stock}
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
                            value={productData.p_image}
                            onChange={onHandleChange}
                            placeholder="https://images.com/product.jpg"
                            className={`${inputClasses} group-focus-within:ring-indigo-500/20 mb-3`}
                        />
                        {productData.p_image && (
                            <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-50 p-2">
                                <img 
                                    src={productData.p_image} 
                                    width={100} 
                                    alt="product preview"
                                    className="h-24 w-24 object-cover rounded"
                                />
                            </div>
                        )}
                    </div>
                    <div className="group">
                        <label className={`${labelClasses} group-focus-within:text-indigo-600`}>Product Category</label>
                        <div className="relative">
                            <select 
                                name="p_category" 
                                value={productData.p_category} 
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
                        value={productData.p_description}
                        onChange={onHandleChange}
                        placeholder="Describe the product's features, benefits, and specifications..."
                        className={`${inputClasses} resize-none group-focus-within:ring-indigo-500/20`}
                    ></textarea>
                    <p className="text-xs text-slate-400 mt-2">Keep descriptions detailed for better customer understanding.</p>
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
                        className="px-8 py-3 text-sm font-bold text-white bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-xl shadow-lg shadow-amber-300 transition-all active:scale-95 flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                        Update Product
                    </button>
                </div>
            </form>
        </div>
    );
}