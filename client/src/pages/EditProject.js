import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProjectForm from "../components/project/form/ProjectForm";
import { getIndividualProject, editProject } from '../lib/project-api';
import useHttp from '../hooks/useHttp';
import ShowError from '../components/layout/error/ShowError';
import Main from '../components/layout/main/Main';

import { showNotif } from '../store/notification-actions';

const EditProject = () => {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.auth.currentUserId);
    const token = useSelector(state => state.auth.token);

    const {
        sendRequest: getProjectRequest,
        status: getProjectStatus,
        data: project,
        error: getProjectError
    } = useHttp(getIndividualProject, true);

    const {
        sendRequest: editProjectRequest,
        status: editProjectStatus,
        error: editProjectError,
        data: editProjectData
    } = useHttp(editProject);

    useEffect(() => {
        getProjectRequest(id);
    }, [getProjectRequest, id]);

    useEffect(() => {
        if (getProjectStatus === 'completed' && !getProjectError) {
            if (project.author._id !== currentUserId) {
                history.replace(`/projects/${id}`);
                dispatch(showNotif('You do not have permission to edit this post', 'error'));
            }
        }
    }, [getProjectStatus, getProjectError, project]);

    useEffect(() => {
        if (editProjectStatus === 'completed' && !editProjectError) {
            history.replace(`/projects/${id}`);
            dispatch(showNotif(editProjectData.message, 'success'));
        }
        if (editProjectStatus === 'completed' && editProjectError) {
            history.replace(`/projects/${id}`);
            dispatch(showNotif(editProjectError, 'error'));
        }
    }, [editProjectStatus, history, id, dispatch, editProjectError, editProjectData]);

    const editProjectHandler = (data) => {
        editProjectRequest(data, id, token);
    }

    if (getProjectError) {
        return (
            <Main>
                <ShowError message={'Project not found'} />
            </Main>
        );
    }

    return (
        <ProjectForm
            isLoading={getProjectStatus === 'pending' || editProjectStatus === 'pending'}
            project={project}
            key={project._id}
            submitFunc={editProjectHandler}
            type={'Edit Post'}
        />
    )
}

export default EditProject;