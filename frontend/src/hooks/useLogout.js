import { useAuthContext } from "./useAuthContext";
import { useTransactionsContext } from "./useTransactionsContext";

export const useLogout = () => {
    const {dispatch} = useAuthContext();
    const {dispatch: transactionsDispatch} = useTransactionsContext();

    const logout = async () => {
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
        transactionsDispatch({ type: "SET_TRANSACTIONS", payload: null });
    }
    return { logout };
}