import React from 'react'
import { Card, Col, Container,Row, Table} from "react-bootstrap";

export default function searchResult({pokemonData}) {
    return (
        <>
        <Container>
          <Row>
            <Col xs={6}>
             <Card className="pokemonInfo">
           <Card.Img variant="top" src={pokemonData.sprites? pokemonData.sprites.front_default : "Nothing here"} />
           <Card.Body>
             <Card.Title>{pokemonData.name ? pokemonData.name.toUpperCase() : ""}</Card.Title>
             </Card.Body>
         </Card>
             </Col>

             {pokemonData.stats ? <Col xs={6}>
             <Table striped bordered hover variant="light">
                  <thead>
                    <tr>
                      <th>{pokemonData.stats[0].stat.name}</th>
                      <th>{pokemonData.stats[0].base_stat}</th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{pokemonData.stats[1].stat.name}</td>
                      <td>{pokemonData.stats[1].base_stat}</td>

                    </tr>
                    <tr>
                      <td>{pokemonData.stats[2].stat.name}</td>
                      <td>{pokemonData.stats[2].base_stat}</td>

                    </tr>
                    <tr>
                      <td>{pokemonData.stats[3].stat.name}</td>
                      <td >{pokemonData.stats[3].base_stat}</td>
                    </tr>
                    <tr>
                      <td>{pokemonData.stats[4].stat.name}</td>
                      <td >{pokemonData.stats[4].base_stat}</td>
                    </tr>
                    <tr>
                      <td>{pokemonData.stats[5].stat.name}</td>
                      <td >{pokemonData.stats[5].base_stat}</td>
                    </tr>
                  </tbody>
          </Table>
          </Col> : 
<h1>Pokemon Not Found</h1> }
             
             
          
         </Row>
         </Container>
        </>
    )
}
