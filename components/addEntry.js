import React, { Component } from "react";
import { View, Text } from "react-native";
import { getMetricMetaInfo } from "../utils/helpers";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class AddEntry extends Component {
	render() {
		return getMetricMetaInfo("bike").getIcon();
	}
}
