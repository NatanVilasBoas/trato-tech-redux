import { Itens } from '../../app/store/reducers/itens';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaCartPlus } from 'react-icons/fa';
import styles from './Item.module.scss';

const iconProps = {
    size: 24,
    color: '#041833',
}


const Item: React.FC<Itens> = ({ titulo, descricao, favorito, foto, preco }) => {
    return (
        <div className={styles.item}>
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
                            <AiFillHeart {...iconProps} color='#ff0000' className={styles['item-acao']} />
                            : <AiOutlineHeart {...iconProps} className={styles['item-acao']} />
                        }
                        <FaCartPlus {...iconProps} className={styles['item-acao']} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item;