import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
	cchat: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 5,
		paddingHorizontal: 15,
		backgroundColor: "#fff",
		height: 80,
		marginBottom: 10,
	},
    cavatar: {
		marginRight: 15,
	},
    crightContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		flex: 1,
	},
    cusername: {
		fontSize: 18,
		marginBottom: 5,
		fontWeight: "bold",
	},
    cmessage: {
		fontSize: 14,
		opacity: 0.7,
	},
    ctime: {
		opacity: 0.5,
	},
});

export default styles;