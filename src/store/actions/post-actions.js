import { LOAD_POSTS } from "../types"
import React, { useEffect, useState } from 'react';



const [isLoading, setLoading] = useState(true);
const [data, setData] = useState([]);


useEffect(() => {
  fetch('http://www.s1928.konversia.net/api/get_names?name_ids=true&sort=asc')
    .then((response) => response.json())
    .then((json) => setData(json.names))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}, []);


const DATA = data

export const loadPosts = () => {
    return {
        type: LOAD_POSTS,
        payload: DATA
    }
}