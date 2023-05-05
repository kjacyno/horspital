import {useEffect, useState} from "react";
import {addClinic, deleteClinic, queryForClinics} from "../database/api.js";
// import {doc} from "firebase/firestore";

function ClinicView() {
    const [clinics, setClinics] = useState([]);
    const [docsId, setDocsId] = useState([])
    const [selected, setSelected] = useState('');
    const [isEdited, setIsEdited] = useState(false);
    const [newClinic, setNewClinic] = useState('');
    const [editClinic, setEditClinic] = useState('');

    useEffect(() => {
        queryForClinics(setClinics, setDocsId)

    }, [setClinics])
    console.log(selected)
    async function handleAddClinic(event) {
        event.preventDefault();
        if (newClinic.trim() !== '') {
         await addClinic({
                name: newClinic,
                createdAt: new Date(),
            }, setNewClinic);

                await queryForClinics(setClinics, setDocsId);
            }
          }



    async function handleDeleteClinic(toDelete) {
        console.log('Deleting clinic:', toDelete);

        try {
            await deleteClinic(toDelete);
            setClinics(clinics.filter((clinic) => clinic.id !== toDelete));
            setSelected('');

        } catch (error) {
            console.log('Error deleting clinic:', error);
        }
        await queryForClinics(setClinics, setDocsId);

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
        <section className="clinics">
                <form className="clinic-form" onSubmit={handleAddClinic}>
                    <div className="clinic-select">
                    <label htmlFor='clinic'>Choose clinic</label>
                    <select
                        value={selected}
                        onChange={(event) => {
                            setSelected(event.target.value);
                            setIsEdited(false)
                        }}
                        onClick={(event) => {
                            setSelected(event.target.value);
                            setIsEdited(false)
                        }}
                        name='clinic'
                        id='clinic'>
                        {clinics.length > 0 && clinics.map((clinic, index) => (
                            <option key={clinic.createdAt} value={docsId[index]}>{clinic.name}</option>))}
                    </select>
                    </div>
                    {selected && (
                        <div className='option-btns'>
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
                    <div className='input-add'>
                        <input
                            type='text'
                            value={newClinic}
                            onChange={(event) => setNewClinic(event.target.value)}
                        />

                        <button onClick={() => handleAddClinic}>Add</button>
                    </div>
                </form>
        </section>
    );
}

export default ClinicView;