import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {

    const {logout} = useLogout();
    const {user} = useAuthContext();
    
    const handleLogout = () => {
        logout();
    }




    return (
    <header>
        <div className="container">
        <div>
            <Link to="/">
            <h1>Expense Tracker</h1>
            </Link>
        </div>
        <div className="links">
            <Link to="/income">
            <p className="incomeButton">Income</p>
            </Link>
            <Link to="/spending">
            <p className="spendingButton">Spending</p>
            </Link>
            {!user && (
            <Link to="/login">
                <p className="loginButton">Login</p>
            </Link>)}

            {user && (
            <Link to="/" onClick={handleLogout}>
                <p className="logoutButton">Logout</p>
            </Link>)}
            
        </div>
        </div>
    </header>
  );
};

export default Navbar;
