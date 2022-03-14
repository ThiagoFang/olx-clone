import { Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { isLogged } from './authHandler'


export default ({children, ...rest}) => {
    const logged = isLogged()
    const authorized = rest.private && logged ? true : false
    
    if(!authorized){
        return <Navigate to="/signin"/>
    }

    return children;
}