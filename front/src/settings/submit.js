import React from "react";

const Submit = (props) => {
    return (
        <div className="row submit-wrapper">
            <button 
                className="dd-btn btn-sm"
                disabled={Object.keys(props.active).length === 0} 
                onClick={props.handleSubmit}
            >
                Save
            </button>
        </div>
    )
}

export default Submit;