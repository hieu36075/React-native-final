import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TextInput, Image, Pressable, StyleSheet } from 'react-native';
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getMyProfile, updateProfile, uploadAvatar } from '../../redux/profile/profileThunk';
import * as ImagePicker from 'expo-image-picker';
const ProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile.data);
    const [editingField, setEditingField] = useState(null);
    const [image, setImage] = useState()
    const [currentProfile, setCurrentProfile] = useState({
        firstName: '',
        lastName: '',
        fullName: '',
        phoneNumber: '',
        address: '',
        avatarUrl: ' '
    });

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: true });
    }, [navigation]);

    useEffect(() => {
        dispatch(getMyProfile()).unwrap()
            .then((res) => {
                setCurrentProfile({
                    firstName: res.firstName,
                    lastName: res.lastName,
                    fullName: res.fullName,
                    phoneNumber: res.phoneNumber,
                    address: res.address,
                    avatarUrl: res.avatarUrl || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
                });
            });
    }, [dispatch]);

    const handleEditPress = (field) => {
        setEditingField(field);
    };

    const handleChange = (name, value) => {
        setCurrentProfile({ ...currentProfile, [name]: value });
    };
    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("PLease greanted");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.canceled === true) {
            return;
        }

        const imageUri = pickerResult.assets ? pickerResult.assets[0].uri : null;

        if (imageUri) {
            setCurrentProfile({
                ...currentProfile,
                avatarUrl: imageUri
            });
        }
    };



    const handleSave = () => {
        if (!currentProfile.fullName || !currentProfile.fullName.trim() ||
            !currentProfile.phoneNumber || !currentProfile.phoneNumber.trim() ||
            !currentProfile.address || !currentProfile.address.trim()) {
            alert('Please do not leave any fields blank');
            return;
        }

        const nameParts = currentProfile.fullName.trim().split(' ');
        if (nameParts.length < 2) {
            alert('Please enter your full name');
            return;
        }
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ');

        setCurrentProfile(prevState => ({
            ...prevState,
            firstName: firstName,
            lastName: lastName,
        }));
        dispatch(updateProfile(currentProfile))
        setEditingField(null);
    };

    return (
        <View style={{ flex: 1, padding: 30 }}>
            <View style={{ alignItems: 'center', marginBottom: 30 }}>
                <Pressable onPress={pickImage}>
                    <Image
                        style={{ width: 100, height: 100, borderRadius: 60 }}
                        source={{
                            uri: profile?.avatarUrl || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
                        }}
                    />
                </Pressable>
            </View>


            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Ionicons name="person-circle-outline" size={40} color="black" />
                {editingField === 'fullName' ? (
                    <TextInput
                        style={{ paddingLeft: 10, flex: 1 }}
                        value={currentProfile.fullName}
                        onChangeText={(text) => handleChange('fullName', text)}
                        onBlur={() => handleSave()}
                    />
                ) : (
                    <Pressable style={{ paddingLeft: 10, flex: 1 }} onPress={() => handleEditPress('fullName')}>
                        <Text>Name</Text>
                        <Text>{currentProfile.fullName}</Text>
                    </Pressable>
                )}
                <EvilIcons name="pencil" size={24} color="black" onPress={() => handleEditPress('fullName')} />
            </View>
            <View style={{ marginTop: 5, marginBottom: 5, borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomWidth: 0.5, borderBottomStyle: 'dashed' }} />

            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Ionicons name="call-outline" size={40} color="black" />
                {editingField === 'phoneNumber' ? (
                    <TextInput
                        style={{ paddingLeft: 10, flex: 1 }}
                        value={currentProfile.phoneNumber}
                        onChangeText={(text) => handleChange('phoneNumber', text)}
                        onBlur={() => handleSave()}
                    />
                ) : (
                    <Pressable style={{ paddingLeft: 10, flex: 1 }} onPress={() => handleEditPress('phoneNumber')}>
                        <Text>Phone Number</Text>
                        <Text>{currentProfile.phoneNumber}</Text>
                    </Pressable>
                )}
                <EvilIcons name="pencil" size={24} color="black" onPress={() => handleEditPress('phoneNumber')} />
            </View>
            <View style={{ marginTop: 5, marginBottom: 5, borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomWidth: 0.5, borderBottomStyle: 'dashed' }} />

            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Ionicons name="home-outline" size={40} color="black" />
                {editingField === 'address' ? (
                    <TextInput
                        style={{ paddingLeft: 10, flex: 1 }}
                        value={currentProfile.address}
                        onChangeText={(text) => handleChange('address', text)}
                        onBlur={() => handleSave()}
                    />
                ) : (
                    <Pressable style={{ paddingLeft: 10, flex: 1 }} onPress={() => handleEditPress('address')}>
                        <Text>Address</Text>
                        <Text>{currentProfile.address}</Text>
                    </Pressable>
                )}
                <EvilIcons name="pencil" size={24} color="black" onPress={() => handleEditPress('address')} />
            </View>


            <View style={{ alignItems: 'center', marginTop: 15 }}>
                <Pressable
                    style={{
                        borderWidth: 0,
                        borderRadius: 10,
                        padding: 10,
                        backgroundColor: "#005DB1",
                        width: '60%',
                        alignItems: 'center'
                    }}
                    onPress={handleSave}
                >
                    <Text style={{ color: 'white' }}>Save Profile</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default ProfileScreen;
