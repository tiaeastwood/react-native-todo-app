import { useState } from "react";
import {
	StyleSheet,
	View,
	Button,
	TextInput,
	Pressable,
	Text,
} from "react-native";

interface IAddTodoProps {
	submitHandler: (text: string) => void;
}

const AddTodo = ({ submitHandler }: IAddTodoProps) => {
	const [text, setText] = useState<string>("");

	const changeHandler = (val: string) => {
		setText(val);
	};

	return (
		<View>
			<TextInput
				style={styles.input}
				placeholder="new todo..."
				onChangeText={changeHandler}
			/>
			<Pressable onPress={() => submitHandler(text)} style={styles.button}>
				<Text style={styles.buttonText}>ADD TODO</Text>
			</Pressable>
		</View>
	);
};

export default AddTodo;

const styles = StyleSheet.create({
	input: {
		marginBottom: 10,
		paddingHorizontal: 8,
		paddingVertical: 6,
		borderBottomWidth: 1,
		borderBottomColor: "lightgrey",
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: "coral",
	},
	buttonText: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "white",
	},
});
