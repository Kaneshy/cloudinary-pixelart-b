import cloudinary from 'cloudinary';
import Link from 'next/link';
import { UploadSucces } from '@/lib/actions/upload.actions';
import { CldImage } from 'next-cloudinary';

export default async function HomePage() {

    let userInfo = [];

    try {
        userInfo = await UploadSucces();
        console.log('uploadimgae', userInfo.props.publicId);
    } catch (error) {
        console.error("Error uploading image:", error);
    }

    return (
        <section className='bg-blue-800 w-full h-screen'>
            <h1>home page</h1>
            {userInfo && (
                userInfo.props.publicId.map((x, index) => (
                    <div key={index}>
                        <img src={x} alt="" />
                    </div>
                ))
            )}
        </section>
    );
}