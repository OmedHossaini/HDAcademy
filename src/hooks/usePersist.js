import { useState, useEffect } from "react";

// Custom hook for handling persistence state in localStorage
const usePersist = () => {
    // Retrieve persist state from localStorage or default to false
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

    // Effect to update localStorage whenever persist state changes
    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(persist));
    }, [persist]);

    // Return the persist state and a function to update it
    return [persist, setPersist];
};

export default usePersist;
