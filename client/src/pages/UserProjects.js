import { useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';

import { getUserProject } from '../lib/project-api';
import Header from '../components/layout/header/Header';
import ProjectList from '../components/project/list/ProjectList';
import useHttp from '../hooks/useHttp';
import Loading from '../components/UI/loading/Loading';
import ShowError from '../components/layout/error/ShowError';
import Container from '../components/layout/container/Container';
import Category from '../components/layout/category/Category';

let content;

const UserProjects = () => {
    const { sendRequest, status, data: projects, error } = useHttp(getUserProject, true);
    const userId = useSelector(state => state.auth.currentUserId);
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
       sendRequest(userId, token);
    }, [sendRequest]);

    content = <ProjectList projects={projects} />;

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
                {content}
            </Container>
        </Fragment>
    );
}

export default UserProjects;