import React from "react";
import {
	render,
	waitFor,
	screen,
	fireEvent,
} from "@testing-library/react-native";
import App from "../App.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import renderer from "react-test-renderer";
import AddTodo from "../components/addTodo";

const mockSubmitHandler = jest.fn();

describe("<AddTodo />", () => {
	it("ADD TODO button submits a new todo item", async () => {
		render(<AddTodo submitHandler={mockSubmitHandler} />);

		const input = screen.getByPlaceholderText("new todo...");
		const addTodoBtn = screen.getByText("ADD TODO");
		fireEvent(input, "onChangeText", "New Task");
		fireEvent(addTodoBtn, "press");

		expect(mockSubmitHandler).toHaveBeenCalled();
		expect(mockSubmitHandler).toHaveBeenCalledWith("New Task");
	});
});
