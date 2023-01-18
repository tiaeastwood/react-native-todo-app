import React from "react";
import {
	render,
	waitFor,
	screen,
	cleanup,
	fireEvent,
} from "@testing-library/react-native";
import App from "../App.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import renderer from "react-test-renderer";
jest.useFakeTimers();

const itemData = [
	{ key: "1", text: "test item" },
	{ key: "2", text: "another" },
	{ key: "3", text: "and another" },
];

describe("<App />", () => {
	beforeEach(async () => {
		const jsonValue1 = JSON.stringify(itemData[0]);
		const jsonValue2 = JSON.stringify(itemData[1]);
		const jsonValue3 = JSON.stringify(itemData[2]);
		await AsyncStorage.setItem(itemData[0].key, jsonValue1);
		await AsyncStorage.setItem(itemData[1].key, jsonValue2);
		await AsyncStorage.setItem(itemData[2].key, jsonValue3);

		waitFor(async () => {
			expect(AsyncStorage.getAllKeys).toHaveBeenCalled();
		});

		waitFor(async () => {
			expect(await AsyncStorage.getAllKeys()).toEqual(["1", "2", "3"]);
		});
	});

	it("renders correctly", () => {
		const tree = render(<App />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("renders ADD TODO button", async () => {
		render(<App />);
		expect(screen.getByText("ADD TODO")).toBeDefined();
	});

	it("getAllKeys is called on render and items from async storage are displayed", async () => {
		render(<App />);

		const item1 = await screen.findByText("test item");
		const item2 = await screen.findByText("another");
		const item3 = await screen.findByText("and another");
		const falseItem = screen.queryByText("i shouldn't exist");
		expect(item1).toBeTruthy();
		expect(item2).toBeTruthy();
		expect(item3).toBeTruthy();
		expect(falseItem).toBeFalsy();
	});

	it("new todo item is rendered to the displayed list when added", async () => {
		render(<App />);

		const input = screen.getByPlaceholderText("new todo...");
		const addTodoBtn = screen.getByText("ADD TODO");
		fireEvent(input, "onChangeText", "New Task");
		fireEvent(addTodoBtn, "press");

		waitFor(async () => {
			expect(await screen.findByText("New Task")).toBeTruthy();
		});
	});
});
