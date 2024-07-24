import { useEffect, useState } from "react";

const UseFetch = (url, dataKey) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Phản hồi mạng không ổn định");
        }
        const result = await res.json();
        setData(result[dataKey] || []);
      } catch (error) {
        setError("Không thể lấy dữ liệu từ máy chủ");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [url, dataKey]);

  return { data, error, isLoading };
};

export default UseFetch;
