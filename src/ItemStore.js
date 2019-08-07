import { observable, action, computed } from "mobx";

export default class ItemStore {
    @observable cartItems = [];

    constructor(rootStore) {
        let cartItems = localStorage.getItem('cart_items');
        if (cartItems == null || cartItems.length < 1) {
            cartItems = [];
        } else {
            cartItems = JSON.parse(cartItems);
        }
        this.cartItems = cartItems;
        this.rootStore = rootStore;
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
        return this.cartItems.length;
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

