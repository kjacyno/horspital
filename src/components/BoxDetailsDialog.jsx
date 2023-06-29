import {Dialog} from "@mui/material";

export default function BoxDetailsDialog({show, title, toggleShow, boxStatus}) {

    if (!show) {
        return <></>;
    }

    return (

        <Dialog className="dialog" onClose={toggleShow} open={open}>
            <div className='box-details'>

                <div className="flex">
                    <button className="btn-close" onClick={() => {
                        toggleShow()
                    }}>⨉
                    </button>
                </div>
                <p>Additional info for box {title}</p>
                {boxStatus === 'occupied' ? (
                    <form action="">
                    <label>Date<input id='date' type="date"/></label>
                    <label>Horse<input id='name' type="text" placeholder='name'/></label>
                    <label>sex<select id="sex">
                        <option value="mare">mare</option>
                        <option value="stallion">stallion</option>
                        <option value="gelding">gelding</option>
                    </select>
                    </label>
                    <label><textarea rows='5' id='notes' placeholder='notes'/> </label>
                </form> ) : (
                    <form>
                    <label><textarea rows='5' id='notes' placeholder='notes'/> </label>
                    </form>
                )
                }
                <button type='submit'>Save</button>
            </div>
        </Dialog>


    );
}

