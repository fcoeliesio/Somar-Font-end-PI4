import { Text, View } from 'react-native';
import { Button } from '@rneui/themed';

export default function Home({ navigation }) {
  return (
    <View style={{ padding: 16 }}>
      <Text>Página Inicial</Text>
      <Button
        title="Ir para Login"
        onPress={() => navigation.navigate('Auth')}
      />
    </View>
  );
}
