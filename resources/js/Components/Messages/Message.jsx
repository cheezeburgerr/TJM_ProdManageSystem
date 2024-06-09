import React from "react";
import { useState } from "react";

const Message = ({ userId, message }) => {

    const [showTime, setShowTime] = useState(false);


    const showTheTime = () => {
        setShowTime(true);
    }
    return (
        <div className={`${
        userId === message.user_id ? "text-right" : ""
        }`}>
            <div className="">
		<small className="">
                    <strong>{message.name}</strong>
                </small>
                {showTime && (
                    <>
                    <small className="">
                    {message.time}
                </small>
                    </>
                )}
               <div onClick={() => showTheTime()} className={`flex  ${userId === message.user_id ? 'justify-end' : 'justify-start'}`}>
               <div  className={`p-2 px-4 rounded-lg ${
                userId === message.user_id ? "bg-teal-500 text-gray-100 max-w-48" : "bg-gray-500 max-w-48 text-gray-100"
                }`} role="alert">
                    {message.message}
                </div>
               </div>
            </div>
        </div>
    );
};

export default Message;
