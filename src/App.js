import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Auth from "./views/Auth";
import User from "./views/User";
import Home from "./views/Home";
import Register from "./views/Register";
import Product from "./views/Product";
import Inventory from "./views/Inventory";
import Header from "./views/components/Header";
import { registerRootComponent } from "expo";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inventory">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen
          name="Inventory"
          component={Inventory}
          options={{
            header: () => <Header title={"Estoque"} />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);
