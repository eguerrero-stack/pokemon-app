// import React from 'react';
// import axios from 'axios'


export function willHit(accuracy){
    if(accuracy === 100) return true
    if(accuracy === undefined || accuracy === null) return null

    const hitChance = Math.floor(Math.random()  * Math.floor(100))
    debugger;
  

   if(accuracy < hitChance) {
       console.log(false,'Should miss')
        return false
   } else{
       console.log(true,'should hit')
    return true
   }  



   
}