import { useState} from 'react';
import { useQuery } from 'react-query';
import Person from './Person';

const fetchPeople = async (page) => {
  const res = await fetch(`http://swapi.dev/api/people/?page=${page}`);
  return res.json();
}

const People = () => {
   const[page, setPage] = useState(1)
  const { data,isPreviousData, status } = useQuery(['people',page], ()=>fetchPeople(page),{
   keepPreviousData: true
 } );
//   console.log(data);

  return (
    <div>
      <h2>People</h2>
      {/* { status } */}

      {status === 'loading' && (
        <div>Loading data</div>
      )}

      {status === 'error' && (
        <div>Error fetching data</div>
      )}

      {status === 'success' && (
         <>
            <button 
            onClick={()=>setPage(old=>Math.max(old-1, 1))}
            disabled={page === 1}>
            Previous Page
            </button>
            <span>{ page }</span>
            <button 
            onClick={()=>setPage(old=>old+1)}
            disabled={!data.next}>
            Next Page
            </button>

            <div>
               { data.results.map(person => <Person key={person.name} person={person} /> ) }
            </div>
         </>   
      )} 
    </div>
  );
}
 
export default People;