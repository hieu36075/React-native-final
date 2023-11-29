import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
	messagingscreen: {
		flex: 1,
	},
    messaginginputContainer: {
		width: "100%",
		minHeight: 100,
		paddingVertical: 25,
		paddingHorizontal: 15,
		justifyContent: "center",
		flexDirection: "row",
		height:'10%',
	},
    messaginginput: {
		borderWidth: 1,
		padding: 15,
		flex: 1,
		marginRight: 10,
		borderRadius: 20,
	},
	messagingbuttonContainer: {
		width: "30%",
		backgroundColor: "green",
		borderRadius: 3,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 50,
	},
});

export default styles;