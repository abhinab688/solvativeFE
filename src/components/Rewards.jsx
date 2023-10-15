import React, { useEffect, useState } from 'react'
const Rewards = () => {
    const [data, setData] = useState()
    const route = window.location.href.split('/');
    const id = route[route.length - 2]
    useEffect(() => {
        if (id && id.length > 10) {
            fetch(`http://localhost:8000/getOne/` + id).then(data => {
                data = data.json()
                return data
            })
                .then(data => {
                    setData(data.data)
                })


        }

    }, [id])

    return (

        <div>
            {data &&
                <div>
                    <h1>Reward Balance = {data.wallet.balance}</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date-Time</th>
                                <th>P5 Given</th>
                                <th>User Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.wallet.history.map((walletRecord, index) => (
                                <tr key={walletRecord.id}>
                                    <td>{index + 1}</td>
                                    <td>{walletRecord.time}</td>
                                    <td>{walletRecord.amount}</td>
                                    <td>{walletRecord.givenBy}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>}

        </div>
    )
}

export default Rewards



