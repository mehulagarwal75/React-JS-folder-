import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { fetchCart } from "../Services/ProductService";

export default function Header() {
    const [cartCount, setCartCount] = useState(0);

    const loadCartData = async () => {
        try {
            const items = await fetchCart();
            const count = items.reduce((sum: number, item: any) => sum + item.quantity, 0); 
            setCartCount(count);
        } catch (error) {
            console.error("Failed to fetch cart", error);
        }
    };

    useEffect(() => {
        loadCartData();
        window.addEventListener("cartUpdated", loadCartData);
        return () => window.removeEventListener("cartUpdated", loadCartData);
    }, []);

    return <>
        {/* Navbar */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo Section */}
                    <div className="flex items-center gap-8">
                        <NavLink to="/" className="flex items-center gap-3 group">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-300 group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                                <span className="text-white font-black text-xl italic">S</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
                                Stockly
                            </span>
                        </NavLink>

                        {/* Navigation NavLinks */}
                        <ul className="flex items-center gap-2">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) => `rounded-lg px-4 py-2 text-sm font-semibold transition-all ${isActive ? "text-indigo-600 bg-indigo-50 ring-1 ring-indigo-200" : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"}`}
                                >
                                    🏠 Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/view-product"
                                    className={({ isActive }) => `rounded-lg px-4 py-2 text-sm font-semibold transition-all ${isActive ? "text-indigo-600 bg-indigo-50 ring-1 ring-indigo-200" : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"}`}
                                >
                                    📦 Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/cart"
                                    className={({ isActive }) => `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${isActive ? "text-indigo-600 bg-indigo-50 ring-1 ring-indigo-200" : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"}`}
                                >
                                    🛒 Cart
                                    {cartCount > 0 && (
                                        <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">{cartCount}</span>
                                    )}
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center">
                        <NavLink
                            to="/add-product"
                            className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-300 hover:ring-4 hover:ring-indigo-200 transition-all active:scale-95 group"
                        >
                            <svg className="h-4 w-4 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Add Product</span>
                        </NavLink>
                    </div>

                </div>
            </nav>
        </header>
    </>
}