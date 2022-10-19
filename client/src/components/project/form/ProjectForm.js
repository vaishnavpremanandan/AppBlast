import { useEffect, useState } from 'react';
import useValidation from '../../../hooks/useValidation';
import { useSelector } from 'react-redux';
import Main from '../../layout/main/Main';
import Card from '../../UI/card/Card';
import classes from './ProjectForm.module.css';
import Loading from '../../UI/loading/Loading';
import PrimaryButton from '../../UI/button/PrimaryButton';

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
    }, []);

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

    const titleClass = titleHasError ? classes['input-invalid'] : classes.input;
    const linkClass = linkHasError ? classes['input-invalid'] : classes.input;
    const descriptionClass = descriptionHasError ? classes['textarea-invalid'] : classes.textarea;
    const imageClass = imageHasError ? classes['file-invalid'] : classes.file;

    let content = (
        <form className={classes.form} onSubmit={onSubmitHandler}>
            <h3>{type}</h3>
            <hr></hr>
            <div>
                <label htmlFor='title'>Title</label>
                <input
                    type='text'
                    id='title'
                    value={titleValue}
                    onChange={titleChangeHandler}
                    onBlur={titleBlurHandler}
                    className={titleClass}
                />
                {titleHasError && <span>{'Please enter a valid title'}</span>}
            </div>
            <div>
                <label htmlFor='link'>Link (Website link or Github repo link)</label>
                <input
                    type='text'
                    id='link'
                    value={linkValue}
                    onChange={linkChangeHandler}
                    onBlur={linkBlurHandler}
                    className={linkClass}
                />
                {linkHasError && <span>{'Please enter a valid link'}</span>}
            </div>
            <div>
                <label htmlFor='description'>Description</label>
                <textarea
                    id='description'
                    value={descriptionValue}
                    onChange={descriptionChangeHandler}
                    onBlur={descriptionBlurHandler}
                    className={descriptionClass}
                ></textarea>
                {descriptionHasError && <span>{'Please enter a valid description'}</span>}
            </div>
            <div>
                <label htmlFor='image'>
                    {type === 'New Post' ? 'Image' : 'Change Existing Image (optional)'}
                </label>
                <input
                    type='file'
                    id='image'
                    className={imageClass}
                    onChange={imageChangeHandler}
                />
                {imageHasError && <span>{'Please upload a image'}</span>}
            </div>
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

export default ProjectForm;

