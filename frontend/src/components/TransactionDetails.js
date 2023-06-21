import { useTransactionsContext } from "../hooks/useTransactionsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const TransactionDetails = ({ transaction }) => {
    const formattedDate = new Date(transaction.createdAt).toLocaleDateString();
    const {dispatch} = useTransactionsContext()
    const {user} = useAuthContext()
    
    const colorChanger = () => {
        let condition = false
        if (transaction.type === "expense") {
            condition = true
        }
        return condition
    }

    const handleClick = async () => {
        if (!user){
            return
        }
        
        const res = await fetch(`/transactions/${transaction._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const data = await res.json()
        if (res.ok) {
            dispatch({type: "DELETE_TRANSACTION", payload: data})
        }
        
    }  
    
    return (
        <div className="transaction-details">
            <h3>{transaction.name}</h3>
            <p className="Amount">
                Amount: <span style={{ color: colorChanger() ? "#cb0808" : "#1bad7a" }}>$</span>
                <span style={{ color: colorChanger() ? "#cb0808" : "#1bad7a" }}>
                    {transaction.amount}
                </span>
            </p>
            <p className="date">{formattedDate}</p>
            <span className="deleteButton" onClick={handleClick}>delete</span>
        </div>
    )
}

export default TransactionDetails