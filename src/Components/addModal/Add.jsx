import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { api } from '../../Services/axios'

const Add = ({ setAddOpen }) => {
    const {userid,email}=useSelector((state)=>state.user)
    const [pdata, setData] = useState()
    const closeModal = () => {

        setAddOpen(false);
    };
    function modalClose() {
        setAddOpen(false);
        // window.location.reload();
    }
    const addRest = ((e) => {
        setData({ ...pdata, [e.target.name]: e.target.value })
    })
    const handleAdd = async (e) => {
        e.preventDefault()
        try {
            console.log("kikikiiiiiiiii");
            const { data } = await api.post('/add', { ...pdata,userid:userid});
            // setData((prevData) => [...prevData, data]);
            
            modalClose()
            console.log(data,"ooohhhhh");

        } catch (error) {

            console.error('Error occurred while adding data:', error);
        }
    }
  return (
    <div>
       <div className="fixed inset-0 flex items-center justify-center z-50">

<div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
    <div>
        <div className='flex justify-end'>
            <button onClick={() => closeModal()}><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></button>
        </div>
        <div className='text-center'>
            <h1 className='font-bold text-2xl'>Add a Task</h1>

        </div>

    </div>


    <form className=''>
        <div className='w-full mt-5'>


            <div>
                <input type='text' className='shadow appearance-none border rounded w-full py-2 px-3 h-9' name='task' onChange={addRest} placeholder='Enter name' required></input>
            </div>
        </div>

       
        <div className='w-full mt-5'>

            <div className='w-full mt-5'>


                <div>
                    <input type='Date' className='shadow appearance-none border rounded w-full py-2 px-3 h-9' name='date' onChange={addRest} placeholder='Enter Date' required></input>
                </div>
            </div>
            <div className='w-full mt-5'>

                <div className='w-full'>
                    <textarea name='description' className='shadow appearance-none border rounded w-full py-2 px-3 h-24' onChange={addRest} placeholder='Add Description' required></textarea>
                </div>
            </div>
        </div>


        <div className="max-w-xl mt-9">


            <div className='flex justify-center mt-8'>
               
                    <button className='bg-sky-950 text-white py-2 px-6 text-sm rounded-md' onClick={handleAdd}>Add</button>

                

            </div>

        </div></form>
</div>
</div>

    </div>
  )
}

export default Add
