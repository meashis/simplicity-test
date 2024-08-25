import PageList from '../components/PageList';
import PageForm from '../components/PageForm';
import "./PagesPage.css";

const PagesPage = () => {
    return (
        <div className='page-container'>
            <h1>Pages</h1>
            {/* <PageForm onSuccess={() => window.location.reload()} />
            <PageList /> */}
            <PageList />
        </div>
    );
};

export default PagesPage;
