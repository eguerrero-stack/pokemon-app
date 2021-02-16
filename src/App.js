import React, {useState,useEffect} from 'react';
import  PokemonList  from "./PokemonList";
import Pagination from "./Pagination"
import axios from 'axios';

function App() {
  const [currentPageUrl,setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [pokemon, setPokemon] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let cancel;

const getPokemon = function(){
  setIsLoading(true)
  axios.get(currentPageUrl, {
    //canceltoken leets 
    cancelToken: new axios.CancelToken( c => cancel = c)
  })
.then(res => {
  setIsLoading(false);
  console.log(res.data);
setNextPageUrl(res.data.next);
setPrevPageUrl(res.data.previous);
setPokemon(res.data.results.map(p => p.name))
 },
 (error => { console.log(error)}))
}

function goToNextPage(){
  setCurrentPageUrl(nextPageUrl);
}
function goToPrevPage(){
  setCurrentPageUrl(prevPageUrl)
}

useEffect(() => {
  
 getPokemon();
//returns a function if useEffect gets called twice before it finishes previous func and cancels older call
 return () => cancel()

}, [currentPageUrl])
  
if(isLoading) return "Loading...";

  return (
    <>
          <PokemonList pokemon={pokemon}/>
          <Pagination 
          goToNextPage={nextPageUrl ? goToNextPage : null}           
          goToPrevPage={prevPageUrl ? goToPrevPage : null}
          />
    </>
              );
}

export default App;
