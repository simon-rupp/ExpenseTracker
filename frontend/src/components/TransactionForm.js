import { useState } from 'react'
import { useTransactionsContext } from "../hooks/useTransactionsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const TransactionFrom = () => {
    const {dispatch} = useTransactionsContext()
    const [name, setName] = useState('')
    const [type, setType] = useState('expense')
    const [amount, setAmount] = useState('')
    const [error, setError] = useState(null)
    //const [emptyFeilds, setEmptyFeilds] = useState(null)


    const {user} = useAuthContext()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!user) {
            setError("Please login to add a transaction")
            return
        }
        const transaction = { name, type, amount, userID: window.localStorage.getItem("userID") }
        const res = await fetch('/transactions', {
            method: 'POST',
            body: JSON.stringify(transaction),
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`  
            }
        })

        const json = await res.json()

        if (!res.ok) {
            setError(json.error)
            //setEmptyFeilds(json.emptyFeilds)
        } 
        else {
            setError(null)
            setName('')
            setType('expense')
            setAmount('')
            //setEmptyFeilds(null)
            console.log("new transaction added", json)
            dispatch({type: "CREATE_TRANSACTION", payload: json})
        }
    }    

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h2>Add New Transaction</h2>
            <label>Transaction Name:</label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />

            <label>Transaction Type:</label>
            <select
                onChange={(e) => setType(e.target.value)}
                value={type}
            >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
            </select>
            
            <label> Amount:</label>
            <input
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
            />

            <button>Add Transaction</button>
            {error && <p className="error" style={{color: "#cb0808", fontSize: "0.9em"}}>{error}</p>}

        </form>
    )

}

export default TransactionFrom