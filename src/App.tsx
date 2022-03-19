import React, { useCallback, useEffect, useState } from 'react';
import SceneList from './components/SceneList';
import SplashScreen from 'react-native-splash-screen'
import { Appbar, BottomNavigation } from 'react-native-paper';
import api from './services';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import ToDos from './services/ToDos';

interface IToDos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const wait = (timeout: number | undefined) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const App = () => {

  const [index, setIndex] = useState(0);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [routes] = useState([
    { key: 'all', title: 'All', icon: 'text-box-multiple' },
    { key: 'completed', title: 'Completed', icon: 'check-bold' },
    { key: 'incomplete', title: 'Incomplete', icon: 'close-thick' },
  ]);
  const [toDos, setToDos] = useState<IToDos[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
}, []);

  const fetchData = async () => {
    setDataIsLoaded(false);
    const response = await ToDos.get()
    setToDos(response);
    setDataIsLoaded(true);
  }

  useEffect(() => {
    SplashScreen.hide();
    (async () => {
      try {
        await fetchData();
      } catch (e: any) {
        Alert.alert(e.message);
      }
    })()
  }, []);

  const onIndexChange = (index: number) => {
    setDataIsLoaded(false);
    setIndex(index);
    setDataIsLoaded(true);
  }
  const All = () => dataIsLoaded
    ? <SceneList toDos={toDos} onRefresh={onRefresh} refreshing={refreshing}/>
    : <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator />
    </View>;

  const Completed = () => dataIsLoaded
    ? <SceneList toDos={toDos.filter(item => item.completed)} onRefresh={onRefresh} refreshing={refreshing} />
    : <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator />
    </View>;

  const Incomplete = () => dataIsLoaded
    ? <SceneList toDos={toDos.filter(item => !item.completed)} onRefresh={onRefresh} refreshing={refreshing}/>
    : <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator />
    </View>;

  const renderScene = BottomNavigation.SceneMap({
    all: All,
    completed: Completed,
    incomplete: Incomplete
  });

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="To Do" />
      </Appbar.Header>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={onIndexChange}
        renderScene={renderScene}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default App;
