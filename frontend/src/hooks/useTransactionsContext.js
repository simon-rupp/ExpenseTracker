import { TransactionContext } from "../context/transactionContext";
import { useContext } from "react";

export const useTransactionsContext = () => {
    const context = useContext(TransactionContext)

    if (!context) {
        throw Error("useTransactionsContext must be used within a TransactionContextProvider")
    }

    return context
}