import { useEffect } from "react";

// Custom hook for dynamically updating document title
const useTitle = (title) => {
    // Effect to update document title when title prop changes
    useEffect(() => {
        // Store the previous title to restore on component unmount
        const prevTitle = document.title;
        // Update the document title with the new title
        document.title = title;

        // Cleanup function to restore the previous title on unmount
        return () => {
            document.title = prevTitle;
        };
    }, [title]); // Re-run effect when the title prop changes
};

export default useTitle;
