import { useEffect, Fragment } from 'react';
import { getProjects } from '../lib/project-api';
import Header from '../components/layout/header/Header';
import ProjectList from '../components/project/list/ProjectList';
import useHttp from '../hooks/useHttp';
import Loading from '../components/UI/loading/Loading';
import ShowError from '../components/layout/error/ShowError';
import Container from '../components/layout/container/Container';
import Category from '../components/layout/category/Category';
import { useHistory, useLocation } from 'react-router-dom';

const Projects = () => {
    const location = useLocation();
    const history = useHistory();
    const { sendRequest, status, data: projects, error } = useHttp(getProjects, true);
    const queryParams = new URLSearchParams(location.search);

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    const categoryHandler = (category) => {
        history.push({
            pathname: location.pathname,
            search: `?category=${category}`
        })
    }

    let content = <ProjectList projects={projects} category={queryParams.get('category')} />;

    if (status === 'pending') {
        content = <Loading />
    }

    if (error) {
        content = <ShowError message={error} />
    }

    if (status === 'completed' && (!projects || projects.length === 0)) {
        content = <ShowError message={'No projects found'} />
    }

    return (
        <Fragment>
            <Header />
            <Container>
                <Category
                    onForwardCategory={categoryHandler}
                    activeCategory={queryParams.get('category')}
                />
                {content}
            </Container>
        </Fragment>
    );
}

export default Projects;