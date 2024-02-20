
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addData, deleteData, updateData } from './Redux/Action';
function App() {
  const userinfo = useSelector((state) => state.userData || []);
  const [id, setId] = useState("")
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    name: '',
    email: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addData(input));
    setInput({
      name: '',
      email: '',
    });
  };

  const DeleteData = (id) => {
    dispatch(deleteData(id));
  }
  const EditData = (id) => {
    const selectedData = userinfo[id];
    if (selectedData) {
      setId(id);
      setInput({
        name: selectedData.name || '',
        email: selectedData.email || '',
      })

    }
  };
  const UpdateUser = (e) => {
    e.preventDefault();

    const updatevalue = {
      id: id,
      name: input.name,
      email: input.email,
    };
    dispatch(updateData(updatevalue));
    setInput({
      name: '',
      email: '',
    })
    setId('');
  };

  return (
    <>
      <h2 className='text-center m-5'>Redux Crud Demo</h2>
      <form action="" className='text-center' onSubmit={id !== "" ? UpdateUser : handleSubmit}>
        <label htmlFor="" className='fw-bold p-2'>Name :  </label>
        <input type="text" name='name' className='fw-bold py-2' value={input.name} onChange={handleChange}
          placeholder='Enter Your Name' required />
        <br />
        <br />
        <label htmlFor="" className='fw-bold p-2'>Email :  </label>
        <input type="email" name='email' className='fw-bold py-2' value={input.email} onChange={handleChange}
          placeholder='Enter Your Email' required />
        <br />
        <br />
        <button type="submit" value={id !== "" ? "Update Data" : "Save"}
          className='btn btn-info fw-bold'  >Save</button>
      </form>
      <br /><br />

      <table border="1" className='table table-bordered border-dark w-75 mt-2 text-center'>
        <thead >
          <th className="border border-primary ">ID</th>
          <th className="border border-primary ">Name</th>
          <th className="border border-primary ">Email</th>
          <th className="border border-primary ">Action</th>
        </thead>
        <tbody>
          {
            userinfo.map((i, index) => {
              return <tr className=' fw-bold py-2 ps-2'>
                <td className="border border-primary fw-bold pt-3 " >{index + 1}</td>
                <td className="border border-primary fw-bold pt-3 ">{i.name}</td>
                <td className="border border-primary fw-bold pt-3 ">{i.email}</td>
                <button type='button' onClick={() => EditData(index)}
                  className='btn btn-primary px-3 mt-2 mb-2 fw-bold bg-primary'>Edit</button>
                <button type='button' onClick={() => DeleteData(index)}
                  className='btn fw-bold mt-2 bg-danger mb-2 ms-4'>Delete</button>
              </tr>
            })
          }
        </tbody>
      </table>
    </>
  );
}

export default App;

