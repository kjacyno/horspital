import PropTypes from "prop-types";

export default function BoxDialog({ show, status, toggleShow, title, setSelectedStatus }) {
    const boxStatusBtns = status.map((item, index) => (
        <button onClick={() => {toggleShow(); setSelectedStatus(item.name)}} className="dialog__cancel" key={index}>{item.icon}</button>
    ));
    if (! show) {
        return <></>;
    }

    return (
        <div className="overlay">
            <div className="dialog">
                <div className="dialog__content">
                    <p className="dialog__title">{title}</p>
                </div>
                    <div className='box-statuses'>{boxStatusBtns}</div>
                <button onClick={() => {toggleShow(); setSelectedStatus({})}}>Clear</button>
            </div>
        </div>
    )
}

BoxDialog.propTypes = {
    show: PropTypes.any.isRequired,
    status: PropTypes.array,
    toggleShow: PropTypes.func.isRequired,
    title: PropTypes.string,
    setSelectedStatus: PropTypes.func
};