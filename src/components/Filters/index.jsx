import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faAngleUp, faSearch } from '@fortawesome/free-solid-svg-icons'
import './Filters.css'
import { useState } from "react";


function Filters() {
  const [filterType, setFilterType] = useState('All')
  const [toggle, setToggle] = useState(true);
  const handleClick = () => {
    setToggle(!toggle);
  };
  return (
    <>
    <div className="container">
        <div className="filter-components">
        <FontAwesomeIcon icon={faFilter}/>
        <div>FILTER</div>
        <FontAwesomeIcon onClick={handleClick} icon={faAngleUp}/>
        </div>
        <div className="search">
              <input
                type="text"
                className="searchTerm"
                placeholder="Event Name"
               
              />
              <button type="submit" className="searchButton">
              <FontAwesomeIcon icon={faSearch}/>
              </button>
         </div>
    </div>
   { toggle ? (<div className="toggle-component">
    <div className="upper-toggle-component">
     <div className="radio-btn">
     <input type="radio" value={filterType} name="filterType" checked={filterType === 'All'} />  All
     </div>
     <div className="radio-btn">Bookmarked
     <input className="radio-btn-right" type="radio" value={filterType} name="filterType" checked={filterType === 'isBookmarked'} />
     </div>
     </div>
     <div className="lower-toggle-component">
     <div className="radio-btn">
     <input type="radio" value={filterType} name="filterType" checked={filterType === 'isRegistered'} />  Registered
     </div>
     <div className="radio-btn">Seats Available
     <input className="radio-btn-right" type="radio" value={filterType} name="filterType" checked={filterType === 'areSeatsAvailable'} />
     </div>
     </div>
    </div>
   ) :  <></>
  }
    </>

  )

}

export default Filters;