import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseAuth";

export const GetFavList = async (user) => {
    try {
        const docSnap = await getDoc(doc(db, 'UserFavPet', user?.email));
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            await setDoc(doc(db, 'UserFavPet', user?.email), {
                email: user?.email,
                favourites: [],
            });
            return { favourites: [] }; // Return default structure
        }
    } catch (error) {
        console.error("Error fetching favorite list:", error);
        throw error;
    }
};

export const UpdateFav = async (user, favourites) => {
    try {
        const docRef = doc(db, 'UserFavPet', user?.email);
        await updateDoc(docRef, { favourites });
    } catch (error) {
        console.error("Error updating favorites:", error);
        throw error;
    }
};

export default {
    GetFavList,
    UpdateFav,
};
