import PropTypes from "prop-types";
import {Dialog} from "@mui/material";

export default function BoxDialog({show, status, toggleShow, title, setSelectedStatus}) {
    const boxStatusBtns = status.map((item, index) => (
        <button onClick={() => {
            toggleShow();
            setSelectedStatus(item.name);
        }} className="dialog__cancel" key={index}>{item.icon}</button>
    ));
    if (!show) {
        return <></>;
    }

    return (
        <Dialog className="dialog" onClose={toggleShow} open>
            <div className="dialog__content">
                <p className="dialog__title">{title}</p>
                <div className='box-statuses'>{boxStatusBtns}</div>
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