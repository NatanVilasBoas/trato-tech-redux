import { Itens, changedFavourite } from '../../app/store/reducers/itens';
import { AiOutlineHeart, AiFillHeart, AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { FaCartPlus } from 'react-icons/fa';
import styles from './Item.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changedAmount, changedCart } from '../../app/store/reducers/carrinho';
import classNames from 'classnames';

const iconProps = {
    size: 24,
    color: '#041833',
}

const quantidadeProps = {
    size: 32,
    color: '#1875E8'
}

interface Item extends Itens {
    carrinho?: boolean,
    quantidade?: number
}


const Item: React.FC<Item> = ({ titulo, descricao, favorito, foto, preco, id, carrinho, quantidade }) => {
    const dispatch = useAppDispatch();
    const isOnTheCart = useAppSelector(state => state.carrinho.some(cartItem => cartItem.id === id));

    const onHandleFavourite = () => {
        dispatch(changedFavourite(id));
    }

    const onHandleCartItem = () => {
        dispatch(changedCart(id));
    }

    return (
        <div className={classNames(styles.item, { [styles.itemNoCarrinho]: carrinho, })}>
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
                        {carrinho
                            ? (
                                <div className={styles.quantidade}>
                                    Quantidade:
                                    <AiFillMinusCircle {...quantidadeProps} onClick={() => {
                                        if (quantidade && quantidade > 1) {
                                            dispatch(changedAmount({ id, quantidade: -1 }))
                                        } else{
                                            onHandleCartItem()
                                        }
                                    }} />
                                    <span>{String(quantidade || 0).padStart(2, '0')}</span>
                                    <AiFillPlusCircle {...quantidadeProps} onClick={() => dispatch(changedAmount({ id, quantidade: +1 }))} />
                                </div>
                            )

                            : (<FaCartPlus {...iconProps}
                                className={styles['item-acao']}
                                color={isOnTheCart ? '#1875E8' : iconProps.color}
                                onClick={onHandleCartItem} />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item;