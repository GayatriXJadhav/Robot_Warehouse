import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchbots } from "../features/bots/botsSlice";
import BotCard from "../components/BotCard";

const BotStatus = () => {
  const dispatch = useDispatch();
  const {bots}=useSelector((state)=>state.bots)
  const {loading}=useSelector((state)=>state.bots)

  useEffect(() => {
    dispatch(fetchbots());

    const interval = setInterval(() => {
      dispatch(fetchbots());
    }, 10000);
    return () => clearInterval(interval);
  }, [dispatch]);
 
  return (
       <div className=' bg-gray-100'>
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Bot Status</h2>
      {loading ? <div className="text-blue-800  items-center">Loading...</div> : (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
 {bots.map((bot) => (
        <BotCard key={bot.id} bot={bot}/>
          ))}
    </div>
       )}
    </div>
    </div>
  );
};

export default BotStatus;
