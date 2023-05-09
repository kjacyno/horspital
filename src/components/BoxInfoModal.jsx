export default function Dialog({ show, status, toggleShow, title }) {

    if (! show) {
        return <></>;
    }

    return (
        <div className="overlay">
            <div className="dialog">
                <div className="dialog__content">
                    <p className="dialog__title">{title}</p>
                </div>
                <div className="dialog__footer">
                    <button onClick={toggleShow} className="dialog__cancel">{status}</button>
                </div>
            </div>
        </div>
    )
}