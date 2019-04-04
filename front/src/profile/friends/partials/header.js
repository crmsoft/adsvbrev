import React,{Component} from 'react';


class Header extends Component {
    render(){
        return (
            <a href="javascript:void(0);" onClick={() => { this.props.total && this.props.showModal() }}>
                <span className="icon-friend aside-firends-icon"></span>
                <h3>friends</h3>
                <span className="items-count"> {this.props.total}</span>
            </a>
        )
    }
}

export default Header;