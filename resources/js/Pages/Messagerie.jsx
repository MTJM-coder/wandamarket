import { useState } from "react";
import { FaArrowLeft, FaPlusCircle, FaThumbtack, FaEnvelope, FaHeart } from "react-icons/fa";
import { FiFilter, FiSearch, FiSend, FiUser } from "react-icons/fi";

const Messagerie = () => {

    const [messages, setMessages] = useState([
        { id: 1, nom: "Carelle",  heure: "10:00", pinned: false },
        { id: 2, nom: "Annie", heure: "10:05", pinned: false },
        { id: 3, nom: "Carelle2",  heure: "10:10", pinned: false },
    ]);
    const [discussion, setDiscussion] = useState([
        { id: 1, texte: "Salut Carelle !", heure: "10:01", sent: true },
        { id: 2, texte: "Salut !", heure: "10:02", sent: false },
        { id: 3, texte: "Comment tu vas ?", heure: "10:03", sent: true },
        { id: 4, texte: "Très bien et toi ?", heure: "10:04", sent: false },
    ]);
    const [showContenu, setShowContenu] = useState('nothing');
    const [selectedId, setSelectedId] = useState(null);
    const [filtrer, setFiltrer] = useState(false);
    const [newDiscussion, setNewDiscussion] = useState(false);
    const [more, setMore] = useState(false);
    const [inputMsg, setInputMsg] = useState("");

    const dernierMessage = discussion[discussion.length -1]

    const More = (e, id) => {
        e.preventDefault();
        setSelectedId(id);
        setMore(true);
    };
    const CloseMore = () => setMore(false);

    const Pin = () => {
        setMessages(msgs =>
            msgs.map(msg =>
                msg.id === selectedId ? { ...msg, pinned: !msg.pinned } : msg
            )
        );
        setMore(false);
    };

    const Open = () => {
        setShowContenu('show');
        setMore(false);
    };

    const FILTRER = () => setFiltrer(true);
    const NOFILTRER = () => setFiltrer(false);

    const NEW = () => setNewDiscussion(true);
    const NEW2 = () => setNewDiscussion(false);

    const Send = () => {
        if (inputMsg.trim() === "") return;
        setDiscussion(disc => [
            ...disc,
            {
                id: disc.length + 1,
                texte: inputMsg,
                heure: new Date().toLocaleTimeString().slice(0,5),
                sent: true
            }
        ]);
        setInputMsg("");
    };

    const [fav, setFav] = useState(false);

    return (
        <div className="flex h-screen sm:flex md:flex bg-white">
            {showContenu === 'nothing' && (
                <>
                    <div className="flex-shrink-0 sm:w-1/2 relative md:w-2/5 w-full sm:shadow-xl bg-white z-10">
                        {filtrer && (
                            <div className="absolute rounded bg-white mt-16 lg:ml-[300px] xl:mr-auto mr-10 md:ml-72 z-30 border ml-20 p-3 border-[#ec8d0c] w-64 ">
                                <div className="font-semibold border-b-2 pb-3 text-xl ">Filtrer par</div>
                                <div className="flex flex-col mt-3">
                                    <button className="flex rounded items-center hover:bg-zinc-100 pl-2 mt-1 mb-1 pt-2 pb-2">
                                        <FaEnvelope className="mr-2" /> Non lues
                                    </button>
                                    <button className="flex rounded items-center hover:bg-zinc-100 pl-2 mt-1 mb-1 pt-2 pb-2">
                                        <FaHeart className="mr-2" /> Favoris
                                    </button>
                                </div>
                            </div>
                        )}
                        {fav && (
                            <div className="absolute rounded md:ml-60 lg:ml-80 xl:mr-auto bg-white overflow-y-auto p-3 border border-[#ec8d0c] mt-16 mr-10 z-30 ml-20 h-96 w-64">
                                <div>
                                    <div className="font-semibold">Favoris</div>
                                    <input type="search" placeholder="Rechercher" className="w-full h-8 mt-3" />
                                </div>
                                <div className="overflow-y-auto">
                                    <button className="flex mt-2 w-full hover:bg-gray-100 border p-1 rounded-lg">
                                        <div className="rounded-full bg-gray-50">
                                            <FiUser className="m-3 size-5" />
                                        </div>
                                        <div className="m-2">Nom</div>
                                    </button>
                                </div>
                            </div>
                        )}
                        {newDiscussion && (
                            <div className="absolute rounded md:ml-60 lg:ml-80 xl:mr-auto bg-white overflow-y-auto p-3 border border-[#ec8d0c] mt-16 mr-10 z-30 ml-20 h-96 w-64">
                                <div>
                                    <div className="font-semibold">Nouvelle discussion</div>
                                    <input type="search" placeholder="Rechercher" className="w-full h-8 mt-3" />
                                </div>
                                <div className="overflow-y-auto">
                                    <button className="flex mt-2 w-full hover:bg-gray-100 border p-1 rounded-lg">
                                        <div className="rounded-full bg-gray-50">
                                            <FiUser className="m-3 size-5" />
                                        </div>
                                        <div className="m-2">Nom</div>
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className="bg-white md:w-2/5 sm:w-1/2 w-full fixed z-20">
                            <div className="flex pl-6 pt-4 py-2 pr-4 w-full bg-white">
                                <div className="font-bold text-[#ec8d0c] text-2xl sm:mr-auto mr-auto">Discussions</div>
                                <button className="w-5" onClick={NEW} onBlur={NEW2}>
                                    <FaPlusCircle className="text-[#ec8d0c] size-full" />
                                </button>
                                <button className="w-5 ml-4" onClick={FILTRER} onBlur={NOFILTRER}>
                                    <FiFilter className="size-full text-[#ec8d0c]" />
                                </button>
                                <button onClick={()=>setFav(true)} onBlur={()=>setFav(false)} className="w-5 ml-4">
                                    <FaHeart className="size-full text-[#ec8d0c]" />
                                </button>
                            </div>
                            <div className="flex shadow mt-7 bg-white border border-[#ec8d0c] mb-5">
                                <FiSearch className="m-2 size-6" />
                                <input type="search" placeholder="Rechercher..." className="border-none focus:outline-none focus:border-transparent focus:ring-0 px-2 py-2 bg-transparent w-full" />
                            </div>
                        </div>
                        <div className="pt-36 overflow-y-auto h-full text-sm pb-2 z-10">
                            {more && (
                                <div className="absolute z-10 bg-zinc-50 border m-10 p-3 w-60 flex flex-col">
                                    <button onClick={()=> {Pin(); CloseMore()}}
                                        className="p-2 mb-2 rounded-md text-left font-semibold hover:border-[#ec8d0c] hover:border hover:bg-white">Epingler</button>
                                    <button className="p-2 mb-2 font-semibold text-left rounded-md hover:border hover:bg-white hover:border-[#ec8d0c]">Supprimer</button>
                                    <button className="p-2 mb-2 font-semibold text-left rounded-md hover:border hover:bg-white hover:border-[#ec8d0c]">Mettre en favoris</button>
                                    <button className="p-2 mb-2 font-semibold text-left rounded-md hover:border hover:bg-white hover:border-[#ec8d0c]">Archiver</button>
                                    <button className="p-2 mb-2 font-semibold text-left rounded-md hover:border hover:bg-white hover:border-[#ec8d0c]" onClick={Open}>Ouvrir</button>
                                </div>
                            )}
                            {messages.map(msg => (
                                <button
                                    key={msg.id}
                                    onClick={() => { setShowContenu('show'); setSelectedId(msg.id); }}
                                    onContextMenu={e => More(e, msg.id)}
                                    className="flex mt-3 hover:bg-gray-100 border-b w-full p-2 pl-4"
                                >
                                    <div className="rounded-full w-12 bg-gray-50">
                                        <FiUser className="m-3 mx-auto size-6" />
                                    </div>
                                    <div className="ml-1 w-full">
                                        <div className=" w-fit ml-2 items-start">{msg.nom}</div>
                                        <div className="ml-2 items-start w-fit truncate">{discussion[discussion.length - 1].texte}</div>
                                    </div>
                                    <div className="ml-auto flex flex-col items-end">
                                        <div>{msg.heure}</div>
                                        {msg.pinned && (
                                            <div className="mt-1 ml-3 text-[#ec8d0c]">
                                                <FaThumbtack />
                                            </div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="h-screen hidden sm:block md:w-3/5 border w-1/2 pt-40 text-center">
                        <img src="loh.ico" alt="logo de wandamarket" className="h-20 mx-auto" />
                        <div className="text-black font-bold text-3xl mt-7">WANDA</div>
                        <div className="text-[#ec8d0c] font-bold text-3xl">MARKET</div>
                        <div className="text-lg font-semibold">
                            Veuillez sélectionner un message pour en savoir plus
                        </div>
                    </div>
                </>
            )}
            {showContenu === 'show' && (
                <div className="pt-2 w-screen h-screen">
                    <div className="border-b fixed w-screen bg-white p-3 flex">
                        <div className="w-11 bg-gray-50 p-2 md:ml-10 rounded-full">
                            <FiUser className="size-full" />
                        </div>
                        <div className="mr-auto p-1 w-fit break-words mb-1 self-start mt-1 ml-2 font-bold">
                            {messages.find(m => m.id === selectedId)?.nom}
                        </div>
                        <button className="w-5">
                            <FiSearch className="text-[#ec8d0c] size-full" />
                        </button>
                        <button className="ml-4 w-5 md:mr-10" onClick={() => setShowContenu('nothing')}>
                            <FaArrowLeft className="text-[#ec8d0c] size-full" />
                        </button>
                    </div>
                    <div className="w-screen p-4 h-5/6 max-h-[465px] md:max-h-[550px] md:px-16 mt-16 bg-gray-50 flex flex-col overflow-y-auto">
                        {discussion.map(msg => (
                            <div
                                key={msg.id}
                                className={
                                    "w-fit max-w-60 break-words mb-1 p-1 pl-2 pr-2 rounded " +
                                    (msg.sent ? "bg-zinc-100 self-end" : "bg-white self-start")
                                }
                            >
                                {msg.texte}
                                <span className="ml-2 text-xs text-gray-400">{msg.heure}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex w-full border border-[#ec8d0c]">
                        <input
                            type="text"
                            className="w-full border-none focus:outline-0"
                            value={inputMsg}
                            onChange={e => setInputMsg(e.target.value)}
                            onKeyDown={e => { if (e.key === "Enter") Send(); }}
                        />
                        <button onClick={Send}>
                            <FiSend className="size-6 m-2.5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Messagerie;