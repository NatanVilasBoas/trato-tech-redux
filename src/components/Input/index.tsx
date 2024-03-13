import { forwardRef } from 'react';
import styles from './Input.module.scss';

interface Props{
    placeholder?: string,
    alt?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    value?: string | number | readonly string[],
    className?: string,
    type?: string,
    name?: string,
}

const InputComponent = ({placeholder, alt, value, onChange, className, type, name}: Props, ref: React.LegacyRef<HTMLInputElement> | undefined) => {
    return (
            <input
                ref={ref}
                placeholder={placeholder}
                alt={alt}
                className={`${styles.input} ${className}`}
                value={value}
                onChange={onChange}
                type={type}
                name={name}
            />
    )
}

const Input = forwardRef(InputComponent);

export default Input;