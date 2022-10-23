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

export default ProjectList;