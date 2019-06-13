import React from 'react';
import AsyncSelect from 'react-select/async';

export const Select = (props) => (
    <div className={props.hasError ? 'has-error' : null} style={{borderRadius: 3}}>
        <AsyncSelect 
            styles={{
                control: base => ({
                    ...base,
                    backgroundColor: '#484B52',
                    border: 'none'
                }),
                menuList: base => ({
                    ...base,
                    backgroundColor: '#484B52',
                    height: 150
                }),
                input: base => ({
                    ...base,
                    color: '#fff'
                }),
                option: (base, state) => ({
                    ...base,
                    backgroundColor: null
                })
            }}
            {...props}
        />
    </div>
)