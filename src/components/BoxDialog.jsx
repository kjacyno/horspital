import PropTypes from "prop-types";
import {Dialog} from "@mui/material";
import {useState} from "react";
import Tooltip from '@mui/material/Tooltip';

export default function BoxDialog({show, toggleShow, setBoxStatus, setBoxDetails, title}) {
const [confirmClear, setConfirmClear] = useState(false)
    const status = [
        {name: "occupied", icon: <i key="occupied" className="fa-solid fa-horse-head"></i>, legend: <p className='hover-legend'>occupied</p>},
        {name: "available", icon: <i key="available" className="fa-solid fa-house-circle-check"></i>, legend: <p className='hover-legend'>available</p>},
        {name: "problematic", icon: <i key="problematic" className="fa-solid fa-house-circle-exclamation"></i>, legend: <p className='hover-legend'>problematic</p>},
        {name: "outOfOrder", icon: <i key="outOfOrder" className="fa-solid fa-circle-radiation"></i>, legend: <p className='hover-legend'>out of order</p>}
    ];
    const boxStatusIcon = status.map((item, index) => (
        <button onClick={() => {
            toggleShow();
            setBoxStatus(item.name);
        }} className="dialog__cancel" key={index}><Tooltip title={item.legend}>{item.icon}
        </Tooltip></button>
       ));
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

            <div className="dialog__content">
                <div className="flex">
                    <button className="btn btn-close" onClick={() => {
                        toggleShow()
                    }}>⨉
                    </button>
                </div>
                <p className="dialog__title">Set box status for {title}</p>
                <div className='box-statuses'>{boxStatusIcon}</div>
                <button className='btn' onClick={() =>
                  setConfirmClear(true)}>
                    Clear
                </button>
                {confirmClear &&
                    <div className='confirm-clear'>
                        <p>Are you sure you want to clear the box?</p>
                        <button className='btn' onClick={() => {
                            toggleShow();
                            setBoxStatus({});
                            setBoxDetails({});
                            setConfirmClear(false)
                        }}>Yes
                        </button>
                        <button className='btn' onClick={() => setConfirmClear(false)}>No</button>
                    </div>
                }
            </div>
        </Dialog>
    )
}

BoxDialog.propTypes = {
    show: PropTypes.any,
    status: PropTypes.array,
    toggleShow: PropTypes.func.isRequired,
    title: PropTypes.string,
    setBoxStatus: PropTypes.func,
    setBoxDetails: PropTypes.func,
};