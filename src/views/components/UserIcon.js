import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Avatar, Menu, Provider } from "react-native-paper";
import { handleLogout } from "../../controllers/authController";
import getUserHelper from "../../helpers/GetUserHelper";

const UserIcon = ({ navigation }) => {
  // const [user, setUser] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [signOutModalVisible, setSignOutModalVisible] = useState(false);

  // useEffect(() => {
  //   async function fetchUser() {
  //     const userData = await getUserHelper();
  //     setUser(userData);
  //   }
  //   fetchUser();
  // }, []);

  const user = {
    firstName: "Usuário",
    email: "test@test.com",
    image: null,
    accessToken: "accessToken",
    refreshToken: "refreshToken",
  };
  const openMenu = () => {
    setMenuVisible(true);
    console.log("Menu aberto");
  };
  const closeMenu = () => {
    setMenuVisible(false);
    console.log("Menu fechado");
  };

  const handleSignOut = async () => {
    const response = handleLogout();

    if (response.ok) {
      setSignOutModalVisible(true);
    }
  };

  const handleOk = () => {
    setSignOutModalVisible(false);
    navigation.navigate("Auth");
  };

  return (
    <Provider>
      <View>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <Pressable onPress={openMenu}>
              <Avatar.Text
                size={40}
                label="XD"
                style={styles.avatarText}
                color="#000000"
              />
            </Pressable>
          }
        >
          <Menu.Item onPress={handleSignOut} title="Sair" />
        </Menu>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  avatarText: {
    backgroundColor: "#ffffff",
  },
});

export default UserIcon;
