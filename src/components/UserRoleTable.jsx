import React from 'react'
import { FaTimesCircle, FaEdit, FaCheck } from "react-icons/fa";

function UserRoleTable(props) {
    const { roleData, deleteRole, editRole } = props
    console.log(roleData)
    return (
        <tbody>
            {roleData.map((item, index) =>
                <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.username}</td>
                    <td>{item.role}</td>
                    {item.role === "Developer" ?
                        <>
                            <td><FaCheck /></td>
                            <td></td>
                            <td><FaCheck /></td>
                        </>
                        :
                        <></>
                    }
                    {item.role === "Support" ?
                        <>
                            <td></td>
                            <td></td>
                            <td><FaCheck /></td>
                        </>
                        :
                        <></>
                    }
                    {item.role === "Manager" ?
                        <>
                            <td><FaCheck /></td>
                            <td><FaCheck /></td>
                            <td><FaCheck /></td>
                        </>
                        :
                        <></>
                    }

                    <td>
                        <button
                            type='button'
                            className='btn btn-light'
                            onClick={() => editRole(item)}
                        >
                            <FaEdit />
                        </button>
                        <button
                            type='button'
                            className='btn btn-light'
                            onClick={() => deleteRole(item)}
                        >
                            <FaTimesCircle />
                        </button>
                    </td>
                </tr>
            )}
        </tbody>
    )
}

export default UserRoleTable
