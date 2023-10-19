import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
// import dotenv from 'dotenv';

// dotenv.config()

let url = 'http://localhost:8000'

const P5history = () => {
    const [data, setData] = useState()
    const [page, setPage] = useState(1)
    const [historyData, setHistoryData] = useState([])
    const route = window.location.href.split('/');
    const id = route[route.length - 2]
    useEffect(() => {
        if (id && id.length > 10) {
            fetch(url + `/getOne/` + id).then(data => {
                data = data.json()
                return data
            })
                .then(data => {
                    setData(data.data)
                    setHistoryData(data.data.P5.history.slice((page - 1) * 3, page * 3))
                })
        }
    }, [id])

    const setPageHandler = (e) => {
        setPage(e.target.value)
    }

    const deleteButtonHandler = async (e) => {
        const deleteData = data.P5.history[e.target.value]
        const response = await fetch('http://localhost:8000/deleteRewards/' + id, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                "amount": deleteData.amount,
                "timezone": deleteData.time,
                "toDeleteId": deleteData.givenTo
            }), // body data type must match "Content-Type" header
        });
        return response.json();
    }
    return (
        <div>
            {data &&
                <div>
                    <Link to={`/${id}/rewards/new`}>Create reward</Link>
                    <h1>P5 Balance = {data.P5.balance}</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Given to</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historyData.map((p5Record, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{p5Record.time}</td>
                                    <td>{p5Record.amount}</td>
                                    <td>{p5Record.givenTo}</td>
                                    <td>
                                        <button value={index} onClick={deleteButtonHandler}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {data.P5.history.map((item, index) => {
                        return (
                            index % 3 === 0 ?
                                <button onClick={setPageHandler}>{index}</button> : ""
                        )
                    })}
                </div>
            }


        </div >
    )
}

export default P5history
