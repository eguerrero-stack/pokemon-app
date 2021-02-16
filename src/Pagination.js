import React from 'react'

export default function Pagination({goToNextPage, goToPrevPage}) {

   
    return (
        <div>
            {goToPrevPage !== null ? <button  onClick={goToPrevPage}>Previous</button> : <button disabled onClick={goToPrevPage}>Previous</button> }
            {goToNextPage !== null ? <button  onClick={goToNextPage}>Next</button> : <button disabled onClick={goToNextPage}>Next</button> }
        </div>
    )
}
