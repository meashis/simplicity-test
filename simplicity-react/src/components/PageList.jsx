import React, { useEffect, useState } from 'react';
import { getPages, deletePage } from '../api/api';

const PageList = () => {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        const response = await getPages();
        setPages(response.data);
    };

    const handleDelete = async (id) => {
        await deletePage(id);
        fetchPages();
    };

    return (
        <div>
            <h2>Pages</h2>
            <ul>
                {pages.map((page) => (
                    <li key={page.id}>
                        {page.title} <button onClick={() => handleDelete(page.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PageList;
