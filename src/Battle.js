import React,{useEffect, useState} from 'react'

import {Jumbotron, Button, Card} from "react-bootstrap";
import PokeBattleCards from "./PokeBattleCards";
import "./Battle.css"
import axios from "axios"
export default function Battle() {

//@TODO add a battle background

    const [pokemonInfo, setPokemonStats] = useState({});
    const [pokemonTwoInfo, setpokemonTwoInfo] = useState({});
    const [pokemonChosen, setPokemonChosen] = useState(false)
    const [isBattling, setIsBattling] = useState(false);
    const [pokeMoves,setPokeMoves] = useState([]);
    const [secondPokeMoves, setSecondPokeMoves] = useState([]);
    let randomNum = () => {
        return Math.floor(Math.random()  * Math.floor(809))
    }

    let getFirstPokemon = () =>{
        const firstNum = randomNum();
        const firstPoke = axios.get(`https://pokeapi.co/api/v2/pokemon/${firstNum}`)
        
        return firstPoke;
        
    }
    let getSecondPokemon = () => {
        const secondNum = randomNum();
        const secondPoke = axios.get(`https://pokeapi.co/api/v2/pokemon/${secondNum}`)

        return secondPoke;
    }
    let choosePokemon = () => {
        
        axios.all([getFirstPokemon(), getSecondPokemon()]).then(axios.spread((...res) => {
            let firstPokemon = res[0].data;
          
            setPokemonStats(firstPokemon);  
            let secondPokemon = res[1].data;
            // debugger;
            setpokemonTwoInfo(secondPokemon)
        })).catch(e =>{
            console.log('Axios.all error',e);
        })

        setPokemonChosen(true)
       setIsBattling(false)
        console.log('Pokemon chosen')
    }


    const startBattle = () => {
         console.log(`${pokemonInfo.name} is battling ${pokemonTwoInfo.name}`);
        // console.log('Pokemon Battle', pokemonTwoInfo);
        if(pokemonInfo && pokemonTwoInfo){ 
            setIsBattling(true)        
        }
    }


useEffect(()=>{
    // debugger;
    if(!pokemonInfo && !pokemonTwoInfo){
        setPokemonChosen(false)
        setIsBattling(false)
    }
})
    
useEffect(() => {
    let firstPokemonWins;
    if(isBattling){
        
        
       firstPokemonWins = pokemonInfo.stats[1].base_stat > pokemonTwoInfo.stats[1].base_stat
        if(firstPokemonWins){
            console.log(`${pokemonInfo.name} uses ${pokeMoves[Math.floor(Math.random()  * Math.floor(pokeMoves.length))].name}`);
            console.log(`${pokemonInfo.name} wins`)
        }else{
            console.log(`${pokemonTwoInfo.name} uses ${secondPokeMoves[Math.floor(Math.random()  * Math.floor(secondPokeMoves.length))].name}`);

            console.log(`${pokemonTwoInfo.name} wins`)

        }
    }
}, [isBattling])


    return (
        <div>
            <Jumbotron>
  <h1>Time to Battle!</h1>
  <p>
    Let RNG decide who wins
  </p>
  <div>
    <Button variant="primary" onClick={choosePokemon}>Choose Pokemon</Button>
  </div>
</Jumbotron>
<div className="battleBg">
<div style={{textAlign:'center'}} >
<Button variant="danger" onClick={startBattle}>Battle!</Button>
</div>

{pokemonChosen ? 
<PokeBattleCards 
    pokeMoves={pokeMoves} 
    setPokeMoves={setPokeMoves} 
    setSecondPokeMoves={setSecondPokeMoves} 
    secondPokeMoves={secondPokeMoves} 
    pokemonChosen={pokemonChosen} 
    pokemonInfo={pokemonInfo ? pokemonInfo : null} 
    pokemonTwoInfo={pokemonTwoInfo ? pokemonTwoInfo : null}/> 
    : <h1 style={{textAlign:'center'}}>Waiting for Battle...</h1>}



        </div>
        </div>
    )
}
