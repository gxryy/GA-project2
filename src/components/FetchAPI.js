import React, { useEffect } from "react";

const FetchAPI = async (url, param, setData) => {
  try {
    console.log(`fetching API`);
    const response = await fetch(url, param);
    if (response.status !== 200) {
      throw new Error("Something went wrong.");
    }
    const data = await response.json();
    setData(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default FetchAPI;
