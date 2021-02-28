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
//If no pokemon loses, call it a tie so you don't go insane
//Problem is that the current move is not being updated and sometimes pokemon will use the last move that was set 


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
    const [isFightOver,setIsFightOver] = useState(true)
    const [move, setMove] = useState('')
    const [moveInfo, setMoveInfo] = useState({});
    const [secMoveInfo,setSecMoveInfo] = useState({});
    const [counterMove,setCounterMove] = useState('')
    const firstAbility = useRef('')
    const secondAbility = useRef('')
    const abilityInfo = useRef('')
    const rightAbilityInfo = useRef('')
    const [doneThinking,setDoneThinking] = useState(false)
    const [attack, setAttack] = useState(false)
    // const [leftAttackFirstRnd,setLeftAttackFirstRnd] = useState(false);
    let leftAttackFirstRnd = false
    const [secondRound, setSecondRound] = useState(false)
    // const secAbilityInfo = useRef('')

    

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
        leftAttackFirstRnd = false
        setPokemonChosen(true)
        setIsBattling(false)
        setIsFightOver(true)
        setDoneThinking(false)
        setSecondRound(()=>false)
        setBattleHistory([])
        setMove('')
        setCounterMove('')
        setAttack(()=> false)
        // console.log('Pokemon chosen, isBattling false, battleHistory empty')
    }

    function getMoveInfo(name){
        setDoneThinking(() => false)
        axios.get(`https://pokeapi.co/api/v2/move/${name}`).then(res => {
            console.log('res',res.data)
            debugger;
            if(secondRound){
                leftAttackFirstRnd ? rightAbilityInfo.current = res.data : abilityInfo.current = res.data 
                console.log('left attacking first round:',leftAttackFirstRnd)
            }else{
                leftAttackFirstRnd ? abilityInfo.current = res.data : rightAbilityInfo.current = res.data;
                console.log('left attacking first round:',leftAttackFirstRnd)
            }
            // setMoveInfo(() => res.data)
            
            let didDmg = willHit(res.data.accuracy)
            //this attack state change will trigger battle function in a useEFfect
            setAttack(() => didDmg)
            
           
    },
    (error => console.log(error))
        )
       
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
        
        setDoneThinking(() => false)
        debugger;
        if(pokemonInfo.stats[5].base_stat > pokemonTwoInfo.stats[5].base_stat){
          //first pokemon attacks
          leftAttackFirstRnd = true;
          firstAbility.current = pokeMoves[Math.floor(Math.random()  * Math.floor(pokeMoves.length))].name
        
          getMoveInfo(firstAbility.current) 
         setMove(firstAbility.current)
            

        }else{
            //second poke attacks first
          

            firstAbility.current = secondPokeMoves[Math.floor(Math.random()  * Math.floor(secondPokeMoves.length))].name
            getMoveInfo(firstAbility.current)
            setMove(firstAbility.current)
            
            

        }
        

    }

useEffect(() => {
    let history = [...battleHistory];
    let event ='';
    // debugger;
    if(!isBattling || doneThinking === true) return
    if(!pokemonInfo || !pokemonTwoInfo) return;
    
                    let firstPokeCurrHp = pokemonInfo.stats[0].base_stat;
                    let secondPokeCurrHp = pokemonTwoInfo.stats[0].base_stat;
                    let firstPokeName = `${!pokemonInfo ? '': pokemonInfo.name}`
                    let secondPokeName = `${!pokemonTwoInfo ? '' : pokemonTwoInfo.name}`
                    // debugger;
                    if(leftAttackFirstRnd){
                                if(attack === undefined) return
                                if(attack === null){
                                    debugger;
                                    event = `${firstPokeName} uses ${firstAbility.current},${abilityInfo.current ? abilityInfo.current.effect_entries[0].short_effect : 'It has no effect' }`
                                   
                                    console.log('Current event to be shown so far', event)

                                } else if(!attack){
                                    secondPokeCurrHp = 
                                    event = `${firstPokeName} attacks, Oh no!, ${firstAbility.current} missed`;
                                    console.log('Current event to be shown', event)
                                    setIsFightOver(false)
                                
                                } 
                                else{
                                    //first attack landed, second poke loses health
                                    console.log(abilityInfo)
                                
                                    // secondPokeCurrHp = pokemonTwoInfo.stats[0].base_stat - pokemonInfo.stats[1].base_stat;  
                                    debugger
                                    secondPokeCurrHp = pokemonTwoInfo.stats[0].base_stat - (abilityInfo.current.power == null ? 0 : abilityInfo.current.power) ;  
                                        if(secondPokeTotalHp === secondPokeCurrHp){
                                            event = `${firstPokeName} strikes first!,${firstPokeName} uses ${firstAbility.current}, ${abilityInfo.current ? abilityInfo.current.effect_entries[0].short_effect : 'It has no effect' }`
                                        }else{
                                        setSecondPokeHealth(()=>secondPokeCurrHp)
                                        event = `${firstPokeName} strikes first!,${firstPokeName} uses ${firstAbility.current},${secondPokeName} health is now ${secondPokeCurrHp < 0 ? 0 : secondPokeCurrHp}` 
                                        }         
                                }
                                
                                if(attack === undefined) return
                           
                                //Can do this check with secondPokeCurrHp === 0 || firstPokeCurrHp === 0  then setIsFightOver to true otherwise setISFightOver to false
                                if(secondPokeCurrHp > 0){
                                    setIsFightOver(()=>false)
                                    setDoneThinking(()=>false)
                                    setSecondRound(()=>true)
                                    
                                    history = event.split(',')
                                    setBattleHistory(history);
                                    }else{
                                         setIsFightOver(()=>true)
                                        setDoneThinking(()=>true)
                                        history = event.split(',')
                                        setBattleHistory(history);
                                        }
                    //full battle log is set
                                  debugger
                     
                    
                    }else{
                        if(attack === undefined) return
                        
                                if(attack === null){
                                    event = `${secondPokeName} uses ${firstAbility.current},${rightAbilityInfo.current ? rightAbilityInfo.current.effect_entries[0].short_effect : 'It has no effect...'}`
                                    
                                    
                                    
                                
                                }else if(!attack )
                                {
                                      event = `${secondPokeName} attacks, Oh no!, ${firstAbility.current} missed`;
                                      
                                    //   firstPokeCurrHp = pokemonInfo.stats[0].base_stat
                                } 
                                 else{
                                    //Second poke attack lands, first poke health is lost
                                    console.log(firstAbility.current)
                                
                                
                                     firstPokeCurrHp = pokemonInfo.stats[0].base_stat - (rightAbilityInfo.current.power == null ? 0 : rightAbilityInfo.current.power)
                                           
                                        if(firstPokeTotalHp === firstPokeCurrHp){
                                            event =`${secondPokeName} strikes first!, ${secondPokeName} uses ${firstAbility.current}, ${rightAbilityInfo.current ? rightAbilityInfo.current.effect_entries[0].short_effect  : 'It has no effect...'}`
                                        }else{
                                         setFirstPokeHealth(()=>firstPokeCurrHp)
                                         event =`${secondPokeName} strikes first!, ${secondPokeName} uses ${firstAbility.current}, ${firstPokeName} health is now ${firstPokeCurrHp < 0 ? 0 : firstPokeCurrHp}` 
                                        }
                                
                                         
                                    }
                                //set battle history
                                
                                if(firstPokeCurrHp > 0){
                                    setIsFightOver(()=>false)
                                    setSecondRound(()=>true)
                                    setDoneThinking(()=>false)
                                    history = event.split(',')
                                    setBattleHistory(() =>history);
                                    }else{
                                         setIsFightOver(()=>true)
                                        setDoneThinking(()=>true)
                                        history = event.split(',')
                                        setBattleHistory(history);
                                        }                           
                    }

        // firstPokeCurrHp <= 0 ? console.log(`${secondPokeName} wins`) : console.log(`${firstPokeName} wins`);

}, [attack])


useEffect(() => {

    let continuedBattle = [...battleHistory]
    // debugger;
                if(isFightOver) return
                if(!secondRound) return
                if(leftAttackFirstRnd && isBattling){
                    
                    if(secondPokeHealth > 0){
                        //second poke not dead, counter attack first pokemon
                        secondAbility.current = secondPokeMoves[Math.floor(Math.random() * Math.floor(secondPokeMoves.length))].name
                         getMoveInfo(secondAbility.current)
                        setCounterMove(secondAbility.current)
                        //second poke attack missed and using right ability
                        debugger
                                if(attack === null){
                                    continuedBattle += `,${pokemonTwoInfo.name} uses ${secondAbility.current}, This ${rightAbilityInfo.current ? 'is a non damaging ability,' : rightAbilityInfo.current.effect_entries[0].short_effect}`
                                    console.log('Continued fight...Right Ability does no dmg but it does this:',rightAbilityInfo.current.effect_entries[0].short_effect)
                                    // setDoneThinking(true)

                                }else if(!attack){

                                    continuedBattle += `,${pokemonTwoInfo.name} attacks,Oh no!, ${secondAbility.current} missed`;
                                    setIsFightOver(() =>false)
                                    }         
                                //second poke attack landed
                                    else{
                                     // firstPokeCurrHp = pokemonInfo.stats[0].base_stat - pokemonTwoInfo.stats[1].base_stat 
                                    
                                    let firstPokeCurrHp = pokemonInfo.stats[0].base_stat -  (rightAbilityInfo.current.power == null ? 0 : rightAbilityInfo.current.power)
                                    console.log('this is the ability dmg', rightAbilityInfo.current.power)
                                    console.log('Ability to be used:',rightAbilityInfo)

                                    
                                     setFirstPokeHealth(firstPokeCurrHp)
                                     if(firstPokeCurrHp === firstPokeTotalHp && !doneThinking){
                                        continuedBattle =`,${pokemonTwoInfo.name} uses ${secondAbility.current}, ${rightAbilityInfo.current ? rightAbilityInfo.current.effect_entries[0].short_effect  : 'It has no effect...'}`

                                     }else{
                                         continuedBattle += `,${pokemonTwoInfo.name} uses ${secondAbility.current}, ${pokemonInfo.name} health is now ${firstPokeCurrHp < 0 ? 0 : firstPokeCurrHp}`

                                     }
                                    }        
                                    
                                    setBattleHistory(()=> continuedBattle.split(','))
                                    setDoneThinking(()=> true)
                    }
                
                }else{

                    if(firstPokeHealth > 0  && isBattling){
                        //first poke not dead, they counter and use ability
                        secondAbility.current = pokeMoves[Math.floor(Math.random() * Math.floor(pokeMoves.length))].name
                        
                        getMoveInfo(secondAbility.current)
                        setCounterMove(secondAbility.current)
                        
                        debugger;
                            if(attack === null){
                                continuedBattle += `,${pokemonInfo.name} uses ${secondAbility.current}, This ${abilityInfo.current ? abilityInfo.current.effect_entries[0].short_effect : 'is a non damaging ability'}`
                            

                            }else if(!attack)
                                {
                                    continuedBattle += `,${pokemonInfo.name} attacks,Oh no!, ${secondAbility.current} missed`;
                                    setBattleHistory(()=> continuedBattle.split(','));
                                
                                }
                                else
                                {
                                    //first poke counter lands, second poke loses health
                                    
                                    let secondPokeCurrHp = pokemonTwoInfo.stats[0].base_stat - (abilityInfo.current.power == null ?  0 : abilityInfo.current.power)
                                    setSecondPokeHealth(secondPokeCurrHp)
                                    if(secondPokeCurrHp === secondPokeTotalHp){
                                        continuedBattle += `,${pokemonInfo.name} uses ${secondAbility.current}, ${abilityInfo.current ? abilityInfo.current.effect_entries[0].short_effect  : 'It has no effect...'}`

                                    }else{
                                        continuedBattle += `,${pokemonInfo.name} uses ${secondAbility.current}, ${pokemonTwoInfo.name} health is now ${secondPokeCurrHp < 0 ? 0 : secondPokeCurrHp}`
                                    }
                                     
                                   //If the current health has not changed then state the effect of the non damaging ability
                                    // if(secondPokeCurrHp === secondPokeTotalHp){
                                    //     continuedBattle += `${secondAbility.current} `
                                    // }
                                
                                }
                                
                                setBattleHistory(()=> continuedBattle.split(','));
                                setDoneThinking(()=>true)
                            }
                            
                        }
                        

                
            
}, [isFightOver])



useEffect(() => {

    if(isBattling){       
        pokemonBattle();
    }
}, [isBattling])

useEffect(() => {
    if(doneThinking && isBattling){
        if(firstPokeHealth > 0 && secondPokeHealth > 0){
            let tie = [...battleHistory, 'The Battle is a Tie!']
            setBattleHistory(()=> tie)
        }else if(firstPokeHealth === 0){
            setBattleHistory(()=> [...battleHistory,`${pokemonTwoInfo.name} wins!`])
        }else if(secondPokeHealth === 0){
            setBattleHistory(()=> [...battleHistory,`${pokemonInfo.name} wins!`])

        }
    }
}, [doneThinking])
// useEffect(() => {
//     !firstPokeHealth || !secondPokeHealth ? setIsFightOver(true) : setIsFightOver(false)

// }, [firstPokeHealth,secondPokeHealth])

// useEffect(() => {
//     debugger;
//     moveInfo ? willHit(moveInfo.accuracy) : willHit(secMoveInfo.accuracy); 
// }, [moveInfo,secMoveInfo])

    return (
        <div>
                <Jumbotron>
                  <h1>Time to Battle!</h1>
                  <p>One Round</p>
                  <div>
                    <Button variant="primary" onClick={choosePokemon}>Choose Pokemon</Button>
                  </div>
                </Jumbotron>
                <div className="battleBg">
                    <div style={{textAlign:'center'}} >
                        { pokemonChosen && !doneThinking ? <Button variant="danger" onClick={startBattle}>Battle!</Button> : '' }
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
