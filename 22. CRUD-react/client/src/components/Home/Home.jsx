import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './home.css'

const Home = () => {

  const [contacts, setContacts] = useState([])
  
  const loadContact = () => {
    axios.get('http://localhost:3000/contacts')
    .then((res) => {
      setContacts(res.data)
      console.log(contacts)
    })

  };
  useEffect(() => {
    loadContact()
  },[])

  function deleteContact(id){
    axios.delete(`http://localhost:3000/contacts/${id}`).then(loadContact())
  }

  return (
    <div>
      <h2>Home Page - Contacts</h2>
      <button><Link className='link' to='add-contact'>Tambah Data</Link></button>
      <table class="table table-hover">
        <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Email</th>
            <th>No HP</th>
            <th>Action</th>
        </tr>
          {contacts.map((contact) => (
            <tr>
                <td>{contact.id}</td>
                <td>{contact.Nama}</td>
                <td>{contact.Email}</td>
                <td>{contact.NoHP}</td>
                <td>
                    <button><Link className='link' to={`/contacts/${contact.id}`}><span>Detail</span></Link></button>
                    <button><Link className='link' to={`/edit-contact/${contact.id}`}><span>Update</span></Link></button>
                    <button onClick={() => deleteContact(contact.id)}>Delete</button>
                </td>
            </tr>
          ))}

    </table>

</div>
  )
}

export default Home


