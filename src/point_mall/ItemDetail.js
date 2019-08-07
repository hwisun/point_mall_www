import React from 'react'
import Axios from 'axios'
import { withRouter } from 'react-router-dom';
import { inject } from 'mobx-react';
import ItemStore from '../ItemStore';

@inject('authStore', 'itemStore')
class ItemDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: null,
            itemId: this.props.match.params.itemId
        }
    }

    componentDidMount() {
        this.getItem();
    }

    getItem() {
        const { authStore } = this.props;
        const url = authStore.BASE_URL + '/items/' + this.state.itemId + '/';
        Axios.get(
            url
        )
            .then((response) => {
                const items = response.data;
                this.setState({
                    items: items
                })
            })
    }

    onPurchase = () => {
        const { authStore, history } = this.props
        Axios.post(
            authStore.BASE_URL + '/items/' + this.state.itemId + '/purchase/',
            {},
            {
                headers: {
                    'Authorization': authStore.authToken
                }
            }
        )
            .then((response) => {
                history.push('/me/items/')
            })
            .catch((error) => {        
                if (error.response.status === 401) {
                    history.push('/login/')
                }
                if (error.response.status === 402) {
                    alert('포인트가 부족합니다.')
                }
            })
    }


    addToCart = () => {
        const { itemStore } = this.props;
        const items = this.state.items;

        itemStore.addItemToCart(items);
    }

    render() {
        const item = this.state.items;
        const image = item ? item.image : '';
        const title = item ? item.title : '';
        const desc = item ? item.description : '';
        const price = item ? item.price : '';

        return (
            <div id='containel'>
                <h3>아이템 상세페이지</h3>
                <div className='detail_item_list'>
                    <img src={image} alt='이미지' />
                    <p>{title}</p>
                    <p>{desc}</p>
                    <p>가격 : {price} P</p>
                    <button onClick={this.onPurchase}>구입</button>
                    <button onClick={this.addToCart}>장바구니에 담기</button>
                </div>
            </div>
        )
    }
}

export default withRouter(ItemDetail);