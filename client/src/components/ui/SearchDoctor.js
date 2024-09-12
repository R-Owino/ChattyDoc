import React, { useState } from 'react'
import data from '../../assets/MOCK_DATA.json'

const SearchDoctor = () => {
  // State for the term being searched
  const [searchTerm, setSearchTerm] = useState('')

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // State for the results of the search
  const [foundDoctors, setFoundDoctors] = useState([])

  // Triggers search by pressing 'Enter'
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // Handles the search
  // Currently searches from local storage and searches by country for demo purpose
  const handleSearch = () => {
    const filteredResults = data.filter(person => person.Type.toLowerCase() === searchTerm.toLowerCase());
    setFoundDoctors(filteredResults);
  };
  
  return (
    <div class="search-container">
        <div class="search-form">
            <div class="search-prompt">Which sort of doctor are you looking for? </div>
            <input 
              type="text"
              className="search-prompt"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter response here" />
        </div>
        <div className="scrollable-list">
          <ul className="search-results">
            {foundDoctors.map((doctor, index) => (
              <li key={index}>{doctor.first_name}</li>
            ))}
          </ul>

        </div>
        
    </div>
  )
}

export default SearchDoctor;