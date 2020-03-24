import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './pages/Main';
import User from './pages/User';

const Stack = createStackNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerTitleAlign: 'center',
                    headerTintColor: '#FFF',
                    headerBackTitleVisible: false,
                    headerStyle: {
                        backgroundColor: '#7159c1',
                    },
                }}
            >
                <Stack.Screen
                    name="Main"
                    component={Main}
                    options={{
                        title: 'Olá Mundo',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;
