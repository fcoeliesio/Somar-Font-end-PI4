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
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ title: 'Página Inicial' }}/>
        <Stack.Screen name="Auth" component={Auth} options={{ title: 'Autenticação' }}/>
        <Stack.Screen name="User" component={User} options={{ title: 'Área de usuário' }}/>
        <Stack.Screen name="Register" component={Register} options={{ title: 'Cadastre-se' }}/>
        <Stack.Screen name="Product" component={Product} options={{ title: 'Cadastrar Produto' }}/>
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
