import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:3000/"+url)
      .then(response=>response.json())
      .then(data=>setData(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [])

  return {data, setData}
}

export default useFetch;