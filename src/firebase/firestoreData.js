import {auth, db} from "/src/firebase/index.js";
import {collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc} from "firebase/firestore";

export async function addClinic(data, setNewClinic) {
    const user = auth.currentUser;
    const docRef = doc(collection(db, 'users', user.uid, 'clinics'))
    const userRef = doc(db, 'users', user.uid)
    const userData = {email: user.email, name: user.displayName}
    try {
        await setDoc(docRef, data)
            .then(() => {
                setNewClinic('');
                return docRef;
            })

    } catch (error) {
        console.log('Error adding new clinic:', error);
    }
    try {
        await setDoc(userRef, userData)
            .then(() => {
                console.log("User data has been added successfully");
            })
    } catch (error) {
        console.log(error);
    }
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

export async function updateClinicBoxData(clinicId, newBoxData, newBoxStatus, signal) {
    try {
        const user = auth.currentUser;
        const clinicRef = doc(collection(db, "users", user.uid, "clinics"), clinicId);
        const updateData = {
            boxData: newBoxData,
            boxStatus: newBoxStatus,
        };
        await updateDoc(clinicRef, updateData, {signal});
    } catch (error) {
        console.log('Error updating box info:', error);
    }
}

export async function updateBoxDetails(clinicId, boxDetails, signal) {
    try {
        const user = auth.currentUser;
        const clinicRef = doc(collection(db, "users", user.uid, "clinics"), clinicId);
        const updateBoxData = {
            boxDetails: boxDetails
        }
        await updateDoc(clinicRef, updateBoxData, {signal});
        // const docSnap = await getDoc(clinicRef, { signal });

        // const existingBoxDetails = docSnap.data()?.boxDetails || {};
        // const updatedBoxDetails = { ...existingBoxDetails, ...boxDetails };

        // await updateDoc(clinicRef, { boxDetails: updatedBoxDetails }, { signal });

    } catch (error) {
        console.log('Error updating box details:', error);

    }
}
export async function getBoxDetailsByClinicId(clinicId, signal) {
    try {
        if (clinicId) {
            const user = auth.currentUser;
            const clinicRef = doc(collection(db, "users", user.uid, "clinics"), clinicId);
            const docSnap = await getDoc(clinicRef, { signal });
            const clinicData = docSnap.data();

            if (clinicData && clinicData.boxDetails) {
                return clinicData.boxDetails;
            }
        }
    } catch (error) {
        console.log('Error getting box details:', error);
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

export async function getBoxesByClinicId(clinicId, signal) {
    try {
        if (clinicId) {
            const user = auth.currentUser;
            const clinicRef = doc(collection(db, "users", user.uid, "clinics"), clinicId);
            const docSnap = await getDoc(clinicRef, {signal});
            return docSnap.data();
        }
    } catch (error) {
        console.log('Error getting box info:', error);
    }
}

export async function queryForClinics(setClinics, setDocsId, signal) {
    const user = auth.currentUser;
    if (user) {
        const colRef = collection(db, 'users', user.uid, 'clinics');
        try {
            const q = query(colRef, orderBy("createdAt", "asc"));
            const docsSnap = await getDocs(q, {signal});
            if (docsSnap.docs.length > 0) {
                setDocsId(docsSnap.docs.map(doc => doc.id));
                setClinics(docsSnap.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        name: data.name,
                        createdAt: data.createdAt.toDate()
                    };
                }));
            }
        } catch (error) {
            console.log('Error querying clinics:', error);
        }
    }
}
