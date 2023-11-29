import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
	chatscreen: {
		backgroundColor: "white",
		flex: 1,
		// padding: 10,
		position: "relative",
	},
	chatheading: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#2E7CC3",
	},
	chattopContainer: {
		backgroundColor: "white",
		height: 70,
		width: "100%",
		padding: 20,
		justifyContent: "center",
		marginBottom: 15,
		elevation: 2,
	},
	chatheader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	chatlistContainer: {
		// paddingHorizontal: 10,
	},
	chatemptyContainer:{
		justifyContent:'center',
		alignItems:'center'
	}
      
});

export default styles;