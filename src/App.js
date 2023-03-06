import './App.css';
import { useState } from 'react';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import UserRoleFrom from './components/UserRoleFrom';
import UserRoleTable from './components/UserRoleTable';

function App() {
  const [hide, setHide] = useState(true)

  const [user, setUser] = useState([
    { id: '1', username: "Tuan Doan", status: "Active", email: "tuandoan@gmail.com" },
    { id: '2', username: "Linh Ho", status: "Not Active", email: "linhho@gmail.com" },
    { id: '3', username: "Alex Ferguson", status: "Active", email: "alex@gmail.com" },
    { id: '4', username: "Thinh Dam", status: "Active", email: "thinhdam@gmail.com" },
  ])
  const [editUser, setEditUser] = useState({})

  const [role, setRole] = useState([
    { id: '1', username: "Tuan Doan", role: "Developer" },
    { id: '2', username: "Thinh Dam", role: "Support" },
    { id: '3', username: "Alex Ferguson", role: "Manager" },
  ])
  const [editRole, setEditRole] = useState({})


  const handleSubmit = item => {
    const listUser = [...user];

    if (item.id) {
      const idxE = [...user].findIndex(it => it.id === item.id)
      listUser[idxE] = item
    }
    else {
      listUser.push({
        id: Math.floor(Math.random() * 1000),
        ...item,
      })
    }

    setUser(listUser)
  }

  const handleSubmitRole = item => {
    const listUserRole = [...role]

    if (item.id) {
      const idxR = [...role].findIndex(it => it.id === item.id)
      listUserRole[idxR] = item
    } else {
      listUserRole.push({
        id: Math.floor(Math.random() * 1000),
        ...item,
      })
    }

    setRole(listUserRole)
  }

  const editU = item => {
    if (window.confirm("Ban co muon edit user nay khong")) {
      const select = [...user].filter(it => it.id === item.id)
      setEditUser(select)
    }
  }

  const editR = item => {
    if (window.confirm("Ban co muon edit user nay khong")) {
      const select = [...role].filter(it => it.id === item.id)
      setEditRole(select)
    }
  }

  const handleRoleForm = () => {
    setHide(false)
    setEditUser("")
  }

  const deleteRole = item => {
    if (window.confirm("Ban co chac muon xoa Role nay cua User khong")) {
      const deleteR = [...role].filter(it => it.id !== item.id)
      setRole(deleteR)
    }
  }

  return (
    <div className="container-fluid">
      <div className='row mt-4 ms-3 h-100'>
        <div className='col-12 col-lg-2 row h-100'>
          <div className='col-12 col-lg-12 d-flex align-items-center justify-content-center'>
            <p className='fw-bold'>Menu Item</p>
          </div>
          <div className='col-12 col-lg-12 d-flex align-items-center justify-content-center mt-4'>
            <button className='btn btn-outline-danger'
              onClick={() => setHide(true)}
            >
              User Manager
            </button>
          </div>
          <div className='col-12 col-lg-12 mt-3 d-flex align-items-center justify-content-center'>
            <button className='btn btn-outline-danger'
              onClick={() => handleRoleForm()}
            >
              Role Manager
            </button>
          </div>
        </div>
        {hide ?
          <>
            <div className='col-12 col-lg-10'>
              <div className='d-flex align-items-center justify-content-center'>
                <p className='fw-bold'>User Form</p>
              </div>
              <UserForm dataUser={user} onSubmit={handleSubmit} selectUser={editUser} />
              <div className='UserTable'>
                <div className='d-flex align-items-center justify-content-center mt-3'>
                  <p className='fw-bold'>User Table</p>
                </div>
                <table className='table table-hover'>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">User name</th>
                      <th scope="col">Status</th>
                      <th scope="col">Email</th>
                      <th></th>
                    </tr>
                  </thead>
                  <UserTable userData={user} editUser={editU} />
                </table>
              </div>
            </div>
          </>
          :
          <>
            <div className='col-12 col-lg-10'>
              <div className='d-flex align-items-center justify-content-center'>
                <p className='fw-bold'>User Role Form</p>
              </div>
              <UserRoleFrom dataUser={user} submitRole={handleSubmitRole} selectRole={editRole} />
              <div className='UserRoleForm'>
                <div className='d-flex align-items-center justify-content-center mt-3'>
                  <p className='fw-bold'>User Role Table</p>
                </div>
                <table className='table table-hover'>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">User name</th>
                      <th scope="col">Role</th>
                      <th scope="col">Creator</th>
                      <th scope="col">Editor</th>
                      <th scope="col">View</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <UserRoleTable roleData={role} deleteRole={deleteRole} editRole={editR} />
                </table>
              </div>
            </div>
          </>}
      </div>
    </div>
  );
}

export default App;
