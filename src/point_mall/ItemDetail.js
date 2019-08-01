import React from 'react'
import Axios from 'axios'
import { withRouter } from 'react-router-dom';

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
        Axios.get(
            'http://localhost:8005/items/' + this.state.itemId + '/'
        )
            .then((response) => {
                const items = response.data;
                this.setState({
                    items: items
                })
            })
    }

    onPurchase = () => {
        Axios.post(
            'http://localhost:8005/items/' + this.state.itemId + '/purchase/',
            {},
            {
                headers: {
                    'Authorization': localStorage.getItem('authorization')
                }
            }
        )
            .then((response) => {
                this.props.history.push('/me/items/')
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    this.props.history.push('/login/')
                }
                if (error.response.status === 402) {
                    alert('포인트가 부족합니다.')
                }
            })
    }

    render() {
        const item = this.state.items;
        const image = item ? item.image : '';
        const title = item ? item.title : '';
        const desc = item ? item.description : '';

        return (
            <div id='containel'>
                <h3>아이템 상세페이지</h3>
                <div className='detail_item_list'>
                    <img src={image} alt='이미지' />
                    <p>{title}</p>
                    <p>{desc}</p>
                    <button onClick={this.onPurchase}>구입</button>
                </div>
            </div>
        )
    }
}

export default withRouter(ItemDetail);