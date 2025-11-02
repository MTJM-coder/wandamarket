import { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaPlusCircle, FaThumbtack, FaEnvelope, FaHeart } from "react-icons/fa";
import { FiFile, FiFilter, FiImage, FiSearch, FiSend, FiUser, FiX, FiCheck, FiMessageSquare, FiTrash, FiTrash2, FiCopy } from "react-icons/fi";
import { Check, CheckCheck } from "lucide-react";

import SellerSideBar from "@/Layouts/SellerSideBar";
import { router, usePage } from "@inertiajs/react";
import { formatDate } from "date-fns";
import SideBar2 from "@/Layouts/SideBar2";


const Messagerie = () => {

    const { props } = usePage();
    const auth = props.auth
    const conversations = props.conversations
    const [selectedId, setSelectedId] = useState(props.selectedId || null);
    const [lastMessageCount, setLastMessageCount] = useState(0);
    const [contextMenu, setContextMenu] = useState(null)

    useEffect(() => {
        const handleClickOutside = () => setContextMenu(null);
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);




    useEffect(() => {
        const chatBox = document.querySelector('#chat-box');
        if (!chatBox) return;

        const currentConversation = conversations.find(
            m => m.user1?.id === selectedId || m.user2?.id === selectedId
        );
        if (!currentConversation) return;

        const messageCount = currentConversation.message?.length || 0;

        // On ne scrolle que si un nouveau message est ajouté
        if (messageCount > lastMessageCount || messageCount === 1) {
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        setLastMessageCount(messageCount);
    }, [conversations, selectedId]);

    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({
                only: ['conversations'],
                onSuccess: () => {
                    if (selectedId) {
                        // Conversation ouverte => marquer directement comme lue
                        router.post('/messages/mark-read', { conversationId: selectedId }, { preserveScroll: true });
                    }
                }
            });
        }, 3000); // toutes les 5 secondes

        return () => clearInterval(interval);
    }, [selectedId]);



    const [showContenu, setShowContenu] = useState('nothing');
    const [showContenuMessage, setShowContenuMessage] = useState(null)

    const [filtrer, setFiltrer] = useState(false);
    const [newDiscussion, setNewDiscussion] = useState(false);
    const [more, setMore] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [activeTab, setActiveTab] = useState("messages")
    const handleRemoveConvers = (conversation_id) => {
        if (confirm("voulez-vous supprimer cette discussion?")) {
            router.post('/user/remove/message', { conversation_id })
        }
    }
    const markAsRead = (conversationId) => {
        router.post('/messages/mark-read', { conversationId }, {
            preserveScroll: true
        })

    }
    const handleDelete = (msgId, type) => {
        router.post('/users/delete/message', { msgId, type })

    }
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
        setShowContenuMessage('show');
        setMore(false);
    };

    const FILTRER = () => setFiltrer(true);
    const NOFILTRER = () => setFiltrer(false);

    const NEW = () => setNewDiscussion(true);
    const NEW2 = () => setNewDiscussion(false);

    const discuss = conversations.find(m =>
        m.user1?.id === selectedId || m.user2?.id === selectedId
    );

    const destinataire = (discuss?.user1_id == auth?.user?.id) ? discuss?.user2_id : discuss?.user1_id
    // alert(destinataire)

    const [formData, setFormData] = useState({
        id_convers: null,
        id_receive: null,
        message: '',
        image: null
    })
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            id_convers: selectedId,
            id_receive: destinataire
        }));
    }, [selectedId]);


    const handleSendMessage = () => {
        if (formData.message.trim() === "" && !formData.image) return;

        const data = new FormData();
        data.append('id_convers', formData.id_convers);
        data.append('id_receive', formData.id_receive);
        data.append('message', formData.message);
        if (formData.image) {
            data.append('image', formData.image);
        }

        router.post('/message/send', data, {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                setFormData(prev => ({ ...prev, message: '', image: null }));
                setPreviewImage(null);
                document.getElementById("image-upload").value = null;
            }
        });
    };
    const handleCopy = (msgId) => {
        const message = conversations
            .flatMap(conv => conv.message)
            .find(m => m.id === msgId);

        if (message?.contenu) {
            navigator.clipboard.writeText(message.contenu);
            // alert("Message copié");
        } else {
            alert("Aucun texte à copier");
        }

        setContextMenu(null);
    };

    const [searchTerm, setSearchTerm] = useState("")
    const handleSerach = (value) => {
        setSearchTerm(value.toLowerCase())
    }


    const [fav, setFav] = useState(false);

    return (
        <div className="flex h-screen sm:flex md:flex bg-white">
            {showContenuMessage !== 'show' &&
                <div className="md:hidden">
                    {auth?.user?.role == 'vendeur' ?
                        <SellerSideBar activeTab={activeTab} setActiveTab={setActiveTab} />
                        :
                        <SideBar2 activeTab={activeTab} setActiveTab={setActiveTab}></SideBar2>
                    }
                </div>
            }
            {showContenu === 'nothing' && (
                <>
                    <div className="flex w-screen">
                        <div className={`${showContenuMessage == "show" ? 'hidden md:inline-block' : ''} flex-shrink-0 sm:w-1/2 md:fixed md:h-screen overflow-auto relative md:w-2/5 w-full sm:shadow-xl bg-white z-10`}>
                            {filtrer && (
                                <div className="absolute rounded bg-white mt-16 lg:ml-[300px] xl:mr-auto mr-10 md:ml-72 z-30 border ml-20 p-3 border-[#ec8d0c] w-64 ">
                                    <div className="font-semibold border-b-2 pb-3 text-xl ">Filtrer par</div>
                                    <div className="flex flex-col mt-3">
                                        <button className="flex rounded items-center hover:bg-zinc-100 pl-2 mt-1 mb-1 pt-2 pb-2">
                                            <FaEnvelope className="mr-2" /> Non lues
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
                                    {/* <button className="w-5" onClick={NEW}>
                                        <FaPlusCircle className="text-[#ec8d0c] size-full" />
                                    </button>
                                    <button className="w-5 ml-4" onClick={FILTRER} onBlur={NOFILTRER}>
                                        <FiFilter className="size-full text-[#ec8d0c]" />
                                    </button> */}

                                </div>
                                <div className="flex shadow mt-7 bg-white border border-[#ec8d0c] mb-5">
                                    <FiSearch className="m-2 size-6" />
                                    <input type="search" onChange={(e) => handleSerach(e.target.value)} placeholder="Rechercher..." className="border-none focus:outline-none focus:border-transparent focus:ring-0 px-2 py-2 bg-transparent w-full" />
                                </div>
                            </div>
                            <div className="pt-36 overflow-y-auto h-full text-sm  z-10 pb-32">
                                {more && (
                                    <div className="absolute z-10 bg-zinc-50 border m-10 p-3 w-60 flex flex-col" onClick={() => setMore(false)}>
                                        <button onClick={() => { Pin(); CloseMore() }}
                                            className="p-2 mb-2 rounded-md text-left font-semibold hover:border-[#ec8d0c] hover:border hover:bg-white">Epingler</button>
                                        <button onClick={() => handleRemoveConvers(selectedId)} className="p-2 mb-2 font-semibold text-left rounded-md hover:border hover:bg-white hover:border-[#ec8d0c]">Supprimer</button>
                                        {/* <button className="p-2 mb-2 font-semibold text-left rounded-md hover:border hover:bg-white hover:border-[#ec8d0c]">Mettre en favoris</button> */}
                                        <button className="p-2 mb-2 font-semibold text-left rounded-md hover:border hover:bg-white hover:border-[#ec8d0c]">Archiver</button>
                                        <button className="p-2 mb-2 font-semibold text-left rounded-md hover:border hover:bg-white hover:border-[#ec8d0c]" onClick={Open}>Ouvrir</button>
                                    </div>
                                )}
                                {conversations && conversations.length > 0 ?

                                    conversations.filter(msg => {
                                        const user = msg.user1.id === auth?.user?.id ? msg.user2 : msg.user1;
                                        const fullName = `${user.nom} ${user.prenom}`.toLowerCase();
                                        return fullName.includes(searchTerm);
                                    }).map(msg => (
                                        <button
                                            key={msg.id}
                                            onClick={() => { setShowContenuMessage('show'); setSelectedId(msg.id); markAsRead(msg.id); }}
                                            // onContextMenu={e => More(e, msg.id)}
                                            className={`flex mt-3 hover:bg-gray-100 border-b w-full p-2 pl-4`}
                                        >
                                            {msg.message.filter(m => m.lu == false && m.destinataire_id == auth?.user?.id).length > 0 &&
                                                <div className=" text-white ">
                                                    <span className="absolute  w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-semibold">{msg.message.filter(m => m.lu == false && m.destinataire_id == auth?.user?.id).length}</span>
                                                </div>
                                            }
                                            <div className="rounded-full w-12 bg-gray-50">

                                                <FiUser className="m-3 mx-auto size-6" />
                                            </div>
                                            <div className={`ml-1 w-full ${msg.message[msg?.message?.length - 1]?.lu == false && msg.message[msg?.message?.length - 1]?.destinataire_id == auth?.user?.id ? 'font-bold' : ''}`}>
                                                <div className=" w-fit ml-2 items-start">{msg?.user1?.id == auth?.user?.id ? (msg?.user2?.nom + " " + msg?.user2?.prenom) : (msg?.user1?.nom + " " + msg?.user1?.prenom)}</div>
                                                <div className="ml-2 items-start w-fit truncate">
                                                    {msg?.message[msg?.message?.length - 1]?.type=='produit'?'[ ] carte':
                                                    msg?.message[msg?.message?.length - 1]?.contenu
                                                        ? msg.message[msg.message.length - 1].contenu
                                                        : msg?.message[msg?.message?.length - 1]?.piece_jointe
                                                            ? (
                                                                <>
                                                                    <FiImage className=" inline mr-2" />
                                                                    <span>Image</span>
                                                                </>)
                                                            : ''}
                                                </div>

                                            </div>
                                            <div className="ml-auto flex flex-col items-end">
                                                <div>{new Date(msg.updated_at).toLocaleTimeString().slice(0, 5)}</div>
                                                {msg.pinned && (
                                                    <div className="mt-1 ml-3 text-[#ec8d0c]">
                                                        <FaThumbtack />
                                                    </div>
                                                )}

                                                <div className="mt-1 ml-3 text-[8px] flex items-center gap-1">
                                                    {(() => {
                                                        const lastMsg = msg?.message?.[msg.message.length - 1];
                                                        if (!lastMsg || lastMsg.expediteur_id !== auth?.user?.id) return null;

                                                        return lastMsg.lu ? (
                                                            <CheckCheck size={10} className="text-[#0d8af0]" />
                                                        ) : (
                                                            <Check size={10} className="text-gray-400" />
                                                        );
                                                    })()}
                                                </div>

                                            </div>
                                        </button>
                                    )) :
                                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                                        <div className="text-6xl mb-4 text-[#ec8d0c]">
                                            <FiMessageSquare />
                                        </div>
                                        <div className="text-lg font-semibold">
                                            Aucune discussion ouverte
                                        </div>
                                        <div className="text-sm mt-2 text-gray-400">
                                            Sélectionnez une conversation pour commencer à discuter
                                        </div>
                                    </div>

                                }
                            </div>
                        </div>
                        {showContenuMessage === 'show' ? (
                            <div className="h-screen md:fixed md:ml-[40%] overflow-auto md:w-3/5 border w-full text-center bg-cover bg-center" >
                                <div className="border-b fixed w-screen bg-white p-3 flex">
                                    <div className="w-11 bg-gray-50 p-2 md:ml-10 rounded-full">
                                        <FiUser className="size-full" />
                                    </div>
                                    <div className="mr-auto p-1 w-fit break-words mb-1 self-start mt-1 ml-2 font-bold">
                                        {discuss?.user1?.id == auth?.user?.id ? (discuss?.user2?.nom + " " + discuss?.user2?.prenom) : (discuss?.user1?.nom + " " + discuss?.user1?.prenom)}
                                    </div>
                                    <button className="ml-4 w-5 md:mr-10" onClick={() => { setShowContenuMessage(''); setSelectedId(null) }}>
                                        <FaArrowLeft className="text-[#ec8d0c] size-full" />
                                    </button>
                                </div>

                                <div
                                    id="chat-box"
                                    className="p-4 h-[calc(100vh-150px)] md:px-16 mt-16 bg-gray-50 flex flex-col overflow-y-auto pb-16"
                                >

                                    {conversations
                                        .find(m => m?.user2?.id === selectedId || m?.user1?.id === selectedId)
                                        ?.message
                                        ?.map((msg) => {
                                            // --- Si message de type "produit"
                                            if (msg.type === 'produit') {
                                                const produitData = JSON.parse(msg.contenu).data;

                                                return (
                                                    <div
                                                        key={msg.id}
                                                        className={
                                                            "w-fit max-w-60 md:max-w-96 break-words mb-2 p-2 rounded-lg flex flex-col " +
                                                            (msg.expediteur_id === auth?.user?.id
                                                                ? "bg-zinc-100 self-end items-end"
                                                                : "bg-white self-start items-start")
                                                        }
                                                        onContextMenu={(e) => {
                                                            e.preventDefault();
                                                            setContextMenu({ x: e.clientX, y: e.clientY, msgId: msg.id });
                                                        }}
                                                    >
                                                        <div className="p-3 bg-gray-100 rounded-lg shadow-sm max-w-xs">
                                                            <img
                                                                src={`/storage/${produitData.image}`}
                                                                alt={produitData.nom}
                                                                className="w-24 h-24 object-cover rounded-md"
                                                            />
                                                            <div className="mt-2">
                                                                <p className="font-semibold text-sm">{produitData.nom}</p>
                                                                <p className="text-orange-600 font-bold">{produitData.prix} FCFA</p>
                                                            </div>
                                                            <button
                                                                onClick={() => router.visit(`/detail-product/${produitData.id}`)}
                                                                className="text-sm text-white bg-orange-600 mt-2 px-3 py-1 rounded-lg hover:bg-orange-700"
                                                            >
                                                                Voir le produit
                                                            </button>
                                                        </div>

                                                        {/* Heure d’envoi */}
                                                        <div className="text-xs text-gray-400 flex items-center justify-end gap-1 mt-1">
                                                            {new Date(msg.created_at).toLocaleTimeString().slice(0, 5)}
                                                            {msg.expediteur_id === auth.user.id &&
                                                                (msg.lu ? (
                                                                    <CheckCheck size={14} className="text-[#0d8af0]" />
                                                                ) : (
                                                                    <FiCheck size={14} className="text-gray-400" />
                                                                ))}
                                                        </div>
                                                    </div>
                                                );
                                            }

                                            // --- Sinon message normal (texte ou image)
                                            return (
                                                <div
                                                    key={msg.id}
                                                    onContextMenu={(e) => {
                                                        e.preventDefault();
                                                        setContextMenu({ x: e.clientX, y: e.clientY, msgId: msg.id });
                                                    }}
                                                    className={
                                                        "w-fit max-w-60 md:max-w-96 break-words mb-2 p-2 rounded-lg flex flex-col " +
                                                        (msg.expediteur_id === auth?.user?.id
                                                            ? "bg-zinc-100 self-end items-end"
                                                            : "bg-white self-start items-start")
                                                    }
                                                >
                                                    {/* Texte */}
                                                    {msg.contenu && (
                                                        <p className="text-sm text-gray-800">{msg.contenu}</p>
                                                    )}

                                                    {/* Image */}
                                                    {msg.piece_jointe && (
                                                        <img
                                                            src={`/storage/${msg.piece_jointe}`}
                                                            alt="Message"
                                                            className="mt-1 rounded-xl object-cover max-w-52 max-h-52 cursor-pointer"
                                                            onClick={() => window.open(`/storage/${msg.piece_jointe}`, "_blank")}
                                                        />
                                                    )}

                                                    {/* Heure */}
                                                    <div className="text-xs text-gray-400 flex items-center justify-end gap-1 mt-1">
                                                        {new Date(msg.created_at).toLocaleTimeString().slice(0, 5)}
                                                        {msg.expediteur_id === auth.user.id &&
                                                            (msg.lu ? (
                                                                <CheckCheck size={14} className="text-[#0d8af0]" />
                                                            ) : (
                                                                <FiCheck size={14} className="text-gray-400" />
                                                            ))}
                                                    </div>
                                                </div>
                                            );
                                        })}

                                    {contextMenu && (
                                        <div
                                            style={{
                                                top: contextMenu.y,
                                                left: contextMenu.x,
                                            }}
                                            className="fixed z-50 bg-white border shadow-lg rounded-lg text-sm w-44 py-1 animate-fade-in"
                                        >
                                            <button
                                                onClick={() => handleCopy(contextMenu.msgId)}
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                            >
                                                <FiCopy className="inline mr-2"></FiCopy> Copier
                                            </button>

                                            <div className="border-t my-1" />

                                            {/* Supprimer pour moi : toujours visible */}
                                            <button
                                                onClick={() => handleDelete(contextMenu.msgId, 'self')}
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-600"
                                            >
                                                <FiTrash className="inline mr-1" /> Supprimer pour moi
                                            </button>

                                            {/* Supprimer pour tous : visible seulement si je suis l'expéditeur */}
                                            {conversations
                                                .find(m => m?.user2?.id === selectedId || m?.user1?.id === selectedId)
                                                ?.message
                                                ?.find(msg => msg.id === contextMenu.msgId)?.expediteur_id === auth?.user?.id && (
                                                    <>
                                                        <div className="border-t my-1" />
                                                        <button
                                                            onClick={() => handleDelete(contextMenu.msgId, 'all')}
                                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                                                        >
                                                            <FiTrash2 className="inline mr-1" /> Supprimer pour tous
                                                        </button>
                                                    </>
                                                )}
                                        </div>
                                    )}



                                </div>

                                {previewImage && (
                                    <div className="absolute bottom-16 md:bottom-20 left-0 w-1/3 md:w-full flex justify-center bg-white/80 p-3 shadow-inner">
                                        <div className="relative inline-block">
                                            <img
                                                src={previewImage}
                                                alt="Prévisualisation"
                                                className="max-h-40 rounded-lg border shadow-md"
                                            />
                                            <button
                                                type="button"
                                                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                                                onClick={() => {
                                                    setPreviewImage(null);
                                                    setFormData({ ...formData, image: null });
                                                    document.getElementById("image-upload").value = null;
                                                }}
                                            >
                                                <FiX />
                                            </button>
                                        </div>
                                    </div>
                                )}
                                <div className="flex w-full items-center border border-[#ec8d0c] rounded-lg p-2 absolute bottom-0 bg-white">
                                    {/* Bouton pour envoyer une image */}
                                    <label htmlFor="image-upload" className="cursor-pointer flex items-center justify-center p-2 hover:bg-[#ec8d0c]/10 rounded">
                                        <FiImage size={20} className="text-[#ec8d0c]"></FiImage>

                                    </label>


                                    <input
                                        type="file"
                                        id="image-upload"
                                        name="image"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                setFormData({ ...formData, image: file });
                                                setPreviewImage(URL.createObjectURL(file)); // 🔥 Génère un aperçu temporaire
                                            }
                                        }}
                                    />

                                    {/* Champ de texte pour le message */}
                                    <input
                                        type="text"
                                        className="flex-grow px-4 py-2 border-none focus:outline-none rounded-lg"
                                        placeholder="Écris ton message..."
                                        autoFocus
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        onKeyDown={e => {
                                            if (e.key === "Enter") handleSendMessage();
                                        }}
                                    />

                                    {/* Bouton d'envoi */}
                                    <button
                                        onClick={handleSendMessage}
                                        className="p-2 hover:bg-[#ec8d0c]/10 rounded"
                                        aria-label="Envoyer le message"
                                    >
                                        <FiSend className="text-[#ec8d0c]" size={20} />
                                    </button>
                                </div>


                            </div>
                        ) :
                            <div className="md:ml-[40%] h-screen hidden sm:block md:w-3/5 border w-1/2 pt-40 text-center">
                                <img src="loh.ico" alt="logo de wandamarket" className="h-20 mx-auto" />
                                <div className="text-black font-bold text-3xl mt-7">WANDA</div>
                                <div className="text-[#ec8d0c] font-bold text-3xl">MARKET</div>
                                <div className="text-lg font-semibold">
                                    Veuillez sélectionner un message pour en savoir plus
                                </div>
                            </div>
                        }
                    </div>

                </>
            )}

        </div>
    );
};

export default Messagerie;