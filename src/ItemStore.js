import { observable, action, computed } from "mobx";
import { classPrivateMethod } from "@babel/types";

export default class ItemStore {
    @observable CartItems = [];

    constructor() {
        let cartItems = localStorage.getItem('cart_items');
        if (cartItems == null || cartItems.length < 1) {
            cartItems = [];
        } else {
            cartItems = JSON.parse(cartItems);
        }
        this.cartItems = cartItems;
        let priceTotal = 0;
    }

    @action
    addItemToCart(items) {
        let isAdded = false;
        for (let cartItem of this.cartItems) {
            if (cartItem.items.id === items.id) {
                cartItem.count++;
                isAdded = true;
                break;
            }
        }
        if (!isAdded) {
            this.cartItems.push({
                items: items,
                count: 1
            })
        }
        this.saveCartItems();
    }

    @computed
    get cartItemsCount() {
        return this.cartItem.length;
    }

    @action
    clearCartItems() {
        this.cartItems = [];
        this.saveCartItems();
    }

    saveCartItems() {
        localStorage.setItem('cart_items', JSON.stringify(this.cartItems))
    }
}

