import React from 'react';

import './item-status-filter.css';

const ItemStatusFilter = ({onToggleFilter, filter}) => {
  let bool1 = false, bool2 = false, bool3 = false
  if(filter === 'all'){
    bool1 = true
  }else if(filter === 'active'){
    bool2 = true
  }
  else if(filter === 'done'){
    bool3 = true
  }

  return (
    <div className="btn-group">
      <button onClick={() => onToggleFilter('all')}
              type="button"
              className={ bool1 ? "btn btn-info" : "btn btn-outline-secondary"}>All</button>
      <button onClick={() => onToggleFilter('active')}
              type="button"
              className={ bool2 ? "btn btn-info" : "btn btn-outline-secondary"}>Active</button>
      <button onClick={() => onToggleFilter('done')}
              type="button"
              className={ bool3 ? "btn btn-info" : "btn btn-outline-secondary"}>Done</button>
    </div>
  );
};

export default ItemStatusFilter;
