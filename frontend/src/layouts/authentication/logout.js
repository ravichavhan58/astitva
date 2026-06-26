import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
// context/AuthContext";

function Logout() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const doLogout = async () => {
            await logout();
            navigate("/authentication/sign-in", { replace: true });
        };

        doLogout();
    }, [logout, navigate]);

    return <h3>Logging out...</h3>;
}

export default Logout;