import {collection, addDoc, query, onSnapshot, orderBy, deleteDoc, doc, updateDoc} from "firebase/firestore";

import {firestore} from "../firebase/index.js";

const clinicListCollection = collection(firestore, 'clinicList')

export async function addClinic(data, setNewClinic) {
    try {
        const docRef = await addDoc(clinicListCollection, data
        );
           console.log("Document written with ID: ", docRef.id)
        setNewClinic('');
    } catch (error) {
        console.log('Error adding new clinic:', error);
    }
}

export async function updateClinic(toEdit, editClinic){
    try {
        await updateDoc(doc(firestore,'clinicList',toEdit),
            {
                name: editClinic
            })
} catch (error){
        console.log('Error editing clinic:', error);

    }
}

export async function deleteClinic(toDelete){
    try {
        await deleteDoc(doc(firestore,'clinicList', toDelete));
        console.log('Document deleted successfully!', toDelete);

    } catch (error){
        console.log('Error deleting clinic:', error);

    }

}
export async function queryForClinics(setClinics, setDocsId) {
    const clinicsListQuery = query(
        collection(firestore, 'clinicList'),
        orderBy('name', 'asc')
    );
    onSnapshot(clinicsListQuery, (querySnapshot) => {
        console.log(querySnapshot.docs.map(item => item.id));
        setDocsId(querySnapshot.docs.map(item => item.id));
        setClinics(querySnapshot.docs.map(item => {
            const data = item.data();
            return {
                id: item.id,
                name: data.name,
                createdAt: data.createdAt.toDate(),
            };
        }));
    })
}