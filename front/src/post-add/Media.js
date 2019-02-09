import React, {Component} from 'react';
import Preview from './Preview';

export default class PostMedia extends Component{

    constructor(...props)
    {
        super(...props);

        this.ref = React.createRef();
        this.onFile = this.onFile.bind(this);

        this.state = {
            previews: []
        }
    }

    onFile(e)
    {
        const el = e.target;
        if( el.files.length > 0 ){
            const file = el.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () =>{
                this.setState(() => {
                    return {
                        previews : [
                            ...this.state.previews,
                            reader.result
                        ]
                    }
                }, () => {
                    this.props.onFiles( file );
                })
            });
            reader.readAsDataURL(el.files[0]);
        } 
    }

    remove(index)
    {
        if(this.state.previews[index])
        {
            this.setState(state => {
                return {
                    previews: state.previews.filter((s,i) => {
                        return index !== i;
                    })
                }
            }, () => {
                this.props.onRemove(index);
            });
        } // end if
    }

    componentDidUpdate()
    {
        if(this.props.select)
        {            
            this.ref.current.click();
            setTimeout(this.props.onFiles, 150);
        } // end if 
    }

    static getDerivedStateFromProps(nextProps, prevState)
    {
        if(nextProps.reset)
        {
            return {
                previews: []
            }
        }

        return null;
    }

    render()
    {
        return (
            <div>
                <input 
                    ref={this.ref}
                    className="d-none"
                    type="file"
                    onChange={e => { this.onFile(e); }}
                />
                <Preview 
                    remove={ index => { this.remove.call(this,index); } }
                    previews={this.state.previews}
                />
            </div>
        )
    }
}