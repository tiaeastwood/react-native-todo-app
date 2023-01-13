import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ITodoItem } from "../types";
import { MaterialIcons } from "@expo/vector-icons";

interface ITodoProps {
	item: ITodoItem;
	pressHandler: (key: string) => void;
}

const TodoItem = ({ item, pressHandler }: ITodoProps) => {
	return (
		<TouchableOpacity
			style={styles.item}
			onPress={() => pressHandler(item.key)}
		>
			<Text>{item.text}</Text>
			<MaterialIcons name="delete" size={18} color="#333" />
		</TouchableOpacity>
	);
};

export default TodoItem;

const styles = StyleSheet.create({
	item: {
		padding: 16,
		marginTop: 16,
		borderColor: "lightgrey",
		borderWidth: 1,
		borderStyle: "dashed",
		borderRadius: 10,
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
});
