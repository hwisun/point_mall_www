import React from 'react'
import Axios from 'axios'

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
            'http://localhost:8005/me/',
            {
                headers: {
                    'Authorization': localStorage.getItem('authorization')
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
            'http://localhost:8005/me/items/',
            {
                headers: {
                    'Authorization': localStorage.getItem('authorization')
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