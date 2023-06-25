import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useRegister = () => {
    const { dispatch } = useAuthContext();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const register = async (username, password, confirmPassword) => {
        setLoading(true);
        setError(null);


        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }
        
        const response = await fetch("/api/user/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setLoading(false);
        }
        else {
            // save user to local storage
            localStorage.setItem("user", JSON.stringify(json));

            setError(null);
            setLoading(false);
            dispatch({ type: "LOGIN", payload: json });
        }

        
    }

    return { error, loading, register };
}