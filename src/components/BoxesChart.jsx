import {useEffect, useState} from "react";
import {getBoxesByClinicId, updateClinicBoxData} from "../database/firestoreData.js";
import PropTypes from "prop-types";
import BoxDialog from "./BoxDialog.jsx";

function BoxesChart({clinicId}) {
    const [boxData, setBoxData] = useState({});
    const [showModal, setShowModal] = useState({});
    const [selectedStatus, setSelectedStatus] = useState({[clinicId]: {}});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getBoxesByClinicId(clinicId);
                if (result && result.boxData) {
                    setBoxData(result.boxData);
                }
                if (result && result.boxStatus) {
                    setSelectedStatus({[clinicId]: result.boxStatus});
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [clinicId]);

    useEffect(() => {
        const fetchStatus = async () => {
            if (clinicId) {
                try {
                    await updateClinicBoxData(clinicId, boxData, selectedStatus[clinicId]);
                } catch (error) {
                    console.log(error)
                }
            }
        };
        fetchStatus();
    }, [selectedStatus]);

    const handleBoxAdd = async (rowSymbol) => {
        const newBoxData = {
            ...boxData,
            [rowSymbol]: (boxData[rowSymbol] || 0) + 1
        };
        setBoxData(newBoxData);
        setSelectedStatus((prevStatus) => ({
            ...prevStatus,
            [clinicId]: {
                ...prevStatus[clinicId],
                [`${rowSymbol}-${newBoxData[rowSymbol] - 1}`]: ""
            }
        }));

        await updateClinicBoxData(clinicId, newBoxData, selectedStatus[clinicId]);
    };

    const handleBoxDel = async (rowSymbol, boxIndex) => {
        const newBoxData = {
            ...boxData,
            [rowSymbol]: (boxData[rowSymbol] || 0) - 1
        };
        setBoxData(newBoxData);

        setSelectedStatus((prevStatus) => {
            const updatedStatus = {...prevStatus};
            delete updatedStatus[clinicId][`${rowSymbol}-${boxIndex}`];
            return updatedStatus;
        });
        await updateClinicBoxData(clinicId, newBoxData, selectedStatus[clinicId]);
    };

    const toggleShowModal = async (rowSymbol, boxIndex) => {
        setShowModal((prev) => ({
                ...prev,
                [`${rowSymbol}-${boxIndex}`]: !prev[`${rowSymbol}-${boxIndex}`]
            }
        ));
    };

    const boxStatus = [
        {name: "occupied", icon: <i key="occupied" className="fa-solid fa-horse-head"></i>},
        {name: "available", icon: <i key="available" className="fa-solid fa-house-circle-check"></i>},
        {name: "problematic", icon: <i key="problematic" className="fa-solid fa-house-circle-exclamation"></i>},
        {name: "outOfOrder", icon: <i key="outOfOrder" className="fa-solid fa-circle-radiation"></i>}
    ];
    const generateDivs = (rowSymbol) => {
        const divs = [];
        for (let i = 0; i < boxData[rowSymbol]; i++) {
            divs.push(
                <div key={i} className="box">
                    {selectedStatus[clinicId]?.[`${rowSymbol}-${i}`] && (
                        <div className="box-icon">
                            {selectedStatus[clinicId][`${rowSymbol}-${i}`] === "occupied" ? (
                                <i className="fa-solid fa-horse-head"></i>
                            ) : selectedStatus[clinicId][`${rowSymbol}-${i}`] === "available" ? (
                                <i className="fa-solid fa-house-circle-check"></i>
                            ) : selectedStatus[clinicId][`${rowSymbol}-${i}`] === "problematic" ? (
                                <i className="fa-solid fa-house-circle-exclamation"></i>
                            ) : selectedStatus[clinicId][`${rowSymbol}-${i}`] === "outOfOrder" ? (
                                <i className="fa-solid fa-circle-radiation"></i>
                            ) : null}
                        </div>
                    )}
                    <button
                        className="box-info-btn"
                        onClick={() => {
                            toggleShowModal(rowSymbol, i);
                        }}
                    >
                        <p>{rowSymbol}&nbsp;-&nbsp;{i}</p>
                    </button>
                    <BoxDialog
                        title={'Set box status'}
                        show={showModal[`${rowSymbol}-${i}`]}
                        toggleShow={() =>
                            toggleShowModal(rowSymbol, i)}
                        status={boxStatus}
                        setSelectedStatus={(status) =>
                            setSelectedStatus((prevStatus) => ({
                                ...prevStatus,
                                [clinicId]: {
                                    ...prevStatus[clinicId],
                                    [`${rowSymbol}-${i}`]: status,
                                }
                            }))
                        }
                        open={open}
                    />
                </div>
            );
        }
        return divs;
    };
    if (!clinicId) {
        return <></>
    }
    return (
        <div className='box-sections'>
            <section className="box-wrapper1">
                <button className="box add-box"
                        onClick={() => handleBoxAdd('A')}
                >
                    <i className="fa-solid fa-plus"></i>
                </button>
                <button className="box del-box"
                        onClick={() => handleBoxDel('A')}
                >
                    <i className="fa-solid fa-minus"></i>
                </button>
                {generateDivs('A')}
            </section>
            <section className="box-wrapper2">
                <button className="box add-box"
                        onClick={() => handleBoxAdd('B')}
                >
                    <i className="fa-solid fa-plus"></i>
                </button>
                <button className="box del-box"
                        onClick={() => handleBoxDel('B')}
                >
                    <i className="fa-solid fa-minus"></i>
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
};

export default BoxesChart;