import React, { useEffect, useState } from 'react';
import Add from '../addModal/Add';
import Edit from '../editModal/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProfile } from '../../Redux/Userslice';
import { api } from '../../Services/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCheck, faSquareCheck, faSquareXmark, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { io } from 'socket.io-client';

const Home = () => {
  const socket = io(process.env.REACT_APP_BASE_URL);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [taskId, setTaskId] = useState();
  const [task, setTasks] = useState([]);
  const [isChecked, setChecked] = useState(false);
  const { userid } = useSelector((state) => state.user);
  const [value,setValue]=useState([])


  const [selected,setSelected]=useState(false)
  const[users,setUsers]=useState([])

  const modalOpen = () => {
    setAddOpen(true);
  };

  const handleClick = (taskId) => {
    setEditOpen(true);
    setTaskId(taskId);
  };

  useEffect(() => {
    fetchData();

    socket.on('taskAdded', (data) => {
      let newtask = {
        taskDetails: {
          _id: data.task._id,
          description: data.task.description,
          date: data.task.date,
          task: data.task.task,
        },
      };
      setTasks((prevTasks) => [...prevTasks, newtask]);
    });

    socket.on('taskEdited', (editedTask) => {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) => {
          if (task.taskDetails._id === editedTask.id) {
            return {
              taskDetails: {
                _id: editedTask.id,
                description: editedTask.description,
                date: editedTask.date,
                task: editedTask.task,
              },
            };
          }
          return task;
        });

        return updatedTasks;
      });
    });

    return () => {
      socket.off('taskAdded');
    };
  }, []);

  const handledelete = async (taskId) => {
    try {
      await api.post('/delete', { id: taskId });
      const updatedData = task.filter((rest) => rest._id !== taskId);
      setTasks(updatedData);
    } catch (error) {
      console.error('Error occurred while deleting data:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await api.get('/allTasks');
     
      if (response.data.data) {
        setTasks(response.data.data);
      }
      console.log(response?.data?.data,"kkkkkkkkkkkkkk");
      
    } catch (error) {
      console.error('Error occurred while fetching data:', error);
    }
  };

  useEffect(()=>{
     fetchUsers()
  },[])

  const fetchUsers=async()=>{
    try{
      const response=await api.get(`/getUsers/${userid}`)
      console.log(response,"responseeeeey");
      setUsers(response.data.data.tasks)
    }catch(err){
      console.log(err);
    }
  }

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(setProfile({}));
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const updateTaskState = (taskId, updatedTasks) => {
    setTasks((prevTasks) =>
      prevTasks.map((obj) =>
        obj._id === taskId
          ? { ...obj, taskDetails: { ...obj.taskDetails, userDetails: { tasks: updatedTasks } } }
          : obj
      )
    );
  };

  const setChange = async (taskId) => {
    try {
      console.log("kkkkkkkkkkkkkkkkkkkkkkkkkk");
      const { data } = await api.post('/tasks', { userid: userid, id: taskId });
      
      const updatedTasks = task.map((obj) => {
        if (obj._id === taskId) {
          return { ...obj, taskDetails: { ...obj.taskDetails, userDetails: { tasks: [userid, ...data.tasks] } } };
        } else {
          return obj;
        }
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error occurred while setting task:', error);
    }
  };
  
  const setOnChange = async (taskId) => {
    try {
      console.log("jjjjjjjjjjjj");
      await api.post('/unCheck', { uid: userid, id: taskId });
      
      const updatedTasks = task.map((obj) => {
        if (obj._id === taskId) {
          return { ...obj, taskDetails: { ...obj.taskDetails, userDetails: { tasks: obj.taskDetails.userDetails.tasks.filter((id) => id !== userid) } } };
        } else {
          return obj;
        }
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error occurred while unchecking task:', error);
    }
  };


  // const handleCheckboxChange = async (taskId) => {
  //   setChecked(!isChecked);

  //   // Add or remove task from the database based on checkbox state
  //   // const endpoint = isChecked ? '/api/removeTask' : '/api/addTask';

  //   try {
  //     const response = isChecked
  //       ? await api.post('/unCheck', { userid: userid, id: taskId })
  //       : await api.post('/tasks', { userid: userid, id: taskId })

  //     console.log(response.data,"jooooooooooooooooooooooooooyyyyyyyyyyyyyyyyyyyyyyyy"); // Handle the response as needed
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  return (
    <div>
      <div className='p-10 sm:mt-10'>
        <div className='flex justify-between'>
          <div className='lg:p-6 pt-0'>
            <button
              className='select-none rounded-lg bg-sky-950 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
              type='button'
              data-ripple-light='true'
              onClick={() => modalOpen()}
            >
              Add Task
            </button>
          </div>
          <div className='p-6 pt-0'>
            <button
              className='select-none rounded-lg bg-sky-950 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
              type='button'
              data-ripple-light='true'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6 gap-8'>
          {task?.map((item) => (
            <div
              className='relative flex flex-col text-gray-700 bg-white shadow-md lg:w-96 sm:w-80  rounded-xl bg-clip-border'
              key={item?.taskDetails?._id}
            >
              <div className='p-6'>
                <h5 className='block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900'>
                  {item?.taskDetails?.task}
                </h5>
                <p className='block font-sans text-base antialiased font-light leading-relaxed text-inherit'>
                  {item?.taskDetails?.description}
                </p>
                <h1>created by {item.username}</h1>
              </div>
              <div className='p-6 pt-0'>
                <button
                  className='select-none rounded-lg bg-sky-950 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                  type='button'
                  data-ripple-light='true'
                  onClick={() => handleClick(item?.taskDetails?._id)}
                >
                  Edit Task
                </button>
              </div>
              <div className='flex justify-between px-5'>
                <div>



                  {
                    users.includes(item?.taskDetails?._id)?
                    (
                      <div className='pb-5'><FontAwesomeIcon icon={faCheck} onClick={()=>setOnChange(item?.taskDetails?._id)}/></div>
                   ):(
                    
            
                      <div className='pb-5'><FontAwesomeIcon icon={faSquareCheck} onClick={()=>setChange(item?.taskDetails?._id)}/></div>

                    
                   )
                  }
                 

{/* {item.taskDetails.userDetails.tasks.length == 0 ? (
      <div></div>
   ) : (
    <input
    type='checkbox'
    checked={isChecked} onChange={()=>setChange(item?.taskDetails?._id)}
    
  />
    )}  */}


                 
                  
                </div>

                <div>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className='text-sm text-left text-black pb-2'
                    onClick={() => handledelete(item?.taskDetails?._id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>{addOpen && <Add setAddOpen={setAddOpen} />}</div>
      <div>{editOpen && <Edit setEditOpen={setEditOpen} taskId={taskId} />}</div>
    </div>
  );
};

export default Home;
