import React, { useEffect } from 'react';
import SceneList from './components/SceneList';
import SplashScreen from 'react-native-splash-screen'
import { Appbar, BottomNavigation } from 'react-native-paper';

const App = () => {

  useEffect(() => {
    SplashScreen.hide()
  })

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'all', title: 'All', icon: 'text-box-multiple' },
    { key: 'completed', title: 'Completed', icon: 'check-bold' },
    { key: 'incomplete', title: 'Incomplete', icon: 'close-thick' },
  ]);

  const items = [
    {
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": false
    },
    {
      "userId": 1,
      "id": 2,
      "title": "quis ut nam facilis et officia qui",
      "completed": false
    },
    {
      "userId": 1,
      "id": 3,
      "title": "fugiat veniam minus",
      "completed": false
    },
    {
      "userId": 1,
      "id": 4,
      "title": "et porro tempora",
      "completed": true
    },
    {
      "userId": 1,
      "id": 5,
      "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
      "completed": false
    },
    {
      "userId": 1,
      "id": 6,
      "title": "qui ullam ratione quibusdam voluptatem quia omnis",
      "completed": false
    }];

  const All = () => <SceneList toDos={items} />;

  const Completed = () => <SceneList toDos={items.filter(item=>item.completed)} />;

  const Incomplete = () => <SceneList toDos={items.filter(item=>!item.completed)} />;;

  const renderScene = BottomNavigation.SceneMap({
    all: All,
    completed: Completed,
    incomplete: Incomplete
  });

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="To Do" />
        {/* <Appbar.Action icon="door-closed" /> */}
      </Appbar.Header>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </>
  );
};

export default App;
