import AdItem from '../../components/partials/AdItem'
import { PageContainer } from '../../components/MainComponents'
import { PageArea, SearchArea } from './styled'

import { useState, useEffect } from 'react'
import useApi from '../../helpers/OlxApi'
import { Link } from 'react-router-dom';

export const Home = () => {
    const api = useApi();

    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adsList, setAdsList] = useState([]);

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

    useEffect(()=>{
        const getRecentAds = async () => {
            const json = await api.getAds({
                sort:'desc',
                limit: 8
            });
            setAdsList(json.ads)
        }
        getRecentAds()
    },[])
    
    return(
        <>
            <SearchArea>
                <PageContainer>
                    <div className='searchBox'>
                        <form method='GET' action='/ads'>
                            <input type="text" name="q" placeholder="O que você procura?" />
                            <select name="state">
                                {stateList.map((i, k) =>
                                    <option key={k} value={i.name}>{i.name}</option>
                                )}
                            </select>

                            <button>Pesquisar</button>
                        </form>
                    </div>

                    <div className='categoryList'>
                        {categories.map((item, index) => (
                            <Link key={index} to={`/ads?cat=${item.slug}`} className="categoryItem">
                                <img src={item.img} alt="" />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </PageContainer>
            </SearchArea>

            <PageContainer>
                <PageArea>
                    <h2>Anúncios Recentes</h2>
                    <div className="list">
                            {adsList.map((item, key)=>(
                                <AdItem key={key} data={item}/>
                            ))}
                    </div>
                    <Link to="/ads" className='seeAll-Link'>Ver Todos</Link>

                    <hr/>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut ullamcorper enim. Suspendisse tortor purus,
                        sagittis sed tortor in, tristique mattis nisl. Quisque rutrum nulla vel faucibus euismod. Donec dictum purus dui,
                        sed bibendum lectus pulvinar bibendum. Donec eleifend commodo malesuada.
                    </p>
                </PageArea>
            </PageContainer>
        </>
    );
};