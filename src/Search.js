import React,{useState, useEffect} from 'react'

import {Form, Button} from 'react-bootstrap'
import axios from 'axios'
export default function Search({setIsSearching,pokemonData, setPokemonData,}) {

const [searchPokemon,setSearchPokemon] = useState("");

const search = () => {
    console.log(searchPokemon)
    let searchable = searchPokemon.toLowerCase();
    if(searchable === "") return
    setIsSearching(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${searchable}`).then(res => {
        
        setPokemonData(res.data)               
    },
    (error => console.log(error))
    )
}

useEffect(() => {
    if(searchPokemon.length === 0){
        setIsSearching(false);
    }
}, [searchPokemon])

    return (
        <>
            <Form>
  <Form.Group controlId="pokemonName">
    <Form.Label>Pokemon Name</Form.Label>
    <Form.Control type="text" placeholder="Enter pokemon" value={searchPokemon} onChange={(e) => setSearchPokemon(e.target.value)}/> 
    <Button variant="warning" onClick={search}>Search</Button>
  </Form.Group>
  </Form>
        </>
    )
}
