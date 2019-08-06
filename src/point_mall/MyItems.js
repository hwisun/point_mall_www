import React from 'react'
import Axios from 'axios'

import ItemBox from './ItemBox'
import { inject } from 'mobx-react';
 

@inject('authStore')
class MyItems extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            userItems: [],
            user: null
        }
    }

    componentDidMount() {
        this.getUser();
        this.getItems();
    }

    getUser() {
        const { authStore } = this.props
        const URL = authStore.BASE_URL + '/me/';

        Axios.get(
            URL,
            {
                headers: {
                    'Authorization': authStore.authToken
                }
            }
        )
        .then(response => {
            const user = response.data;
            this.setState({
                user: user
            })
        });
    }

    getItems() {
        const { authStore } = this.props
        const URL = authStore.BASE_URL + '/me/items/'
        Axios.get(
            URL,
            {
                headers: {
                    'Authorization': authStore.authToken
                }
            }
        )
        .then(response => {
            const userItems = response.data;
            this.setState({
                userItems: userItems
            })
        });
    }

    render() {
        const user = this.state.user;
        const point = user ? user.point : 0;
        const items = this.state.userItems.map(userItem => {
            const item = userItem.item;
            return (
                <ItemBox key={item.id} item={item} count={userItem.count} />  
            )
        });
        return (
            <div id='containel'>
                <h3>나의 아이템 목록</h3>
                <h4>남은 포인트 : {point}</h4>
                {items}
            </div>
        )
    }
}

export default MyItems;