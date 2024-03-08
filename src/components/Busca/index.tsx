import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changedSearch, resetSearch } from '../../app/store/reducers/busca';
import styles from './Busca.module.scss';
import { useLocation } from 'react-router-dom';

const Busca = () => {
    const busca = useAppSelector(state => state.busca);
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(resetSearch());
    }, [location.pathname, dispatch])

    return(
        <div className={styles.busca}>
            <input 
                className={styles.input} 
                placeholder='O que você procura?'
                value={busca}
                onChange={e => dispatch(changedSearch(e.target.value))}
                />
        </div>
    )
}

export default Busca;