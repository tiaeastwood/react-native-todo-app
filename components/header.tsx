import { StyleSheet, Text, View } from "react-native";

const Header = () => {
	return (
		<View style={styles.header}>
			<Text style={styles.title}>My Todos</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		height: "auto",
		paddingTop: 80,
		paddingBottom: 10,
		backgroundColor: "coral",
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
	},
	title: {
		color: "white",
		fontSize: 40,
	},
});
export default Header;
