import Navbar from '../compo/Navbar'
import People from '../compo/People'
import Planets from '../compo/Planets'
import { useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools'

// import styles from '../styles/Home.module.css'

export default function Home() {
   let [page, setPage] = useState('planets');
   

  return (
   <>
       <div className="App">
         <h1>Star Wars Info</h1>
            <Navbar setPage={setPage} />
            <div className="content">
            { page === 'planets' ? <Planets /> : <People /> }
            </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
   </>
  )
}
