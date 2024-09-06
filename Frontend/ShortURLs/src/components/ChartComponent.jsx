import { useState, useEffect } from "react";
import Loading from "./Loading";

export default function ChartComponent({dateCreated, dateUpdated, visiterCount, originalURL, shortenURL}) {

  const [loading, setLoading] = useState(true);
  const createdDate = new Date(dateCreated);
  const currentDate = new Date();
  const differenceInDays = Math.floor((currentDate - createdDate) / (24 * 60 * 60 * 1000)) + 1;

  useEffect(() => {
    setTimeout(() => {setLoading(false)}, 2000);
  }, [])

  return (
    <div key="slide2" className="flex flex-col items-center justify-center h-full px-20 gap-5">
        <div className="bg-white bg-opacity-10 px-4 py-2 rounded-xl absolute top-6 left-10">
            <p className="text-gray-300 text-xl mainFont">Statistics</p>
        </div>
        {loading && <Loading/>}
        {!loading && 
        <>
          <div className="flex flex-col justify-between w-full gap-2">
                <div><p className="text-md mainFont bg-gray-500 bg-opacity-20 px-4 py-2 rounded-lg">Created : { dateCreated }</p></div>
                <div><p className="text-md mainFont bg-gray-500 bg-opacity-20 px-4 py-2 rounded-lg">Updated : { dateUpdated }</p></div>
                <div className="flex w-full bg-gray-500 bg-opacity-20 px-4 py-2 rounded-lg gap-2">
                  <div><p className="text-md mainFont bg-gray-500 bg-opacity-20 px-4 py-2 rounded-lg">Visits : { visiterCount }</p></div>
                  <div><p className="text-md mainFont bg-gray-500 bg-opacity-20 px-4 py-2 rounded-lg">Days : { differenceInDays }</p></div>
                  <div><p className="text-md mainFont bg-gray-500 bg-opacity-20 px-4 py-2 rounded-lg">APPROVED : { dateCreated === "None" ? "NO":"YES"}</p></div>
                </div>
                
                <div><p className="text-md mainFont bg-gray-500 bg-opacity-20 px-4 py-2 rounded-lg truncate">Original URL : { originalURL }</p></div>
                <div><p className="text-md mainFont bg-gray-500 bg-opacity-20 px-4 py-2 rounded-lg truncate">Shorten URL : { shortenURL }</p></div>
          </div>
        </>
        }
    </div>
  )
}
