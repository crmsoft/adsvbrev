import React, { Component } from 'react';
import Menu from '../menu';
import Content from './tabs';
import queryString from 'query-string';
import { Provider } from 'react-redux';
import searchStore from '../search/redux/store';

class Search extends Component {
    
    state = {}

    componentDidMount(){
        
        const searchTerm = queryString.parse(this.props.location.search);

        this.setState({
            searchFor: searchTerm.q ? searchTerm.q : '',
            searchTab: this.resolveTab(searchTerm.i)
        });
    }

    resolveTab( tab ){
        switch(tab){
            case 'gr' : {
                return 1;
            }
            default: return 0;
        }
    }

    onTabChange(activatedIndex,searchTerm){
        this.setState({
            searchFor: searchTerm,
            searchTab: activatedIndex
        });
        
    }

    render(){
        return (
            <div className="d-flex">

                <Menu />
                
                <div className="user-middle">
                    
                    <div className="search-results">
                        
                        <div className="header">
                            <h1>Search results</h1>
                        </div>

                        <div id="settings-content">
                            <Provider store={searchStore}>
                                <Content 
                                    onTabChange={(i,s) => { this.onTabChange.call(this,i,s); }}
                                    history={this.props.history} 
                                    searchTerm={this.state.searchFor} 
                                    searchTab={this.state.searchTab}
                                />
                            </Provider>
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}

export default Search;