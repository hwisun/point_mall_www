import React from 'react'
import Axios from 'axios'
import { withRouter } from 'react-router-dom';

import ItemBox from './ItemBox'
import { inject } from 'mobx-react';


@inject('authStore')
class Home extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            items: [],
            cateId: this.props.match.params.cateId,
            cates: null
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.cateId !== prevProps.match.params.cateId){
            this.setState({
                cateId: this.props.match.params.cateId
            });
            this.getItems();
            if ( this.props.match.params.cateId != null ) {
                this.getCates();
            }
            
            
        } 
    }

    componentDidMount() {
        this.getItems()
    }

    getItems() {
        const { authStore } = this.props;
        const cateId = this.state.cateId;
        let URL = authStore.BASE_URL + '/items/'

        if (cateId) {
            URL = authStore.BASE_URL + '/cates/'+cateId+'/items/'
        }
        
        Axios.get(URL)
        .then(response => {
            const items = response.data;
            this.setState({
                items: items
            });
        });
    }

    getCates() {
        const { authStore } = this.props;
        const cateId = this.state.cateId;
        let URL = authStore.BASE_URL + '/cates/' + cateId + '/';

        Axios.get(URL)
            .then(response => {
                const cates = response.data;
                this.setState({
                    cates: cates
                });
            });
    }

    render() {
        let cate_title = null
        const items = this.state.items.map(item => {
            return(
                <ItemBox key={item.id} item={item} />  
            );
        });
        if (this.props.match.params.cateId) {
            const cate = this.state.cates  
            cate_title = cate ? cate.title : null
        }
        return (
            <div id='containel'>
                <h3>[{cate_title? cate_title : '전체'}] 아이템 리스트</h3>
                {items}
            </div>
        )
    }
}

export default withRouter(Home);