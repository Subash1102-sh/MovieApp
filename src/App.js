
import { useEffect, useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

function App() {
  const [movies,setMovies]= useState([]);
  const [favourites,setFavourites]=useState([]);
  const [searchValue,setSearchValue]=useState("");
   const getMovieRequest= async(searchValue) =>{
        const url=` : http://www.omdbapi.com/?i=${searchValue}tt3896198&apikey=82b3d9ce`;
         const response=await fetch(url);
         const responseJson=await response.json();
        if(responseJson.Search){
          setMovies(responseJson.Search);
        }
        
   }
   useEffect(() =>{
     getMovieRequest(searchValue);
   },[searchValue]);
      useEffect(() =>{
        const movieFavourites=
        JSON.parse(localStorage.getItem('react-movie-app-favourites'));
        setFavourites(movieFavourites);
        
      
      },[]);

      const  saveToLocalStorage=(items) =>{
         localStorage.setItem('react-movie-app-favourites',JSON.stringify(items))
      }
  const addFavouriteMovie =(movie) =>{
        const newFavouriteList=[...favourites,movie];
        setFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
    };
    const removeFavoriteMovie=(movie) =>{
          const newFavouriteList=favourites.filter((favourite) =>favourite.imdbID !==movie.imdbID);
          setFavourites(newFavouriteList);
           saveToLocalStorage(newFavouriteList);

    }
  return (
      
    <div className="container-fluid movie-app">
           <div className='row d-flex align-items-center mt-4 mb-4 '>
              <MovieListHeading heading='movies' />
              <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
           </div>
           <div className='row'>
            <MovieList
                    movies={movies} 
                     handleFavouritesClick={addFavouriteMovie}
                     favouriteComponent={AddFavourites}/>
          </div>
          <div className='row d-flex align-items-center mt-4 mb-4 '>
              <MovieListHeading heading='Favourites' />
              
           </div>
           <div className='row'>
            <MovieList
                    movies={favourites} 
                     handleFavouritesClick={removeFavoriteMovie}
                     favouriteComponent={RemoveFavourites}/>
          </div>
    </div>
  );
}

export default App;
