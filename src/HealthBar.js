import React,{useState, useEffect} from 'react'
import {useSpring, animated} from 'react-spring'
import "./HealthBar.css"
export default function HealthBar({pokeHealth,pokeTotalHp}) {

const [isAttacking, setIsAttacking] = useState(false)
const [width, setWidth] = useState(100)
const props = useSpring({width: isAttacking ? `${width}%`: `100%` })



    useEffect(() => {
        
       if(pokeHealth === pokeTotalHp) return;

        setIsAttacking(true)
        if(pokeHealth === 0 || pokeHealth < 0) {

            setWidth(0)
        }else{
            let barWidth = (pokeHealth / pokeTotalHp) * 100
                setWidth(barWidth)

        }
    

    }, [pokeHealth])

    useEffect(() => {
       setIsAttacking(false);
       setWidth(pokeTotalHp)
    }, [pokeTotalHp])


    return (
        <div className="health-bar" data-total={pokeTotalHp} data-value={pokeHealth}>
                  {/* <p>{pokeHealth < 0 ? 0 : pokeHealth}</p> */}
            <animated.div className="bar" style={props}>
  	            {/* <animated.div class="hit">{pokeHealth < 0 ? 0 : pokeHealth}</animated.div> */}
            </animated.div>
        </div>
    )
}
