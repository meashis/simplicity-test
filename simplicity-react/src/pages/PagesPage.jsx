import React from 'react';
import PageList from '../components/PageList';
import PageForm from '../components/PageForm';

const PagesPage = () => {
    return (
        <div>
            <h1>Pages</h1>
            <PageForm onSuccess={() => window.location.reload()} />
            <PageList />
        </div>
    );
};

export default PagesPage;
