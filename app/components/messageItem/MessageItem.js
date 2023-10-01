import { View, Text, KeyboardAvoidingView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

export default function MessageItem({ item, user }) {
    // console.log(item)
	const status = item.sederId !== user;

	return (
		<KeyboardAvoidingView>
			<View
				style={
					status
						? styles.mmessageWrapper
						: [styles.mmessageWrapper, { alignItems: "flex-end" }]
				}
			>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Ionicons
						name='person-circle-outline'
						size={30}
						color='black'
						style={styles.mavatar}
					/>
					<View
						style={
							status
								? styles.mmessage
								: [styles.mmessage, { backgroundColor: "rgb(194, 243, 194)" }]
						}
					>
						<Text>{item.content}</Text>
					</View>
				</View>
				<Text style={{ marginLeft: 40 }}>{item.time}</Text>
			</View>
		</KeyboardAvoidingView>
	);
}