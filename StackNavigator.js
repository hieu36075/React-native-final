import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./app/screens/home/HomeScreen";
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import SavedScreen from "./app/screens/SavedScreen";
import BookingScreen from "./app/screens/BookingScreen";
import MenuScreen from "./app/screens/menu/MenuScreen";
import { SafeAreaView } from 'react-native';
import FocusedStatusBar from "./app/components/FocusedStatusBar";
import Header from "./app/layout/header";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import OnboardingScreen from "./app/screens/OnboardingScreen";
import { useSelector } from "react-redux";
import SearchScreen from "./app/screens/search/SearchScreen";
import ListScreen from "./app/screens/ListScreen/ListScreen";
import DetailsScreen from "./app/screens/details/DetailsScreen";
const StackNavigator =() =>{
    const Tab = createBottomTabNavigator();
    const {isLogin} = useSelector((state) => state.auth)
    const Stack = createNativeStackNavigator();
    function BottomTabs() {
        return (
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarLabel: "Home",
                headerShown: false,
                tabBarIcon: ({ focused }) =>
                  focused ? (
                    <Entypo name="home" size={24} color="#003580" />
                  ) : (
                    <AntDesign name="home" size={24} color="black" />
                  ),
              }}
            />
    
            <Tab.Screen
              name="Saved"
              component={SavedScreen}
              options={{
                tabBarLabel: "Saved",
                headerShown: false,
                tabBarIcon: ({ focused }) =>
                  focused ? (
                    <AntDesign name="heart" size={24} color="#003580" />
                  ) : (
                    <AntDesign name="hearto" size={24} color="black" />
                  ),
              }}
            />
    
            <Tab.Screen
              name="Bookings"
              component={BookingScreen}
              options={{
                tabBarLabel: "Bookings",
                headerShown: false,
                tabBarIcon: ({ focused }) =>
                  focused ? (
                    <Ionicons name="notifications" size={24} color="#003580" />
                  ) : (
                    <Ionicons name="notifications-outline" size={24} color="black" />
                  ),
              }}
            />
    
            <Tab.Screen
              name="Menu"
              component={MenuScreen}
              options={{
                tabBarLabel: "Menu",
                headerShown: false,
                tabBarIcon: ({ focused }) =>
                  focused ? (
                    <Ionicons name="person" size={24} color="#003580" />
                  ) : (
                    <Ionicons name="person-outline" size={24} color="black" />
                  ),
              }}
            />
          </Tab.Navigator>
        );
      }
    return(
    <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
        {/* <Header navigation={null} /> */}
        <FocusedStatusBar backgroundColor="#003580"  />
            <Stack.Navigator screenOptions={{headerShown: false}}>
              {isLogin ? (
                <>
                {/* <Stack.Screen name="Main" component={BottomTabs} options={{headerShown:false}}/>
                <Stack.Screen name="SearchScreen" component={SearchScreen}/>
                <Stack.Screen name="ListScreen" component={ListScreen}/> */}
                <Stack.Screen name="DetailsScreen" component={DetailsScreen}/>
                </>
              ) : (
                <>
                <Stack.Screen name="OnScreen" component={OnboardingScreen} /> 
                <Stack.Screen name="Login" component={LoginScreen} />   
                <Stack.Screen name="Register" component={RegisterScreen} />   
                </>
              )}
            </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaView>
    )
}


export default StackNavigator;

const styles = StyleSheet.create({})