import axios from 'axios';
import React, { useEffect } from 'react'

function Test() {
    useEffect(() => {
        axios.get('http://localhost:4000/produit')
        .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          })
        ;
      }, []);
  return (
    <div>
      
    </div>
  )
}

export default Test
