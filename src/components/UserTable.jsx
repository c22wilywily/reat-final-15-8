import React from 'react'
import { FaEdit } from "react-icons/fa";

function UserTable(props) {
    const { userData, editUser } = props

    return (
        <tbody>
            {userData.map((item, index) =>
                <tr key={item.id}>
                    <td scope="col">{index + 1}</td>
                    <td>{item.username}</td>
                    {item.status === "Active" ? <td>{item.status}</td> : <td className='text-danger'>{item.status}</td>}
                    <td>{item.email}</td>
                    <td><button className='btn btn-light' type='button'
                        onClick={() => editUser(item)}
                    >
                        <FaEdit />
                    </button></td>
                </tr>
            )}
        </tbody>
    )
}

export default UserTable
