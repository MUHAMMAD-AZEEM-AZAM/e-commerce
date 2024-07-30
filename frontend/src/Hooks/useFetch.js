import { useCallback, useEffect, useState } from 'react';
// import { baseUrl } from '../constants';
// import { handelLogout } from '../utils/helper/HelperFunctions';
import { useSelector } from 'react-redux';

const useFetch = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let token = localStorage.getItem('token');

  if(!token){
    token= useSelector(state => state.token)
    // if(!token){
    //   throw new Error('User Authentication required please Login')
    // }
  }

  const fetchData = useCallback(async () => {
    const controller=new AbortController()
    // if token is null then return

    if (endpoint === null) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/${endpoint}`, {
        signal:controller.signal,
        ...options,
        headers: {
          ...options.headers,
          Authorization:` Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401 && token != null) {
        //   handelLogout();
        }
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    // return ()=>{
    //     controller.abort()
    // }
  }, [endpoint]);

  useEffect(() => {
    // if (typeof token === String) {
    fetchData();
    // }
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;

/**
 *
 * const { data, loading, error, refetch } = useFetch('/endpoint');
 */