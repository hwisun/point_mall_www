import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import Axios from 'axios'

import DataHelper from '../DataHelper'

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cates: []
        }
    }

    componentDidMount() {
        this.getCates();
    }

    getCates() {
        Axios.get(DataHelper.baseURL() + '/cates/')
            .then(response => {
                const cates = response.data;
                this.setState({
                    cates: cates
                })
            });
    }

    onLogout = () => {
        localStorage.removeItem('auth_token');
        this.props.history.push('/');
    }

    render() {
        const cates = this.state.cates.map((cate) => {
            return(
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
                    {DataHelper.getAuthToken() ?
                <Link to='/' onClick={this.onLogout}>Logout</Link> : <Link to='/login'>Login</Link>}
                </div>
                {DataHelper.getAuthToken() ?
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