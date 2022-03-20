import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

import { BottomNavigation } from 'react-native-paper';
import SceneList from '../components/SceneList';
import { ToDosContext } from '../contexts/ToDosContext';
import { RootStackParamList } from '../routes/stack.routes';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

export function Home() {
    const { toDos , onRefresh } = useContext(ToDosContext);
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'all', title: 'All', icon: 'text-box-multiple' },
        { key: 'completed', title: 'Completed', icon: 'check-bold' },
        { key: 'incomplete', title: 'Incomplete', icon: 'close-thick' },
    ]);

    const navigation = useNavigation<homeScreenProp>();

    const onIndexChange = (index: number) => {
        setIndex(index);
    }

    const All = () => <SceneList index={index} />;

    const Completed = () => <SceneList index={index} />;

    const Incomplete = () => <SceneList index={index} />;

    const renderScene = BottomNavigation.SceneMap({
        all: All,
        completed: Completed,
        incomplete: Incomplete
    });

    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="To Do" />
                <Appbar.Action icon="door-closed" onPress={() => navigation.navigate('Login')}/>
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
