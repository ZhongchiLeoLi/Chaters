
import { useState, useEffect } from 'react';

// Check whether or not a value that is initialized as undefined has been updated to the expected data type.
// In the case of authentication, it checks if the authUser has been updated to an user object or null

export const useResolved = (
    ...vals
) => {
    const [resolved, setResolved] = useState(false);

    useEffect(() => {
        setResolved(vals.every(v => v !== undefined));
    }, [vals]);

    // Returns true if resolved otherwise false
    return resolved;
};