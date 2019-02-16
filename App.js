import React from "react";
import { View, Platform, StatusBar } from "react-native";
import AddEntry from "./components/AddEntry";
import EntryDetail from "./components/EntryDetail";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import History from "./components/History";
import { purple, white } from "./utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import {
	createBottomTabNavigator,
	createAppContainer,
	createStackNavigator
} from "react-navigation";
import { Constants } from "expo";
import Live from "./components/Live";
import { setLocalNotification } from "./utils/helpers";

function UdaciStatusBar({ backgroundColor, ...props }) {
	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar
				translucent
				backgroundColor={backgroundColor}
				{...props}
			/>
		</View>
	);
}

const Tabs = createBottomTabNavigator(
	{
		History: {
			screen: History,
			navigationOptions: {
				tabBarLabel: "History",
				tabBarIcon: ({ tintColor }) => (
					<Ionicons
						name="ios-bookmarks"
						size={30}
						color={tintColor}
					/>
				)
			}
		},
		AddEntry: {
			screen: AddEntry,
			navigationOptions: {
				tabBarLabel: "Add Entry",
				tabBarIcon: ({ tintColor }) => (
					<FontAwesome
						name="plus-square"
						size={30}
						color={tintColor}
					/>
				)
			}
		},
		Live: {
			screen: Live,
			navigationOptions: {
				tabBarLabel: "Live",
				tabBarIcon: ({ tintColor }) => (
					<Ionicons
						name="ios-speedometer"
						size={30}
						color={tintColor}
					/>
				)
			}
		}
	},
	{
		navigationOptions: {
			header: null
		},
		tabBarOptions: {
			// The color of the icon on the navigation bar.
			activeTintColor: Platform.OS === "ios" ? purple : white,
			style: {
				height: 56,
				// The background behind the navigation icon
				backgroundColor: Platform.OS === "ios" ? white : purple,
				shadowColor: "rgba(0, 0, 0, 0.24)",
				shadowOffset: {
					width: 0,
					height: 3
				},
				shadowRadius: 6,
				shadowOpacity: 1
			}
		}
	}
);

const MainNavigator = createStackNavigator({
	// The order decides which one is the first shown.
	Home: {
		screen: Tabs,
		navigationOptions: {
			header: null
		}
	},
	EntryDetail: {
		screen: EntryDetail,
		navigationOptions: ({ navigation }) => ({
			// the color of the 'back' arrow.
			headerTintColor: white,
			headerStyle: {
				// The background color behind the 'back' arrow.
				backgroundColor: "purple"
			}
		})
	}
});

const InnerApp = createAppContainer(MainNavigator);

export default class App extends React.Component {
	componentDidMount() {
		setLocalNotification();
	}

	render() {
		return (
			<Provider store={createStore(reducer)}>
				<View style={{ flex: 1 }}>
					<UdaciStatusBar
						backgroundColor={purple}
						barStyle="light-content"
					/>
					<InnerApp />
				</View>
			</Provider>
		);
	}
}
