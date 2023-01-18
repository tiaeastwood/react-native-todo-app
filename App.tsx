import { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
	const [todos, setTodos] = useState<ITodoItem[]>([]);

	const pressHandler = (key: string) => {
		// removes the pressed todo from the list & returns new list
		setTodos((prevTodos) => {
			return prevTodos.filter((todo) => todo.key !== key);
		});
		removeTodo(key);
	};

	const storeTodo = async (value: ITodoItem) => {
		try {
			const jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem(value.key, jsonValue);
		} catch (error) {
			console.log(error);
		}
	};

	const getTodo = async (key: string) => {
		try {
			const jsonValue = await AsyncStorage.getItem(key);
			return jsonValue != null ? JSON.parse(jsonValue) : null;
		} catch (error) {
			console.log(error);
		}
	};

	const getAllTodos = async () => {
		let keys: string[] = [];
		try {
			let foundKeys = await AsyncStorage.getAllKeys();
			keys = [...foundKeys];

			if (keys.length > 0) {
				let storedTodos: ITodoItem[] = [];

				for (const key of keys) {
					let foundTodo = await getTodo(key);
					storedTodos.push(foundTodo);
				}
				setTodos([...todos, ...storedTodos]);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const removeTodo = async (key: string) => {
		try {
			await AsyncStorage.removeItem(key);
		} catch (error) {
			console.log(error);
		}
	};

	const submitHandler = (text: string) => {
		if (text.length > 3) {
			let newTodo = {
				text: text,
				key: Math.random().toString(),
			};
			setTodos((prevTodos) => {
				return [newTodo, ...prevTodos];
			});
			storeTodo(newTodo);
		} else {
			Alert.alert("Oops!", "Todos must be more than 3 characters long", [
				{ text: "OK", onPress: () => console.log("alert closed") },
			]);
		}
	};

	useEffect(() => {
		getAllTodos();
	}, []);

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
			<View style={styles.container}>
				<StatusBar style="auto" />
				<Header />

				<View style={styles.content}>
					<AddTodo submitHandler={submitHandler} />
					{todos && (
						<View style={styles.list}>
							<FlatList
								data={todos}
								renderItem={({ item }) => (
									<TodoItem item={item} pressHandler={pressHandler} />
								)}
							/>
						</View>
					)}
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
