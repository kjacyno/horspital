import {useEffect, useState} from "react";
import {getBoxesByClinicId, updateClinicBoxData} from "../database/firestoreData.js";
import PropTypes from "prop-types";
import BoxDialog from "./BoxDialog.jsx";

function BoxesChart({clinicId}) {
    const [boxCount, setBoxCount] = useState({A: 0, B: 0});
    const [showModal, setShowModal] = useState({});
    const [selectedStatus, setSelectedStatus] = useState({});


    useEffect(() => {
            getBoxesByClinicId(clinicId).then((result) => {
                if (result && result.boxData) {
                    const boxData = result.boxData;
                    const newBoxCount = {};
                    for (let [key, value] of Object.entries(boxData)) {
                        newBoxCount[key] = value;
                    }
                    setBoxCount(newBoxCount);
                    console.log(boxCount)
                }
            })
                .catch(console.error)
        }
        , [clinicId]);

    const handleBoxAdd = async (rowNumber) => {
        setBoxCount((prevCount) => ({
            ...prevCount,
            [rowNumber]: prevCount[rowNumber] + 1
        }));
        setSelectedStatus((prevStatus) => ({
            ...prevStatus,
            [`${rowNumber}-${boxCount[rowNumber]}`]: ""
        }));
        const newBoxData = {
            ...boxCount,
            [rowNumber]: boxCount[rowNumber] + 1
        }
        await updateClinicBoxData(clinicId, newBoxData);
    };

    const handleBoxDel = async (rowNumber, boxIndex) => {
        setBoxCount((prevCount) => ({
            ...prevCount,
            [rowNumber]: prevCount[rowNumber] - 1
        }));
        const newBoxData = {
            ...boxCount,
            [rowNumber]: boxCount[rowNumber] - 1
        }
        setSelectedStatus((prevStatus) => {
            const updatedStatus = {...prevStatus};
            delete updatedStatus[`${rowNumber}-${boxIndex}`];
            return updatedStatus;
        });
        await updateClinicBoxData(clinicId, newBoxData);
    };

    const toggleShowModal = (rowNumber, boxIndex) => {
        setShowModal((prev) => ({
                ...prev,
                [`${rowNumber}-${boxIndex}`]: !prev[`${rowNumber}-${boxIndex}`]
            }
        ));
    };

    const boxStatus = [
        {name: "occupied", icon: <i key="occupied" className="fa-solid fa-horse-head"></i>},
        {name: "available", icon: <i key="available" className="fa-solid fa-house-circle-check"></i>},
        {name: "problematic", icon: <i key="problematic" className="fa-solid fa-house-circle-exclamation"></i>},
        {name: "outOfOrder", icon: <i key="outOfOrder" className="fa-solid fa-circle-radiation"></i>}
    ]
    const generateDivs = (rowNumber) => {
        const divs = [];
        for (let i = 0; i < boxCount[rowNumber]; i++) {
            divs.push(
                <div key={i} className="box">
                    {selectedStatus[`${rowNumber}-${i}`] && (
                        <div className="box-icon">
                            {selectedStatus[`${rowNumber}-${i}`] === "occupied" ? (
                                <i className="fa-solid fa-horse-head"></i>
                            ) : selectedStatus[`${rowNumber}-${i}`] === "available" ? (
                                <i className="fa-solid fa-house-circle-check"></i>
                            ) : selectedStatus[`${rowNumber}-${i}`] === "problematic" ? (
                                <i className="fa-solid fa-house-circle-exclamation"></i>
                            ) : selectedStatus[`${rowNumber}-${i}`] === "outOfOrder" ? (
                                <i className="fa-solid fa-circle-radiation"></i>
                            ) : null}
                        </div>
                    )}
                    <button
                        className="box-info-btn"
                        onClick={() => {
                            toggleShowModal(rowNumber, i);
                        }}
                    >
                        <p>{rowNumber}&nbsp;-&nbsp;{i}</p>
                    </button>
                    <BoxDialog
                        title={'Set box status'}
                        show={showModal[`${rowNumber}-${i}`]}
                        toggleShow={() =>
                            toggleShowModal(rowNumber, i)}
                        status={boxStatus}
                        setSelectedStatus={(status) =>
                            setSelectedStatus((prevStatus) => ({
                                ...prevStatus,
                                [`${rowNumber}-${i}`]: status,
                            }))
                        }
                    />
                </div>
            );
        }
        return divs;
    };
if (!clinicId) {
    return <></>
}
    return (<div className='box-sections'>


            <section className="box-wrapper1">
                    <button className="box add-box"
                            onClick={() => handleBoxAdd('A')}
                    ><i className="fa-solid fa-plus"></i>
                    </button>
                    <button className="box del-box"
                            onClick={() => handleBoxDel('A')}
                    ><i className="fa-solid fa-minus"></i>
                    </button>
                    {generateDivs('A')}
            </section>
            <section className="box-wrapper2">

                    <button className="box add-box"
                            onClick={() => handleBoxAdd('B')}
                    ><i className="fa-solid fa-plus"></i>
                    </button>
                    <button className="box del-box"
                            onClick={() => handleBoxDel('B')}
                    ><i className="fa-solid fa-minus"></i>
                    </button>
                    {generateDivs('B')}

            </section>
        </div>
    );
}

BoxesChart.propTypes = {
    clinicId: PropTypes.any,
    clinics: PropTypes.array,
    setClinics: PropTypes.func,
    setDocsId: PropTypes.func
}

export default BoxesChart;