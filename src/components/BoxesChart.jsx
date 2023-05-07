import {useState} from "react";

function BoxesChart() {
    const [boxCount, setBoxCount] = useState({1: 0, 2: 0});

    const handleBoxAdd = (rowNumber) => {
        setBoxCount((prevCount) => ({
            ...prevCount,
            [rowNumber]: prevCount[rowNumber] + 1
        }));
    };
const handleBoxDel = (rowNumber) => {
    setBoxCount((prevCount) => ({
        ...prevCount,
        [rowNumber]: prevCount[rowNumber] - 1
    }));

};
    const generateDivs = (rowNumber) => {
        const divs = [];
        for (let i = 0; i < boxCount[rowNumber]; i++) {
            divs.push(<div key={i} className="box"></div>);
        }
        return divs;
    }

    return (<>
            <section className="legend">
                <p><i className="fa-solid fa-horse-head"></i>Box occupied</p>
                <p><i className="fa-solid fa-house-circle-check"></i>Box available</p>
                <p><i className="fa-solid fa-house-circle-exclamation"></i>Problematic horse/stallion</p>
                <p><i className="fa-solid fa-circle-radiation"></i>Out of order</p>
            </section>

            <section className="box-chart1">
                <div className="box-wrapper1">
                    <button className="box add-box"
                            onClick={() => handleBoxAdd(1)}
                    ><i className="fa-solid fa-plus"></i>
                    </button>
                    <button className="box del-box"
                            onClick={() => handleBoxDel(1)}
                    ><i className="fa-solid fa-minus"></i>
                    </button>
                    <div className="box"><i className="fa-solid fa-horse-head"></i></div>
                    {generateDivs(1)

                    }
                </div>
            </section>
            <section className="box-chart2">
                <div className="box-wrapper2">
                    <button className="box add-box"
                            onClick={() => handleBoxAdd(2)}
                    ><i className="fa-solid fa-plus"></i>
                    </button>
                    <button className="box del-box"
                            onClick={() => handleBoxDel(2)}
                    ><i className="fa-solid fa-minus"></i>
                    </button>
                    <div className="box"><i className="fa-solid fa-horse-head"></i></div>
                    {generateDivs(2)

                    }
                </div>
            </section>


        </>
    );
}

export default BoxesChart;