import React from "react";
import { render, waitFor, screen } from "@testing-library/react-native";
import App from "../App.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import renderer from "react-test-renderer";

beforeEach(async () => {
	const value1 = { key: "1", text: "test" };
	const value2 = { key: "2", text: "another" };
	const value3 = { key: "3", text: "and another" };
	const jsonValue1 = JSON.stringify(value1);
	const jsonValue2 = JSON.stringify(value2);
	const jsonValue3 = JSON.stringify(value3);
	await AsyncStorage.setItem(value1.key, jsonValue1);
	await AsyncStorage.setItem(value2.key, jsonValue2);
	await AsyncStorage.setItem(value3.key, jsonValue3);
});

describe("<App />", () => {
	it("has 2 children", () => {
		const tree = renderer.create(<App />).toJSON();
		expect(tree.children.length).toBe(2);
	});

	it("renders correctly", () => {
		const tree = render(<App />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("checks if Async Storage is used", async () => {
		render(<App />);

		waitFor(async () => {
			expect(AsyncStorage.getAllKeys).toHaveBeenCalled();
		});

		waitFor(async () => {
			expect(await AsyncStorage.getAllKeys()).toEqual(["1", "2", "3"]);
		});
	});
	it("renders ADD TODO button", async () => {
		render(<App />);
		expect(screen.getByText("ADD TODO")).toBeDefined();
	});
});
