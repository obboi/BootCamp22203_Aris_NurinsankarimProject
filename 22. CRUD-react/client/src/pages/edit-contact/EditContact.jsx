import React from 'react'

function EditContact() {

    const [Nama, setNama] = useState('')
    const [Email, setEmail] = useState('')
    const [NoHP, setNohp] = useState('')
  
    
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:3000/contacts/${id}`)
        .then((res) => {
          setNama(res.data.Nama)
          setEmail(res.data.Email)
          setNohp(res.data.NoHP)
        })
    },[])

  return (
    <div className='container-form'>
        <form>
          <div className="input-contact">
            <label htmlFor="">Nama</label>
            <input 
              value={Nama}
              onChange={(e) => setNama(e.target.value)}
            type="text" placeholder='Masukan nama anda'/>
          </div>
          <div className="input-contact">
            <label htmlFor="">EMail</label>
            <input
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            type="text" placeholder='Masukan email anda'/>
          </div>
          <div className="input-contact">
            <label htmlFor="">No Handphone</label>
            <input
              value={NoHP}
              onChange={(e) => setNohp(e.target.value)}
            type="text" placeholder='Masukan No HP anda'/>
          </div>
          <div className="input-contact">
            <button onClick={Submit}>Submit</button>
          </div>
        </form>
    </div>
  )
}

export default EditContact