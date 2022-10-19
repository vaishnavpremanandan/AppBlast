import { Fragment } from 'react';
import classes from './Category.module.css';

const categories = ['New', 'Top Rated', 'Most Reviewed'];

const Category = ({ onForwardCategory, activeCategory }) => {
    const chosenCategoryHandler = (category) => {
        onForwardCategory(category.split(' ').join('').toLowerCase());
    }

    return (
        <Fragment>
            <ul className={classes.categories}>
                {categories.map((category, idx) => {
                    const transCategory = category.split(' ').join('').toLowerCase();
                    return (
                        <li
                            key={idx}
                            onClick={chosenCategoryHandler.bind(null, category)}
                            className={transCategory === activeCategory ? classes.active : classes.notactive}
                        >
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