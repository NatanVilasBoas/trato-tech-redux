import { useMemo } from 'react';
import styles from './Carrinho.module.scss';
import Header from "../../components/Header";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Item from '../../components/Item';
import { resetCart } from '../../app/store/reducers/carrinho';

const Carrinho = () => {
    const carrinho = useAppSelector(state => state.carrinho);
    const itens = useAppSelector(state => state.itens);
    const busca = useAppSelector(state => state.busca);

    const dispatch = useAppDispatch();

    const total = useMemo(() => {
        return carrinho.reduce((total, cartItem) => {
            const item = itens.find(item => item.id === cartItem.id);
            if (item) {
                total += item.preco * cartItem.quantidade;
            }
            return total;
        }, 0);
    }, [carrinho, itens]);

    return (
        <div>
            <Header
                titulo="Carrinho de compras"
                descricao="Confira produtos que você adicionou ao carrinho."
                imagem=""
                className=""
            />
            <div className={styles.carrinho}>
                {carrinho.map(cartItem => {
                    const regexp = new RegExp(busca, 'i');
                    const item = itens.find(item => item.id === cartItem.id && item.titulo.match(regexp));
                    if (item) {
                        return (
                            <Item
                                key={item.id}
                                {...item}
                                quantidade={cartItem.quantidade}
                                carrinho
                            />
                        );
                    }
                    return null;
                })}
                <div className={styles.total}>
                    <strong>Resumo da compra</strong>
                    <span>Subtotal: <strong>R$ {total.toFixed(2)}</strong></span>
                </div>
                <button className={styles.finalizar}
                    onClick={() => dispatch(resetCart())}
                    >
                Finalizar compra    
                </button>
            </div>
        </div>
    );
}

export default Carrinho;
