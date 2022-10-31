import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import classes from './Category.module.css';

const categories = ['New Posts', 'Top Rated', 'Most Reviewed'];

const Category = () => {
    const history = useHistory();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search).get('category');

    const categoryHandler = (category) => {
        const modifiedCategory = category.toLowerCase().split(' ').join('');
        history.push({
            pathname: location.pathname,
            search: `?category=${modifiedCategory}`
        });
    }

    return (
        <Fragment>
            <ul className={classes.categories}>
                {categories.map((category, index) => {
                    const modifiedCategory = category.toLowerCase().split(' ').join('');
                    return (
                        <li
                            key={index}
                            onClick={categoryHandler.bind(null, category)}
                            className={modifiedCategory === queryParams ? classes.active : classes.notactive}>
                            {category}
                        </li>
                    )
                })}
            </ul>
            <hr></hr>
        </Fragment>
    )
}

export default Category;