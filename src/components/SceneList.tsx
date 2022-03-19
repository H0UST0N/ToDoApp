import * as React from 'react';
import { useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Chip, List, Searchbar } from 'react-native-paper';

interface IToDos {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

const SceneList: React.FC<{toDos: IToDos[], refreshing: boolean, onRefresh: () => void;}> = ({toDos, refreshing, onRefresh}) => {

    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = (query: string) => setSearchQuery(query);

    return (
        <>
            <Searchbar
                placeholder="Search ToDo by title"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            <Chip
                mode='outlined'
                icon="check-bold"
                onPress={() => console.log('Pressed')}
                style={{ padding: 5, margin: 5 }}
            >
                Tag all
            </Chip>
            <SafeAreaView style={styles.container}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    {toDos.filter((toDo) => toDo.title.toLowerCase().includes(searchQuery.toLowerCase())).map((toDo) => {
                        return <List.Item
                            key={toDo.id}
                            title={`Id: ${toDo.id}`}
                            description={`Title: ${toDo.title}`}
                            right={props => <List.Icon {...props} icon={toDo.completed ? "check-bold" : "close-thick"} color={toDo.completed ? "green" : "red"} />}
                        />
                    })
                    }
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  
export default SceneList;