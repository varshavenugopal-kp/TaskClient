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
                <h1 className='md:text-2xl sm:text-xl font-bold text-sky-950 items-center px-8 pt-3'>TASK COMPLETION CHART</h1>
            </div>
   
    <div className='lg:h-96 lg:w-96 pt-5 sm:h-40 sm:w-40 md:h-80 md:w-80 md:px-2'>
    <Doughnut data={data} options={options}/>
    </div>
   
    {/* <Pie data={data}/> */}
  </div>
  );
};

export default TaskStatistics;
