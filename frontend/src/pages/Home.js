import { useEffect} from "react"

import TransactionDetails from "../components/TransactionDetails"
import TransactionForm from "../components/TransactionForm"
import CashFlow from "../components/cashFlow"
import { useTransactionsContext } from "../hooks/useTransactionsContext"
import { useAuthContext } from "../hooks/useAuthContext"


const Home = () => {
    
    const { transactions, dispatch } = useTransactionsContext()
    const { user } = useAuthContext()


    useEffect(() => {
        const fetchTransactions = async () => {
            const res = await fetch("/transactions", {
                headers: {'Authorization': `Bearer ${user.token}`}
              })
            const data = await res.json()
            if (res.ok) {
                dispatch({type: "SET_TRANSACTIONS", payload: data})
            }
        }
        if (user) {
        fetchTransactions()
        }

    }, [dispatch, user])

            

    return (
        <div className="home">
                <div className="transactions">
                    <h2>Your Transactions:</h2>
                    {transactions && transactions.map(transaction => (
                        <TransactionDetails key={transaction._id} transaction={transaction} />
                    ))}
                </div>
            <div className="rightSide">
                <TransactionForm />
                <CashFlow transactions={transactions} />
            </div>    
        </div>
    )
}

export default Home