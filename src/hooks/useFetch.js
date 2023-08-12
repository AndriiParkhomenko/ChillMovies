import { useState, useEffect } from "react";

const noop = () => null;

/**
 * Custom hook for performing GET requests
 * 
 * @typedef {Object} Options
 * @property {boolean} enabled
 * @property {Function} onSuccess
 * @property {Function} onError
 * 
 * @param {string} url
 * @param {Options} options
 */ 


export const useFetch = (url, options = {}) => {
const [data, setData] = useState();
const [error, setError] = useState();
const [isFetching, setIsFetching] = useState(false);

const { enabled = true, onSuccess = noop, onError = noop, headers } = options;

const handleRefetch = async () => {
	setIsFetching(true);
	try {
		const response = await fetch(url, { headers });
		const fetchedData = await response.json();

		setData(fetchedData);
		onSuccess(fetchedData);
	} catch (e) {
		setError(e);
		onError(e);
	} finally {
		setIsFetching(false);
	}
};

  useEffect(() => {
    if (!enabled ) return;
    handleRefetch();
  }, [enabled, url]);


return { data , error, refetch: handleRefetch, isFetching};
};