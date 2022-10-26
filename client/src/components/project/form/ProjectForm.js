import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import useValidation from '../../../hooks/useValidation';

import Main from '../../layout/main/Main';
import Card from '../../UI/card/Card';
import classes from './ProjectForm.module.css';
import Loading from '../../UI/loading/Loading';
import PrimaryButton from '../../UI/button/PrimaryButton';
import ProjectInput from '../input/ProjectInput';
import ProjectTextarea from '../textarea/ProjectTextarea';
import ProjectFile from '../file/ProjectFile';

const ProjectForm = ({ project = { title: '', link: '', description: '' }, type, isLoading, submitFunc }) => {
    const [imageValue, setImageValue] = useState([]);
    const [imageHasError, setImageHasError] = useState(false);
    const currentUserId = useSelector(state => state.auth.currentUserId);
    const token = useSelector(state => state.auth.token);

    const {
        value: titleValue,
        valueIsValid: titleIsValid,
        valueHasError: titleHasError,
        valueChangeHandler: titleChangeHandler,
        setInitialInputHandler: setInitialTitle,
        valueBlurHandler: titleBlurHandler,
    } = useValidation(value => value !== '' || value.trim().length !== 0);

    const {
        value: linkValue,
        valueIsValid: linkIsValid,
        valueHasError: linkHasError,
        valueChangeHandler: linkChangeHandler,
        setInitialInputHandler: setInitialLink,
        valueBlurHandler: linkBlurHandler,
    } = useValidation(value => value !== '' || value.trim().length !== 0);

    const {
        value: descriptionValue,
        valueIsValid: descriptionIsValid,
        valueHasError: descriptionHasError,
        valueChangeHandler: descriptionChangeHandler,
        setInitialInputHandler: setInitialDescription,
        valueBlurHandler: descriptionBlurHandler,
    } = useValidation(value => value !== '' || value.trim().length !== 0);

    useEffect(() => {
        setInitialTitle(project.title);
        setInitialLink(project.link);
        setInitialDescription(project.description);
    }, [setInitialTitle, setInitialLink, setInitialDescription]);

    const imageChangeHandler = (event) => {
        setImageHasError(false);
        setImageValue(event.target.files);
    }

    let formIsValid = false;
    if (titleIsValid && linkIsValid && descriptionIsValid) {
        formIsValid = true;
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (!titleIsValid || !linkIsValid || !descriptionIsValid) return;
        if (type === 'New Post' && (imageValue.length !== 1 || imageValue[0].type.substring(0, 5) !== 'image')) {
            setImageHasError(true);
            return;
        }
        submitFunc({
            title: titleValue,
            link: linkValue,
            image: !imageValue.length ? project.image : imageValue,
            description: descriptionValue,
            author: currentUserId,
            userToken: token
        });
    }

    let content = (
        <form className={classes.form} onSubmit={onSubmitHandler}>
            <h3>{type}</h3>
            <hr></hr>
            <ProjectInput
                value={titleValue} 
                onChangeHandler={titleChangeHandler} 
                onBlurHandler={titleBlurHandler}
                error={titleHasError} 
                errorMsg='Please enter a valid title' 
                id='title'
                name='Title'
            />
            <ProjectInput
                value={linkValue} 
                onChangeHandler={linkChangeHandler} 
                onBlurHandler={linkBlurHandler}
                error={linkHasError} 
                errorMsg='Please enter a valid link' 
                id='link'
                name='Link'
            />
            <ProjectTextarea 
                value={descriptionValue} 
                onChangeHandler={descriptionChangeHandler} 
                onBlurHandler={descriptionBlurHandler}
                error={descriptionHasError} 
                errorMsg='Please enter a valid description' 
                id='description'
                name='Description'
            />
            <ProjectFile 
                id='image'
                type={type}
                onChangeHandler={imageChangeHandler}
                error={imageHasError}
                errorMsg='Please upload a image'
            />
            <PrimaryButton isDisabled={!formIsValid}>Submit</PrimaryButton>
        </form>
    );

    if (isLoading) {
        content = <Loading />
    }

    return (
        <Main>
            <Card>
                {content}
            </Card>
        </Main>
    )
}

ProjectForm.propTypes = {
    project: PropTypes.object,
    type: PropTypes.string,
    isLoading: PropTypes.bool,
    submitFunc: PropTypes.func,
}

export default ProjectForm;

