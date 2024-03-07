import { Itens, changedFavourite } from '../../app/store/reducers/itens';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaCartPlus } from 'react-icons/fa';
import styles from './Item.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changedCart } from '../../app/store/reducers/carrinho';
import classNames from 'classnames';

const iconProps = {
    size: 24,
    color: '#041833',
}

interface Item extends Itens{
    carrinho: boolean
}


const Item: React.FC<Item> = ({ titulo, descricao, favorito, foto, preco, id, carrinho }) => {
    const dispatch = useAppDispatch();
    const isOnTheCart = useAppSelector(state => state.carrinho.some(cartItem => cartItem.id === id));

    const onHandleFavourite = () => {
        dispatch(changedFavourite(id));
    }

    const onHandleCartItem = () => {
        dispatch(changedCart(id));
    }

    return (
        <div className={classNames(styles.item, {[styles.itemNoCarrinho]: carrinho,})}>
            <div className={styles['item-imagem']}>
                <img src={foto} alt={titulo} />
            </div>
            <div className={styles['item-descricao']}>
                <div className={styles['item-titulo']}>
                    <h2>{titulo}</h2>
                    <p>{descricao}</p>
                </div>
                <div className={styles['item-info']}>
                    <div className={styles['item-preco']}>
                        R$ {preco.toFixed(2)}
                    </div>
                    <div className={styles['item-acoes']}>
                        {favorito ?
                            <AiFillHeart {...iconProps} color='#ff0000' className={styles['item-acao']} onClick={onHandleFavourite} />
                            : <AiOutlineHeart {...iconProps} className={styles['item-acao']} onClick={onHandleFavourite} />
                        }
                        <FaCartPlus {...iconProps} 
                            className={styles['item-acao']} 
                            color={isOnTheCart ? '#1875E8' : iconProps.color}
                            onClick={onHandleCartItem} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item;