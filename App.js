import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AddEntry from "./components/addEntry";

export default class App extends React.Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<AddEntry />
			</View>
		);
	}
}
