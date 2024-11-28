import { useEffect, useState } from "react";

/**
 * Custom hook created for Fetching data from URL
 */
const useFetchData = (url) => {
  const [fetchedData, setFetchedData] = useState({});

  const fetchData = async () => {
    const data = await fetch(url);
    if (!data.ok) {
      throw new Error("Failed to fetch data from api");
    }
    const jsonData = await data.json();
    setFetchedData(jsonData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return fetchedData;
};

export default useFetchData;
