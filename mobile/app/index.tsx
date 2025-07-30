import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Button, Text } from 'react-native';
import { Redirect } from 'expo-router';
import { getToken, deleteToken } from '../utils/auth';

export default function Index() {
  const [token, setToken] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    (async () => {
      // Add a small delay to ensure the reset button is visible
      await new Promise(resolve => setTimeout(resolve, 1000));
      const t = await getToken();
      setToken(t ?? null);
    })();
  }, []);

  if (token === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 20 }}>Loading...</Text>
        <Button 
          title="Reset App (Clear Token)" 
          onPress={async () => {
            await deleteToken();
            setToken(null);
          }}
          color="#ff4444"
        />
      </View>
    );
  }

  return <Redirect href={token ? '/(tabs)' : '/login'} />;
}
