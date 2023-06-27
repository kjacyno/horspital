import {useEffect, useState} from "react";
import {getBoxesByClinicId, updateClinicBoxData} from "../firebase/firestoreData.js";
import PropTypes from "prop-types";
import BoxDialog from "./BoxDialog.jsx";

function BoxesChart({clinicId}) {
    const [showModal, setShowModal] = useState({});
    const [boxData, setBoxData] = useState({A: 0, B: 0});
    const [boxStatus, setBoxStatus] = useState({A: '', B: ''});

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (clinicId) {
                    const response = await getBoxesByClinicId(clinicId);
                    console.log(response)
                    const boxData = response ? response.boxData : { A: 0, B: 0 };
                    const boxStatus = response ? response.boxStatus: { A: '', B: '' };

                    setBoxData(boxData);
                    setBoxStatus(boxStatus);
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
                    await updateClinicBoxData(clinicId, boxData, boxStatus).then(() => {
                        console.log('update do box data przeslany', boxStatus)
                        console.log(boxStatus)
                    })
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchStatus();
    }, [boxStatus]);

    const handleBoxAdd = async (rowSymbol) => {
        console.log(boxData)
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

    const boxStatusIcon = [
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
                    {boxStatus?.[`${rowSymbol}-${i}`] && (
                        <div className="box-icon">
                            {boxStatus[`${rowSymbol}-${i}`] === "occupied" ? (
                                <i className="fa-solid fa-horse-head"></i>
                            ) : boxStatus[`${rowSymbol}-${i}`] === "available" ? (
                                <i className="fa-solid fa-house-circle-check"></i>
                            ) : boxStatus[`${rowSymbol}-${i}`] === "problematic" ? (
                                <i className="fa-solid fa-house-circle-exclamation"></i>
                            ) : boxStatus[`${rowSymbol}-${i}`] === "outOfOrder" ? (
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
                        status={boxStatusIcon}
                        setSelectedStatus={(status) =>
                            setBoxStatus((prevStatus) => ({
                                ...prevStatus,
                                    [`${rowSymbol}-${i}`]: status,

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