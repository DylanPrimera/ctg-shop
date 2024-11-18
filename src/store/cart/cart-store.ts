import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  // cartQuantity: number;
  cartItems: CartProduct[];
  getTotalItems: () => number;
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, value: number) => void;
  removeProductFromCart: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cartItems: [],
      getTotalItems: () => {
        const { cartItems } = get();
        return cartItems.reduce(
          (prevQuantity, item) => prevQuantity + item.quantity,
          0
        );
      },
      addProductToCart: (product: CartProduct) => {
        const { cartItems } = get();
        // check if the product is already in the cart whit selected size
        const productInCart = cartItems.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cartItems: [...cartItems, product] }); // set product in cart
          return;
        }

        // if the product is already in the cart, just update the quantity
        const updatedCartProducts = cartItems.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });

        set({ cartItems: updatedCartProducts });
      },
      updateProductQuantity: (product: CartProduct, value: number) => {
        const { cartItems } = get();

        // if the product is already in the cart, just update the quantity
        const updatedCartProducts = cartItems.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + value };
          }
          return item;
        });

        set({ cartItems: updatedCartProducts });
      },
      removeProductFromCart: (product: CartProduct) => {
        const { cartItems } = get();
        const updatedProducts = cartItems.filter(
          (item) => item.id !== product.id && item.size !== product.size
        );
        set({ cartItems: updatedProducts });
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
