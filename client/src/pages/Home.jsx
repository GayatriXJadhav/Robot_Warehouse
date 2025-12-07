import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchbots } from '../features/bots/botsSlice';
import Analytics from './Analytics';

const Home = () => {
   

     const dispatch = useDispatch();
  const { bots } = useSelector((state) => state.bots);
  const { tasks } = useSelector((state) => state.tasks);
  
  useEffect(() => {
    //fetch on first mount
     dispatch(fetchbots());
     //check status of bots after every 10 second updates
      const interval = setInterval(() => {
    dispatch(fetchbots());
   
  }, 10000); // 10 seconds

  // cleanup
  return () => clearInterval(interval);
  }, [dispatch]);

    const totalbots=bots.length;
    const activebots=bots.filter((b)=>b.status==="busy").length;
    const idlebots=bots.filter((b)=>b.status==="idle").length;
    const errorbots=bots.filter((b)=>b.status==="error").length;
    const pendingtasks=tasks.length;

    
  const stats = [
    { title: "Total Bots", value: totalbots, color: "bg-cyan-500 " },
    { title: "Active Bots", value: activebots, color: "bg-cyan-500" },
    { title: "Idle Bots", value: idlebots, color: "bg-cyan-500" },
    { title: "Bots in Error", value: errorbots, color: "bg-cyan-500" },
    { title: "Pending Tasks", value: pendingtasks, color: "bg-cyan-500" },
  ];
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Warehouse Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className={`p-4 rounded-lg shadow text-white ${item.color}`}
          >
            <h2 className="text-lg font-medium">{item.title}</h2>
            <p className="text-3xl font-bold mt-2">{item.value}</p>
          </div>
        ))}
      </div>
     <div className="mt-8">
        <Analytics />
      </div>
    </div>

  )
}

export default Home