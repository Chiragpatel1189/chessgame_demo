import React, { useState } from "react";
import Parser from "html-react-parser";
import "./App.css";

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

    const swapFn = (i, j, row, col) => {
        temp[i][j].img = temp[row][col].img;
        temp[row][col].img = "";
        setChessData([...temp]);
        setSelected({});
    };

    const getID = (i, j) => {
        if (temp[i][j].img !== "") {
            setSelected(temp[i][j]);
            setRow(i);
            setCol(j);
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

    const getSecondClickid = (i, j) => {
        if ((temp[row][col].img === whiteknight || temp[row][col].img === blackknight) && temp[i][j].img === "") {
            knightPath(i, j, row, col);
        }
    };

    return (
        <div className="App">
            <div className="Main">
                {chessData.map((list, i) => {
                    return (
                        <div key={i} className="chessboxDiv">
                            {i}
                            {list.map((item, j) => {
                                return (
                                    <div
                                        key={j}
                                        className={
                                            (i + 1) % 2 === 0
                                                ? item.col % 2 === 0
                                                    ? `greenCol chessboxDiv ${!item.img ? "hover" : ""}`
                                                    : "whiteCol chessboxDiv"
                                                : item.col % 2 !== 0
                                                ? "greenCol chessboxDiv"
                                                : "whiteCol chessboxDiv"
                                        }
                                        onClick={() => getID(i, j)}>
                                        <p className={selected === item ? "borderclass htmlunicode" : "htmlunicode"}>{Parser(item.img)} </p>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            <div className="colNamediv">
                {colName.map(list => (
                    <p className="chessboxDiv">{list}</p>
                ))}
            </div>
        </div>
    );
};

export default App;
