import { Text, View } from 'react-native';

export default function User({ route }) {
  const { email } = route.params;

  return (
    <View style={{ padding: 16 }}>
      <Text>Bem-vindo, {email}!</Text>
    </View>
  );
}
