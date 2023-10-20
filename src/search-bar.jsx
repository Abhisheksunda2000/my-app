import React from 'react';
import './search-bar.css';
const SearchBar = ({searchTerm, setSearchTerm}) => {
 return(
    <div className='search-bar'>
        <h3>Search Monster</h3>
        <input
         type="search"
         placeholder="Monster"
         value={searchTerm}
         onChange={e => setSearchTerm(e.target.value)} />
    </div>
 );
};

export default SearchBar;