import React, { useState } from "react";
import TextInput from "../TextInput";
import PrimaryButton from "../PrimaryButton";

const MessageInput = ({ rootUrl, userid }) => {
    const [message, setMessage] = useState("");

    console.log(userid);

    const messageRequest = async (text) => {
        try {

            await axios.post(`${rootUrl}/message`, {
                userid,
                text,
            });


            console.log(text);
        } catch (err) {
            console.log(err.message);
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() === "") {
            alert("Please enter a message!");
            return;
        }

        messageRequest(message);
        setMessage("");
    };

    return (
        <div className="flex gap-x-2 items-center">
            <TextInput onChange={(e) => setMessage(e.target.value)}
                   autoComplete="off"
                   type="text"
                   className="form-control"
                   placeholder="Message..."
                   value={message}
            />
            <div className="input-group-append">
                <PrimaryButton onClick={(e) => sendMessage(e)}
                        className="btn btn-primary"
                        type="button">Send</PrimaryButton>
            </div>
        </div>
    );
};

export default MessageInput;
