import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './pages/Main';
import User from './pages/User';

const Stack = createStackNavigator();

function Routes() {
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Main"
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
                            title: 'Main',
                        }}
                    />

                    <Stack.Screen
                        name="User"
                        component={User}
                        options={{
                            title: 'Usuários',
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

export default Routes;
