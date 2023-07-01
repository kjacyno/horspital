import PropTypes from "prop-types";
import {Dialog} from "@mui/material";

export default function BoxDialog({show, toggleShow, setSelectedStatus}) {

    const status = [
        {name: "occupied", icon: <i key="occupied" className="fa-solid fa-horse-head"></i>},
        {name: "available", icon: <i key="available" className="fa-solid fa-house-circle-check"></i>},
        {name: "problematic", icon: <i key="problematic" className="fa-solid fa-house-circle-exclamation"></i>},
        {name: "outOfOrder", icon: <i key="outOfOrder" className="fa-solid fa-circle-radiation"></i>}
    ];
    const boxStatusIcon = status.map((item, index) => (
        <button onClick={() => {
            toggleShow();
            setSelectedStatus(item.name);
        }} className="dialog__cancel" key={index}>{item.icon}</button>
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
            '& .MuiDialog-paper':{
                width: '100%',
                margin: '0',
                borderRadius: '0'

            }}}>
            <div className="dialog__content">
                <p className="dialog__title">Set box status</p>
                <div className='box-statuses'>{boxStatusIcon}</div>
                <button onClick={() => {
                    toggleShow();
                    setSelectedStatus({})
                }}>Clear
                </button>
            </div>
        </Dialog>
    )
}

BoxDialog.propTypes = {
    show: PropTypes.any,
    status: PropTypes.array,
    toggleShow: PropTypes.func.isRequired,
    title: PropTypes.string,
    setSelectedStatus: PropTypes.func,
};