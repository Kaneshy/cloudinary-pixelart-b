
import { AddTagsMB } from '@/lib/actions/db.actions';
import React, { useEffect, useRef, useState } from 'react';

const DBcategoriesPage = ({ saverIsOpen, setsaverIsOpen, setdata }) => {

    const [tags, setTags] = useState('');
    const formRef = useRef(null)

    const GetTagsMB = async (e) => {
        e.preventDefault();

        const tagsArr = tags.split(',').map(tag => tag.trim());
        console.log(tagsArr)

        const res = await AddTagsMB({ tagsArr })
        console.log('rere', res)
        setdata(res)
        setsaverIsOpen(!saverIsOpen)
    };

    const closeWidget = () => {
        setsaverIsOpen(!saverIsOpen);
    }

    useEffect(() => {

        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setsaverIsOpen(false); // Close the form
            }
        };

        // Add event listener to detect clicks outside the form
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up event listener on unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setsaverIsOpen]);

    return (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-80  flex flex-col justify-center items-center overflow-auto">
            <form 
            ref={formRef}
            onSubmit={GetTagsMB} encType="multipart/form-data" className="text-white  z-50 centered-div flex flex-col gap-y-4 p-6 bg-slate-100 rounded-md shadow-lg">
                <label className="text-slate-200 font-medium border-b border-slate-400 p-2 text-center"> Add New Folders </label>
                <button className='fixed top-2 right-2 p-2 ' onClick={closeWidget}>X</button>

                <label htmlFor="text" className="text-slate-200 text-xs font-medium">
                    NAME/S:
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
        </div>

    );
};

export default DBcategoriesPage;