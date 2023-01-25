import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/"+url)
      .then(res=>res.json())
      .then(data=>setData(data))
      .catch(err=>console.log("Error", err))
  }, []);

  return {data};
}

export default useFetch;