import { GrMultiple } from "react-icons/gr";
import { FaImage } from "react-icons/fa";
import { RiVideoAddFill } from "react-icons/ri";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";




export const constatsLinks = [
    {
        title:'Images',
        desc:'Imagenes, gits, etc.',
        link:'/categorie/All',
        imgUrl:'https://res.cloudinary.com/dh01ngdjo/image/upload/v1723946705/pdfreader/c3fuwlthehuy4lwdejpq.webp'
        
    },
    {
        title:'Videos',
        desc:'Videos, shorts, etc.',
        link:'/categorieVideo/All',
        imgUrl:'https://res.cloudinary.com/dh01ngdjo/image/upload/v1723946539/pdfreader/t4mfl8ymmgawsuvjpfmr.gif'
    }
]

export const videoCategories = [
    "Music",
    "Education",
    "Gaming",
    "Sports",
    "Movies",
    "News",
    "Technology",
    "Travel",
    "Food",
    "Lifestyle",
    "Comedy",
    "Health",
    "Fitness",
    "Beauty",
    "Fashion",
    "Science",
    "Documentaries",
    "Vlogs",
    "Animation",
    "Art",
    "History"
];

export const bottonBarC = [
    {
        name: 'Pictures',
        route: '/categorie/All', 
        logo: <FaVideo size={24}/>
    },
    {
        name: 'Videos',
        route: '/categorie/All', 
        logo: <FaImage size={24}/>
    },
    {
        name: 'Upload',
        route: '/categorie/All', 
        logo: <IoMdCloudUpload size={28} />
    }
    
]