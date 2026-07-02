import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Auth from './screens/Auth';
import AuthOrApp from './screens/AuthOrApp';
import TaskList from './screens/TaskList';
import Menu from './screens/Menu';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerRoutes({ route }: any) {

  const userData = route.params || {};

  return (
    <Drawer.Navigator 
        initialRouteName="Today" 
        screenOptions={{ headerShown: false }}
        drawerContent={(props) => <Menu {...props} userData={userData}/> }
      >
      <Drawer.Screen 
        name="Today" 
        options={{ title: 'Hoje' }}
      >
        {(props) => <TaskList title='Hoje' daysAhead={0} {...props} />}
      </Drawer.Screen>

      <Drawer.Screen 
        name="Tomorrow" 
        options={{ title: 'Amanhã' }}
      >
        {(props) => <TaskList title='Amanhã' daysAhead={1} {...props} />}
      </Drawer.Screen>

      <Drawer.Screen 
        name="Week" 
        options={{ title: 'Semana' }}
      >
        {(props) => <TaskList title='Semana' daysAhead={7} {...props} />}
      </Drawer.Screen>

      <Drawer.Screen 
        name="Month" 
        options={{ title: 'Mês' }}
      >
        {(props) => <TaskList title='Mês' daysAhead={30} {...props} />}
      </Drawer.Screen>

    </Drawer.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthOrApp">
        <Stack.Screen 
          name="AuthOrApp" 
          component={AuthOrApp} 
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name="Auth" 
          component={Auth} 
          options={{ headerShown: false }}
        />
        
        <Stack.Screen 
          name="Home" 
          component={DrawerRoutes} 
          options={{ headerShown: false }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}