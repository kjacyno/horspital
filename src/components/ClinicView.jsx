import {useEffect, useState} from "react";
import {addClinic, deleteClinic, queryForClinics, updateClinic} from "../database/firestoreData.js";

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

    async function handleAddClinic(event) {
        event.preventDefault();
        if (newClinic.trim() !== '') {
            const justAdded = await addClinic({
                name: newClinic,
                createdAt: new Date(),
            }, setNewClinic);
            await queryForClinics(setClinics, setDocsId);
            setSelected(justAdded)
            setIsEdited(false);

        }

    }

    async function handleDeleteClinic(toDelete) {
        await deleteClinic(toDelete);
        setClinics(clinics.filter((clinic) => clinic.id !== toDelete));
        setSelected('');
        await queryForClinics(setClinics, setDocsId);
    }

    const handleEditClinic = async (toEdit) => {

        if (editClinic.trim() !== '') {
            await updateClinic(toEdit, editClinic)
            const clinicUpdate = clinics.map((clinic) => clinic === selected ? editClinic : clinic);
            setClinics([...clinics, clinicUpdate]);
            setEditClinic('');
            setIsEdited(!isEdited)
            await queryForClinics(setClinics, setDocsId);
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
                        id='clinic'
                    >
                        {clinics.length > 0 && clinics.map((clinic, index) => (
                            <option key={clinic.createdAt} value={docsId[index]}>
                                {clinic.name}
                            </option>
                        ))}
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
                {isEdited && (
                    <>
                        <input
                            className='input-edit'
                            type='text'
                            value={editClinic}
                            onChange={(event) => setEditClinic(event.target.value)}
                        />
                        <button onClick={() => handleEditClinic(selected)}>Save</button>
                    </>
                )}
                <div className='clinic-add'>
                    <input
                        className='input-add'
                        type='text'
                        value={newClinic}
                        onChange={(event) => setNewClinic(event.target.value)}
                    />

                    <button type="submit">Add</button>
                </div>
            </form>
        </section>
    );
}

export default ClinicView;