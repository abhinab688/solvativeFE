import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const UserListView = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/getAllUsers').then(data => {
            data = data.json()
            return data
        })
            .then(data => {
                setData(data)
            })
    }, [])
    console.log(data.data)
    return (
        <div>
            {/* <button onClick={() =>}>Create New</button> */}
            <Link to="/new">Create User</Link>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name--</th>
                        <th>P5balance--</th>
                        <th>Reward balance--</th>
                        <th>Login</th>
                    </tr>
                </thead>
                <tbody>
                    {data.data && data.data.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}--</td>
                            <td>{user.name}--</td>
                            <td>{user.P5.balance}--</td>
                            <td>{user.wallet.balance}--</td>
                            <Link to={`/${user.id}`}>Login</Link>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserListView
