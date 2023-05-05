import {getFirestore, collection, addDoc, query, onSnapshot, orderBy, deleteDoc, doc, getDocs} from "firebase/firestore";



const firestore = getFirestore();
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
export async function deleteClinic(toDelete){
    try {
        await deleteDoc(doc(firestore,'clinicList', toDelete));
        console.log('Document deleted successfully!', toDelete);

    } catch (error){
        console.log('Error deleting clinic:', error);

    }

}
// export async function queryForClinics(setClinics, setDocsId) {
//     const clinicsListQuery = query(
//         collection(firestore, 'clinicList'),
//         orderBy('createdAt', 'desc')
//     );
//     onSnapshot(clinicsListQuery, (querySnapshot) => {
//         console.log(querySnapshot.docs.map(item => item.id));
//         setDocsId(querySnapshot.docs.map(item => item.id));
//         setClinics(querySnapshot.docs.map(item => item.data()));
//     })
// }

// export async function queryForClinics(setClinics, setDocsId) {
//     const clinicListCollection = collection(firestore, 'clinicList')
//     const snapshot = await getDocs(clinicListCollection);
//     const clinics = snapshot.docs.map((doc) => {
//         const data = doc.data();
//         return {
//             id: doc.id,
//             name: data.name,
//             createdAt: data.createdAt.toDate(),
//         };
//     });
//
//     setClinics(clinics);
//     setDocsId(snapshot.docs.map((doc) => doc.id));
//     return snapshot.docs;
// }

export async function queryForClinics(setClinics, setDocsId) {
    const clinicsListQuery = query(
        collection(firestore, 'clinicList'),
        orderBy('createdAt', 'desc')
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