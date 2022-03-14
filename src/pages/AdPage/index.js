import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { Link } from "react-router-dom";

import { PageArea, Fake, OthersArea, BreadChumb } from "../AdPage/styled"
import { PageContainer } from "../../components/MainComponents"
import AdItem from '../../components/partials/AdItem'

import useApi from '../../helpers/OlxApi'

export const AdPage = () => {
    const api = useApi();
    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [adData, setAdData] = useState([]);

    useEffect(()=>{
        setLoading(true)
        const getAdInfo = async (id) => {
            const json = await api.getAd(id, true)
            setAdData(json)
        }
        getAdInfo(id)
        setLoading(false)
    },[id])

    const formatDate = (date) => {
        const classDate = new Date(date);

        const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
        const currentDay = classDate.getDate();
        const currentMonth = classDate.getMonth();
        const currentYear = classDate.getFullYear();

        return `${currentDay} de ${months[currentMonth]} de ${currentYear}`
        
    }

    return(
        <PageContainer>

            {adData.category &&
                <BreadChumb>
                    Você está aqui: 
                    <Link to="/">Home</Link>
                    /
                    <Link to={`/ads?state=${adData.stateName}`}>{adData.stateName}</Link>
                    /
                    <Link to={`/ads?state=${adData.stateName}&cat=${adData.category.slug}`}>{adData.category.name}</Link>
                    / {adData.title}
                </BreadChumb>
            }

            <PageArea>
                <div className="left-side">
                    <div className="box">
                        <div className="ad-image">
                            {loading && <Fake height={400} /> }
                            {adData.images &&
                                <Slide>
                                    {adData.images.map((img, key)=>(
                                        <div key={key} className="each-slide">
                                            <img src={img} alt="" />
                                        </div>
                                    ))}
                                </Slide>
                            }
                        </div>
                        <div className="ad-info">
                            <div className="ad-name">
                                {loading && <Fake height={20} /> }
                                {adData.title &&
                                    <h2>{adData.title}</h2>
                                }
                                {adData.dateCreated &&
                                    <small>Criado em {formatDate(adData.dateCreated)}</small>
                                }
                            </div>
                            <div className="ad-description">
                                {loading && <Fake height={100} /> }
                                {adData.description}
                                <hr/>
                                {adData.views &&
                                    <small>Vizualizações: {adData.views}</small>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="right-side">
                    <div className="box">
                        {loading && <Fake height={20} /> }
                        {adData.priceNegotiable &&
                            "Preço Negociável!"
                        }
                        {!adData.priceNegotiable && adData.price &&
                            <div className="price">Preço: <span>R$ {adData.price}</span></div>
                        }
                    </div>
                    {loading && <Fake height={40} /> }
                    {adData.userInfo && 
                        <>
                            <a href={`mailto:${adData.userInfo.email}`} target="_blank" className="contact-seller-link">Fale com o vendedor</a>
                            <div className="createdBy box">
                                <strong>{adData.userInfo.name}</strong>
                                <small>E-mail: {adData.userInfo.email}</small>
                                <small>Estado: {adData.stateName}</small>
                            </div>
                        </>
                    }
                </div>
            </PageArea>
            <OthersArea>
                {adData.others &&
                    <>
                        <h2>Outras ofertas do vendedor:</h2>
                        <div className="list">
                            {adData.others.map((item, key) => (
                                <AdItem key={key} data={item} />
                            ))}
                        </div>
                    </>
                }
            </OthersArea>
        </PageContainer>
    )
}
