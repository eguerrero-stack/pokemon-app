import React, {useState,useEffect} from 'react';
import  PokemonList  from "./PokemonList";
import Search from "./Search"
import Pagination from "./Pagination"
import Header from "./Header";
import SearchResult from "./SearchResult";
import axios from 'axios';
import { Container } from "react-bootstrap";
import {Link} from "react-router-dom";
import "./App.css"



function App() {
  const [currentPageUrl,setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [pokemonNames, setPokemonNames] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  let cancel;

const getPokemon = function(){
  setIsLoading(true)
  axios.get(currentPageUrl, {
    //canceltoken is part of axios
    cancelToken: new axios.CancelToken( c => cancel = c)
  })
.then(res => {
  setIsLoading(false);
  // console.log(res.data);
setNextPageUrl(res.data.next);
setPrevPageUrl(res.data.previous);
setPokemonNames(res.data.results.map(p => p.name))


 },
 (error => console.log(error)))
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

if(isSearching) {
  console.log(pokemonData)
}
  return (
    <>  
      <div className="bgImg">
          <Header/>
          <Link to="/battle">Battle</Link>
          <Search setIsSearching={setIsSearching} pokemonData={pokemonData} setPokemonData={setPokemonData}/>
              <Container fluid>
                {isSearching ? 
                  <>
                    <SearchResult pokemonData={pokemonData}/>
                  </>
                    : 
                    <>
                      <Pagination 
                      goToNextPage={nextPageUrl ? goToNextPage : null}           
                      goToPrevPage={prevPageUrl ? goToPrevPage : null}
                      />
                      <PokemonList pokemonNames={pokemonNames} pokemonData={pokemonData} />
                   </>
                 }
              </Container>
      </div>
    </>
              );
}

export default App;
