import React, {useState} from 'react';
import { Modal, actions } from '../../Modal';


export default ({
    open,
    onClose,
    onSubmit,
    errors,
    processing
}) => {

    const [frm, setFrm] = useState({name:'', number:''})
    
    const onChange = e => {
        const input = e.target;
        
        const {value} = input;
        const {name} = input;

        // validate number input
        if (name === 'number') {
            var reg = new RegExp('^[0-9]+$');
            if (value.length && (value.search(reg) === -1 || parseInt(value) > 100)) {
                return;
            }
        } // end if

        setFrm({
            ...frm,
            [name]: value
        });
    }

    return (
        <Modal
            processing={processing}
            title="New chat room"
            onClose={onClose}
            open={open}
            actions={actions(onClose, () => onSubmit(frm))}
        >
            <div className="p-4">
                <div className="form-group row">
                    <label htmlFor="name" className="col-sm-3 col-form-label">
                        Room name
                    </label>
                    <div className="col-sm-9">
                        <input 
                            id="name"
                            name="name"
                            type="text" 
                            onChange={onChange} 
                            className={errors.name ? 'has-error':''} 
                            value={frm.name} />
                        {
                            errors.name ? (
                                <small className="form-text text-danger">
                                    {errors.name}
                                </small>
                            ) : null
                        }
                        
                        <small className="form-text text-muted">
                            The room name should only include characters and numbers without space. 
                        </small>
                    </div>
                </div>

                <div className="form-group row mt-3">
                    <label htmlFor="roomSize" className="col-sm-3 col-form-label">
                        Room Size
                    </label>
                    <div className="col-sm-9">
                        <input 
                            type="text" 
                            onChange={onChange} 
                            className={errors.number ? 'has-error':''} 
                            id="roomSize" 
                            name="number"
                            value={frm.number} />
                        <small className="form-text text-muted">
                            How many gamers can join the room, the max value is 100 
                        </small>
                    </div>
                </div>
            </div>

        </Modal>
    )
}