import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const GiveRewards = () => {
    const [users, setUsers] = useState([])
    const [sender, setSender] = useState();
    const [toId, setToId] = useState();
    const [amount, setAmount] = useState(0)
    const [buttonEnable, setButtonEnable] = useState(true)
    const route = window.location.href.split('/');
    const id = route[route.length - 3]
    useEffect(() => {
        fetch('http://localhost:8000/getAllUsers').then(data => {
            data = data.json()
            return data
        })
            .then(data => {
                setUsers(data.data.filter((user) => user.id !== id))
                setToId(data.data[0].id)
            })
    }, [id]);

    useEffect(() => {
        fetch('http://localhost:8000/getOne/' + id).then(data => {
            data = data.json()
            return data
        })
            .then(data => {
                setSender(data)
            })
    }, [id])

    const giveRewardsHandler = async () => {
        console.log('aa')
        const response = await fetch('http://localhost:8000/giveRewards/' + id, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                "amount": amount,
                "toId": toId
            }), // body data type must match "Content-Type" header
        });
        const jsonResponse = await response.json();
        if (jsonResponse.success) {

        }
        else {
            alert('Insuffcient Amount')
        }


    }
    // console.log(id)

    const toIdSetHandler = (e) => {
        setToId(e.target.value)
    }

    const setAmountHandler = (e) => {
        console.log(+e.target.value < 100, +e.target.value < +sender.data.P5.balance, buttonEnable)
        setAmount(e.target.value)
        if (+e.target.value < 100 && +e.target.value < +sender.data.P5.balance) {
            setButtonEnable(false)
        } else {
            setButtonEnable(true)
        }
    }


    return (
        <div>
            <label>Select User</label>
            {users && sender &&
                <div>
                    <select onChange={toIdSetHandler}>
                        {users.map((user, index) => {
                            return (
                                <option key={index} value={user.id} >{user.name}</option>
                            )
                        })}
                    </select>
                    <input type="number" min="0" max="100" step="1" required onChange={setAmountHandler} />
                    <h6>Your Balance : {sender.data.P5.balance}</h6>
                    <button type='submit' onClick={giveRewardsHandler} disabled={buttonEnable}>Submit</button>
                    <Link to={`/${id}/p5`}>Cancel</Link>
                </div>

            }
        </div>
    )
}

export default GiveRewards
