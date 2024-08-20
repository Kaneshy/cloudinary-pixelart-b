'use client'
import { CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import WidgetTags from './widgetTags';

const UploadWidgetCdl = ({ isopen, setisopen }) => {
    const [resource, setResource] = useState();
    const [tags, setTags] = useState('');
    const [tagsArray, setTagsArray] = useState([]);
    const folderName = 'books'
    const [activeCdl, setactiveCdl] = useState(false)

    useEffect(() => {
        console.log(resource);
    }, [resource]);

    const handleTagChange = (event) => {
        setTags(event.target.value);
    };

    const prepareTags = () => {
        const tagsArr = tags.split(',').map(tag => tag.trim());
        setTagsArray(tagsArr);
        setactiveCdl(!activeCdl)
    };

    const closeWidget = () => {
        setisopen(!isopen);
    }

    return (
        <main className="text-white centered-div  flex flex-col gap-y-4 p-6 bg-slate-100 rounded-md shadow-lg">
            <label className="text-slate-200 font-medium border-b border-slate-400 p-2 text-center"> Upload New Image </label>
            <button className='fixed top-2 right-2 p-2 ' onClick={closeWidget}>X</button>




            {activeCdl ? (
                <div>
                    <WidgetTags tagsArray={tagsArray} folderName={folderName} />
                </div>
            ) : (
                <section className='flex flex-col gap-y-4 p-6  rounded-md shadow-lg'>
                    <label htmlFor="image" className="text-slate-200 font-medium">
                        tags:
                        <p className='text-sm text-zinc-400'> (Enter tags, separated by commas) </p>
                    </label>
                    <input
                        type="text"
                        placeholder="anime, music, cover "
                        value={tags}
                        onChange={handleTagChange}
                        style={{ marginBottom: '10px', padding: '5px' }}
                        className='text-black'
                    />
                    <button
                        type="submit"
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                        onClick={() => prepareTags()}
                    >
                        Next
                    </button>
                </section>

            )}
        </main>
    );
};

export default UploadWidgetCdl;

