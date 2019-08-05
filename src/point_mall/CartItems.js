import React from 'react'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'

import DataHelper from '../DataHelper'
import ItemBox from './ItemBox'

class CartItems extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cartItems: []
        }
    }

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
        // const itemsQueue = [] ;
        // for (let cartItem of this.state.cartItems) {
        //     for (let i = 0; i < cartItem.count; i++){
        //         itemsQueue.push(cartItem.items.id);
        //     }
        // }
        // this.NextItem(itemsQueue);

        const items = [];
        for (let cartItem of this.state.cartItems) {
            items.push({
                item_id: cartItem.items.id,
                count: cartItem.count
            })
        }
        Axios.post(
            DataHelper.baseURL() + '/items/purchase/',
            {
                items
            },
            {
                headers: {
                    'Authorization': DataHelper.getAuthToken()
                }
            }
        ).then((response) => {
            localStorage.removeItem('cart_items');
            this.props.history.push('/me/items');
        }).catch((error) => {
            if (error.response.status === 401) {
                this.props.history.push('/login/')
            }
            if (error.response.status === 402) {
                alert('포인트가 부족합니다.')
            }
        })
    }

    NextItem(itemsQueue) {
        console.log(itemsQueue);
        
        if (itemsQueue.length < 1) {
            localStorage.removeItem('cart_items');
            this.props.history.push('/me/items/')
        } else {
            const itemId = itemsQueue.shift();
            Axios.post(
                DataHelper.baseURL() + '/items/' + itemId + '/purchase/',
                {},
                {
                    headers: {
                        'Authorization': DataHelper.getAuthToken()
                    }
                }
            ).then((response) => {
                this.NextItem(itemsQueue);
            }).catch((error) => {
                if (error.response.status === 401) {
                    this.props.history.push('/login/')
                }
                if (error.response.status === 402) {
                    alert('포인트가 부족합니다.')
                }
            })
        }
    }

    render() {
        const items = this.state.cartItems.map(cartItem => {
            const item = cartItem.items;
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