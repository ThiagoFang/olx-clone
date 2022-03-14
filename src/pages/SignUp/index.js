import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useApi from '../../helpers/OlxApi';
import { PageArea } from './styled';

export const SignUp = () => {
    const api = useApi();

    const [name, setName] = useState('');
    const [stateLoc, setStateLoc] = useState('')

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')

    const [stateList, setStateList] = useState([])

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('')

    useEffect(()=>{
        const getStates = async () => {
            const sList = await api.getStates();
            setStateList(sList)
        }

        getStates();
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');

        if(password !== confirmPassword) {
            setError('Senhas não batem');
            setDisabled(false)
            return;
        } 
        const json= await api.register(name, email, password, stateLoc);
        if(json.error) {
            setError(json.error)
        } else {
            doLogin(json.token)
            window.location.href = '/'
        }
        setDisabled(false)

    }

    return (
        <PageContainer onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column',alignItems: 'center'}}>
            <PageArea>
                <form>
                    <PageTitle>Cadastro</PageTitle>

                    {error &&
                        <ErrorMessage>{error}</ErrorMessage>
                    }
                    <input className='user-input' 
                        type="text" 
                        placeholder='Nome Completo' 
                        disabled={disabled}
                        value={name}
                        onChange={e=>setName(e.target.value)}
                        required
                    />

                    <select
                        onChange={e=>setStateLoc(e.target.value)}
                        value={stateLoc} 
                        placeholder='Estado' 
                        className='user-input'
                        required
                        >
                        <option></option>
                        {stateList.map((item, key) => (
                            <option key={key} value={item.id}>{item.name}</option>
                        ))}
                    </select>

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

                    <input className='user-input' 
                        type="password" 
                        placeholder='Confirmar Senha' 
                        disabled={disabled}
                        value={confirmPassword}
                        onChange={e=>setConfirmPassword(e.target.value)}
                        required
                    />

                    <button disabled={disabled}>CADASTRAR</button>

                    <div className='signup-div'>Ja tem uma Conta? <Link to="/signin">Faça Login</Link></div>
                </form>
            </PageArea>
        </PageContainer>
    );
}