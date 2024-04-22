// import { db } from "./fire";
// import { onSnapshot, collection, addDoc, deleteDoc, doc } from 'firebase/firestore';

// // Set up a reference to the "messages" collection
// const messagesRef = collection(db, 'messages');

// // Set up a Firestore listener to listen for changes in the "messages" collection

// export const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
// 	let messages = []
// 	snapshot.docs.forEach((doc) => {
// 		messages.push({...doc.data(), id: doc.id })
// 	})
// 	console.log(messages);
// })
