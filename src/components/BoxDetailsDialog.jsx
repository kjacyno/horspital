import {Dialog} from "@mui/material";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {useState} from "react";
import 'dayjs/locale/de';


export default function BoxDetailsDialog({show, title, toggleShow, boxStatus}) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState('')

    const handleSelected = () => {

    }
    const handleOptionClick = (option) => {
        handleSelected(option);
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
                        <form action="">
                            <label>Check-in:

                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                    <div className='date-picker'>
                                        <DatePicker className='date-picker-box' sx={{
                                            '& .MuiOutlinedInput-root': {
                                                width: '100%',
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
                            <label>Horse:<input id='name' type="text" placeholder='name'/></label>
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
                            <textarea rows='5' id='notes' placeholder='notes'/>
                        </form>) :
                    <form>
                        <textarea rows='5' id='notes' placeholder='notes'/>
                    </form>
                }
                <button type='submit' className='btn submit-btn'>Save</button>
            </div>
        </Dialog>


    );
}

