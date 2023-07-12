import {lazy, useEffect, useState} from "react";
import {addClinic, deleteClinic, queryForClinics, updateClinic} from "../firebase/firestoreData.js";

const BoxesChart = lazy(() => import("./BoxesChart.jsx"))

function ClinicView() {
    const [clinics, setClinics] = useState([]);
    const [docsId, setDocsId] = useState([])
    const [selected, setSelected] = useState('');
    const [isEdited, setIsEdited] = useState(false);
    const [newClinic, setNewClinic] = useState('');
    const [editClinic, setEditClinic] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false)


    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function fetchData() {
            await queryForClinics(setClinics, setDocsId, signal);
        }

        fetchData()

        return () => {
            controller.abort();
        };
    }, []);

    useEffect(()=>{
                   setSelected(clinics.length > 0 && docsId[docsId.length - 1] || '');

    }, [docsId])
    async function handleAddClinic(event) {
        event.preventDefault();
        if (newClinic.trim() !== '') {
            const newClinicData =
                {
                    name: newClinic,
                    createdAt: new Date(),
                    boxData: {A: 0, B: 0},
                    boxStatus: {},
                    boxDetails: {}
                }
            await addClinic(newClinicData, setNewClinic);
            await queryForClinics(setClinics, setDocsId);
            setIsEdited(false);

        }
    }

    async function handleDeleteClinic(toDelete) {
        await deleteClinic(toDelete);
        setClinics(clinics.filter((clinic) => clinic.id !== toDelete));
        await queryForClinics(setClinics, setDocsId);
        setIsEdited(false)
        setConfirmDelete(false)
    }

    const handleEditClinic = async (toEdit) => {
        if (editClinic.trim() !== '') {
            await updateClinic(toEdit, editClinic);
            const clinicUpdate = clinics.map((clinic) => clinic === selected ? editClinic : clinic);
            setClinics([...clinics, clinicUpdate]);
            setEditClinic('');
            setIsEdited(!isEdited);
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
                            key={docsId}
                        >
                            <option value='' disabled hidden id='first-option'>Choose Horspital...</option>
                            {clinics.length > 0  ?
                                (clinics.map((clinic, index) => (
                                <option key={clinic.id} value={docsId[index]}>
                                    {clinic.name}
                                </option>))) :
                                <option value='' disabled hidden id='first-option'>Choose Horspital...</option>

                                }
                        </select>
                    </div>
                    {clinics.length > 0 && selected &&
                        <div className='option-btns'>
                            <button className='btn' onClick={() => {
                                setIsEdited(!isEdited);
                                setEditClinic(clinics.find((clinic) => clinic.id === selected).name);
                            }}>
                                {isEdited ? 'Cancel' : 'Edit'}
                            </button>
                            <button className='btn' onClick={() => setConfirmDelete(true)}>
                                Delete
                            </button>
                            {confirmDelete &&
                                <>
                                <p>Are you sure you want to delete the clinic?</p>
                            <button className='btn' onClick={() => handleDeleteClinic(selected)}>Yes
                            </button>
                            <button className='btn' onClick={() => setConfirmDelete(false)}>No</button>
                                </>
                                }
                        </div>
                    }
                    {isEdited && (
                        <div className='clinic-edit'>
                            <input
                                className='input-edit'
                                type='text'
                                value={editClinic}
                                onChange={(event) => setEditClinic(event.target.value)}
                            />
                            <p>Click button below to save your changes!</p>
                            <button className='btn' onClick={() => handleEditClinic(selected)}>
                                Save
                            </button>
                        </div>
                    )}
                    <div className='clinic-add'>
                        <input
                            className='input-add'
                            type='text'
                            placeholder='Add your Horspital'
                            value={newClinic}
                            onChange={(event) => setNewClinic(event.target.value)}
                        />
                        <button className='btn' type="submit">
                            Add
                        </button>
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
                {selected && clinics.some((clinic) => clinic.id === selected) && (
                    <BoxesChart clinicId={selected} />
                )}            </section>
        </>
    );
}

export default ClinicView;