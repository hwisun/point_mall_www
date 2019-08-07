import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Axios from 'axios'

@inject('authStore', 'itemStore')
@observer
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cates: []
        };
    }

    componentDidMount() {
        this.getCates();
    }

    getCates() {
        const { authStore } = this.props
        const URL = authStore.BASE_URL + '/cates/';

        Axios.get(URL)
            .then(response => {
                const cates = response.data;
                this.setState({
                    cates: cates
                })
            });
    }

    onLogout = () => {
        const { authStore } = this.props
        authStore.deleteToken();
    }

    render() {
        const { itemStore } = this.props
        const isLoggedIn = this.props.authStore.isLoggedIn
        const cates = this.state.cates.map((cate) => {
            return (
                <div key={cate.id} className='header_l'>
                    <Link to={'/cates/' + cate.id} >{cate.title}</Link>
                </div>
            )
        })
        return (
            <header>
                <div className='header_l'>
                    <Link to='/'>Home</Link>
                </div>
                {cates}
                <div className='header_r'>
                    {
                        isLoggedIn ?
                            <Link to='/' onClick={this.onLogout}>Logout</Link> :
                            <Link to='/login'>Login</Link>
                    }
                </div>
                {
                    isLoggedIn ?
                    <div className='header_r'>
                        <Link to='/me/items'>MyItems</Link>
                    </div>
                    : ''
                }
                <div className='header_r'>
                    <Link to='/cart/items'>Cart {itemStore.cartItemsCount}</Link>
                </div>
            </header>
        )
    }
}

export default withRouter(Header)