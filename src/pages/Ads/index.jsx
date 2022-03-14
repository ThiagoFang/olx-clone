import { PageContainer } from '../../components/MainComponents'
import AdItem from '../../components/partials/AdItem'
import { PageArea } from './styled'

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import useApi from '../../helpers/OlxApi'

let timer;

export const Ads = () => {
    const api = useApi();
    const navigate = useNavigate()


    const useQueryString = () => {
        return new URLSearchParams( useLocation().search );
    }
    const query = useQueryString();

    //URLQueryString States
    const URLVerification = ( item ) => {
        return query.get(item) != null ? query.get(item) : '';
    };

    const [q, setQ] = useState( URLVerification('q') );
    const [cat, setCat] = useState( URLVerification('cat') );
    const [state, setState] = useState( URLVerification('state') );

    //FormStates
    const [categories, setCategories] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [adsList, setAdsList] = useState([]);

    const [adsTotal, setAdsTotal] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const [resultOpacity, setResultOpacity] = useState(1)
    const [loading, setLoading] = useState(true)

    const getAdsList = async () => {
        setLoading(true)
        const offset = (currentPage - 1) * 15;

        const json = await api.getAds({
            sort:'desc',
            limit: 15,
            q,
            cat,
            state,
            offset
        });
        setAdsList(json.ads)
        setAdsTotal(json.total)
        setResultOpacity(1)
        setLoading(false)
    }

    useEffect(()=>{
        if(adsList.length > 0 ) {
            setPageCount( Math.ceil( adsTotal / adsList.length ) )
        } else {
            setPageCount(0)
        }
    },[adsTotal])

    useEffect(()=>{
        let queryString = []

        if(q){
            queryString.push(`q=${q}`)
        }
        if(cat){
            queryString.push(`cat=${cat}`)
        }
        if(state){
            queryString.push(`state=${state}`)
        }

        navigate(`?${queryString.join('&')}`, {replace:true})

        if(timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(getAdsList, 1000)
        setResultOpacity(0.3)
        setCurrentPage(1)
    },[q, cat, state])

    useEffect(()=>{
        setResultOpacity(0.3)
        getAdsList();
    }, [currentPage])

    //WebService requests
    useEffect(()=>{
        const getStates = async () => {
            const json = await api.getStates();
            setStateList(json)
        }
        getStates()
    },[])

    useEffect(()=>{
        const getCategories = async () => {
            const json = await api.getCategories();
            setCategories(json)
        }
        getCategories()
    },[])

    let pagination = [];

    for(let i = 1; i<=pageCount; i++) {
        pagination.push(i)
    }

    
    return(
        <PageContainer>
            <PageArea>
                <div className='left-side'>
                    <form method='GET'>
                        <input 
                            type="text" 
                            name="q" 
                            placeholder='O que você procura?' 
                            value={q}
                            onChange={e=>setQ(e.target.value)}
                        />

                        <div className="filterName">Estado: </div>
                        <select name='state' value={state} onChange={e=>setState(e.target.value)}>
                            <option></option>
                            {stateList.map((item, key)=>(
                                <option value={item.name} key={key}>{item.name}</option>
                            ))}
                        </select>

                        <div className="filterName">Categoria: </div>
                        <ul>
                            {categories.map((item, key)=>(
                                <li 
                                    key={key} 
                                    onClick={()=>setCat(item.slug)}
                                    className={cat == item.slug? 'category-item active':'category-item'} 
                                >
                                    <img src={item.img} />
                                    <span>{item.name}</span>
                                </li>
                            ))}
                        </ul>


                    </form>
                </div>
                <div className='right-side'>
                    <h2>Resultados</h2>

                    {loading && adsList.length === 0 &&
                        <div className='list-warning'>Carregando...</div>
                    }

                    {!loading && adsList.length === 0 &&
                        <div className='list-warning'>Nenhum resultado encontrado!</div>
                    }
                    
                    <div className='list' style={{opacity: resultOpacity}}>
                        {adsList.map((item, key) => (
                            <AdItem key={key} data={item}/>
                        ))}
                    </div>

                    <div className='pagination'>
                        {pagination.map((item, key)=>(
                            <div 
                                key={item} 
                                className={item===currentPage?'pag-item active':'pag-item'}
                                onClick={()=>setCurrentPage(item)}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </PageArea>
        </PageContainer>
    );
};