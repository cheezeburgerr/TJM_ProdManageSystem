import React, { useEffect, useRef, useState } from "react";
import Message from "./Message.jsx";
import MessageInput from "./MessageInput.jsx";
import { Chatbox } from "react-ionicons";

const ChatBox = ({ rootUrl, userid }) => {

    const [showChatBox, setShowChatBox] = useState(false);

    const toggleChatBox = () => {
        setShowChatBox(prevState => !prevState);
    };
    // const userData = document.getElementById('main')
    //     .getAttribute('data-user');

    const userData = userid;

    // const user = JSON.parse(userData);
    // `App.Models.User.${user.id}`;
    const webSocketChannel = `channel_for_everyone`;

    const [messages, setMessages] = useState([]);
    const scroll = useRef();

    const scrollToBottom = () => {
        scroll.current.scrollIntoView({ behavior: "smooth" });
    };

    const connectWebSocket = () => {
        window.Echo.private(webSocketChannel)
            .listen('GotMessage', async (e) => {
                // e.message
                await getMessages();
            });
    }

    const getMessages = async () => {
        try {
            const m = await axios.get(`${rootUrl}/messages`);
            setMessages(m.data);
            setTimeout(scrollToBottom, 0);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        getMessages();
        connectWebSocket();

        return () => {
            window.Echo.leave(webSocketChannel);
        }
    }, []);

    return (

        <>


<div className="fixed z-10 bottom-0 right-10 flex gap-x-2 items-end justify-end">
            {showChatBox && (
                <div className="bg-gray-100 p-4 text-gray-900 rounded-md shadow-lg shadow-gray-300 ">

                <div className="">
                    <div className="w-full">
                        <div className="mb-4 font-bold">Chat Box</div>
                        <div className="text-left"
                            style={{ height: "350px", overflowY: "auto" }}>
                            {
                                messages?.map((message) => (
                                    <Message key={message.id}
                                        userId={userid}
                                        message={message}
                                    />
                                ))
                            }
                            <span ref={scroll}></span>
                        </div>
                        <div className="">
                            <MessageInput rootUrl={rootUrl} />
                        </div>
                    </div>
                </div>
            </div>
            )}

            <div className="mb-10 shadow-lg bg-teal-500 p-4 rounded-full cursor-pointer" onClick={toggleChatBox}>
                {/* {showChatBox ? 'Hide Chat' : 'Show Chat'} */}
                <Chatbox color={'white'} />
            </div>
            </div>
        </>

    );
};

export default ChatBox;
