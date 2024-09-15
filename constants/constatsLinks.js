import { CiImageOn } from "react-icons/ci";
import { CiVideoOn } from "react-icons/ci";
import { CiFolderOn } from "react-icons/ci";




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
        name: 'Videos',
        route: '/categorieVideo/All', 
        logo: <CiVideoOn size={24}/>
    },
    {
        name: 'Pictures ',
        route: '/categorie/All', 
        logo: <CiImageOn size={24}/>
    },
    {
        name: 'Folders',
        route: '/profile/a', 
        logo: <CiFolderOn size={24}/>
    }
    
]
