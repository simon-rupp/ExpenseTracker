import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const navigate = useNavigate();
    const { dispatch } = useAuthContext();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = async (username, password) => {
        setLoading(true);
        setError(null);

        const response = await fetch("https://wallet-watch-4704a6684e3d.herokuapp.com/user/login", {
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
            navigate("/");
        }
    }

    return { error, loading, login };

}