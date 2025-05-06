import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [errors, setErrors] = useState(null);

    const fetchData = async () => {
        const token = localStorage.getItem("authToken");
        const headers = {
            "Content-Type": "application/json",
        };
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        try {
            const response = await fetch(url, { headers });

            if (!response.ok) {
                throw new Error(
                    `Error ${response.status}: ${response.statusText}`
                );
            }

            const result = await response.json();
            setData(result);
        } catch (error) {
            setErrors(error);
            toast.error(`Failed to fetch data: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    return { data, errors };
};

export default useFetch;
