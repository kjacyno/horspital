import {lazy, Suspense, useEffect, useState} from "react";
import {addClinic, deleteClinic, queryForClinics, updateClinic} from "../firebase/firestoreData.js";
import horseShoeSVG from '/src/assets/horse-shoe.svg'

const BoxesChart = lazy(() => import("./BoxesChart.jsx"))

function ClinicView() {
    const [clinics, setClinics] = useState([]);
    const [docsId, setDocsId] = useState([])
    const [selected, setSelected] = useState('');
    const [isEdited, setIsEdited] = useState(false);
    const [newClinic, setNewClinic] = useState('');
    const [editClinic, setEditClinic] = useState('');


    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function fetchData() {
            await queryForClinics(setClinics, setDocsId, signal);

        }

        fetchData();
        return () => {
            controller.abort();
        };
    }, []);

    async function handleAddClinic(event) {
        event.preventDefault();
        if (newClinic.trim() !== '') {
            await addClinic({
                name: newClinic,
                createdAt: new Date(),
                boxData: {A: 0, B: 0},
                boxStatus: {},
                boxDetails: {}
            }, setNewClinic);
            setSelected('');
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
                            {clinics.length > 0 && clinics.map((clinic, index) => (
                                <option key={clinic.createdAt} value={docsId[index]}>
                                    {clinic.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {selected && (
                        <div className='option-btns'>
                            <button className='btn' onClick={() => {
                                setIsEdited(!isEdited);
                                setEditClinic(clinics.find((clinic) => clinic.id === selected).name);
                            }}>
                                {isEdited ? 'Cancel' : 'Edit'}
                            </button>
                            <button className='btn' onClick={() => handleDeleteClinic(selected)}>
                                Delete
                            </button>
                        </div>
                    )}
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
                <Suspense fallback={<div className="icon-loader">
                    <img src={horseShoeSVG} alt='loader'/>
                </div>}>
                    <BoxesChart
                        clinicId={selected}
                    /></Suspense>
            </section>
        </>
    );
}

export default ClinicView;