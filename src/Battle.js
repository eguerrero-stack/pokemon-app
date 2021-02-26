import React,{useEffect, useState,useRef} from 'react'

import {Jumbotron, Button, Card} from "react-bootstrap";
import PokeBattleCards from "./PokeBattleCards";
import {willHit} from "./battleFn";
import "./Battle.css"
import axios from "axios"
export default function Battle() {

//@TODO 
// eventually have the battle log slowly reveal the events without having it loop over like crazy
//on the Pokedex side have the ability to click and view more details about any given pokemon with pie charts including the stats would be dope
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
    const [isFightOver,setIsFightOver] = useState(false)
    const [move, setMove] = useState('')
    const [moveInfo, setMoveInfo] = useState({});
    const [secMoveInfo,setSecMoveInfo] = useState({});
    const [counterMove,setCounterMove] = useState('')
    const firstAbility = useRef('')
    const secondAbility = useRef('')
    const abilityInfo = useRef('')
    const [doneThinking,setDoneThinking] = useState(false)
    const [attack, setAttack] = useState(false)
    // const secAbilityInfo = useRef('')

    //Main problem is that the axios call is returning undefined which throws everything off. this way i am thinking i should handle the  battle logic 
    //within a different function outside of start battle.
    //useEffect that tracks attack will start battle logic. the attack will be set once the chosen pokemon has an attack with a calculated hit or not
    

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
        setMove('')
        setCounterMove('')
        // console.log('Pokemon chosen, isBattling false, battleHistory empty')
    }

    function getMoveInfo(name){
        setDoneThinking(() => false)
        axios.get(`https://pokeapi.co/api/v2/move/${name}`).then(res => {
            console.log('res',res.data)
            // setMoveInfo(() => res.data)
            abilityInfo.current = res.data
            let didDmg = willHit(res.data.accuracy)
            //this attack state change will trigger battle function in a useEFfect
            setAttack(() => didDmg)
            debugger;
           
    },
    (error => console.log(error))
        )
        // .then((res)=> {
        //     debugger;
            
        //     return res;

        // })
        // .finally(()=> setDoneThinking(() =>true))
    }
    const startBattle = () => {
        //  console.log(`${pokemonInfo.name} vs ${pokemonTwoInfo.name}`);
        
        if(pokemonInfo && pokemonTwoInfo){ 
            setIsBattling(true)        
        }
       
        if(firstPokeHealth !== firstPokeTotalHp || secondPokeHealth !== secondPokeTotalHp){
            continueBattle()

        }
    }

    let continueBattle = () => {
        //This would be called to continue the battle if both pokemon are still alive 
        console.log('The fight is not over!')
        

    }




    let pokemonBattle =() => {
        let history = [...battleHistory];
        let event ='';
        if(!pokemonInfo || !pokemonTwoInfo) return;
        let firstPokeCurrHp;
        let secondPokeCurrHp;
        let firstPokeName = `${pokemonInfo.name.toUpperCase()}`
        let secondPokeName = `${pokemonTwoInfo.name.toUpperCase()}`
        // let didHit;
        setDoneThinking(() => false)
        if(pokemonInfo.stats[5].base_stat > pokemonTwoInfo.stats[5].base_stat){
          //first pokemon attacks
        //   setDoneThinking(() => false)
        
            firstAbility.current = pokeMoves[Math.floor(Math.random()  * Math.floor(pokeMoves.length))].name
            
            setMove(firstAbility.current)
            // debugger;
            getMoveInfo(firstAbility.current)
            debugger;
            if(attack === undefined) return
            if(attack === null){
                console.log(abilityInfo)
                return
            }
            //first poke attack missed
            if(!attack){
                debugger
                secondPokeCurrHp = pokemonTwoInfo.stats[0].base_stat
                 event = `${firstPokeName} attacks, Oh no!, ${firstAbility.current} missed`;
            } 
            else{
                //first attack landed, second poke loses health
                console.log(abilityInfo)

                secondPokeCurrHp = pokemonTwoInfo.stats[0].base_stat - pokemonInfo.stats[1].base_stat;  
                setSecondPokeHealth(secondPokeCurrHp)
                event = `${firstPokeName} strikes first!,${firstPokeName} uses ${firstAbility.current},${secondPokeName} health is now ${secondPokeCurrHp < 0 ? 0 : secondPokeCurrHp}` 
            }

                if(secondPokeCurrHp > 0){
                    //second poke not dead, counter attack first pokemon
                    secondAbility.current = secondPokeMoves[Math.floor(Math.random()  * Math.floor(secondPokeMoves.length))].name
                     getMoveInfo(secondAbility.current)
                    setCounterMove(secondAbility.current)
                    //second poke attack missed
                    debugger
                    if(attack === null){
                        console.log(abilityInfo)
                        return
                    }
                    if(!attack){
                        event += `${secondPokeName} attacks,Oh no!, ${secondAbility.current} missed`;
                   } 
                   //second poke attack landed
                   else{
                    firstPokeCurrHp = pokemonInfo.stats[0].base_stat - pokemonTwoInfo.stats[1].base_stat 
                    setFirstPokeHealth(firstPokeCurrHp)
                    console.log(abilityInfo)
                    event += `,${secondPokeName} uses ${secondAbility.current}, ${firstPokeName} health is now ${firstPokeCurrHp < 0 ? 0 : firstPokeCurrHp}`
                   }


                }
            //full battle log is set
            attack === undefined ?  setDoneThinking(false) : setDoneThinking(true)
             history = event.split(',')
            setBattleHistory(history);
            debugger;

        }else{
            //second poke attacks first
            firstAbility.current = secondPokeMoves[Math.floor(Math.random()  * Math.floor(secondPokeMoves.length))].name
            setMove(firstAbility.current)
            // debugger;
            getMoveInfo(firstAbility.current)
            

                    if(attack === undefined) return

                    if(attack === null){
                        console.log(firstAbility.current)
                        return
                    }
                    //second Pokemon misses
                    debugger;
                     if(!attack){
                          event = `${secondPokeName} attacks, Oh no!, ${firstAbility.current} missed`;
                          firstPokeCurrHp = pokemonInfo.stats[0].base_stat
                     } 
                     else{
                        //Second poke attack lands, first poke health is lost
                        console.log(firstAbility.current)

                         firstPokeCurrHp = pokemonInfo.stats[0].base_stat - pokemonTwoInfo.stats[1].base_stat;  
                         setFirstPokeHealth(firstPokeCurrHp)
                         event =`${secondPokeName} strikes first!, ${secondPokeName} uses ${firstAbility.current}, ${firstPokeName} health is now ${firstPokeCurrHp < 0 ? 0 : firstPokeCurrHp}` 
                     }
                    
                 
                     
                            if(firstPokeCurrHp > 0){
                                //first poke not dead, they counter
                                secondAbility.current = pokeMoves[Math.floor(Math.random()  * Math.floor(pokeMoves.length))].name
                                getMoveInfo(secondAbility.current)
                                setCounterMove(secondAbility.current)
                                debugger;
                                if(attack === null){
                                    console.log(secondAbility.current)
                                    return
                                }
                                // first poke counter attack misses
                                    if(!attack){
                                        event += `${firstPokeName} attacks,Oh no!, ${secondAbility.current} missed`;
                                    }else{
                                        //first poke counter lands, second poke loses health
                                        secondPokeCurrHp = pokemonTwoInfo.stats[0].base_stat - pokemonInfo.stats[1].base_stat 
                                        setSecondPokeHealth(secondPokeCurrHp)
                                         console.log(secondAbility.current)
                                        event += `,${firstPokeName} uses ${secondAbility.current}, ${secondPokeName} health is now ${secondPokeCurrHp < 0 ? 0 : secondPokeCurrHp}`
                                    
                                    }
                                }
                                //set battle history
                                attack === undefined ?  setDoneThinking(false) : setDoneThinking(true)
                    history = event.split(',')
                    setBattleHistory(history);
                    debugger;
                    // setDoneThinking(true);
        }
        
        firstPokeCurrHp <= 0 ? console.log(`${secondPokeName} wins`) : console.log(`${firstPokeName} wins`);

    }

// useEffect(() => {
 

    
// }, [attack)






useEffect(() => {

    if(isBattling){
        
        pokemonBattle();

    }
    // console.log('history', battleHistory)
}, [isBattling])

useEffect(() => {
    !firstPokeHealth || !secondPokeHealth ? setIsFightOver(true) : console.log('The battle continues')

}, [firstPokeHealth,secondPokeHealth])

// useEffect(() => {
//     debugger;
//     moveInfo ? willHit(moveInfo.accuracy) : willHit(secMoveInfo.accuracy); 
// }, [moveInfo,secMoveInfo])

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
                            doneThinking={doneThinking}
                            /> 
                            : 
                            <div className="waiting">

                            <h1 style={{textAlign:'center'}}>Waiting for Battle...</h1>
                            </div>
                            }         
                 </div>
        </div>
    )
}
