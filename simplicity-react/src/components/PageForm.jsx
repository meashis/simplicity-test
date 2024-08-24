import React, { useState } from 'react';
import { createPage, updatePage } from '../api/api';

const PageForm = ({ pageId, existingPage, onSuccess }) => {
    const [title, setTitle] = useState(existingPage?.title || '');
    const [content, setContent] = useState(existingPage?.content || '');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const page = { title, content };
        if (pageId) {
            await updatePage(pageId, page);
        } else {
            await createPage(page);
        }

        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label>Content:</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </div>
            <button type="submit">{pageId ? 'Update' : 'Create'}</button>
        </form>
    );
};

export default PageForm;
