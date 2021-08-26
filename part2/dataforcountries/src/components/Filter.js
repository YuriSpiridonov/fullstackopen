import React from 'react';

const Filter = ({ filter, handleFilter }) => (
  <div>
    <form>
      <div>
        find countries <input 
          value={filter} 
          onChange={handleFilter}
        />
      </div>
    </form>
  </div>
)

export default Filter;
