import { useQuery} from 'react-query'
import Planet from './Planet'
import React, { useState } from 'react';
import axios from 'axios'

const fetchPlanets = async (page) => {
   const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  return res.json();
   // const res = await axios('http://swapi.dev/api/planets/')
   // return res;
}

const Planets = () => {
   const [ page, setPage ] = useState(1);
   const{data,isPreviousData, status} = useQuery(['planets',page], ()=>fetchPlanets(page), {
      keepPreviousData: true
    } );
   // console.log(data.next);
   
   return (
     <div>
       <h2>Planets</h2>
       {/* <p>{status}</p> */}
       {status === 'loading' && (
        <div>Loading data</div>
      )}

      {status === 'error' && (
        <div>Error fetching data</div>
      )}

      {status === 'success' && (
         <>
         <button 
            onClick={() => setPage(old => Math.max(old - 1, 1))} 
            disabled={page === 1}>
            Previous Page
          </button>
          <span>{ page }</span>
          <button 
             onClick={() => setPage(old =>old+1 )}
            disabled={!data.next }
        >
            Next page
          </button>
            <div>
            { data.results.map(planet => <Planet key={planet.name} planet={planet} /> ) }
            </div>
          </>  
               )} 


     </div>
   );
 }
  
 export default Planets;