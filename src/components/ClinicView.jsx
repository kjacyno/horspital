import {useEffect, useState} from "react";
import {getFirestore, collection, addDoc, query, onSnapshot, orderBy} from "firebase/firestore";


const firestore = getFirestore();

function ClinicView() {
    const [clinics, setClinics] = useState([]);
    const [selected, setSelected] = useState('');
    const [isEdited, setIsEdited] = useState(false);
    const [newClinic, setNewClinic] = useState('');
    const [editClinic, setEditClinic] = useState('');

    useEffect(() => {
        queryForClinics()
    }, [])
    const clinicListCollection = collection(firestore, 'clinicList')

    async function addClinic() {

        try {

            await addDoc(clinicListCollection, {
                    name: newClinic,
                    createdAt: new Date(),
                }
            );
            setNewClinic('');
        } catch (error) {
            console.log('Error adding new clinic:', error);
        }
    }

    async function queryForClinics() {
        const clinicsListQuery = query(
            collection(firestore, 'clinicList'),
            orderBy('createdAt', 'desc')
        );
        onSnapshot(clinicsListQuery, (querySnapshot) => {
            console.log(querySnapshot.docs.map(item => item.data()));
            setClinics(querySnapshot.docs.map(item => item.data()));

        })
    }

    async function handleAddClinic(event) {
        event.preventDefault();
        if (newClinic.trim() !== '') {
            await addClinic()
        }
    }

    function handleDeleteClinic(toDelete, event) {
        event.preventDefault();

        setClinics(clinics.filter((option) => option !== toDelete));
        localStorage.setItem('clinicOptions', JSON.stringify(clinics))
        setIsEdited(false);
    }

    const handleEditClinic = (event) => {
        event.preventDefault();
        if (editClinic.trim() !== '') {
            const optionsUpdate = clinics.map((option) => option === selected ? editClinic : option);
            setClinics(optionsUpdate);
            setSelected(editClinic);
            setIsEdited(false)
        }
    }


    return (
        <section className="stable">
            <div className='clinic-form'>
                <form className="select-clinic" onSubmit={handleAddClinic}>
                    <label htmlFor='clinic'>Choose clinic</label>
                    <select
                        value={selected}
                        onChange={(event) => {
                            setSelected(event.target.value);
                            setIsEdited(false)
                        }}
                        name='clinic'
                        id='clinic'>
                        {clinics.length > 0 && clinics.map((clinic) => (
                            <option key={clinic.createdAt} value={clinic.name}>{clinic.name}</option>))}
                    </select>
                    {selected && (
                        <div>
                            <button onClick={() => setIsEdited(!isEdited)}>
                                {isEdited ? 'Cancel' : 'Edit'}
                            </button>
                            <button onClick={() => handleDeleteClinic(selected)}>
                                Delete
                            </button>
                        </div>
                    )}
                    {isEdited && (<>
                            <input
                                type='text'
                                value={editClinic}
                                onChange={(event) => setEditClinic(event.target.value)}/>
                            <button onClick={handleEditClinic}>Save</button>
                        </>
                    )}
                    <div>
                        <input
                            type='text'
                            value={newClinic}
                            onChange={(event) => setNewClinic(event.target.value)}
                        />

                        <button onClick={() => handleAddClinic}>Add</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default ClinicView;