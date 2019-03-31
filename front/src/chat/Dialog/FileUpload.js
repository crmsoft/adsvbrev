import React, {Component} from 'react';


export default class FileUpload extends Component{

    state = {
        open: false,
    }

    static getDerivedStateFromProps(nextProps, prevState){
        return {
            open: nextProps.open
        }
    }

    componentDidUpdate(prevState)
    {        
        if (this.inputRef && (prevState.open !== this.state.open))
        {
            document.body.onfocus = this.handleInput.bind(this);
            this.inputRef.click();
        }
    }

    handleInput( e )
    {
        const files = e.target.files;
        
        if (files && files.length)
        {
            const file = files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({ src: reader.result, file: file }),
            );
            reader.readAsDataURL(file);
            this.props.onFileChosen(
                file
            );
        } else {
            this.setState(() => {
                return {
                    src: null
                }
            }, () => {
                this.props.onFileChosen(null);
            });
        } // end if

        document.body.onfocus = null;
    }

    render()
    {
        const {open, src} = this.state;
        
        this.inputRef = null;

        return open ? (
            <div className="file-upload">
                <input 
                    type="file" 
                    className="hidden" 
                    ref={ref => {this.inputRef = ref;}}
                    onChange={this.handleInput.bind(this)}
                />
                <div className="container">
                    { src ? (<img 
                            src={src}
                            className="preview"    
                        />) : null
                    }
                </div>
            </div>
        ) : null;
    }
}