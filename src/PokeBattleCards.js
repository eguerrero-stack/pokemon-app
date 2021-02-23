import React,{useState, useEffect} from 'react'
import {Card,Row, Col, Table,ListGroup } from 'react-bootstrap'
import "./PokeBattleCards.css"

export default function PokeBattleCards({isBattling, battleHistory, pokemonChosen, pokemonInfo, pokemonTwoInfo,pokeMoves,setIsBattling, setPokeMoves, secondPokeMoves, setSecondPokeMoves}) {
    
    // console.log(pokemonInfo,pokemonTwoInfo)
    const [isFirstRender, setIsFirstRender] = useState(true);
    let randomMoves = (movesLength, first) => {
        let movesArray =[];
        if(movesLength > 0){
            for(let i=0; i < 4; i++){
               let randNum = Math.floor(Math.random()  * Math.floor(movesLength-1)) 
               
               if(first){
                   movesArray.push(pokemonInfo.moves[randNum].move)
                   setPokeMoves(movesArray);
               }else{
                movesArray.push(pokemonTwoInfo.moves[randNum].move)
                setSecondPokeMoves(movesArray);
                
               }
            }

        }
        
       
    }

//Trying to have the log appear one at a time
    // let createHistory = () => {
      
      
    //   battleHistory.map((line, index) => {
    //     // if(index ===2) {setIsFirstRender(false)};
    //     if(isBattling){
    //     setTimeout(() => {
    //       console.log(line)
    //       return <p key={index}>{line}</p>
          
         
    //     },index *1000)
    //   }
    //   //  console.log(setTimeout(() => {return <p key={index}>{line}</p>},index))
    //    return console.log('done looping')
    //   })
    // }


    useEffect(()=>{
      // console.log('pokemonInfo',pokemonInfo)
      
      if(!pokemonChosen) return 
      if (Object.keys(pokemonInfo).length === 0 || Object.keys(pokemonTwoInfo).length === 0 ) return

      if(pokemonInfo.moves.length > 0){

        randomMoves(pokemonInfo.moves.length, true)
        randomMoves(pokemonTwoInfo.moves.length, false)
        
      }
        setIsFirstRender(false)
    },[pokemonTwoInfo])
    

    return (
        <>
        <Row>
            <Col xs={3} md={2}>
            <Card className="firstCard">
           <Card.Body className="stats">
             
             {pokemonChosen && pokemonInfo.stats ?  <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>{pokemonInfo.stats[0].stat.name}</th>
      <th>{pokemonInfo.stats[0].base_stat}</th>

    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{pokemonInfo.stats[1].stat.name}</td>
      <td>{pokemonInfo.stats[1].base_stat}</td>

    </tr>
    <tr>
      <td>{pokemonInfo.stats[2].stat.name}</td>
      <td>{pokemonInfo.stats[2].base_stat}</td>

    </tr>
    <tr>
      <td>{pokemonInfo.stats[3].stat.name}</td>
      <td >{pokemonInfo.stats[3].base_stat}</td>
    </tr>
    <tr>
      <td>{pokemonInfo.stats[4].stat.name}</td>
      <td >{pokemonInfo.stats[4].base_stat}</td>
    </tr>
    <tr>
      <td>{pokemonInfo.stats[5].stat.name}</td>
      <td >{pokemonInfo.stats[5].base_stat}</td>
    </tr>
  </tbody>
</Table>: null}
            
      
           </Card.Body>
         </Card>
           </Col>
           <Col xs={3} md={3}>
           <Card.Img variant="top" className="firstImage" src={pokemonInfo.sprites? pokemonInfo.sprites.front_default : "Nothing here"} />
           <Card.Title>{ pokemonInfo.name ? pokemonInfo.name.toUpperCase() : null }</Card.Title>
             {pokeMoves.length > 0? 
             <Table striped bordered hover size="sm" variant="light">
            <tbody className="abilities">
                <tr>
                 <td> {pokeMoves[0].name}</td>
                  </tr>
                  <tr>
                 <td> {pokeMoves[1].name}</td>
                  </tr>
                  <tr>
                 <td> {pokeMoves[2].name}</td>
                  </tr>
                  <tr>
                 <td> {pokeMoves[3].name}</td>
                  </tr>
            </tbody>
  </Table> : null }
         </Col>
              <Col md={2}>
                <ListGroup>
              {/* {isBattling? createHistory() : null} */}
              {isBattling ? battleHistory.map((line, index) => {
 return <ListGroup.Item key={index}>{line}</ListGroup.Item>
              })
          : null}
</ListGroup>
              </Col>
         <Col xs={3} md={3}>
         <Card.Img variant="top" src={pokemonTwoInfo.sprites? pokemonTwoInfo.sprites.front_default : "Nothing here"} />
                <Card.Title>{pokemonTwoInfo.name ? pokemonTwoInfo.name.toUpperCase(): null}</Card.Title>
                {secondPokeMoves.length > 0 ? 
             <Table striped bordered hover size="sm" variant="light">
            <tbody className="abilities">
            <tr>
                 <td> {secondPokeMoves[0].name}</td>
                  </tr>
                  <tr>
                 <td> {secondPokeMoves[1].name}</td>
                  </tr>
                  <tr>
                 <td> {secondPokeMoves[2].name}</td>
                  </tr>
                  <tr>
                 <td> {secondPokeMoves[3].name}</td>
                  </tr>
            </tbody>
  </Table> : null }
         </Col>
         <Col xs={3} md={2}>
         <Card className="secondCard">
                <Card.Body className="stats">
                {pokemonChosen && pokemonTwoInfo.stats ? 
                <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>{pokemonTwoInfo.stats[0].stat.name}</th>
      <th>{pokemonTwoInfo.stats[0].base_stat}</th>

    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{pokemonTwoInfo.stats[1].stat.name}</td>
      <td>{pokemonTwoInfo.stats[1].base_stat}</td>

    </tr>
    <tr>
      <td>{pokemonTwoInfo.stats[2].stat.name}</td>
      <td>{pokemonTwoInfo.stats[2].base_stat}</td>

    </tr>
    <tr>
      <td>{pokemonTwoInfo.stats[3].stat.name}</td>
      <td >{pokemonTwoInfo.stats[3].base_stat}</td>
    </tr>
    <tr>
      <td>{pokemonTwoInfo.stats[4].stat.name}</td>
      <td >{pokemonTwoInfo.stats[4].base_stat}</td>
    </tr>
    <tr>
      <td>{pokemonTwoInfo.stats[5].stat.name}</td>
      <td >{pokemonTwoInfo.stats[5].base_stat}</td>
    </tr>
  </tbody>
</Table> :
null

}
                
            </Card.Body>
         </Card>
         
  </Col>
         </Row>
        </>
    )
}
