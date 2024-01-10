import React from 'react';
import check_img from './check.png';
import {Story, Stories} from './App.tsx';
import {sortBy} from 'lodash';

type ItemProps = {item: Story; onRemoveItem: (item:Story)=>void;};
type ListProps = {list: Stories; onRemoveItem: (item:Story)=>void;};

const SORTS = {
  NONE: (list) => list,
  TITLE: (list) => sortBy(list, 'title'),
  AUTHOR: (list) => sortBy(list, 'author'),
  COMMENT: (list) => sortBy(list, 'num_comments').reverse(),
  POINT: (list) => sortBy(list, 'points').reverse()
};

const List = ({list, onRemoveItem}: ListProps) => {
  const [sort, setSort] = React.useState({
    sortKey: 'NONE',
    isReverse: false
  });

  const handleSort = (sortKey) => {
    // if pressing the same button AND currently not reverse
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;
    setSort({sortKey: sortKey, isReverse: isReverse});
  };
  const sortFunction = SORTS[sort.sortKey];
  const sortedList = sort.isReverse ? sortFunction(list).reverse() : sortFunction(list);
  //console.log('B:List') ||
  return (
    <ul>
      <li style={{display: 'flex'}}>
        <span style={{width: '40%'}}>
          <button type="button" onClick={()=>handleSort('TITLE')}>Title</button>
        </span>
        <span style={{width: '30%'}}>
          <button type="button" onClick={()=>handleSort('AUTHOR')}>Author</button>
        </span>
        <span style={{width: '10%'}}>
          <button type="button" onClick={()=>handleSort('COMMENT')}>Comments</button>
        </span>
        <span style={{width: '10%'}}>
          <button type="button" onClick={()=>handleSort('POINT')}>Points</button>
        </span>
        <span style={{width: '10%'}}>
          Action
        </span>
      </li>
      {sortedList.map((item)=>{
        return (
        <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
        );
      })
      }
    </ul>
  );
};
  
const Item = ({item, onRemoveItem}: ItemProps) => (
    <li className="item">
        <span style={{width:"40%"}}><a href={item.url}>{item.title}</a></span>
        <span style={{width:"30%"}}>{item.author}</span>
        <span style={{width:"10%"}}>{item.num_comments}</span>
        <span style={{width:"10%"}}>{item.points}</span>
        <span style={{width:"10%"}}>
        <button type="button" onClick={()=>onRemoveItem(item)} className="button buttonSmall">
            <img src={check_img} alt="check" height="18px" width="18px" />
        </button>
        </span>
    </li>
);

export default List;
export {Item};