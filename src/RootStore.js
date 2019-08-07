import AuthStore from "./AuthStore";
import ItemStore from "./ItemStore";

export default class RootStore {
    constructor() {
        this.authStore = new AuthStore(this);
        this.itemStore = new ItemStore(this);
    }
}