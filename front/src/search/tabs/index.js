import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SearchField from './SearchField';
import SearchResult from './SearchResults';
import {connect} from 'react-redux';
import { performSearch } from '../redux/events'
import queryString from 'query-string';
import UserListComponent from '../Components/UserListComponent';
import GroupListComponent from '../Components/GroupListComponent';

class ContentComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            search: props.search,
            activeTabIndex: 0
        }

        this.onQueryChange = this.onQueryChange.bind(this);
        this.onTabChange = this.onTabChange.bind(this);
    }

    onTabChange(active,prev){
        
        if( active !== prev ){
            this.props.onTabChange( active, this.state.search );
        }

        return false;
    }

    onQueryChange( val ){
        this.setState({
            search: val
        }, () => {
            this.doSearch.call(this);
        });
    }

    resolveTabName(index){
        switch(index){
            case 1 : {
                return 'gr';
            }
            default : return undefined;
        }
    }

    doSearch(){
        const tabQueryName = this.resolveTabName(this.state.activeTabIndex);
        const queryString_ = `?` + queryString.stringify({
            q: this.state.search,
            i: tabQueryName
        });
        this.props.history.push({
            search: queryString_ 
        });
        this.props.search(queryString_);
    }

    componentWillReceiveProps(props){
        if(props.searchTerm !== this.props.searchTerm || props.searchTab !== this.props.searchTab){
            this.setState({
                search: props.searchTerm,
                activeTabIndex: props.searchTab
            }, () => {
                this.doSearch.call(this);
            })
        }
    }

    render(){        
        return (
            <div>
                <Tabs
                    selectedIndex={this.state.activeTabIndex}
                    onSelect={this.onTabChange}
                >
                    <TabList className="nav nav-tabs">

                        <Tab selectedClassName="active">
                            <a href="javascript:void(0);">
                                <span className="icon-friends">
                                    {" Gamers"}
                                </span>
                            </a>
                        </Tab>
                        <Tab selectedClassName="active">
                            <a href="javascript:void(0);">
                                <span className="icon-groups">
                                    {" Groups"}
                                </span>
                            </a>
                        </Tab>
                        
                    </TabList>
                    <div className="content">
                        <TabPanel> 
                            
                            <SearchField 
                                onQuery={this.onQueryChange}
                                text={ this.state.search ? this.state.search :  '' } 
                            />
                            <SearchResult 
                                render={UserListComponent}
                                items={this.props.items} 
                            />

                        </TabPanel>
                        <TabPanel>
                            
                            <SearchField 
                                onQuery={this.onQueryChange}
                                text={ this.state.search ? this.state.search : '' } 
                            />
                            <SearchResult 
                                render={GroupListComponent}
                                items={this.props.items} />

                        </TabPanel>

                    </div>
                </Tabs>
            </div>
        )
    }
}

const Content = connect(
    state => {
        return {
            ...state,
            items: [
                ...state.items
            ]
        }
    },
    dispatch => {
        return {
            search: query => {
                dispatch(performSearch(query));
            }
        }
    }
)(ContentComponent);

export default Content;