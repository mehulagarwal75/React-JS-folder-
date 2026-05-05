import type { productFetchType, productType } from "../utils/global";

const productURL = "http://localhost:3000/product/";
const cartURL = "http://localhost:3000/cart/";

export const addProduct = async (body: productType) => {
    const res = await fetch(productURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    return res.ok;
}

export const fetchAllProducts = async () => {
    const res = await fetch(productURL);
    const allProductData = await res.json();

    return allProductData;
}

export const deleteProduct = async (id: string) => {

    const res = await fetch(productURL + id, {
        method: "DELETE"
    });

    return res.ok;
}

export const fetchSingleProduct = async (id: string) => {
    const res = await fetch(productURL + id, { method: "GET" });

    const singleProduct = await res.json();

    return singleProduct;

}

export const updateProduct = async (body: productFetchType) => {
    const res = await fetch(productURL + body.id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    return res.ok;
}

// Cart Functions
export const fetchCart = async () => {
    try {
        const res = await fetch(cartURL, { method: "GET" });
        if (!res.ok) return [];
        const cartItems = await res.json();
        return Array.isArray(cartItems) ? cartItems : [];
    } catch (error) {
        return [];
    }
}

export const addToCart = async (body: any) => {
    try {
        if (!body.id) return false;

        // Check item by productId to avoid clashing with unique cart IDs
        const checkRes = await fetch(`${cartURL}?productId=${body.id}`);
        if (checkRes.ok) {
            const existingItems = await checkRes.json();
            if (existingItems.length > 0) {
                const existingItem = existingItems[0];
                const updateRes = await fetch(cartURL + existingItem.id, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ quantity: existingItem.quantity + body.quantity })
                });
                window.dispatchEvent(new Event("cartUpdated")); // Update UI globally
                return updateRes.ok;
            }
        }

        // Assign a distinct Cart ID while saving the original product's ID safely
        const newCartItem = {
            ...body,
            productId: body.id,
            id: Date.now().toString() // Unique ID for the cart item
        };

        const res = await fetch(cartURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCartItem)
        });
        window.dispatchEvent(new Event("cartUpdated")); // Update UI globally
        return res.ok;
    } catch (error) {
        console.error("Cart Request Failed: ", error);
        return false;
    }
}

export const updateCartItem = async (body: any) => {
    try {
        const res = await fetch(cartURL + body.id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        window.dispatchEvent(new Event("cartUpdated"));
        return res.ok;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const removeFromCart = async (id: string) => {
    try {
        const res = await fetch(cartURL + id, {
            method: "DELETE"
        });
        window.dispatchEvent(new Event("cartUpdated"));
        return res.ok;
    } catch (error) {
        console.error(error);
        return false;
    }
}