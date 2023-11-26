import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { api } from '../../Services/axios';

const Edit = ({ setEditOpen,taskId }) => {
    const [data, setData] = useState({})
    const closeModal = () => {
        setEditOpen(false);

    };
   
    const modalClose = () => {
        setEditOpen(false);
      
    }
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = (async () => {
       
        const response = await api.get(`/single/${taskId}`)
       
        setData(response.data.data)
    })
   
    const handleEdit = async (e) => {
        e.preventDefault();
        try {


          


            const { data: responseData } = await api.post('/editData', { ...data, id: taskId });


          
            modalClose()

        } catch (error) {

            console.error("Error occurred:", error);
        }
    }

    const addDetails = ((e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    })


   
  return (
    <div>
       <div className="fixed inset-0 flex items-center justify-center z-50">

<div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
    <div>
        <div className='flex justify-end'>
            <button onClick={() => closeModal()}><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></button>
        </div>
        <div className='text-center'>
            <h1 className='font-bold text-2xl'>Edit Restaurant</h1>

        </div>

    </div>


    <form className='' onSubmit={handleEdit}>
        <div className='w-full mt-5'>


            <div>
                <input type='text' className='shadow appearance-none border rounded w-full py-2 px-3 h-9' name='task' value={data?.task} onChange={addDetails} ></input>
            </div>
        </div>

       
        <div className='w-full mt-5'>

            <div>
                <input type='date' className='shadow appearance-none border rounded w-full py-2 px-3 h-9' value={data.date ? new Date(data.date).toISOString().split('T')[0] : ''} name='date' onChange={addDetails}></input>
            </div>
        </div>
        <div className='w-full mt-5'>
            <div className='w-full mt-5'>

                <div className='w-full'>
                    <textarea name='description' className='shadow appearance-none border rounded w-full py-2 px-3 h-24' value={data?.description} onChange={addDetails}></textarea>
                </div>
            </div>


        </div>



       
        <button className='bg-sky-950 text-white py-2 px-6 text-sm rounded-md' >Edit</button>


    </form>
</div>
</div>
    </div>
  )
}

export default Edit
