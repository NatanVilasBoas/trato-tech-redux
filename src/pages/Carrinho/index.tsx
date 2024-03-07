import styles from './Carrinho.module.scss';
import Header from "../../components/Header";
import { useAppSelector } from '../../app/hooks';
import Item from '../../components/Item';
import { Itens } from '../../app/store/reducers/itens';

export interface CartItem extends Itens{
    quantidade: number;
}

const Carrinho = () => {
    const carrinho = useAppSelector(state => {
        return state.carrinho.reduce((itens, cartItem) => {
            const item = state.itens.find(item => item.id === cartItem.id);
            if (item) {
                itens.push({
                    ...item,
                    quantidade: cartItem.quantidade,
                });
            }
            return itens;
        }, [] as CartItem[]);
    });

    return (
        <div>
            <Header
                titulo="Carrinho de compras"
                descricao="Confira produtos que você adicionou ao carrinho."
                imagem=""
                className=""
            />
            <div className={styles.carrinho}>
                {carrinho.map(item => <Item key={item.id} {...item} carrinho />)}
                <div className={styles.total}>
                    <strong>
                        Resumo da compra
                    </strong>
                    <span>
                        Subtotal: <strong> R$ {0.0.toFixed(2)}</strong>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Carrinho;