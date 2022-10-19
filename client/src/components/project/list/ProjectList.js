import { Link } from 'react-router-dom';
import ProjectItem from "../item/ProjectItem";
import classes from './ProjectList.module.css';

const averageRating = (arr) => {
    if (!arr.length || !arr) return 0;
    let sum = 0;
    for (let value of arr) {
        sum += value.rating;
    }
    return Math.floor(sum / arr.length);
}

const ProjectList = ({ projects, category }) => {
    const sortedProjects = [...projects];

    if (category === 'new') {
        sortedProjects.sort((a, b) => b.date - a.date);
    }
    if (category === 'toprated') {
        sortedProjects.sort((a, b) => averageRating(b.reviews) - averageRating(a.reviews));
    }
    if (category === 'mostreviewed') {
        sortedProjects.sort((a, b) => b.reviews.length - a.reviews.length);
    }

    return (
        <ul className={classes.ul}>
            {sortedProjects.map(project => (
                <li key={project._id}>
                    <Link to={`/projects/${project._id}`} className={classes.link}>
                        <ProjectItem
                            readOnly={true}
                            project={project}
                        />
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default ProjectList;