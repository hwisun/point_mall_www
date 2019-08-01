import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import Axios from 'axios'

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
        Axios.get('http://localhost:8005/cates/')
            .then(response => {
                const cates = response.data;
                this.setState({
                    cates: cates
                })
            });
    }

    onLogout = () => {
        localStorage.removeItem('authorization');
        this.props.history.push('/');
    }

    render() {
        const cates = this.state.cates.map((cate) => {
            return(
                <div key={cate.id} className='menu'>
                    <Link to={'/cates/' + cate.id} >{cate.title}</Link>
                </div>
            )
        })
        return (
            <header>
                <div className='menu'>
                    <Link to='/'>Home</Link>
                </div>
                {cates}
                {localStorage.getItem('authorization') ?
                    <div className='menu'>
                        <Link to='/me/items'>MyItems</Link>
                    </div>
                : ''}
                <div className='login'>
                {localStorage.getItem('authorization') ?
                <Link to='/' onClick={this.onLogout}>Logout</Link> : <Link to='/login'>Login</Link>}
                </div>
            </header>
        )
    }
}

export default withRouter(Header)