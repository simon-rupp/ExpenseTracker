import { useEffect, useState} from "react"

import TransactionDetails from "../components/TransactionDetails"
import TransactionForm from "../components/TransactionForm"
import CashFlow from "../components/cashFlow"
import { useTransactionsContext } from "../hooks/useTransactionsContext"
import { useAuthContext } from "../hooks/useAuthContext"


const Home = () => {
    
    const { transactions, dispatch } = useTransactionsContext()
    const { user } = useAuthContext()
    const [filter, setFilter] = useState("newest")
    
    const transactionsPerPage = 20;
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * transactionsPerPage;
    const endIndex = startIndex + transactionsPerPage;
    

    const handleNextPage = () => {
        if (endIndex < transactions.length) {
          setCurrentPage(currentPage + 1);
        }
      };
    
      const handlePreviousPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };

    useEffect(() => {
        const fetchTransactions = async () => {
            const res = await fetch(`/api/transactions?sortBy=${filter}`, {
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

    }, [dispatch, user, filter])

    const onClick = async (e) => {
        e.preventDefault()
        const res = await fetch("/api/plaid/transactions", {
            method: "POST",
            headers: {'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'}
        })
        const data = await res.json()
        if (res.ok) {
            console.log("new transactions added", data)
            window.location.reload()
        }
    }

    /**
    const deleteAll = async (e) => {
        e.preventDefault()
        transactions.map(async (transaction) => {
            const res = await fetch(`/api/transactions/${transaction._id}`, {
                method: "DELETE",
                headers: {'Authorization': `Bearer ${user.token}`}
            })
            const data = await res.json()
            if (res.ok) {
                console.log("deleted all transactions")
            }
        })
    }
    */
            

    return (
        <div className="home">
            
            <div className="transactions">
            
            <button className="syncButton" onClick={onClick}>
               Sync Transactions From Connected Banks 
            </button>
            <div className="aboveTransactions">
                <h2 className="allTransactionsText">All Transactions:</h2>
                <div className="filter">
                    <p className="filterText"> Filter:</p>
                    <select className="sortButton" onChange={(e) => setFilter(e.target.value)}>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                        <option value="highest">Highest</option>
                        <option value="lowest">Lowest</option>
                    </select>
                </div>
            </div>
            {/*<button onClick={deleteAll}>delete all transactions</button>*/}
                {transactions && transactions.slice(startIndex, endIndex).map(transaction => (
                    <TransactionDetails key={transaction._id} transaction={transaction} />
                ))}
                <button className="syncButton" onClick={handlePreviousPage} disabled={currentPage === 1}>Previous Page</button>
                <button className="syncButton" onClick={handleNextPage} disabled={transactions && endIndex >= transactions.length}>Next Page</button>
                <p className="pageNumber">Page {currentPage}</p>
            </div>
            <div className="rightSide">
                <TransactionForm />
                <CashFlow transactions={transactions} />
            </div>    
        </div>
    )
}

export default Home