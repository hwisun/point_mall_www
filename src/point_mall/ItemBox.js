import React from 'react'
import { withRouter } from 'react-router-dom'

import DataHelper from '../DataHelper'

class ItemBox extends React.Component {

    helper = new DataHelper();
    
    goToItem = () => {
        const item = this.props.item;
        this.props.history.push('/items/' + item.id)
    }

    render() {
        const item = this.props.item;
        const count = this.props.count
        let image = item.image;
        if (!image.startsWith('http')) {
            image = this.helper.baseURL() + image;
        }
        const title = item.title;
        const price = item.price;
        return (
            <div className='index_item_list' onClick={this.goToItem}>
                <img src={image} alt='이미지' />
                <p>{title}</p>
                <p>{!count ? '가격 : ' + price : '개수 : ' + count}</p>
            </div>
        );
    }
}

export default withRouter(ItemBox);