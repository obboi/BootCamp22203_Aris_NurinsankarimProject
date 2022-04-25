import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import DetailContact from './pages/detail-contact/DetailContact'
import AddContact from './pages/add-contact/AddContact'
import EditContact from './pages/edit-contact/EditContact'
import { uid } from "uid";
import axios from "axios";
// function App() {

//   return (
//     <div className="App">
//       <Navbar />
      
//       <BrowserRouter>
//       <Routes>
//         <Route path='/'>
//           <Route index element={<Home/>} />
//         </Route>
//         <Route path='/contacts/:id'>
//           <Route index element={<DetailContact/>} />
//         </Route>
//         <Route path='/add-contact'>
//           <Route index element={<AddContact />} />
//         </Route>
//         <Route path='/edit-contact/:id'>
//           <Route index element={<EditContact />} />
//         </Route>
//       </Routes>
//       </BrowserRouter>
//     </div>
//   )
// }

// export default App


import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
// import contacts from './contact'

let api = axios.create({ baseURL: "hhttp://localhost:8000" });

export default function Contact() {
  const [contacts, setContact] = useState([]);

  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });

  const [formData, setFormData] = useState({
    Nama: "",
    Email: "",
    NoHp: "",
  });
  //
  useEffect(() => {
    // mengambil data contact json
    axios.get("http://localhost:8000/contacts").then((res) => {
      console.log(res.data);
      setContact(res?.data ?? []);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    let data = [...contacts];

    if (formData.Nama === "") {
      return false;
    }
    if (formData.Email === "") {
      return false;
    }
    if (formData.NoHP === "") {
      return false;
    }

    if (isUpdate.status) {
      data.forEach((contact) => {
        if (contact.id === isUpdate.id) {
          contact.Nama = formData.Nama;
          contact.Email = formData.Email;
          contact.NoHP = formData.NoHP;
        }
      });
      
      axios.put(`http://localhost:8000/contacts/${isUpdate.id}`), {
        name: formData.Nama,
        email: formData.Email,
        mobile: formData.NoHp
      }.then((res) =>{
          alert("Berhasil mengubah data")
      })
      // update berdasarkan id
    } else {
      let toSave = {
        id: uid(),
        name: formData.Nama,
        email: formData.Email,
        mobile: formData.NoHP
      };
      data.push(toSave);

      axios.post(`http://localhost:8000/contacts/`, toSave).then((res) => {
      alert("Berhasil menyimpan data");
    });

      // menambahkan data
      api.post("/contacts", toSave).then(() => {
        alert("Data berhasil ditambah");
      });
    }
    setContact(data);
    setIsUpdate(false);
    setFormData({ Nama: "", Email: "", NoHP: "" });
  }

  function handleChange(e) {
    let newFormState = { ...formData };
    newFormState[e.target.Nama] = e.target.value;
    setFormData(newFormState);
  }

  function deleteContact(id) {
    let data = [...contacts];
    let filteredData = data.filter((contact) => contact.id !== id);
    setContact(filteredData);

    axios.delete(`http://localhost:8000/contacts/${id}`).then((res) => {
      alert("Berhasil menghapus data");
    });
  }

  function updateContact(id) {
    let data = [...contacts];
    let foundData = data.find((contact) => contact.id === id);
    setFormData({
        name: foundData.Nama,
        email: foundData.Email,
        mobile: foundData.NoHP,
    });
    setIsUpdate({ id: id, status: true });

    // axios.put(`http://localhost:8000/contacts/${isUpdate.id}`)
  }

  const listContact = contacts.map((item) => {
    return (
      <React.Fragment key={item.id}>
        <div style={{ float: "left" }}>
          <div style={{ margin: "13px" }}>
            <br></br>
            {/* Show data contact */}
            <Card border="primary" style={{ width: "22rem" }}>
              <Card.Header> Data Contact </Card.Header>
              <Card.Body>
                <Card.Title>
                  {item.Nama}
                  <Button
                    variant="outline-dark"
                    style={{ float: "right" }}
                    onClick={() => updateContact(item.id)}
                  >
                    Update
                  </Button>
                </Card.Title>
                <Card.Text> {item.Email} </Card.Text>
                <Card.Text>
                  {" "}
                  {item.NoHP}
                  <Button
                    variant="outline-danger"
                    style={{ float: "right" }}
                    onClick={() => deleteContact(item.id)}
                  >
                    Delete
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </React.Fragment>
    );
  });

  return <div>
      {/* Form Add Data contact */}
      <div className="form">
      <h1 className="px-3 py-3 font-weight-bold"><center> Add New Contact </center></h1>
              <form onSubmit={handleSubmit} className="px-3 py-4">
                <div className="form-group">
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    className="form-control"
                    defaultValue={formData.Nama}
                    Nama="Nama"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    className="form-control"
                    defaultValue={formData.Email}
                    name="Email"
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="">Mobile</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    defaultValue={formData.NoHP}
                    className="form-control"
                    name="NoHP"
                  />
                </div>
                <div>
                  <button type="submit" className="btn btn-outline-primary w-100 mt-3">
                    Submit
                  </button>
                </div>
              </form>
            </div>
      {listContact}</div>;
}
