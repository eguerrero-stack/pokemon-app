import React, {useState,useEffect} from 'react';
import  PokemonList  from "./PokemonList";
import Search from "./Search"
import Pagination from "./Pagination"
import axios from 'axios';
import { Container,Card } from "react-bootstrap";
import "./App.css"
import background from './images/pokeBackground.jpg'
function App() {
  const [currentPageUrl,setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [pokemonNames, setPokemonNames] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonDataUrls,setPokemonDataUrls] = useState([]);
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
  console.log(res.data);
setNextPageUrl(res.data.next);
setPrevPageUrl(res.data.previous);
setPokemonNames(res.data.results.map(p => p.name))


// @TODO figure out a way to use the names of pokemons to find the image and then display it properly with each corresponding name if I want to have a list of pictures...
//The problem is that the list api doesn't contain the sprites (images)
//@TODO Style search result 



// res.data.results.map(p => {
//   setIsLoading(true)
//   axios.get(p.url).then(res => {
//   setIsLoading(false)
//   setPokemonData([...pokemonData], [res.data])

//     })
//     return null
//   }
// )




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

// useEffect(() => {
//   pokemonNames.map(name => axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then(res => {
//     setPokemonData([res.data]) 
    
 
// },[pokemonNames])
// )})


  
if(isLoading) return "Loading...";

if(isSearching) {
  console.log(pokemonData)
}
  return (
    <>  
    <div className="bgImg">
    <Search setIsSearching={setIsSearching} pokemonData={pokemonData} setPokemonData={setPokemonData}/>
    <Container fluid>
    {isSearching ? 
      <>
          <Card className="pokemonInfo">
           <Card.Img variant="top" src={pokemonData.sprites? pokemonData.sprites.front_default : "Nothing here"} />
           <Card.Body>
             <Card.Title>{pokemonData.name}</Card.Title>
             <Card.Text>
               Pokemon Description
             </Card.Text>
             
           </Card.Body>
         </Card>
      </>
: 
<>
          <PokemonList pokemonNames={pokemonNames} pokemonData={pokemonData} />
          <Pagination 
          goToNextPage={nextPageUrl ? goToNextPage : null}           
          goToPrevPage={prevPageUrl ? goToPrevPage : null}
          />
</>
}
    </Container>
    </div>
    </>
              );
}

export default App;
