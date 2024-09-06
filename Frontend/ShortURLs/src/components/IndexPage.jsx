import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AiOutlineBarChart} from 'react-icons/ai';
import { FiLink } from 'react-icons/fi'; 
import LinkComponent from "./LinkComponent";
import ChartComponent from "./ChartComponent";
import bgImg from "../assets/bg.jpg"

export default function IndexPage() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // stats variables
    const [dateCreated, setDateCreated] = useState("None")
    const [dateUpdated, setDateUpdated] = useState("None")
    const [visiterCount, setVisiterCount] = useState("0")
    const [originalURL, setOriginalURL] = useState("INVALID")
    const [shortenURL, setshortenURL] = useState("None")

  const slides = [
    <LinkComponent setCurrentIndex={setCurrentIndex} setDateCreated={setDateCreated} setDateUpdated={setDateUpdated} 
    setVisiterCount={setVisiterCount} setOriginalURL={setOriginalURL} setshortenURL={setshortenURL} />,
    <ChartComponent dateCreated={dateCreated} dateUpdated={dateUpdated} visiterCount={visiterCount} originalURL={originalURL} 
    shortenURL={shortenURL} />
  ];

  return (
    <>
    <div className="flex h-screen items-center justify-center gap-4" style={{ backgroundImage: `url(${bgImg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        
        <div className="flex flex-col gap-3 bg-blur px-2 py-2 rounded-full text-gray-200 border border-gray-100 border-opacity-20">
            <p
                className="text-gray-200 cursor-pointer relative z-10 rounded-full p-4"
                onClick={() => setCurrentIndex(0)}
                style={{ background: currentIndex === 0 ? "rgba(255,255,255,0.2)": "transparent"}}
            >
                <FiLink fontSize={"1.4em"} />
            </p>
            <p
                className="text-gray-200 cursor-pointer relative z-10 rounded-full p-4"
                onClick={() => setCurrentIndex(1)}
                style={{ background: currentIndex === 1 ? "rgba(255,255,255,0.2)": "transparent"}}
            >
                <AiOutlineBarChart fontSize={"1.4em"} />
            </p>
        </div>

        <div className="bg-blur px-5 py-4 rounded-3xl text-gray-200 border border-gray-100 border-opacity-20 flex justify-between w-1/2 h-1/2">
            <div className="w-full h-full mt-4">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="h-full w-full"
                >
                     {slides[currentIndex]} 
                        
                    
                </motion.div>
            </div>
        </div>
    </div>
    </>
  )
}
