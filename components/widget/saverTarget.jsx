'use client'
import { useEffect, useState } from 'react';
import { GetTagsMB } from '@/lib/actions/db.actions';
import AddTagsPage from '../popup/addTags';
import { AddTagsActionVideo, RemoveTagsVideo } from '@/lib/actions/video.actions';
import { AddTagsAction, RemoveTags } from '@/lib/actions/upload.actions';
import {usePathname } from 'next/navigation';

const SaverTargetPage = ({ pId, saverIsOpen, setsaverIsOpen }) => {
    const [resource, setResource] = useState();
    const [tags, setTags] = useState('');
    const [selectedSize, setselectedSize] = useState([]);
    const [ArraySelected, setArraySelected] = useState([])
    const pathname = usePathname();


    useEffect(() => {
        console.log(resource);
    }, [resource]);



    const prepareTags = async () => {
        if (pathname.startsWith('/categorie/')) {
            const res = await AddTagsAction({ selectedSize, pId })
            if (res.success === true) {
                setsaverIsOpen(!saverIsOpen)
            }
        } else if (pathname.startsWith('/categorieVideo')) {
            const res = await AddTagsActionVideo({ selectedSize, pId })
            if (res.success === true) {
                setsaverIsOpen(!saverIsOpen)
            }
        } else {
            return
        }
    };

    useEffect(() => {
        const prepareTags = async () => {
            const categoriesArray = await GetTagsMB()
            setArraySelected(categoriesArray)



        };
        prepareTags()
    }, [])

    const closeWidget = () => {
        setsaverIsOpen(!saverIsOpen);
    }

    const removeAlltags = async () => {

        if (pathname.startsWith('/categorie/')) {
            const categoriesArray = await RemoveTags({ pId })
            if (categoriesArray.success === true) {
                setsaverIsOpen(!saverIsOpen)
                console.log('refresjh')
            }
            // if (typeof pId === 'string') {
            //     const categoriesArray = await RemoveTags({ pId })
            //     console.log(categoriesArray)
            //     console.log(categoriesArray.success)

            //     // setselectedSize(categoriesArray)
            // } else if (Array.isArray(pId)) {
            //     if (pId.length === 1) {
            //         const categoriesArray = await RemoveTags({ pId })
            //         console.log(categoriesArray.success)
            //         if (categoriesArray.success === true) {
            //             setsaverIsOpen(saverIsOpen)
            //         }
            //         console.log(categoriesArray)
            //         // Add your login logic here
            //     } else {
            //         return
            //     }
            // } else {
            //     console.log('Invalid input');
            // }
        } else if (pathname.startsWith('/categorieVideo')) {
            const categoriesArray = await RemoveTagsVideo({ pId })
            console.log(categoriesArray)
            console.log(categoriesArray.success)
            if (categoriesArray.success === true) {
                setsaverIsOpen(!saverIsOpen)
                console.log('refresjh')
            }
            // if (typeof pId === 'string') {
            //     console.log('runing video')

            //     // setselectedSize(categoriesArray)
            // } else if (Array.isArray(pId)) {
            //     if (pId.length === 1) {
            //         const categoriesArray = await RemoveTagsVideo({ pId })
            //         console.log(categoriesArray.success)
            //         if (categoriesArray.success === true) {
            //             setsaverIsOpen(saverIsOpen)
            //         }
            //         console.log(categoriesArray)
            //         // Add your login logic here
            //     } else {
            //         return
            //     }
            // } else {
            //     console.log('Invalid input');
            // }
        } else {
            return
        }


    }

    const handleSizeSelection = (clothing) => {
        if (selectedSize.includes(clothing)) {
            // Si la prenda ya está seleccionada, la quitamos de la selección
            setselectedSize(selectedSize.filter(item => item !== clothing));
        } else {
            // Si la prenda no está seleccionada, la añadimos a la selección
            setselectedSize([...selectedSize, clothing]);
        }
    }


    return (
        <main className="text-white centered-div z-30  flex flex-col gap-y-4 p-6 bg-slate-100 rounded-md shadow-lg">
            <label className="text-slate-200 font-medium border-b border-slate-400 p-2 text-center"> Upload New Image </label>
            <button className='fixed top-2 right-2 p-2 ' onClick={closeWidget}>X</button>

            <section className="mb-4 border-gray-500 border p-2 w-full">
                <div className="mb-4 border-gray-500 border p-2 w-full">
                    <h3>Prendas seleccionadas:</h3>
                </div>
                <div className="mb-4  border-gray-500 border  p-2 w-full">
                    <div className="gap-2 p-2">
                        {selectedSize.map((item, index) => (
                            <button
                                style={{ margin: '5px' }}
                                onClick={() => handleSizeSelection(item)}
                                className="p-2 rounded bg-slate-600" key={`selectedSize${index * 2}`}>{item}</button>
                        ))}
                    </div>
                </div>
                <div className="mb-4 border-gray-500 border   p-2 w-full">
                    <div>
                        {ArraySelected && ArraySelected.map((clothing, index) => (
                            <button
                                key={`sizes${index * 9}`}
                                style={{ margin: '5px' }}
                                onClick={() => handleSizeSelection(clothing)}
                                className={selectedSize.includes(clothing) ? 'selected' : ''}
                            >
                                <p className="p-2 rounded bg-slate-700">{clothing}</p>
                            </button>
                        ))}
                    </div>
                </div>
                <button onClick={removeAlltags} className="mb-4 border-gray-500 border p-2 w-full">
                    remove tag
                </button>

                <div className="mb-4 border-gray-500 border   p-2 w-full">
                    <AddTagsPage />
                </div>
            </section>

            <section className='flex flex-col gap-y-4 p-6  rounded-md shadow-lg'>
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                    onClick={() => prepareTags()}
                >
                    Next
                </button>
            </section>
        </main>
    );
};

export default SaverTargetPage;

