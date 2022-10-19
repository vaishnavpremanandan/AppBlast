import classes from './Main.module.css';

const Main = ({ children }) => {
    return <div className={classes.main}>{ children }</div>
}

export default Main;