import * as React from 'react';
import { Socket } from './Socket';
import {
  Container, Header, Divider, Rating, Button, Icon, Image, List, Label,
} from 'semantic-ui-react';

function handleSubmit(event) {
    let newSearch = document.getElementById("search_input");
    let filter = document.getElementById("filtered_search");
    if (newSearch.value === "" || newSearch.value === null || newSearch.value === undefined){
        return;
    }
    console.log(filter.value)
    Socket.emit('new search input', {
        'search': newSearch.value,
        'filter': filter.value,
    });
    
    console.log('Sent the search ' + newSearch.value + ' to server!');
    newSearch.value = ''
    
    event.preventDefault();
}

var inputbox = {
    width: '67%',
    padding: '10px 20px',
    margin: '8px',
    display: 'inline-block',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
}

var submitbox = {
  width: '13%',
  backgroundColor: '#BDB76B',
  color: 'white',
  padding: '10px 20px',
  margin: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  cursor: 'pointer',
}

var selectbox = {
  width: '11%',
  backgroundColor: '#BDB76B',
  color: 'white',
  padding: '10px 20px',
  margin: '9px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  cursor: 'pointer',
}


export function SearchButton() {
    return (
        <form onSubmit={handleSubmit}>
            <input id="search_input" placeholder="Search for recipes here by name, tag, difficulty" style={inputbox}></input>
            
                <select style={selectbox} name="filtered_search" id="filtered_search">
                    <option value="name">Name</option>
                    <option value="tag">Tag</option>
                    <option value="difficulty">Difficulty</option>
                </select>
            
            <button style={submitbox}>SEARCH</button>
        </form>
    );
}
