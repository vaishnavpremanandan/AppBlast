import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import ProjectForm from "../components/project/form/ProjectForm";
import { newProject } from "../lib/project-api";
import useHttp from '../hooks/useHttp';
import { showNotif } from '../store/notification-actions';

const NewProject = () => {
    const { data, sendRequest, status, error } = useHttp(newProject);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'completed' && !error) {
            history.replace('/projects');
            dispatch(showNotif(data.message, 'success'));
        }
        if (status === 'completed' && error) {
            history.replace('/projects');
            dispatch(showNotif(error, 'error'));
        }
    }, [history, status, dispatch, error]);

    const newProjectHandler = (data) => {
        sendRequest(data);
    }   

    return (
        <ProjectForm 
            submitFunc={newProjectHandler} 
            isLoading={status === 'pending'} 
            type={'New Post'}
        />
    );
}

export default NewProject;