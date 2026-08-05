import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet, View, Text} from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ComponentsScreen from './src/screens/ComponentsScreen';
import DetailScreen from './src/screens/DetailScreen';

export type RootStackParamList = {
  Main: undefined;
  Detail: {title: string; data?: any};
};

export type TabParamList = {
  Home: undefined;
  Components: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const TabIcon = ({focused, color, name}: {focused: boolean; color: string; name: string}) => (
  <View style={styles.tabIcon}>
    <Text style={[styles.tabIconText, {color, fontSize: focused ? 26 : 22}]}>
      {name}
    </Text>
  </View>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#6366f1',
      tabBarInactiveTintColor: '#94a3b8',
      tabBarStyle: {
        paddingBottom: 8,
        paddingTop: 8,
        height: 65,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '500',
      },
      headerStyle: {
        backgroundColor: '#6366f1',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: '首页',
        tabBarIcon: ({focused, color}) => (
          <TabIcon focused={focused} color={color} name="🏠" />
        ),
      }}
    />
    <Tab.Screen
      name="Components"
      component={ComponentsScreen}
      options={{
        title: '组件',
        tabBarIcon: ({focused, color}) => (
          <TabIcon focused={focused} color={color} name="🧩" />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: '我的',
        tabBarIcon: ({focused, color}) => (
          <TabIcon focused={focused} color={color} name="👤" />
        ),
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        title: '设置',
        tabBarIcon: ({focused, color}) => (
          <TabIcon focused={focused} color={color} name="⚙️" />
        ),
      }}
    />
  </Tab.Navigator>
);

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Main"
              component={MainTabs}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Detail"
              component={DetailScreen}
              options={({route}) => ({
                title: route.params?.title || '详情',
                headerStyle: {backgroundColor: '#6366f1'},
                headerTintColor: '#ffffff',
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconText: {
    lineHeight: 28,
  },
});

export default App;
