import {
	StyleSheet,
	Text,
	View,
	Button,
	TextInput,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { ITodoItem } from "../types";

interface ITodoProps {
	item: ITodoItem;
	pressHandler: (key: string) => void;
}

const TodoItem = ({ item, pressHandler }: ITodoProps) => {
	return (
		<TouchableOpacity onPress={() => pressHandler(item.key)}>
			<Text style={styles.item}>{item.text}</Text>
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
	},
});
