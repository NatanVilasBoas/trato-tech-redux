import styles from './Button.module.scss';

interface Props{
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    children: string,
    type: "submit" | "reset" | "button" | undefined
}

const Button: React.FC<Props> = ({ children, type,  onClick}) => {
    return(
        <button className={styles.button} type={type} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;