import classes from './PrimaryButton.module.css';

const PrimaryButton = ({ children, isDisabled = false, onClick}) => {
    return (
        <button 
            onClick={onClick}
            className={isDisabled ? classes['button-invalid'] : classes['button']}>
            { children }
        </button>
    );
}

export default PrimaryButton;