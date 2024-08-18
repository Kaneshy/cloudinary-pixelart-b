'use server'
import cloudinary from 'cloudinary'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'


export const UploadImage = async () => {
  // Simulate an async operation, like an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Image uploaded successfully!");
    }, 1000); // Simulates a 1-second delay
  });
};

export const UploadSucces = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.API_SECRET,
  });

  try {
    const results = await cloudinary.v2.search
      // you can add also AND tags=shirt AND uploaded_at>1d AND bytes>1m
      .expression('resource_type:image AND folder=anime-proyect-z')
      .sort_by('uploaded_at', 'desc')
      .max_results(80)
      .next_cursor()
      .execute();
    console.log(results);
    const publicId = results.resources.map(resource => resource.url);
    return {
      props: {
        publicId // Pasar secureUrls como propiedad al componente homePage
      }
    }

  } catch (error) {
    console.error('Error al obtener los resultados de Cloudinary:', error);
    throw error;
  }

}


export const uploadImage = async (file) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.API_SECRET,
  });


  try {
    const result = await cloudinary.v2.uploader.upload(file, {
      folder: 'anime-proyect-z', // Optional: specify a folder
      resource_type: 'image',
    });

    console.log('Upload successful:', result);
    return result.secure_url; // Return the secure URL of the uploaded image

  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};









export const createMessage = async (formData) => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const text = formData.get('text');
  const image = formData.get('image');
  const tagsA = text.split(',').map(tag => tag.trim());

  console.log('text', text)
  let uploadedImageUrl = null;

  if (image) {
    // Convert image to base64 or stream format
    const imageUploadResponse = await uploadImageToCloudinary(image, tagsA);
    uploadedImageUrl = imageUploadResponse.secure_url;
    console.log('Uploaded Image URL:', imageUploadResponse);
    revalidatePath('/categorie/All')
  }
};


const uploadImageToCloudinary = async (imageFile, tagsA) => {

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
  });

  try {
    // Convert the file to a buffer
    const buffer = await imageFile.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString('base64');
    const imageDataUri = `data:${imageFile.type};base64,${base64Image}`;

    const resultUnsigned = await cloudinary.v2.uploader.unsigned_upload(imageDataUri, "books_preset", {
      folder: "books", // Optional: specify a folder in Cloudinary
      tags: tagsA,
      asset_folder: "books", // Optional: specify a folder in Cloudinary"

    })

    console.log('resultUnsigned', resultUnsigned)

    return resultUnsigned.secure_url; // This will contain the secure_url among other data
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};


export const FetchImagesbyTags = async ({ tag }) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.API_SECRET,
  });

  let nextCursor = null

  try {
    // Construct the base expression
    let expression = `resource_type:image AND folder=books`;

    // Conditionally add the tag filter
    if (tag !== 'All') {
      expression += ` AND tags=${tag}`;
    }



    // Execute the search query
    const results = await cloudinary.v2.search
      .expression(expression)
      .sort_by('uploaded_at', 'desc')
      .max_results(100)
      .next_cursor('cdc7d9acb7171c32654336eaa28fa455b6104a128504d7e7c524299661dc979537b83a1e6a9e5271667afcf8d373a478')
      .execute()
    console.log('results', results)
    const publicId = results.resources.map(resource => resource.public_id);
    return {
      props: {
        publicId // Pasar secureUrls como propiedad al componente homePage
      }
    }

  } catch (error) {
    console.error('Error al obtener los resultados de Cloudinary:', error);
    throw error;
  }

}


export const DeleteImagebyPublicId = async ({ publicIdA }) => {
  
  console.log('DeleteImagebyPublicId', publicIdA)
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.API_SECRET,
  });
  
  const deleteimg = await cloudinary.uploader.destroy(publicIdA, function (result) { console.log(result) });
  console.log(deleteimg)

  return deleteimg
}


// Upload to Cloudinary
// const result = await cloudinary.uploader.upload(imageDataUri, {
//   public_id: "wiki_shirt",
//   folder: "books", // Optional: specify a folder in Cloudinary
//   tags: "anime",
// },)
// console.log(result.public_id)

// await cloudinary.v2.uploader
//   .add_tag('animal', [result.public_id])
//   .then(result => console.log(result));