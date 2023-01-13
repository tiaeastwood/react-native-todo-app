import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	View,
	FlatList,
	Alert,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import Header from "./components/header";
import TodoItem from "./components/todoItem";
import AddTodo from "./components/addTodo";
import { ITodoItem } from "./types";

export default function App() {
	const [todos, setTodos] = useState<ITodoItem[]>([
		{ text: "buy coffee", key: "1" },
		{ text: "create an app", key: "2" },
		{ text: "play on the Switch", key: "3" },
	]);

	const pressHandler = (key: string) => {
		// removes the pressed todo from the list & returns new list
		setTodos((prevTodos) => {
			return prevTodos.filter((todo) => todo.key !== key);
		});
	};

	const submitHandler = (text: string) => {
		if (text.length > 3) {
			setTodos((prevTodos) => {
				return [{ text: text, key: Math.random().toString() }, ...prevTodos];
			});
		} else {
			Alert.alert("Oops!", "Todos must be more than 3 characters long", [
				{ text: "OK", onPress: () => console.log("alert closed") },
			]);
		}
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
			<View style={styles.container}>
				<StatusBar style="auto" />
				<Header />

				<View style={styles.content}>
					<AddTodo submitHandler={submitHandler} />
					<View style={styles.list}>
						<FlatList
							data={todos}
							renderItem={({ item }) => (
								<TodoItem item={item} pressHandler={pressHandler} />
							)}
						/>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
	},
	searchBar: {
		width: "50%",
		borderWidth: 1,
		padding: 10,
	},
	text: {
		fontWeight: "bold",
		fontSize: 50,
	},
	content: { padding: 40, width: "100%", flex: 1 },
	list: { marginTop: 20, flex: 1 },
});
