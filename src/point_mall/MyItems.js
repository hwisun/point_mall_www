import React from 'react'
import Axios from 'axios'

import DataHelper from '../DataHelper'
import ItemBox from './ItemBox'
 
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
        Axios.get(
            DataHelper.baseURL() + '/me/',
            {
                headers: {
                    'Authorization': DataHelper.getAuthToken()
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
        Axios.get(
            DataHelper.baseURL() + '/me/items/',
            {
                headers: {
                    'Authorization': DataHelper.getAuthToken()
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