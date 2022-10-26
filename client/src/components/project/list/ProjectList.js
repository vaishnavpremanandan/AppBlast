import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ProjectItem from "../item/ProjectItem";
import classes from './ProjectList.module.css';

const ProjectList = ({ projects }) => {
    return (
        <ul className={classes.ul}>
            {projects.map(project => (
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

ProjectList.propTypes = {
    projects: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]),
}

export default ProjectList;