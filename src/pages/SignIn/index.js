import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import useApi from '../../helpers/OlxApi';
import { PageArea } from './styled';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {doLogin} from '../../helpers/authHandler'

export const SignIn = () => {
    const api = useApi();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPassword, setRememberPassword] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDisabled(true)
        const json = await api.login(email, password)

        if(json.error) {
            setError(json.error)
        } else {
            doLogin(json.token, rememberPassword);
            window.location.href = '/'
        }
        setDisabled(false)
    }

    return (
        <PageContainer style={{display: 'flex', flexDirection: 'column',alignItems: 'center'}}>
            <PageArea>
                <form onSubmit={handleSubmit}>
                    <PageTitle>Login</PageTitle>

                    {error &&
                        <ErrorMessage>{error}</ErrorMessage>
                    }
                    <input className='user-input' 
                        type="email" 
                        placeholder='Email' 
                        disabled={disabled}
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                        required
                    />
                    <input className='user-input' 
                        type="password" 
                        placeholder='Senha' 
                        disabled={disabled}
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                        required
                    />

                    <label className='reminder-area'>
                        <div className='reminder-title'>Lembrar senha?</div>
                        <input className='reminder--checkbox' 
                            type="checkbox" 
                            disabled={disabled}
                            value={rememberPassword}
                            onClick={e=>setRememberPassword(!rememberPassword)}
                        />
                    </label>

                    <button disabled={disabled}>LOGIN</button>
                    
                    <div className='signup-div'>Não tem uma conta? <Link to="/signup">Crie Uma</Link></div>

                </form>
            </PageArea>
        </PageContainer>
    );
}