// TaskStatistics.js
import React from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';
import {Chart, ArcElement,  Tooltip , BarElement, CategoryScale, LinearScale} from 'chart.js'


Chart.register(ArcElement)


const TaskStatistics = ({ completed, overdue }) => {
    const data = {
        labels: ['Completed Tasks', 'Overdue Tasks'],
        datasets: [
          {
            data: [completed, overdue],
            backgroundColor: ['#36A2EB', '#FF6384'],
            hoverBackgroundColor: ['#36A2EB', '#FF6384'],
          },
        ],
      };
      const options = {
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.parsed.y || 0;
                return `${label}: ${value} tasks`;
              },
            },
          },
        },
      };

  return (
    <div>
     <div>
                <h1 className='text-2xl font-bold text-red-950 items-center pt-3'>TASK COMPLETION CHART</h1>
            </div>
   
    <div className='h-96 w-96 pt-5'>
    <Doughnut data={data} options={options}/>
    </div>
   
    {/* <Pie data={data}/> */}
  </div>
  );
};

export default TaskStatistics;
