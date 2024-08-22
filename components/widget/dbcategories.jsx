
import { AddTagsMB } from '@/lib/actions/db.actions';
import React, { useState } from 'react';

const DBcategoriesPage = ({saverIsOpen, setsaverIsOpen}) => {

    const [tags, setTags] = useState('');

    const GetTagsMB = async (e) => {
        e.preventDefault();

        const tagsArr = tags.split(',').map(tag => tag.trim());
        console.log(tagsArr)

        const res = await AddTagsMB({ tagsArr })
        console.log(res)
    };

    const closeWidget = () => {
        setsaverIsOpen(!saverIsOpen);
    }

    return (
        <form onSubmit={GetTagsMB} encType="multipart/form-data" className="text-white centered-div flex flex-col gap-y-4 p-6 bg-slate-100 rounded-md shadow-lg">
            <label className="text-slate-200 font-medium border-b border-slate-400 p-2 text-center"> Upload New Image </label>
            <button className='fixed top-2 right-2 p-2 ' onClick={closeWidget}>X</button>

            <label htmlFor="text" className="text-slate-200 font-medium">
                Tags:
            </label>
            <textarea
                placeholder='anime,music,cover'
                id="text"
                name="text"
                className="border-2 min-h-8 border-slate-300 rounded-md p-2 text-black focus:ring-2 focus:ring-blue-400"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />

            <button
                type="submit"
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
                Create
            </button>
        </form>

    );
};

export default DBcategoriesPage;