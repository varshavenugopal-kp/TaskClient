import React, { useEffect, useState } from 'react';
import { datas } from '../../Services/datas';
import Add from '../addModal/Add';
import Edit from '../editModal/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProfile } from '../../Redux/Userslice';
import { isAsyncThunkAction } from '@reduxjs/toolkit';
import { api } from '../../Services/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { io } from 'socket.io-client';

const Home = () => {
//   console.log(datas, "lllllllllll");
//socket
const socket = io('http://localhost:8000');



  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [taskId, setTaskId] = useState()
  const [checkboxStates, setCheckboxStates] = useState({});

  const[task,setTasks]=useState([])

  const {userid,email}=useSelector((state)=>state.user)

  const modalOpen = () => {
    setAddOpen(true)
}
const handleClick = (taskId) => {
    console.log(taskId,"xxxxxxxxxxxxxxxxxxxxxxxx");
    setEditOpen(true)
    setTaskId(taskId)
}

useEffect(() => {
    fetchData();
     console.log(task,"this is tasks");
    // Listen for the 'taskAdded' event
    socket.on('taskAdded', (data) => {
      console.log('New task added:', data.task);
     let newtask={
        taskDetails:{
            _id: data.task._id,
            description:data.task.description,
            date:data.task.date,
            task:data.task.task,
        },
       
     }
      // Update your component state with the new task
     setTasks((prevTasks) => [...prevTasks, newtask]);
     console.log(task,"this is task in")
    });

    // Cleanup the socket event listener when the component unmounts
    return () => {
      socket.off('taskAdded');
    };
  }, []);

const handledelete = async (taskId) => {
    try {

        await api.post('/delete', { id: taskId });
        const updatedData = task.filter((rest) => rest.id !== taskId);
        setTasks(updatedData)
    } catch (error) {
        console.error('Error occurred while deleting data:', error);

    }
}
console.log(task,"finishhhhhhhhhhhhhhhhhhhhhhhhh");

// const handledelete = async (taskId) => {
//     try {

//         await api.post('/delete', { id: taskId });
//         const updatedData = task.filter((task) => task.id !== taskId);
//         setTasks(updatedData);
//     } catch (error) {
//         console.error('Error occurred while deleting data:', error);

//     }
// }



const fetchData = async () => {
    try {
      const response = await api.get('/allTasks');
      console.log(response.data.data, 'Initial tasks structure');
      if (response.data.data) {
        setTasks(response.data.data);
      }
    } catch (error) {
      console.error('Error occurred while fetching data:', error);
    }
  };
const handleLogout=(e)=>{
    e.preventDefault()
    dispatch(setProfile({}))
    localStorage.removeItem('userInfo')
    console.log("logoutt");
    
    navigate('/login')
  }

  const handleCheckboxChange = async (taskId) => {
    try {
      // Toggle the checkbox status for the specific task
      setCheckboxStates((prevStates) => ({
        ...prevStates,
        [taskId]: !prevStates[taskId],
      }));

      // Call your API with Axios
    //   const response = await axios.patch(`/your-api-endpoint/${taskId}`, {
    //     checked: !checkboxStates[taskId],
    //   });

     
    } catch (error) {
      console.error('API call error:', error);
      // Handle error if needed
    }
  };

  return (
    <div>
     <div className='p-10'>

        <div className='flex justify-between'>
        <div className="p-6 pt-0">
            <button
              className="select-none rounded-lg bg-sky-950 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-light="true"
              onClick={() => modalOpen()}
            >
             Add Task
            </button>
          </div>
          <div className="p-6 pt-0">
            <button
              className="select-none rounded-lg bg-sky-950 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-light="true"
              onClick={handleLogout}
            >
             Logout
            </button>
          </div>
        </div>
    
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6 gap-8">
      

       {/* Corrected map function */}
       {task?.map((item) => (
          <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
          <div className="p-6">
            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
             {item?.taskDetails?.task}
            </h5>
            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
             {item?.taskDetails?.description}
            </p>
            <h1>created by {item.username}</h1>
          </div>
          <div className="p-6 pt-0">
            <button
              className="select-none rounded-lg bg-sky-950 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-light="true"
              onClick={() => handleClick(item?.taskDetails?._id)}
              key={item?.taskDetails?._id}
            >
             Edit Task
            </button>
            
          </div>
          <div className='px-2 flex '>
         <div>
         <input
                type="checkbox"
                checked={checkboxStates[item?.taskDetails?._id] || false}
                onChange={() => handleCheckboxChange(item?.taskDetails?._id)}
              />
         </div>
                                       
                                        <div className=''><FontAwesomeIcon icon={faTrashCan} className='text-sm text-left text-black' key={item?.taskDetails?._id} onClick={() => handledelete(item?.taskDetails?._id)} /></div>

                                    </div>
        </div>
       ))}
     </div>
     </div>
        <div>
            {
               addOpen && <Add setAddOpen={setAddOpen} />
            }
        </div>
        <div>
                {
                    editOpen && <Edit setEditOpen={setEditOpen} taskId={taskId} />
                }
            </div>
    
    </div>
  );
}

export default Home;
