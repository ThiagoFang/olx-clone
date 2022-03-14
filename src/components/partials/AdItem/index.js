import { Item } from './styled'
import { Link } from 'react-router-dom';

const AdItem = ( props ) => {
    let price = '';
    

    if(props.data.priceNegotiable && props.data.price == 0) {
        price = 'Preço Negociável'
    } else {
       price =  `R$ ${props.data.price}`
    }

    return(
        <Item className='adItem'>
            <Link to={`/ad/${props.data.id}`}>
                <div className='item-image'>
                    <img src={props.data.image} alt="" />
                </div>

                <div className='item-name'>{props.data.title}</div>
                <div className='item-price'>{price}</div>
            </Link>
        </Item>
    );
};

export default AdItem