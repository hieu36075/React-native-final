import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../redux/store';
let _store = store;

  const token = _store.getState().auth.token

const socket = io('http://192.168.1.17:3500', {
  transportOptions: {
    polling: {
      extraHeaders: {
        'Authorization': `Bearer ${token}`
      }
    }
  }
});
 

 
export default socket;


// const initializeSocket = async () => {
//     try {
//       const token = await getTokenFromAsyncStorage();
//       const socket = io('http://192.168.31.246:3500', {
//         transportOptions: {
//           polling: {
//             extraHeaders: {
//               'Authorization': `Bearer ${token}`
//             }
//           }
//         }
//       });
//       return socket;
//     } catch (error) {
//       console.error('Error initializing socket:', error);
//       throw error; // You can choose to handle the error as needed
//     }
//   };
  
//   export default initializeSocket;