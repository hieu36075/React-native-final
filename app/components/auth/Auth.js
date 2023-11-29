// import {
//     GoogleSignin,
//     GoogleSigninButton,
//     statusCodes,
//   } from '@react-native-google-signin/google-signin'
// import { useEffect } from 'react'
// import { ToastAndroid } from 'react-native'
// //   import { supabase } from '../utils/supabase'
  
//   export default function () {

//     useEffect(()=>{
//       GoogleSignin.configure({
//         scopes: ['https://www.googleapis.com/auth/drive.readonly'],
//         webClientId: '521737203578-ntih0fcki9du8mblht156sf0jcr63bkt.apps.googleusercontent.com',
//       })

//     },[])
  
//     return (
//       <GoogleSigninButton
//         size={GoogleSigninButton.Size.Wide}
//         color={GoogleSigninButton.Color.Dark}
//         onPress={async () => {
//           try {
//             await GoogleSignin.hasPlayServices()
//             const userInfo = await GoogleSignin.signIn()
//             console.log(userInfo)
//           } catch (error) {
//             if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//               // user cancelled the login flow
//             } else if (error.code === statusCodes.IN_PROGRESS) {
//               // operation (e.g. sign in) is in progress already
//             } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//               // play services not available or outdated
//             } else {
//                 ToastAndroid.show('error',ToastAndroid.SHORT)
//                 console.log(error)
//               // some other error happened
//             }
//           }
//         }}
//       />
//     )
//   }