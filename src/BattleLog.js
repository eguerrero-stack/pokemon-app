import React from 'react'
import{ListGroup} from 'react-bootstrap'
export default function BattleLog({battleLog}) {

    //@TODO display battle history in between cards. currently the value is undefined and the keys arent unique 
    // Now I am displaying all of the first pokemon's names...
    //No idea why its rendering multiple when I have already altered the randommove generator function
    // console.log(battleLog) 
    return (
        <ListGroup>
            {battleLog ? battleLog.map((log) => <item key={new Date().getTime()}>{log}</item> ) : <p></p>}
        </ListGroup>
    )
}
