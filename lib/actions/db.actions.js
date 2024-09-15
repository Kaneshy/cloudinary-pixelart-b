'use server'
import { NextResponse } from "next/server"
import Users from "../models/User";
import Tags from "../models/Tag";
import { connectToDB } from "../mongoose";

// export const AddTagsMB = async ({ tagsArr }) => {
//     console.log('running add tag')
//     console.log(tagsArr)
//     connectToDB();
   
//     try {
//         const newTag = new Users({ tags: tagsArr })

//         const savedTag = await newTag.save();
//         console.log('hhh', savedTag)
//         // return NextResponse.json(savedTag)

//     } catch (err) {
//         console.log(err.message)
//         return NextResponse.json('error api/user', err.message)
//     }
// };

// export const AddTagsMB = async ({ tagsArr }) => {
//     console.log('Running add tags');
//     console.log('Tags Array:', tagsArr);

//     await connectToDB();

//     try {
//         // Fetch existing tags
//         const existingTags = await Users.find({ tags: { $in: tagsArr } }).distinct('tags');

//         // Filter out existing tags from the input array
//         const newTags = tagsArr.filter(tag => !existingTags.includes(tag));

//         // Only proceed if there are new tags to add
//         if (newTags.length > 0) {
//             const newTagEntry = new Users({ tags: newTags });
//             const savedTag = await newTagEntry.save();
//             console.log('Saved Tags:', savedTag);
//             // return savedTag; // Return the saved tags if needed
//         } else {
//             console.log('No new tags to add.');
//             return null; // Or return an appropriate response
//         }

//     } catch (err) {
//         console.log('Error:', err.message);
//         return null; // Handle the error accordingly, e.g., return an error response
//     }
// };


export const AddTagsMB = async ({ tagsArr }) => {
    console.log('Running add tags if not exists');
    const tagsToAdd = Array.isArray(tagsArr) ? tagsArr : [tagsArr]; // Ensure tagsArr is always an array
    console.log('New Tags:', tagsToAdd);

    await connectToDB();

    try {
        // Use $addToSet to add only unique tags to the user's tags array
        const updatedUser = await Users.findByIdAndUpdate(
            '66c67da0078ee9d7db337949', // User ID
            { $addToSet: { tags: { $each: tagsToAdd } } }, // Add only unique tags
            { new: true } // Return the updated user document
        );

        if (updatedUser) {
            const plainUser = updatedUser.toObject(); // Convert Mongoose document to plain JS object
            console.log('Updated User:', plainUser);
            return plainUser.tags; // Return the updated tags array
        } else {
            console.log('User not found');
            return null; // Return null if the user wasn't found
        }

    } catch (err) {
        console.log('Error:', err.message);
        return null; // Handle the error accordingly
    }
};

export const RemoveTagsMB = async (x) => {
    console.log('Running remove tags if exist');
    const tagsArr = Array.isArray(x) ? x : [x]; // Ensure tagsArr is always an array
    console.log('Tags to remove:', tagsArr);

    await connectToDB();

    try {
        // Update the user's tags array by pulling/removing the provided tags
        const updatedUser = await Users.findByIdAndUpdate(
            '66c67da0078ee9d7db337949', // User ID
            { $pull: { tags: { $in: tagsArr } } }, // Use $pull to remove tags
            { new: true } // Return the updated user document
        );

        if (updatedUser) {
            const plainUser = updatedUser.toObject(); // Convert Mongoose document to plain JS object
            console.log('Updated User after tag removal:', plainUser);
            return plainUser.tags; // Return the plain object
        } else {
            console.log('User not found');
            return null; // Return null if the user wasn't found
        }

    } catch (err) {
        console.log('Error:', err.message);
        return null; // Handle the error appropriately
    }
};


export const GetTagsMB = async () => {

    console.log('gettags', )

    await connectToDB();

    try {
        console.log('runinng get')
        const user = await Users.findById('66c67da0078ee9d7db337949');
        console.log('user', user.tags)

        return user.tags
    } catch (err) {
        console.log(err.message)
        return NextResponse.json('error api/tarjet', err.message)
    }
};