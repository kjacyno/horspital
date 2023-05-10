import {useEffect, useState} from "react";
import {addClinic, deleteClinic, queryForClinics, updateClinic} from "../database/firestoreData.js";
import BoxesChart from "./BoxesChart.jsx";

function ClinicView() {
    const [clinics, setClinics] = useState([]);
    const [docsId, setDocsId] = useState([])
    const [selected, setSelected] = useState('');
    const [isEdited, setIsEdited] = useState(false);
    const [newClinic, setNewClinic] = useState('');
    const [editClinic, setEditClinic] = useState('');

    useEffect(() => {
        async function fetchData() {
            await queryForClinics(setClinics, setDocsId);
        }

        fetchData();
    }, [setClinics])

    async function handleAddClinic(event) {
        event.preventDefault();
        if (newClinic.trim() !== '') {
          await addClinic({
                name: newClinic,
                createdAt: new Date(),
                boxData: {A: 0, B: 0},
                boxStatus:{A: 0},
            }, setNewClinic);
            setSelected('')
            await queryForClinics(setClinics, setDocsId);

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

    return (<>
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
                            <option value='' disabled hidden id='first-option'>Choose Horspital...</option>
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
                            placeholder='Add your Horspital'
                            value={newClinic}
                            onChange={(event) => setNewClinic(event.target.value)}
                        />

                        <button type="submit">Add</button>
                    </div>
                </form>
            </section>
            <section className="legend">
                <p><i className="fa-solid fa-horse-head"></i>Box occupied</p>
                <p><i className="fa-solid fa-house-circle-check"></i>Box available</p>
                <p><i className="fa-solid fa-house-circle-exclamation"></i>Problematic horse/stallion</p>
                <p><i className="fa-solid fa-circle-radiation"></i>Out of order</p>
            </section>
            <section className='box-container'>
                <BoxesChart
                    clinicId={selected}
                />
            </section>
        </>
    );
}

export default ClinicView;