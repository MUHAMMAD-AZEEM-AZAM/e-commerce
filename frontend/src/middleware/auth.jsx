import {Navigate} from "react-router-dom"

export const AuthorizedUser = ({ children }) => {
    const token =localStorage.getItem('token');
    if(!token){
        return <Navigate to={'/auth/login'} replace={true}></Navigate>
    }

    return children;
}