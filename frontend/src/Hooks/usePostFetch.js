import { useCallback ,useState} from "react";

const DEFAULT_OPTIONS = {
    headers: { "Content-Type": "application/json" },
}

export const usePostFetch = (endpoint, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {

        setLoading(true)
        setError(null);
        try {
            const response = await fetch(`/api/${endpoint}`, ...DEFAULT_OPTIONS, ...options)

            const json = await response.json()

            if (!response.ok) {
                setError(json.error)
                return;
            }

            if (response.ok) {
                setData(data)
            }

        } catch (error) {
            console.log("Error: ", error)

        } finally {
            setLoading(false)
        }
    },[endpoint])

    return { data, loading, error};
}

