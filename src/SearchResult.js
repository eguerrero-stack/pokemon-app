import React from 'react'
import { Card } from "react-bootstrap";

export default function searchResult({pokemonData}) {
    return (
        <div>
             <Card className="pokemonInfo">
           <Card.Img variant="top" src={pokemonData.sprites? pokemonData.sprites.front_default : "Nothing here"} />
           <Card.Body>
             <Card.Title>{pokemonData.name}</Card.Title>
             <Card.Text>
               Pokemon Description
             </Card.Text>
             
           </Card.Body>
         </Card>
        </div>
    )
}
