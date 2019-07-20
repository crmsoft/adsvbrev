import React, {Fragment} from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import axios from 'axios';

import UserListComponent from "../Components/UserListComponent";
import GroupListComponent from "../Components/GroupListComponent";

let _items = [];
let _lastLoaded = false;
const loadMoreItems = (startIndex, stopIndex) => {
  return !_lastLoaded ? new Promise((resolve, reject) =>
    axios.post('', {
        from: startIndex,
        to: stopIndex
    })
    .then(({data}) => {
        _lastLoaded = !data.data.length;
        _items = _items.concat(data.data);        
        resolve();
    })
  ) : new Promise((r,rj) => {})
};


const Row = ({index, style}) => {
    return <div style={style}><UserListComponent  data={_items[index]} /></div>
}

const RowGroup = ({index, style}) => {
    return <div style={style}><GroupListComponent data={_items[index]} /></div>
}

export default function App({items, render}) {

    _items = items;
    _lastLoaded = false;
    
  return (
    <Fragment>
      <InfiniteLoader
        key={items.length}
        isItemLoaded={index => !!_items[index]}
        itemCount={items.length < 21 ? items.length : 500}
        number={20}
        minimumBatchSize={25}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <List
            key={items.length}
            className="List"
            height={550}
            itemCount={items.length < 21 ? items.length : 500}
            itemSize={70}
            onItemsRendered={onItemsRendered}
            ref={ref}
          >
            {render === 'users' ? Row : RowGroup}
          </List>
        )}
      </InfiniteLoader>
    </Fragment>
  );
}