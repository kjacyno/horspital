import {collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc, query, orderBy} from "firebase/firestore";

import {auth, db} from "/src/firebase/index.js";


export async function addClinic(data, setNewClinic) {
    const user = auth.currentUser;
    const docRef = doc(collection(db, 'users', user.uid, 'clinics'))
    const userRef = doc(db, 'users', user.uid)
    const userData = {email: user.email, name: user.displayName}
    await setDoc(docRef, data)
        .then(() => {
            setNewClinic('');
            return docRef;
        })
        .catch(error => {
            console.log('Error adding new clinic:', error);
        })
    await setDoc(userRef, userData)
        .then(() => {
            console.log("User data has been added successfully");
        })
        .catch(error => {
            console.log(error);
        })
}

export async function updateClinic(toEdit, editClinic) {
    try {
        const user = auth.currentUser;

        const clinicRef = doc(collection(db, "users", user.uid, "clinics"), toEdit);
        await updateDoc(clinicRef,
            {
                name: editClinic
            })
    } catch (error) {
        console.log('Error editing clinic:', error);
    }
}

export async function updateClinicBoxData(clinicId, newBoxData, boxStatus) {

    try {
        const user = auth.currentUser;

        const clinicRef = doc(collection(db, "users", user.uid, "clinics"), clinicId);
        const updateData = {
            boxData: newBoxData,
            boxStatus: boxStatus,
        };

        await updateDoc(clinicRef, updateData)

    } catch (error) {
        console.log('Error adding box info:', error);
    }
}

export async function deleteClinic(toDelete) {
    try {
        const user = auth.currentUser;

        await deleteDoc(doc(collection(db, "users", user.uid, "clinics"), toDelete));
    } catch (error) {
        console.log('Error deleting clinic:', error);
    }
}

export async function getBoxesByClinicId(clinicId) {
    try {
        if (clinicId) {
            const user = auth.currentUser;
            const clinicRef = doc(collection(db, "users", user.uid, "clinics"), clinicId);
            const docSnap = await getDoc(clinicRef);

            return docSnap.data();
        }
    } catch (error) {
        console.log('Error getting info:', error);
    }
}

export async function queryForClinics(setClinics, setDocsId) {
    const user = auth.currentUser;
    if (user) {
        const colRef = collection(db, 'users', user.uid, 'clinics')
        try {
            const q = query(colRef, orderBy("name", "asc"))
            const docsSnap = await getDocs(q);
            if (docsSnap.docs.length > 0) {
                setDocsId(docsSnap.docs.map(doc => doc.id
                ))
                setClinics(docsSnap.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        name: data.name,
                        createdAt: data.createdAt.toDate()
                    }
                }))

            }
        } catch (error) {
            console.log(error);
        }

    }
}

// export async function queryForClinics(setClinics, setDocsId) {
//     const user = auth.currentUser;
//     if (user){
//     const clinicsListQuery = query(
//         collection(db, 'users', user.uid, 'clinics'),
//         orderBy('name', 'asc')
//     );
//
//     await onSnapshot(clinicsListQuery, (querySnapshot) => {
//         setDocsId(querySnapshot.docs.map(item => item.id));
//         setClinics(querySnapshot.docs.map(item => {
//             const data = item.data();
//             return {
//                 id: item.id,
//                 name: data.name,
//                 createdAt: data.createdAt.toDate(),
//             };
//         }));
//     })    }
// }