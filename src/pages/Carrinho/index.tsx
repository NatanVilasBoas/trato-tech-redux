import { useMemo } from 'react';
import styles from './Carrinho.module.scss';
import Header from "../../components/Header";
import { useAppSelector } from '../../app/hooks';
import Item from '../../components/Item';

const Carrinho = () => {
    const carrinho = useAppSelector(state => state.carrinho);
    const itens = useAppSelector(state => state.itens);

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
                    const item = itens.find(item => item.id === cartItem.id);
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
            </div>
        </div>
    );
}

export default Carrinho;
