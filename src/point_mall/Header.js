import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import Axios from 'axios'

import DataHelper from '../DataHelper'

@observer
class Header extends React.Component {
    helper = new DataHelper();

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
        Axios.get(this.helper.baseURL() + '/cates/')
            .then(response => {
                const cates = response.data;
                this.setState({
                    cates: cates
                })
            });
    }

    onLogout = () => {
        this.helper.deleteToken();
    }

    render() {
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
                        this.helper.isLoggedIn ?
                            <Link to='/' onClick={this.onLogout}>Logout</Link> :
                            <Link to='/login'>Login</Link>
                    }
                </div>
                {this.helper.isLoggedIn ?
                    <div className='header_r'>
                        <Link to='/me/items'>MyItems</Link>
                    </div>
                    : ''}
                <div className='header_r'>
                    <Link to='/cart/items'>Cart</Link>
                </div>
            </header>
        )
    }
}

export default withRouter(Header)