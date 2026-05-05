import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { 
  FaMinus, FaPlus, FaTrashAlt, FaArrowRight, 
  FaReceipt, FaShoppingCart, FaArrowLeft, 
  FaTag, FaTruck, FaShieldAlt, FaHeart 
} from "react-icons/fa";
import { fetchCart, updateCartItem, removeFromCart } from "../Services/ProductService";
import { toast } from "react-toastify";
import type { productFetchType } from "../utils/global";

interface CartItemType extends productFetchType {
    quantity: number;
}

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => { 
        fetchCart().then(data => {
            setCartItems(data);
            setLoading(false);
        }); 
    }, []);

    const subtotal = cartItems.reduce((sum, i) => sum + i.p_price * i.quantity, 0);
    const shipping = subtotal > 500 ? 0 : 40;
    const tax = subtotal * 0.05;
    const total = subtotal + shipping + tax;

    const handleQty = async (item: CartItemType, delta: number) => {
        const newQty = item.quantity + delta;
        if (newQty < 1) return;
        const status = await updateCartItem({ ...item, quantity: newQty });
        if (status) setCartItems(prev => prev.map(i => i.id === item.id ? { ...i, quantity: newQty } : i));
    };

    const handleRemove = async (id: string | undefined) => {
        if (!id) return;
        const status = await removeFromCart(id || "");
        if (status) {
            setCartItems(prev => prev.filter(i => i.id !== id));
            toast.success("Item removed");
        }
    };

    const handleCheckout = async () => {
        if (cartItems.length === 0) return;
        await Promise.all(cartItems.map(item => removeFromCart(item.id || "")));
        setCartItems([]);
        toast.success("Order Placed Successfully! Your cart is now empty.");
        navigate("/");
    };

    const handleClearCart = async () => {
        if (cartItems.length === 0) return;
        await Promise.all(cartItems.map(item => removeFromCart(item.id || "")));
        setCartItems([]);
        toast.info("Cart has been cleared");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-20 h-20 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-amber-800 font-medium">Loading your cart...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 pt-28 pb-16 px-4 font-['Inter',system-ui]">
            <div className="max-w-7xl mx-auto">
                {cartItems.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="relative inline-block mb-8">
                            <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-2xl">
                                <FaShoppingCart className="text-7xl text-amber-400" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                0
                            </div>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-800 mb-3">Your cart feels lonely</h2>
                        <p className="text-gray-500 mb-8 text-lg">Looks like you haven't added anything to your cart yet</p>
                        <button 
                            onClick={() => navigate("/")} 
                            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-12 py-4 rounded-full font-bold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-3 mx-auto text-lg"
                        >
                            <FaArrowLeft /> Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left Column - Cart Items */}
                        <div className="lg:col-span-7 space-y-4">
                            {/* Header */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 mb-6">
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
                                        <p className="text-gray-500 text-sm mt-1">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</p>
                                    </div>
                                    <button 
                                        onClick={handleClearCart}
                                        className="text-rose-500 hover:text-rose-700 text-sm font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-rose-50 transition"
                                    >
                                        <FaTrashAlt className="text-xs" /> Clear All
                                    </button>
                                </div>
                            </div>

                            {/* Cart Items */}
                            {cartItems.map((item, idx) => (
                                <div 
                                    key={item.id} 
                                    className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border border-amber-100 hover:border-amber-200"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    <div className="flex flex-col sm:flex-row gap-5">
                                        {/* Product Image */}
                                        <div className="sm:w-28 h-28 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl flex items-center justify-center p-3">
                                            <img 
                                                src={item.p_image} 
                                                className="w-full h-full object-contain" 
                                                alt={item.p_name}
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = 'https://images.pexels.com/photos/5390584/pexels-photo-5390584.jpeg';
                                                }}
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1">
                                            <div className="flex flex-wrap justify-between gap-3">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                                                            {item.p_category}
                                                        </span>
                                                        <button className="text-gray-300 hover:text-rose-400 transition">
                                                            <FaHeart className="text-xs" />
                                                        </button>
                                                    </div>
                                                    <h3 className="text-lg font-bold text-gray-800 mb-1">{item.p_name}</h3>
                                                    <p className="text-2xl font-bold text-amber-600">
                                                        ₹{item.p_price}
                                                        <span className="text-sm text-gray-400 font-normal ml-1">/unit</span>
                                                    </p>
                                                </div>
                                                
                                                <div className="text-right">
                                                    <p className="text-xl font-bold text-gray-800">
                                                        ₹{item.p_price * item.quantity}
                                                    </p>
                                                    <p className="text-xs text-green-600 mt-1">
                                                        {item.p_price * item.quantity >= 500 ? '✓ Free shipping eligible' : `+ ₹${shipping} shipping`}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <button 
                                                        onClick={() => handleQty(item, -1)} 
                                                        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-600 transition"
                                                    >
                                                        <FaMinus className="text-xs" />
                                                    </button>
                                                    <span className="w-8 text-center font-semibold text-gray-700">{item.quantity}</span>
                                                    <button 
                                                        onClick={() => handleQty(item, 1)} 
                                                        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-600 transition"
                                                    >
                                                        <FaPlus className="text-xs" />
                                                    </button>
                                                </div>
                                                <button 
                                                    onClick={() => handleRemove(item.id)} 
                                                    className="text-gray-400 hover:text-rose-500 transition text-sm flex items-center gap-1"
                                                >
                                                    <FaTrashAlt className="text-xs" /> Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Continue Shopping */}
                            <div className="pt-4">
                                <button 
                                    onClick={() => navigate("/")}
                                    className="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-2 transition"
                                >
                                    ← Continue Shopping
                                </button>
                            </div>
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="lg:col-span-5">
                            <div className="sticky top-28">
                                {/* Promo Code */}
                                <div className="bg-white rounded-2xl p-5 shadow-sm border border-amber-100 mb-5">
                                    <div className="flex gap-3">
                                        <input 
                                            type="text" 
                                            placeholder="Promo code" 
                                            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 focus:outline-none text-sm"
                                        />
                                        <button className="px-6 py-3 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-700 transition text-sm">
                                            Apply
                                        </button>
                                    </div>
                                </div>

                                {/* Order Summary Card */}
                                <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
                                    <div className="p-6 border-b border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                                                <FaReceipt className="text-amber-600" />
                                            </div>
                                            <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
                                        </div>
                                    </div>

                                    <div className="p-6 space-y-4">
                                        {/* Items List */}
                                        <div className="space-y-3 max-h-64 overflow-y-auto">
                                            {cartItems.map(item => (
                                                <div key={item.id} className="flex justify-between text-sm">
                                                    <span className="text-gray-600">
                                                        {item.p_name} <span className="text-gray-400">x{item.quantity}</span>
                                                    </span>
                                                    <span className="font-medium text-gray-800">₹{item.p_price * item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Pricing Details */}
                                        <div className="space-y-3 pt-4 border-t border-gray-100">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Subtotal</span>
                                                <span className="text-gray-700">₹{subtotal}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500 flex items-center gap-1">
                                                    <FaTruck className="text-xs" /> Shipping
                                                </span>
                                                <span className={shipping === 0 ? "text-green-600 font-medium" : "text-gray-700"}>
                                                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500 flex items-center gap-1">
                                                    <FaTag className="text-xs" /> Tax (5%)
                                                </span>
                                                <span className="text-gray-700">₹{tax.toFixed(0)}</span>
                                            </div>
                                        </div>

                                        {/* Total */}
                                        <div className="pt-4 border-t-2 border-gray-100">
                                            <div className="flex justify-between items-baseline">
                                                <span className="text-gray-800 font-semibold">Total Amount</span>
                                                <span className="text-3xl font-bold text-amber-600">₹{total.toFixed(0)}</span>
                                            </div>
                                            <p className="text-xs text-gray-400 mt-2">
                                                Inclusive of all taxes and charges
                                            </p>
                                        </div>

                                        {/* Checkout Button */}
                                        <button 
                                            onClick={handleCheckout}
                                            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-bold hover:from-amber-600 hover:to-orange-600 transition-all transform hover:scale-[1.02] shadow-md flex items-center justify-center gap-3 mt-4"
                                        >
                                            Proceed to Checkout <FaArrowRight />
                                        </button>

                                        {/* Trust Badges */}
                                        <div className="flex items-center justify-center gap-4 pt-4 text-xs text-gray-400">
                                            <div className="flex items-center gap-1">
                                                <FaShieldAlt className="text-green-500" /> Secure Payment
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FaTruck className="text-blue-500" /> Free Delivery
                                            </div>
                                            <div className="flex items-center gap-1">
                                                7-Day Returns
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Savings Tip */}
                                {subtotal < 500 && subtotal > 0 && (
                                    <div className="mt-5 bg-amber-50 rounded-xl p-4 border border-amber-200">
                                        <p className="text-sm text-amber-800">
                                            💡 Add ₹{500 - subtotal} more to qualify for FREE shipping!
                                        </p>
                                        <div className="mt-2 h-1.5 bg-amber-200 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-amber-500 rounded-full transition-all"
                                                style={{ width: `${(subtotal / 500) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}