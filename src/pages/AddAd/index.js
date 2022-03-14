import { useState, useEffect, useRef } from "react"
import MaskedInput from 'react-text-mask'
import createNumberMaks from 'text-mask-addons/dist/createNumberMask'
import { useNavigate } from "react-router-dom"


import { ErrorMessage, PageContainer, PageTitle } from "../../components/MainComponents"
import OlxApi from "../../helpers/OlxApi"
import { PageArea } from "./styled"

export const AddAd = () => {
    const api = OlxApi();
    const fileField = useRef();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([])
    
    //FormStates
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [priceNegotiable, setPriceNegotiable] = useState(false)
    const [desc, setDesc] = useState('')
    
    //PageStates
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('')

    useEffect (()=> {
        const getCategories = async () => {
            const json = await api.getCategories();
            setCategories(json);
        }
        getCategories();
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        setDisabled(true)
        setError('');
        const errors = [];

        if(!title.trim()) {
            errors.push('Sem título');   
        }

        if(!category) {
            errors.push("Sem categoria");
        }

        if(errors.length === 0) {
            const fData = new FormData();
            fData.append('title', title)
            fData.append('price', price)
            fData.append('priceneg', priceNegotiable)
            fData.append('desc', desc)
            fData.append('cat', category)

            if(fileField.current.files.length > 0) {
                for(let i=0; i<fileField.current.files.length; i++){
                    fData.append('img', fileField.current.files[i])
                }
            }

            const json = await api.addAd(fData);

            if(!json.error) {
                navigate(`/ad/${json.id}`)
                return
            } else {
                setError(json.error)
            }
        } else {
            setError(errors.join("\n"));
        }
        setDisabled(false);

    }

    const priceMask = createNumberMaks({
        prefix:'R$ ',
        includeThousandSeparator: true,
        thousandsSeparatorSymbol:'.',
        allowDecimal:true,
        decimalSymbol:','
    })

    return(
        <PageContainer>
            <PageArea>
                <div className="left-side">
                    <form onSubmit={handleSubmit}>
                        <PageTitle>Postar um anúncio</PageTitle>

                        {error &&
                            <ErrorMessage>{error}</ErrorMessage>
                        }
                        <input className='user-input' 
                            type="text" 
                            placeholder='Titulo do Produto' 
                            disabled={disabled}
                            value={title}
                            onChange={e=>setTitle(e.target.value)}
                            required
                        />

                        <div className="area">
                            <div className="area-title">Categoria</div>
                            <select
                                disabled={disabled}
                                onChange={e=>setCategory(e.target.value)}
                                required
                            >
                                <option></option>
                                {categories && categories.map((item,key) => (
                                    <option value={item.key} key={key}>{item.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="area">
                            <div className="area-title">Preço</div>
                            <div>
                                <MaskedInput 
                                    mask={priceMask}
                                    placeholder="R$ "
                                    disabled={disabled || priceNegotiable}
                                    value={price}
                                    onChange={e=>setPrice(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="area">
                            <label>
                                <div className="area-title">Preço Negociavel</div>
                                <input type="checkbox" 
                                disabled={disabled}
                                value={priceNegotiable}
                                onChange={e => setPriceNegotiable(!priceNegotiable)}

                                />
                            </label>
                        </div>

                        <div className="area">
                            <div>
                                <div className="area-title">Descrição</div>
                                <textarea 
                                    className="description-input"
                                    disabled={disabled}
                                    value={desc}
                                    onChange={e=>setDesc(e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        <div className="area">
                            <label>
                                <div className="area-title"></div>
                                <input 
                                    type="file"
                                    disabled={disabled}
                                    ref={fileField}
                                    multiple
                                />
                            </label>
                        </div>

                        <button className="submitButton">
                            Adicionar Produto
                        </button>
                    </form>
                </div>

                <div className="right-side"></div>
            </PageArea>
        </PageContainer>
    )
}