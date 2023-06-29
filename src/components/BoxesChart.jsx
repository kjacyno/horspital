import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {getBoxesByClinicId, updateClinicBoxData} from "../firebase/firestoreData.js";
import BoxDetailsDialog from "./BoxDetailsDialog.jsx";
import BoxDialog from "./BoxDialog.jsx";

function BoxesChart({clinicId}) {
    const [showModal, setShowModal] = useState({});
    const [boxData, setBoxData] = useState({A: 0, B: 0});
    const [boxStatus, setBoxStatus] = useState({A: '', B: ''});
    const [openBoxDetails, setOpenBoxDetails] = useState({})

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const fetchData = async () => {
            try {
                if (clinicId) {
                    const response = await getBoxesByClinicId(clinicId, signal);
                    const boxData = response ? response.boxData : {A: 0, B: 0};
                    const boxStatus = response ? response.boxStatus : {A: '', B: ''};
                    setBoxData(boxData);
                    setBoxStatus(boxStatus);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
        return () => {
            controller.abort();
        };
    }, [clinicId]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const fetchStatus = async () => {
            if (clinicId) {
                try {
                    await updateClinicBoxData(clinicId, boxData, boxStatus, signal)
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchStatus();
        return () => {
            controller.abort();
        };
    }, [boxStatus]);

    const handleBoxAdd = async (rowSymbol) => {
        const newBoxData = {
            ...boxData,
            [rowSymbol]: (boxData[rowSymbol] || 0) + 1
        };
        setBoxData(newBoxData);
        setBoxStatus((prevStatus) => ({
            ...prevStatus,
            [`${rowSymbol}-${newBoxData[rowSymbol] - 1}`]: ""
        }));

        await updateClinicBoxData(clinicId, newBoxData, boxStatus);
    };

    const handleBoxDel = async (rowSymbol, boxIndex) => {
        const newBoxData = {
            ...boxData,
            [rowSymbol]: (boxData[rowSymbol] || 0) - 1
        };
        setBoxData(newBoxData);

        setBoxStatus((prevStatus) => {
            const updatedStatus = {...prevStatus};
            delete updatedStatus[`${rowSymbol}-${boxIndex}`];
            return updatedStatus;
        });
        await updateClinicBoxData(clinicId, newBoxData, boxStatus);
    };

    const toggleShowModal = async (rowSymbol, boxIndex) => {
        setShowModal((prev) => ({
                ...prev,
                [`${rowSymbol}-${boxIndex}`]: !prev[`${rowSymbol}-${boxIndex}`]
            }
        ));
    };
    const toggleBoxDetails = async (rowSymbol, boxIndex) => {
        setOpenBoxDetails((prev) => ({
                ...prev,
                [`${rowSymbol}-${boxIndex}`]: !prev[`${rowSymbol}-${boxIndex}`]
            }
        ));
    };

    const generateDivs = (rowSymbol) => {
        const divs = [];
        for (let i = 0; i < boxData[rowSymbol]; i++) {
            divs.push(
                <div key={i} className="box">
                    {boxStatus?.[`${rowSymbol}-${i}`] && (
                        <div className="box-icon">
                            {boxStatus[`${rowSymbol}-${i}`] === "occupied" ? (
                                <i className="fa-solid fa-horse-head box-icon-modal"
                                   onClick={() => {toggleBoxDetails(rowSymbol, i)}}></i>
                            ) : boxStatus[`${rowSymbol}-${i}`] === "available" ? (
                                <i className="fa-solid fa-house-circle-check box-icon-modal"
                                   onClick={() => {toggleBoxDetails(rowSymbol, i)}}></i>
                            ) : boxStatus[`${rowSymbol}-${i}`] === "problematic" ? (
                                <i className="fa-solid fa-house-circle-exclamation box-icon-modal"
                                   onClick={() => {toggleBoxDetails(rowSymbol, i)}}></i>
                            ) : boxStatus[`${rowSymbol}-${i}`] === "outOfOrder" ? (
                                <i className="fa-solid fa-circle-radiation box-icon-modal"
                                   onClick={() => {toggleBoxDetails(rowSymbol, i)}}></i>
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
                        show={showModal[`${rowSymbol}-${i}`]}
                        toggleShow={() =>
                            toggleShowModal(rowSymbol, i)}
                        setSelectedStatus={(status) =>
                            setBoxStatus((prevStatus) => ({
                                ...prevStatus,
                                [`${rowSymbol}-${i}`]: status,
                            }))
                        }
                        open={open}
                    />
                    <BoxDetailsDialog
                        boxStatus={boxStatus[`${rowSymbol}-${i}`]}
                        show={openBoxDetails[`${rowSymbol}-${i}`]}
                        title={`${rowSymbol}-${i}`}
                        toggleShow={() =>
                            toggleBoxDetails(rowSymbol, i)}
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