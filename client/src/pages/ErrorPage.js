import Main from '../components/layout/main/Main';
import ShowError from '../components/layout/error/ShowError';

const ErrorPage = () => {
    return (
        <Main>
            <ShowError message={'Page not found'}/>
        </Main>
    );
}

export default ErrorPage;