import { useEffect, Fragment } from 'react';
import { getProjects } from '../lib/project-api';
import Header from '../components/layout/header/Header';
import ProjectList from '../components/project/list/ProjectList';
import useHttp from '../hooks/useHttp';
import Loading from '../components/UI/loading/Loading';
import ShowError from '../components/layout/error/ShowError';
import Container from '../components/layout/container/Container';
import Category from '../components/layout/category/Category';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Projects = () => {
    const location = useLocation();
    const { sendRequest, status, data: projects, error } = useHttp(getProjects, true);
    const category = new URLSearchParams(location.search).get('category');
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const userId = useSelector(state => state.auth.currentUserId);
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        if (isLoggedIn && category && category === 'yourposts') {
            sendRequest(category, userId, token);
        } else if (category){
            sendRequest(category);
        } else {
            sendRequest()
        }
    }, [sendRequest, category]);

    let content = <ProjectList projects={projects} />;

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
                <Category />
                {content}
            </Container>
        </Fragment>
    );
}

export default Projects;