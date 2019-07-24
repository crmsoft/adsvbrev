import React, {PureComponent} from 'react';

let selection = 0;
let prev_list_l = 0;

class ListItem extends PureComponent {
    render() {
        const {m, selected, onClick} = this.props;
        return (
            <li
                onClick={onClick}
                className={selected ? 'bg-info':''}
            >
                {`@${m.username}`}
            </li>
        )
    }
}

export default ({
    pattern, members, moveSelection, onClick
}) => {
    // filter members
    const list = members.filter(m => (m.username.indexOf(pattern) !== -1 || (pattern && (pattern.length === 0))))

    // move selection
    if (moveSelection === 'down' && ((list.length - 1) > selection)) ++selection;
    if (moveSelection === 'up' && selection) --selection;

    // reset selection when query changed
    if (prev_list_l !== list.length){
        selection = 0;
    }

    // cache list size
    prev_list_l = list.length;

    return list.length ? (
        <div className="dialog-username-helper">
            <ul className="list-group w-100 list-scroll">
                {
                    list.map((m, index) => <ListItem 
                                                key={index} 
                                                onClick={onClick}
                                                selected={index === selection} 
                                                m={m} />)
                }
            </ul>
        </div>
    ) : null;
}

export const getSelection = () => selection;