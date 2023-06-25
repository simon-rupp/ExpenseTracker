import { useEffect} from "react"

import TransactionDetails from "../components/TransactionDetails"
import { useTransactionsContext } from "../hooks/useTransactionsContext"
import SpendingDisplay from "../components/SpendingDisplay"


const Spending = () => {

    const { transactions, dispatch } = useTransactionsContext()


    useEffect(() => {
        const fetchTransactions = async () => {
            const res = await fetch("/api/transactions")
            const data = await res.json()
            if (res.ok) {
                dispatch({type: "SET_TRANSACTIONS", payload: data})
            }
        }

        fetchTransactions()
    }, [dispatch])

    const Expenses = transactions ? transactions.filter(transaction => transaction.type === "expense") : []

    return (
        <div className="home">
            <><div className="transactions">
                <h2>Your Spending:</h2>
                {Expenses && Expenses.map(transaction => (
                    <TransactionDetails key = {transaction._id} transaction = {transaction}/>
                ))}

            </div>
            <div className="rightSide">
                <SpendingDisplay transactions = {transactions}></SpendingDisplay>
            </div></> 
        </div>
    )
}

export default Spending