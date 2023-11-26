
import React, { useEffect, useState } from 'react'
import ChartData from './ChartData';
import '../Dashboard/Dashboard.css'
import {Chart, ArcElement,  Tooltip , BarElement, CategoryScale, LinearScale} from 'chart.js'
import Nav from '../Nav/Nav';
import { api } from '../../Services/axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate=useNavigate()
    const [taskData, setTaskData] = useState({
        completed: 10,
        overdue: 5,
      });
      const {userid,email}=useSelector((state)=>state.user)
    const completedTasks = 20;
    const overdueTasks = 5;

    const [tasks,setTasks]=useState(0)
    const [com,setCom]=useState(0)
   
    useEffect(()=>{
      fetchData()
    })
    const fetchData=async()=>{
      const res = await api.get(`/tasknum/${userid}`)
      console.log(res,"kkkkkkkkkkkkkkkkkkkkkk");
      if(res){
         setTasks(res.data.data)
         setCom(res.data.numberOfTasks)
      }
    }
    const enterHome=()=>{
     navigate('/')
    }
    return (
      <div>
        <div className='bgcolor'>
        <Nav/>
         <div className='items-center flex justify-center h-screen'>
            <div className="card">
         <div className='p-7'>
         {/* Other components */}
        
        
        <div className='items-center flex justify-center'>
        <ChartData completed={com} overdue={tasks} />
        </div>
        <div className='flex justify-between'>
       
          <div>
          <h1>Completed tasks: {com}</h1>
          <h1>Total tasks: {tasks}</h1>
        </div>
        <div className='pt-5'>
        <button
              className='select-none rounded-lg bg-sky-950 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
              type='button'
              data-ripple-light='true'
             onClick={enterHome}
            >
              View Tasks
            </button>
        </div>
        </div>
       
        
       </div>
         </div>
         </div>

        </div>
        
        
      
      </div>
    );
}

export default Dashboard
