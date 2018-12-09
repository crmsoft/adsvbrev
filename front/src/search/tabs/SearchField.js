import React, {Component} from 'react';

let timer = undefined;

class SearchField extends Component{

    constructor(props){
        super(props);
        this.onUserInput = this.onUserInput.bind(this);
        this.fieldChanged = this.fieldChanged.bind(this);
        this.state = {
            value: props.text,
            redirect: props.text,
            searchQuery: props.text
        }
    }

    fieldChanged(){

        this.props.onQuery(this.state.value)
        
    }

    onUserInput(e){
        const value = e.target.value;
        this.setState(state => {
            return {
                value: value,
                redirect: state.value
            }
        }, () => {
            clearTimeout(timer);
            timer = setTimeout(this.fieldChanged, 750);
        });
    }

    componentWillUnmount(){
        clearTimeout(timer);
    }

    componentWillReceiveProps(props,n){
        if(props.text !== this.state.value){
            this.setState({
                value: props.text
            });
        }
    }

    render(){
        return (
            <div className="search-field">
                <input 
                    onChange={this.onUserInput}
                    placeholder={`Search`}
                    type="text" 
                    value={this.state.value}
                />
            </div>
        )
    }
}


export default SearchField;