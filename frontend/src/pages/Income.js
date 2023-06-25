import { useEffect} from "react"

import TransactionDetails from "../components/TransactionDetails"
import { useTransactionsContext } from "../hooks/useTransactionsContext"
import IncomeDisplay from "../components/IncomeDisplay"


const Income = () => {

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

    const Expenses = transactions ? transactions.filter(transaction => transaction.type === "income") : []

    return (
        <div className="home">
            <div className="transactions">
                <h2>Your Income:</h2>
                
                {Expenses && Expenses.map(transaction => (
                    <TransactionDetails key = {transaction._id} transaction = {transaction}/>
                ))}

            </div>
            <div className="rightSide">
                <IncomeDisplay transactions = {transactions}></IncomeDisplay>
            </div>
        </div>
    )
}

export default Income