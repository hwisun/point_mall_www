import React from 'react'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'

import ItemBox from './ItemBox'
import { inject, observer } from 'mobx-react';

@inject('authStore', 'itemStore')
@observer   
class CartItems extends React.Component {

    componentDidMount() {
        this.getItems();
    }

    getItems() {
        let cartItems = localStorage.getItem('cart_items');
        if (cartItems == null || cartItems.length < 1) {
            cartItems = [];
        } else {
            cartItems = JSON.parse(cartItems);
        }
        this.setState({
            cartItems: cartItems
        })
    }

    onPurchase = () => {
        const items = [];
        const { authStore, history, itemStore } = this.props
        const URL = authStore.BASE_URL + '/items/purchase/';
        for (let cartItem of itemStore.cartItems) {
            items.push({
                item_id: cartItem.items.id,
                count: cartItem.count
            })
        }
        Axios.post(
            URL,
            {
                items
            },
            {
                headers: {
                    'Authorization': authStore.authToken
                }
            }
        ).then((response) => {
            itemStore.clearCartItems();
            history.push('/me/items');
        }).catch((error) => {
            console.log(error);
            
        })
    }

    NextItem(itemsQueue) {
        const { authStore, history } = this.props
        if (itemsQueue.length < 1) {
            localStorage.removeItem('cart_items');
            history.push('/me/items/')
        } else {
            const itemId = itemsQueue.shift();
            const URL = authStore.BASE_URL + '/items/' + itemId + '/purchase/'
            Axios.post(
                URL,
                {},
                {
                    headers: {
                        'Authorization': authStore.authToken
                    }
                }
            ).then((response) => {
                this.NextItem(itemsQueue);
            }).catch((error) => {
                if (error.response.status === 401) {
                    history.push('/login/')
                }
                if (error.response.status === 402) {
                    alert('포인트가 부족합니다.')
                }
            })
        }
    }

    render() {
        const { itemStore } = this.props
        const items = itemStore.cartItems.map(cartItem => {
            const item = cartItem.items;
            const price = item.price;
            
            return (
                <ItemBox key={item.id} item={item} count={cartItem.count} />
            )
        });
         
        return (
            <div id='containel'>
                <h3>나의 장바구니 목록</h3>
                <button onClick={this.onPurchase}>전부구입</button>
                <br />
                {items}
            </div>
        )
    }
}

export default withRouter(CartItems);