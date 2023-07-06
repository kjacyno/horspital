/* eslint-disable react/prop-types */
import {Dialog} from "@mui/material";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {useEffect, useState} from "react";
import 'dayjs/locale/de';
import {getBoxesByClinicId} from "../firebase/firestoreData.js";
import dayjs from "dayjs";


export default function BoxDetailsDialog({show, title, toggleShow, boxStatus, setSelectedDetails, clinicId}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [horseInfo, setHorseInfo] = useState({
        date: '',
        name: '',
        sex: '',
        notes: ''
    });
    const [date, setDate] = useState(dayjs())

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const fetchData = async () => {
            try {
                if (clinicId) {
                    const response = await getBoxesByClinicId(clinicId, signal);
                    const boxDetails = response ? response.boxDetails : {A: {}, B: {}};
                    const updatedBoxDetails = {...horseInfo};

                    Object.keys(updatedBoxDetails).forEach((boxId) => {
                        if (boxDetails[boxId]) {
                            updatedBoxDetails[boxId] = {...updatedBoxDetails[boxId], ...boxDetails[boxId]};
                        }
                    });
                    setHorseInfo(updatedBoxDetails);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleInfo = (value, inputId) => {

        const updatedHorseInfo = {
            ...horseInfo,
            [inputId]: value
        };
        setHorseInfo(updatedHorseInfo);
        if (inputId === 'date') {
            updatedHorseInfo[inputId] = value.toDate();
        }
    };


    const handleOptionClick = (option) => {
        handleInfo(option, 'sex');
        setSelectedOption(option);
        setIsOpen(false);
    }


    if (!show) {
        return <></>;
    }

    return (

        <Dialog className="dialog" onClose={toggleShow} open sx={{
            '& .MuiDialog-container': {
                width: '100vw',
                borderRadius: '0'
            },
            '& .MuiDialog-paper': {
                width: '100%',
                margin: '0',
                borderRadius: '0'

            }
        }}>
            <div className='box-details'>

                <div className="flex">
                    <button className="btn btn-close" onClick={() => {
                        toggleShow()
                    }}>⨉
                    </button>
                </div>
                <p>Additional info for box {title}</p>
                {boxStatus === 'occupied' ? (
                        <form onSubmit={() => setSelectedDetails(horseInfo)}>
                            <label>Check-in:

                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                    <div className='date-picker'>
                                        <DatePicker
                                            id='date'
                                            value={date}
                                            onChange={(newDate) => {
                                                handleInfo(newDate, 'date');
                                                setDate(newDate)
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    width: '96.5%',
                                                    borderRadius: '2px'
                                                },
                                                '@media screen and (max-width: 600px)': {
                                                    width: '70%',
                                                },
                                                '& .MuiTextField-root': {
                                                    maxWidth: '100%'
                                                },
                                                '& .MuiOutlinedInput-input': {
                                                    width: '95%',
                                                    border: 'none'
                                                },
                                                '& .MuiIconButton-root': {
                                                    '&:focus': {
                                                        outline: 'none',
                                                    },
                                                    '&:focus-visible': {
                                                        outline: 'none',
                                                    },
                                                },
                                            }}/>
                                    </div>
                                </LocalizationProvider>

                            </label>
                            <label>Horse:<input id='name' type="text" placeholder='Name' value={horseInfo.name}
                                                onChange={(e) => handleInfo(e.target.value, 'name')}

                            /></label>
                            <label>
                                <div className={`select-menu ${isOpen ? 'active' : ''}`}>
                                    <div className='select-btn' onClick={() => {
                                        setIsOpen(!isOpen)
                                    }}><p>Sex:</p>
                                        {selectedOption ?
                                            <span className='sBtn-text'>{selectedOption}
                                                <i className="fa-solid fa-angle-down"></i></span>
                                            : <span className='sBtn-text'>...
                                <i className="fa-solid fa-angle-down"></i></span>
                                        }</div>
                                    <ul className="options">
                                        <li className="option" onClick={() => {
                                            handleOptionClick('mare')
                                        }}><span className='option-text'>mare</span></li>
                                        <li className="option" onClick={() => {
                                            handleOptionClick('gelding')
                                        }}><span className='option-text'>gelding</span></li>
                                        <li className="option" onClick={() => {
                                            handleOptionClick('stallion')
                                        }}><span className='option-text'>stallion</span></li>
                                    </ul>
                                </div>
                            </label>
                            <textarea rows='5' id='notes' placeholder='Notes'
                                      value={horseInfo.notes}
                                      onChange={(e) => handleInfo(e.target.value, 'notes')}
                            />
                        </form>) :
                    <form>
                        <textarea rows='5' id='Notes' placeholder='notes'
                                  value={horseInfo.notes}
                                  onChange={(e) => handleInfo(e.target.value, 'notes')}
                        />
                    </form>
                }
                <button type='submit' className='btn submit-btn' onClick={
                    () => {
                        toggleShow();
                        setSelectedDetails(horseInfo)
                    }}
                >Save
                </button>
            </div>
        </Dialog>


    );
}

