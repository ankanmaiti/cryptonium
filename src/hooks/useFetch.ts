import { useEffect, useState } from "react";

type URL = `https://${string}`;

export default function useFetch<T>(url: URL) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((data) => data.json())
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [url]);

  return {
    isLoading,
    data,
    error,
  } as const;
}
