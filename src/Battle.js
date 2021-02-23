import React,{useEffect, useState} from 'react'

import {Jumbotron, Button, Card} from "react-bootstrap";
import PokeBattleCards from "./PokeBattleCards";
import "./Battle.css"
import axios from "axios"
export default function Battle() {

//@TODO add an hp bar using state with their grabbed stat 
// eventually have the battle log slowly reveal the events without having it loop over like crazy
//on the Pokedex side have the ability to click and view more details about any given pokemon
//Declare winner on some type of banner when health of one of the pokemon goes to 0
//If not showing the battle log then show 'VS'


    const [pokemonInfo, setPokemonInfo] = useState({});
    const [pokemonTwoInfo, setpokemonTwoInfo] = useState({});
    const [pokemonChosen, setPokemonChosen] = useState(false)
    const [isBattling, setIsBattling] = useState(false);
    const [pokeMoves,setPokeMoves] = useState([]);
    const [secondPokeMoves, setSecondPokeMoves] = useState([]);
    const[battleHistory, setBattleHistory] = useState([]);
    const [firstPokeHealth, setFirstPokeHealth] = useState(0);
    const [firstPokeTotalHp, setFirstPokeTotalHp] = useState(0);
    const [secondPokeHealth, setSecondPokeHealth] = useState(0);
    const [secondPokeTotalHp, setSecondPokeTotalHp] = useState(0);

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
          
            setPokemonInfo(firstPokemon);  
            let secondPokemon = res[1].data;
            // debugger;
            setpokemonTwoInfo(secondPokemon)
        })).catch(e =>{
            console.log('Axios.all error',e);
        })

        setPokemonChosen(true)
        setIsBattling(false)
        setBattleHistory([])
        console.log('Pokemon chosen, isBattling false, battleHistory empty')
    }


    const startBattle = () => {
         console.log(`${pokemonInfo.name} vs ${pokemonTwoInfo.name}`);
        
        if(pokemonInfo && pokemonTwoInfo){ 
            setIsBattling(true)        
        }
    }


    let pokemonBattle =() => {
        let history = [...battleHistory];
        let event ='';
        if(!pokemonInfo || !pokemonTwoInfo) return;
        let firstPokeCurrHp;
        let secondPokeCurrHp;

        if(pokemonInfo.stats[5].base_stat > pokemonTwoInfo.stats[5].base_stat){
            secondPokeCurrHp = pokemonTwoInfo.stats[0].base_stat - pokemonInfo.stats[1].base_stat;
             
            setSecondPokeHealth(secondPokeCurrHp)
            event = `${pokemonInfo.name} strikes first!,${pokemonInfo.name} uses ${pokeMoves[Math.floor(Math.random()  * Math.floor(pokeMoves.length))].name},${pokemonTwoInfo.name} health is now ${secondPokeCurrHp < 0 ? 0 : secondPokeCurrHp}` 
            if(secondPokeCurrHp > 0){
            firstPokeCurrHp = pokemonInfo.stats[0].base_stat - pokemonTwoInfo.stats[1].base_stat 
            setFirstPokeHealth(firstPokeCurrHp)
            event += `,${pokemonTwoInfo.name} uses ${secondPokeMoves[Math.floor(Math.random()  * Math.floor(secondPokeMoves.length))].name}, ${pokemonInfo.name} health is now ${firstPokeCurrHp < 0 ? 0 : firstPokeCurrHp}`
            }
             history = event.split(',')
            setBattleHistory(history);
         
        }else{
            firstPokeCurrHp = pokemonInfo.stats[0].base_stat - pokemonTwoInfo.stats[1].base_stat 
            setFirstPokeHealth(firstPokeCurrHp)
            event =`${pokemonTwoInfo.name} strikes first!, ${pokemonTwoInfo.name} uses ${secondPokeMoves[Math.floor(Math.random()  * Math.floor(secondPokeMoves.length))].name}, ${pokemonInfo.name} health is now ${firstPokeCurrHp < 0 ? 0 : firstPokeCurrHp}`
            if(firstPokeCurrHp > 0){
                secondPokeCurrHp = pokemonTwoInfo.stats[0].base_stat - pokemonInfo.stats[1].base_stat 
            setSecondPokeHealth(secondPokeCurrHp)

                event += `,${pokemonInfo.name} uses ${pokeMoves[Math.floor(Math.random()  * Math.floor(pokeMoves.length))].name}, ${pokemonTwoInfo.name} health is now ${secondPokeCurrHp < 0 ? 0 : secondPokeCurrHp}`
                }
            history = event.split(',')
            setBattleHistory(history);
          
        }
        
        firstPokeCurrHp <= 0 ? console.log(`${pokemonTwoInfo.name} wins`) : console.log('...');
        secondPokeCurrHp <= 0 ? console.log(`${pokemonInfo.name} wins`) : console.log('...');

    }




// useEffect(()=>{
//     debugger;
    
//     if(Object.keys(pokemonInfo).length === 0 && Object.keys(pokemonTwoInfo).length === 0){
//         console.log(' setting battle and pokemon chosen to false')
//         setPokemonChosen(false)
//         setIsBattling(false)
//     }
// })
    
useEffect(() => {
    let firstPokemonWins;
    if(isBattling){
        
        pokemonBattle();
    }
    console.log('history', battleHistory)
}, [isBattling])


    return (
        <div>
                <Jumbotron>
                  <h1>Time to Battle!</h1>
                  <p>Let RNG decide who wins</p>
                  <div>
                    <Button variant="primary" onClick={choosePokemon}>Choose Pokemon</Button>
                  </div>
                </Jumbotron>
                <div className="battleBg">
                    <div style={{textAlign:'center'}} >
                        { pokemonChosen ? <Button variant="danger" onClick={startBattle}>Battle!</Button> : '' }
                    </div>

                        {pokemonChosen ? 
                        <PokeBattleCards 
                            isBattling={isBattling}
                            setIsBattling={setIsBattling}
                            battleHistory={battleHistory}
                            pokeMoves={pokeMoves} 
                            setPokeMoves={setPokeMoves} 
                            setSecondPokeMoves={setSecondPokeMoves} 
                            secondPokeMoves={secondPokeMoves} 
                            pokemonChosen={pokemonChosen} 
                            pokemonInfo={pokemonInfo ? pokemonInfo : null} 
                            pokemonTwoInfo={pokemonTwoInfo ? pokemonTwoInfo : null}
                            firstPokeHealth={firstPokeHealth}
                            secondPokeHealth={secondPokeHealth}
                            setFirstPokeHealth={setFirstPokeHealth}
                            setSecondPokeHealth={setSecondPokeHealth}
                            firstPokeTotalHp={firstPokeTotalHp}
                            setFirstPokeTotalHp={setFirstPokeTotalHp}
                            secondPokeTotalHp={secondPokeTotalHp}
                            setSecondPokeTotalHp={setSecondPokeTotalHp}

                            /> 
                            : <h1 style={{textAlign:'center'}}>Waiting for Battle...</h1>}         
                 </div>
        </div>
    )
}
