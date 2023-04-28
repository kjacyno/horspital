
// import AsyncSelect from 'react-select/async';
// import { collection, addDoc } from "firebase/firestore";
import {useState} from "react";
// import {db} from "../firebase/index.js";

function ClinicView() {
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState('');
    const [isEdited, setIsEdited] = useState(false);
    const [newOption, setNewOption] = useState('');
    const [editOption, setEditOption] = useState('');

    // useEffect(() => {
    //     // Add a new document in collection "cities"
    //     (async () => {
    //         const docRef = await addDoc(collection(db, "cities"), {
    //         name: "Tokyo",
    //         country: "Japan"
    //         });
    //         console.log("Document written with ID: ", docRef.id);
    //     })();
    //     const savedOptions = localStorage.getItem('clinicOptions');
    //     if (savedOptions){setOptions(JSON.parse(savedOptions))}
    // }, []);

    // useEffect(() => {
    //     localStorage.setItem('clinicOptions', JSON.stringify(options));
    // }, [options]);
    function handleAddOption(event) {
        event.preventDefault();
        if (newOption.trim() !== '') {
            setOptions([...options, newOption]);
            setNewOption('');
            localStorage.setItem('clinicOptions', JSON.stringify(options))
        }
    }

    function handleDeleteOption(toDelete, event) {
        event.preventDefault();

        setOptions(options.filter((option) => option !== toDelete));
        localStorage.setItem('clinicOptions', JSON.stringify(options))
        setIsEdited(false);
    }

    const handleEditOption = (event) => {
        event.preventDefault();
        if (editOption.trim() !== '') {
            const optionsUpdate = options.map((option) => option === selected ? editOption : option);
            setOptions(optionsUpdate);
            setSelected(editOption);
            setIsEdited(false)
        }
    }


return (
    <section className="stable">
        <div className='clinic-form'>
            <form className="select-clinic">
                <label htmlFor='clinic'>Choose clinic</label>
                <select
                    value={selected}
                    onChange={(event) => {
                        setSelected(event.target.value);
                        setIsEdited(false)
                    }}
                    name='clinic'
                    id='clinic'>
                    <option value=''>*****</option>
                    {options.map((option) => (
                        <option key={option} value={option}>{option}</option>))}
                </select>
                {selected && (
                    <div>
                        <button onClick={() => setIsEdited(!isEdited)}>
                            {isEdited ? 'Cancel' : 'Edit'}
                        </button>
                        <button onClick={() => handleDeleteOption(selected)}>
                            Delete
                        </button>
                    </div>
                )}
                {isEdited && (<>
                        <input
                            type='text'
                            value={editOption}
                            onChange={(event) => setEditOption(event.target.value)}/>
                        <button onClick={handleEditOption}>Save</button>
                    </>
                )}
                <div>
                    <input
                        type='text'
                        value={newOption}
                        onChange={(event) => setNewOption(event.target.value)}
                    />
                    <button onClick={handleAddOption}>Add</button>
                </div>
            </form>
        </div>
    </section>
);
}

export default ClinicView;