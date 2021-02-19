import React, {useState, useEffect} from 'react'
import { Row, Col, Card, Button } from "react-bootstrap";
import axios from 'axios';
import "./PokemonList.css"
export default function PokemonList({pokemonNames, pokemonData}) {

    // const [pokemonData, setPokemonData] = useState({});

    // useEffect(() => {
    //     pokemonNames.map(name => axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then(res => setPokemonData(res.data))
    //     )
        
    //     console.log("New pokemon info",pokemonData)
    // }, []);

    
    return (
        <Row>
        {pokemonNames.map(name => (
            <Col key={name} className="col"  xs={3} >
           <Card className="pokeTiles">
           {/* <Card.Img variant="top" src={pokemonData.forEach(data => data.name = name ? data.sprites.front_default : "" )} /> */}
           <Card.Body>
             <Card.Title>{name}</Card.Title>
             <Card.Text>
               Pokemon Description
             </Card.Text>
             <Button variant="success">Add</Button>
           </Card.Body>
         </Card>
         </Col>
            
        ))}    
        </Row>
    )
}

