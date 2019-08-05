import React from 'react'
import Axios from 'axios'
import { withRouter } from 'react-router-dom';

import DataHelper from '../DataHelper'
import ItemBox from './ItemBox'



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
            this.state.cateId = this.props.match.params.cateId

            this.getItems();
            this.getCates();
        } 
    }

    componentDidMount() {
        this.getItems()
    }

    getItems() {
        const cateId = this.state.cateId;
        let url = DataHelper.baseURL() + '/items/'
        if (cateId) {
            url = DataHelper.baseURL() + '/cates/'+cateId+'/items/'
        }
        
        Axios.get(url)
        .then(response => {
            const items = response.data;
            this.setState({
                items: items
            })
        });
    }

    getCates() {
        const cateId = this.state.cateId;
        Axios.get(DataHelper.baseURL() + '/cates/' + cateId + '/')
            .then(response => {
                const cates = response.data;
                this.setState({
                    cates: cates
                })
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