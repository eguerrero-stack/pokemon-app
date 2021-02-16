import React,{useState} from 'react'

import {Form, Button} from 'react-bootstrap'
import axios from 'axios'
export default function Search({setIsSearching,pokemonData, setPokemonData,}) {

const [searchPokemon,setSearchPokemon] = useState("");

const search = () =>{
    console.log(searchPokemon)
    setIsSearching(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${searchPokemon}`).then(res => {
        
        setPokemonData(res.data)  
              console.log(pokemonData)
    },
    (error => console.log(error))
    )
}

    return (
        <>
            <Form>
  <Form.Group controlId="pokemonName">
    <Form.Label>Pokemon Name</Form.Label>
    <Form.Control type="text" placeholder="Enter pokemon" value={searchPokemon} onChange={(e) => setSearchPokemon(e.target.value.toLowerCase())}/> 
    <Button variant="warning" onClick={search}>Search</Button>
  </Form.Group>
  </Form>
        </>
    )
}
