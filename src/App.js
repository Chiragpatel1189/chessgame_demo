import "./App.css";
import { useEffect, useState } from "react";
import Parser from "html-react-parser";

const App = () => {
    let whiteknight = "&#9816";
    let blackknight = "&#9822";
    const colName = ["a", "b", "c", "d", "e", "f", "g", "h"];

    const [chessData, setChessData] = useState([
        [
            { col: 1, img: "" },
            { col: 2, img: "" },
            { col: 3, img: "" },
            { col: 4, img: "" },
            { col: 5, img: "" },
            { col: 6, img: "" },
            { col: 7, img: "" },
            { col: 8, img: "" },
        ],
        [
            { col: 1, img: "" },
            { col: 2, img: "" },
            { col: 3, img: "" },
            { col: 4, img: "" },
            { col: 5, img: "" },
            { col: 6, img: "" },
            { col: 7, img: "" },
            { col: 8, img: "" },
        ],
        [
            { col: 1, img: "" },
            { col: 2, img: "" },
            { col: 3, img: blackknight },
            { col: 4, img: "" },
            { col: 5, img: "" },
            { col: 6, img: "" },
            { col: 7, img: "" },
            { col: 8, img: "" },
        ],
        [
            { col: 1, img: "" },
            { col: 2, img: "" },
            { col: 3, img: "" },
            { col: 4, img: "" },
            { col: 5, img: "" },
            { col: 6, img: "" },
            { col: 7, img: "" },
            { col: 8, img: "" },
        ],
        [
            { col: 1, img: "" },
            { col: 2, img: "" },
            { col: 3, img: "" },
            { col: 4, img: "" },
            { col: 5, img: "" },
            { col: 6, img: "" },
            { col: 7, img: "" },
            { col: 8, img: "" },
        ],
        [
            { col: 1, img: "" },
            { col: 2, img: "" },
            { col: 3, img: "" },
            { col: 4, img: "" },
            { col: 5, img: "" },
            { col: 6, img: "" },
            { col: 7, img: "" },
            { col: 8, img: "" },
        ],
        [
            { col: 1, img: "" },
            { col: 2, img: "" },
            { col: 3, img: "" },
            { col: 4, img: "" },
            { col: 5, img: "" },
            { col: 6, img: "" },
            { col: 7, img: "" },
            { col: 8, img: "" },
        ],
        [
            { col: 1, img: "" },
            { col: 2, img: "" },
            { col: 3, img: "" },
            { col: 4, img: "" },
            { col: 5, img: "" },
            { col: 6, img: "" },
            { col: 7, img: "" },
            { col: 8, img: "" },
        ],
    ]);

    const temp = [...chessData];
    const [selected, setSelected] = useState({});
    const [row, setRow] = useState();
    const [col, setCol] = useState();
    const [possibleLocation, setPossibleLocation] = useState([]);
    const [filterLocation, setFilterLocation] = useState([]);

    useEffect(() => {
        setFilterLocation(
            possibleLocation.reduce((acc, item) => {
                if (item.i >= 0 && item.i < 8 && item.j >= 0 && item.j < 8) {
                    return [...acc, item];
                } else return [...acc];
            }, [])
        );
    }, [possibleLocation]);

    console.log(filterLocation, "|filterLocation");
    const swapFn = (i, j, row, col) => {
        temp[i][j].img = temp[row][col].img;
        temp[row][col].img = "";
        setChessData([...temp]);
        setSelected({});
        setFilterLocation([]);
    };

    const getID = (i, j) => {
        if (temp[i][j].img !== "") {
            setSelected(temp[i][j]);
            setRow(i);
            setCol(j);
            getPossiblePath(i, j);
        }
        if (selected.img) {
            getSecondClickid(i, j);
        }
    };

    const knightPath = (i, j, row, col) => {
        if ((j === col - 1 && (i === row + 2 || i === row - 2)) || (j === col + 1 && (i === row + 2 || i === row - 2))) {
            swapFn(i, j, row, col);
        }
        if ((i === row - 1 || i === row + 1) && (j === col + 2 || j === col - 2)) {
            swapFn(i, j, row, col);
        }
    };
    const getPossiblePath = (i, j) => {
        console.log(i, "i", j, "j");
        setPossibleLocation([
            { i: i + 2, j: j + 1 },
            { i: i + 2, j: j - 1 },
            { i: i - 2, j: j + 1 },
            { i: i - 2, j: j - 1 },
            { i: i + 1, j: j + 2 },
            { i: i - 1, j: j + 2 },
            { i: i + 1, j: j - 2 },
            { i: i - 1, j: j - 2 },
        ]);
    };

    const getSecondClickid = (i, j) => {
        if ((temp[row][col].img === whiteknight || temp[row][col].img === blackknight) && temp[i][j].img === "") {
            knightPath(i, j, row, col);
        }
    };

    console.log("selected", selected);

    return (
        <div className="App">
            <h1>Chess Demo</h1>
            <div className="Main">
                {chessData.map((list, i) => {
                    return (
                        <div key={i} className="chessboxDiv">
                            {i}
                            {list.map((item, j) => {
                                return (
                                    <div
                                        key={j}
                                        className={`
                      ${filterLocation.find(item => item.i === i && item.j === j) && "darkGreen"}
                      ${
                          (i + 1) % 2 === 0
                              ? item.col % 2 === 0
                                  ? `greenCol chessboxDiv ${!item.img ? "hover" : ""}`
                                  : "whiteCol chessboxDiv"
                              : item.col % 2 !== 0
                              ? "greenCol chessboxDiv"
                              : "whiteCol chessboxDiv"
                      }
                      `}
                                        onClick={() => getID(i, j)}>
                                        <p className={selected === item ? "borderclass htmlunicode" : "htmlunicode"}>{Parser(item.img)}</p>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            <div className="colNamediv">
                {colName.map((list, index) => (
                    <p className="chessboxDiv" key={index}>
                        {list}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default App;
