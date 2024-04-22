import React, { useEffect, useState } from "react";
import { db } from "./data/fire";
import {
  onSnapshot,
  collection,
  addDoc,
  deleteDoc,
  orderBy,
  query,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import "./App.css";

function App() {
  // TODO: add isLoading
  const messagesRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const sendMessage = async () => {
    if (inputValue.trim() !== "") {
      try {
        // Add a new document to the "messages" collection
        await addDoc(messagesRef, {
          sender: "anonymous", // You can set the sender to the logged-in user or any other identifier
          text: inputValue.trim(),
          timestamp: serverTimestamp(),
        });
        setInputValue("");
      } catch (error) {
        console.error("Error adding message: ", error);
      }
    }
  };

  const clearMessages = async () => {
    try {
      const querySnapshot = await getDocs(messagesRef);

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      setMessages([]);
    } catch (error) {
      console.error("Error clearing messages: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(messagesRef, orderBy("timestamp")), // orderBy('timestamp') sorts messages based on the 'timestamp' field
      (snapshot) => {
        try {
          const fetchedMessages = snapshot.docs.map((doc) => doc.data());
          setMessages(fetchedMessages);
        } catch (error) {
          console.error("Error fetching messages: ", error);
        }
      },
      (error) => {
        console.error("Error onSnapshot: ", error);
      }
    );

    return () => unsubscribe(); // Unsubscribe from snapshot listener when component unmounts
  }, [messagesRef]);

  return (
    <>
      <div className="chat-app">
        <div className="header">
          <h1>Simple Chat App</h1>
        </div>
        <div className="chat-container">
          <div className="message-list">
            {messages.map((message, index) => (
              <div key={index} className="message">
                <div className="sender">{message.sender}: </div>
                <div className="text">{message.text}</div>
              </div>
            ))}
          </div>
          <div className="input-container">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="input-field"
            />
            <button onClick={sendMessage} className="send-button">
              Send
            </button>
          </div>
        </div>
        <button onClick={clearMessages} className="clear-button">
          Delete All Messages
        </button>
      </div>
    </>
  );
}

export default App;
