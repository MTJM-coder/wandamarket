import { useState } from "react";
import { FiAlignLeft, FiArchive, FiArrowLeft, FiCheck, FiDelete, FiMail, FiMapPin, FiSearch, FiShare2, FiStar, FiTrash2 } from "react-icons/fi";
import { FaBars, FaCheck, FaExclamationCircle, FaReact, FaTimes, FaThumbtack, FaBell, FaExclamationTriangle, FaMailBulk, FaMailchimp } from "react-icons/fa";

const Notification = () =>{

    const [show, setShow] = useState(null);
    const [hidden, setHidden] = useState(true);
    const True = ()=>{
        setHidden(true);
    }
    const False = ()=>{
        setHidden(false);
    }

    const [checked, setChecked] = useState([false, false]);
    const [read, setRead] = useState([false, false])
    const [drop, setDrop] = useState(false);

    const READ = (id)=>{
        const updatedRead = [...read];
        updatedRead[id] = true
        setRead(updatedRead)
    }

    const handleCheckboxChange = (id) => {
        const updated = [...checked];
        updated[id] = !updated[id];
        setChecked(updated);
        setDrop(updated.some(Boolean));

    };
    const handleCloseDrop = () => {
        setChecked([false, false]);
        setDrop(false);
        setActive(false);
    };

    const [body, setBody] = useState('init');
    const [showPin, setShowPin] = useState(false);
    const SHOWPIN = ()=>{
        setShowPin(!showPin);
    }

    const [hover, setHover] = useState('null')

    const [active, setActive] = useState(false);
    let classNa=" flex sm:pl-2 md:pl-10 p-1 mt-28 shadow-md w-full h-20 overflow-y-auto border-b-gray-300 border-b-2 "
    let classNa2=" flex sm:pl-2 md:pl-10 p-1 shadow-md w-full h-20 overflow-y-auto border-b-gray-300 border-b-2 "
    let className=" flex sm:pl-2 md:pl-10 p-1 mt-28 shadow-md w-full h-20 overflow-y-auto border-b-gray-300 border-b-2 "
    let className2=" flex sm:pl-2 md:pl-10 p-1 shadow-md w-full h-20 overflow-y-auto border-b-gray-300 border-b-2 "
    if (active) {
        className += "bg-gray-100"
        className2+="bg-gray-100"
        
    }

    return (
        <div className="w-screen h-screen ">
            <div className="bg-[#ec8d0c] h-20 fixed w-screen shadow-2xl pt-6 pb-6 text-white grid-flow-col grid ">
                <div className="flex items-center xl:ml-10 md:ml-20 w-screen xl:h-10 sm:w-80 text-black border bg-white rounded-3xl ">
                    <FiSearch className="ml-2 size-6" />
                    <input
                        type="search"
                        placeholder="Rechercher..."
                        className="block w-auto  pl-3 pr-3 py-2 rounded-3xl border-none focus:outline-none focus:ring-0 focus:ring-transparent focus:border-transparent "
                        onFocus={False}
                        onBlur={True}/>
                </div>
                <div className="mr-8 flex ml-20">
                    <button onClick={()=>setActive(!active)} htmlFor="lus" className="shadow hidden  xl:flex focus:shadow-xl p-1 h-8 rounded-md hover:bg-white hover:text-[#ec8d0c] focus:bg-white focus:text-[#ec8d0c]">Tout sélectionner
                    </button>
                    <button>
                        <FiCheck onMouseOver={()=>setHover('lu')} onMouseLeave={()=>setHover(null)} className="text-[#0d2a40] xl:hidden hidden md:size-7 md:mt-1 sm:block hover:text-white rounded-full p-0.5 mt-2 size-6"></FiCheck>
                    {hover === 'lu' &&(
                        <label htmlFor="lus" className=" sm:absolute sm:block z-10 sm:bg-[#0d2a40] sm:px-3 rounded mt-1 sm:w-fit max-w-52 hidden mx-1">Tout sélectionner</label>

                    )}
                    </button>
                    
                </div>
                <div className="mr-8 relative">
                    <button htmlFor="lus" onClick={()=>setRead(read.map(()=> true))} className="shadow hidden xl:flex focus:shadow-xl p-1 h-8 rounded-md ps-3 pr-2 hover:bg-white hover:text-[#ec8d0c] focus:bg-white focus:text-[#ec8d0c]">Tout marquer comme lu
                    </button>

                    <button>
                        <FaCheck onMouseOver={()=>setHover('lu2')} onMouseLeave={()=>setHover(null)} className="text-[#0d2a40] xl:hidden hidden md:size-7 md:mt-1 sm:block hover:text-white rounded-full p-0.5 mt-2 size-6"></FaCheck>
                    {hover === 'lu2' &&(
                        <label htmlFor="lus" className=" sm:absolute sm:block z-10 sm:bg-[#0d2a40] sm:px-3 mt-1 rounded sm:w-fit max-w-52 hidden mx-1">Tout marquer comme lu </label>

                    )}
                    </button>
                </div>
                <div className="mr-8">
                    <button className="shadow hidden xl:flex focus:shadow-xl p-1 rounded-md hover:bg-white hover:text-[#ec8d0c] focus:bg-white focus:text-[#ec8d0c]">
                    Tout
                    <span className=" bg-[#0d2a40] hidden xl:block text-white rounded-full text-xs font-semibold px-2 py-1">5</span>
                    </button>
                    <button>
                    <FaBell onMouseOver={()=>setHover('tout')} onMouseLeave={()=>setHover(null)}  className=" xl:hidden text-[#0d2a40] hidden md:size-7 md:mt-1 sm:block hover:text-white rounded-full p-0.5 mt-2 size-6"></FaBell>
                    {hover === "tout"&&(
                    <label htmlFor="lus" className=" sm:absolute sm:block z-10 sm:bg-[#0d2a40] sm:px-3 rounded mt-1 sm:w-fit max-w-52 hidden mx-1">Tout</label>
                    )}
                    </button>
                </div>
                <div className="mr-8">
                    <button className="shadow p-1 hidden xl:flex focus:shadow-xl rounded-md hover:bg-white hover:text-[#ec8d0c] focus:bg-white focus:text-[#ec8d0c]">
                    Alertes
                    <span className=" bg-[#0d2a40] xl:block hidden text-white text-xs font-semibold px-2 py-1 rounded-full">5</span>
                    </button>
                    <button>
                        <FaExclamationTriangle onMouseOver={()=>setHover('alertes')} onMouseLeave={()=>setHover(null)}  className="text-[#0d2a40] xl:hidden md:size-7 md:mt-1 hidden sm:block hover:text-white rounded-full p-0.5 mt-2 size-6"></FaExclamationTriangle>
                    {hover === "alertes"&&(
                    <label htmlFor="lus" className=" sm:absolute sm:block z-10 sm:bg-[#0d2a40] sm:px-3 rounded mt-1 sm:w-fit max-w-52 hidden mx-1"> Alertes</label>
                    )}
                    </button>
                </div>
                <div className="mr-8">
                    <button className="shadow xl:flex hidden focus:shadow-xl p-1 rounded-md hover:bg-white hover:text-[#ec8d0c] focus:bg-white focus:text-[#ec8d0c]">
                    Non lues
                    <span className=" bg-[#0d2a40] xl:block hidden text-white text-xs font-semibold px-2 py-1 rounded-full">5</span>
                    </button>
                    <button>
                        <FiMail onMouseOver={()=>setHover('nonlues')} onMouseLeave={()=>setHover(null)} className="text-[#0d2a40] hidden sm:block md:size-7 md:mt-1 xl:hidden hover:text-white rounded-full p-0.5 mt-2 size-6"></FiMail>
                    {hover === 'nonlues'&&(
                    <label htmlFor="lus" className=" sm:absolute sm:block z-10 sm:bg-[#0d2a40] sm:px-3 rounded mt-1 sm:w-fit max-w-52 hidden mx-1">Non lues</label>
                    )}
                    </button>
                </div>
                <div className="mr-8 ">
                    <button className="shadow xl:flex hidden focus:shadow-xl p-1 rounded-md hover:bg-white hover:text-[#ec8d0c] focus:bg-white focus:text-[#ec8d0c]">
                    Important
                    <span className=" bg-[#0d2a40] xl:block hidden text-white text-xs font-semibold px-2 py-1 rounded-full">5</span>
                    </button>
                    <button>
                        <FaExclamationCircle onMouseOver={()=>setHover('important')} onMouseLeave={()=>setHover(null)} className="text-[#0d2a40] md:size-7 md:mt-1 xl:hidden hidden sm:block hover:text-white rounded-full p-0.5 mt-2 size-6"></FaExclamationCircle>
                    {hover ==='important'&&(
                    <label htmlFor="lus" className=" sm:absolute sm:block z-10 sm:bg-[#0d2a40] sm:px-3 rounded mt-1 sm:w-fit  max-w-52 hidden mx-1">Important</label>
                    )}
                    </button>
                </div>

            </div>
            <div className="flex w-screen bg-white">
                {(drop === true || ( active)) &&(
                <div className="bg-black -mb-4 mt-20 pt-5 h-screen sm:w-36 md:w-44 text-white fixed ">
                    <button onClick={handleCloseDrop} className="text-white p-4" >
                        <FaTimes className="sm:size-5"></FaTimes>
                    </button>
                    <div>
                        <button 
                            onMouseOver={ ()=> setShow('sup')}
                            onMouseLeave={()=> setShow(null)}
                            className=" grid border-b p-4 mt-10 w-full justify-center relative" >
                            <FiTrash2 className="sm:size-5"></FiTrash2>
                            {show === 'sup' &&(
                                <span className="absolute hover:inline transition-transform duration-700 hover:translate-x-8 bg-black h-full ps-6 pr-6 pt-2">Supprimer</span>                            
                            )
                            }
                            {show ===null && (
                                <span></span>                            
                            )}
                        </button>
                    </div>
                    <div>
                        <button 
                            onMouseOver={()=> setShow('arch')}
                            onMouseLeave={()=> setShow(null)}
                            className=" grid border-b p-4 min-w-full justify-center relative">
                            <FiArchive className="sm:size-5"></FiArchive>
                            {show === 'arch' && (
                                <span className="absolute transition-transform duration-700 hover:translate-x-8 bg-black h-full ps-6 pr-6 pt-2">Archiver</span>                            
                            )}
                            {show ===null && (
                                <span></span>                            
                            )}
                        </button>
                    </div>
                    <div>
                        <button 
                            onMouseOver={()=> setShow('epi')}
                            onClick={SHOWPIN}
                            onMouseLeave={()=> setShow(null)}
                            className="grid border-b p-4 min-w-full justify-center relative "
                            aria-label="Epingler">
                            <FaThumbtack className="sm:size-5"></FaThumbtack>
                            {show ==="epi" &&(
                                <span className="absolute transition-transform duration-700 hover:translate-x-8 bg-black h-full ps-6 pr-6 pt-2">Epingler</span>                            
                            )}
                            {show ===null && (
                                <span></span>                            
                            )}
                        </button>
                    </div>
                    <div>
                        <button 
                            onMouseOver={()=> setShow('imp')}
                            onMouseLeave={()=> setShow(null)}
                            className=" grid border-b p-4 min-w-full justify-center relative ">
                            <FiStar className="sm:size-5"></FiStar>
                            {show === "imp" &&(
                                <span className="absolute transition-transform duration-700 hover:translate-x-8 bg-black h-full ps-6 pr-6 pt-2">Important</span>                            
                            )}
                            {show ===null && (
                                <span></span>                            
                            )}
                        </button>
                    </div>
                    <div>
                        <button 
                            onMouseOver={()=> setShow('mark')}
                            onMouseLeave={()=> setShow(null)}
                            onClick={()=>{
                                const updatedRead = [...read]
                                checked.forEach((isChecked, id) => {
                                    if (isChecked) updatedRead[id] = true;
                                   
                                });
                                setDrop(false)
                                setRead(updatedRead)
                                setChecked([false, false])
                            }}
                            className=" grid border-b pt-4 pb-4 p-4 justify-center min-w-full relative">
                            <FiCheck className="sm:size-5"></FiCheck>
                            {show === 'mark' &&(
                                <span className="absolute transition-transform duration-700 hover:translate-x-8 bg-black h-full w-52 ps-6 pr-6 pt-2">Marquer comme lu</span>                            
                            )}
                            {show ===null && (
                                <span></span>                            
                            )}
                        </button>
                    </div>
                </div>
                )}
                <div className=" w-screen ">
                    {body === 'init' &&(
                        <>
                            <div 
                                className={(active ? className : classNa) + (read[0] ? "bg-gray-200" : '')}>
                                <div className="flex justify-between items-center" >
                                    <input type="checkbox" 
                                        onChange={() => handleCheckboxChange(0)}
                                        checked={checked[0]}
                                        className="text-[#ec8d0c] border-[#ec8d0c] rounded focus:ring-[#ec8d0c] " name="" id="" />
                                </div>
                                <button className=" w-11/12 ml-2 " 
                                    onClick={()=>{
                                        setBody('notif1')
                                    }}
                                    >
                                    <div className="ml-1 md:text-lg md:max-w-96 w-fit sm:max-w-60 max-w-36 truncate font-bold text-sm mt-1 ">
                                    Wandamarketdddddddddddddddddddddddddddddddddddddddddddddddddddddd
                                    </div> 
                                    <div className="flex" >
                                        <div className=" w-fit md:max-w-xl sm:max-w-96 max-w-52 ml-1 text-sm mt-1 truncate">
                                            Hello, nous sommesnnnnn wandamarketdddddddddddddddddddddddddddddddddddddddddd
                                        </div>
                                        <div className="text-sm font-medium ml-auto text-[#ec8d0c] ">14h10</div>
                                        {showPin === true &&(
                                            <FaThumbtack className="ml-2 mt-1"></FaThumbtack>
                                        )}
                                    </div>
                                </button>
                            </div>
                            <div 
                                className={(active ? className2 : classNa2) + (read[1] ? "bg-gray-200" : '')}>
                                <div className="flex justify-between items-center" >
                                    <input type="checkbox" 
                                        onChange={() => handleCheckboxChange(1)}
                                        checked={checked[1]}
                                        className="text-[#ec8d0c] border-[#ec8d0c] rounded focus:ring-[#ec8d0c] " name="" id="" />
                                </div>
                                <button className=" w-11/12 ml-2 " onClick={()=>setBody('notif1')}>
                                    <div className="ml-1 md:max-w-96 md:text-lg sm:max-w-60 w-fit max-w-52 truncate font-bold text-sm mt-1 ">
                                    Wandamarketdddddddddddddddddddddddddddddddddddddddddddddddddddddd
                                    </div> 
                                    <div className="flex" >
                                        <div className=" md:max-w-xl max-w-52 sm:max-w-96 ml-1 text-sm mt-1 truncate">
                                            Hello, nous sommesnnnnn wandamarketdddddddddddddddddddddddddddddddddddddddddd
                                        </div>
                                        <div className="text-sm font-medium ml-auto text-[#ec8d0c] ">14h10</div>
                                        {showPin === true &&(
                                            <FaThumbtack className="ml-2 mt-1"></FaThumbtack>
                                        )}
                                    </div>
                                </button>
                            </div>
                            
                        </>
                    )}
                    {body === 'notif1' &&(
                        <div className=" mt-20 h-[calc(100vh-5rem)] flex flex-col flex-1 w-screen rounded-md mr-16 " >
                            <div className=" flex bg-white md:h-12 w-screen sm:pl-10 fixed ">
                                <button className=" w-auto p-2 hover:bg-gray-100 rounded-full " onClick={()=>setBody('init')}>
                                    <FiArrowLeft className="size-full" ></FiArrowLeft>
                                </button>
                                <button className="w-auto md:ml-32 p-3 hover:bg-gray-100 rounded-full ml-5">
                                    <FiArchive className="size-full"></FiArchive>
                                </button>
                                <button className="w-auto p-3 hover:bg-gray-100 rounded-full ml-5">
                                    <FiTrash2 className="size-full"></FiTrash2>
                                </button>
                                <button className="w-autot p-3 hover:bg-gray-100 rounded-full ml-5">
                                    <FaExclamationCircle className="size-full"></FaExclamationCircle>
                                </button>
                                <button className="w-auto p-3 hover:bg-gray-100 rounded-full ml-5">
                                    <FaCheck className="size-full"></FaCheck>
                                </button>
                            </div>
                            <div className="shadow-xl md:h-20 mt-10 fixed p-4 w-screen border-b-2 border-t-2 flex pl-2">
                                <div className=" md:text-2xl md:ml-10 sm:max-w-60 sm:ml-6 w-fit font-bold">
                                    Wandamarket
                                </div>
                                <div className="ml-10 w-1/2 md:text-xl md:ml-32 sm:ml-20 mt-1 text-sm">
                                    14 Aout 2025 08:08
                                </div>
                                <button className="ml-12 sm:ml-20 w-7 p-1">
                                    <FiStar className="size-full"></FiStar>
                                </button>
                            </div>
                            <div className=" sm:pl-32 shadow-2x md:pt-40 md:text-lg h-full pt-32 pb-10 overflow-y-auto w-screen rounded-md mr-32 px-5">
                                
                                Corps de la notif
                               
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notification;