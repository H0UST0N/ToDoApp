import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Alert, RefreshControl, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Avatar, Chip, List, Searchbar } from 'react-native-paper';
import { ToDosContext } from '../contexts/ToDosContext';
import ToDos, { IGetToDo } from '../services/ToDos';

interface ISceneListProps {
    index: number;
}

const wait = (timeout: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const SceneList: React.FC<ISceneListProps> = ({ index }) => {
    const { toDos, onRefresh } = useContext(ToDosContext);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = (query: string) => setSearchQuery(query);

    const [refreshing, setRefreshing] = useState(false);

    const [list, setList] = useState<IGetToDo[]>([]);

    useEffect(() => {
        setList(toDos.filter(item => index === 1 ? item.completed : index === 2 ? !item.completed : item));
        setTimeout(() => {
            setDataLoaded(true);
        }, 2000);
    }, [])

    return (
        <>
            <Searchbar
                placeholder="Search ToDo by title"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={{ margin: 5 }}
            />
            <View style={{ flex: 1, flexDirection: 'row', maxHeight: 50, margin: 3 }}>
                <Chip
                    mode='outlined'
                    icon={() => (
                        <Avatar.Icon
                            size={30}
                            icon={"eraser"}
                            color={"blue"}
                            style={styles.iconChip}
                        />
                    )}
                    onPress={() => { setSearchQuery('') }}
                    style={styles.chip}
                    textStyle={styles.textChip}
                >
                    Clear
                </Chip>
                <Chip
                    mode='outlined'
                    icon={() => (
                        <Avatar.Icon
                            size={30}
                            icon={"check-bold"}
                            color={"green"}
                            style={styles.iconChip}
                        />
                    )}
                    onPress={
                        async () => {
                            setDataLoaded(false);
                            await Promise.all(
                                list.filter((toDo) => toDo.title.toLowerCase().includes(searchQuery.toLowerCase())).map(async (toDo) => {
                                    const response = await ToDos.edit({
                                        userId: toDo.userId,
                                        title: toDo.title,
                                        completed: true
                                    }, toDo.id);
                                    if (response.status == 200) {
                                        toDo.completed = true;
                                        setList([...toDos]);
                                    }
                                })
                            )
                            setDataLoaded(true);
                        }
                    }
                    style={styles.chip}
                    textStyle={styles.textChip}
                >
                    All
                </Chip>
                <Chip
                    mode='outlined'
                    icon={() => (
                        <Avatar.Icon
                            size={30}
                            icon={"close-thick"}
                            color={"red"}
                            style={styles.iconChip}
                        />
                    )}
                    onPress={
                        async () => {
                            setDataLoaded(false);
                            await Promise.all(
                                list.filter((toDo) => toDo.title.toLowerCase().includes(searchQuery.toLowerCase())).map(async (toDo) => {
                                    const response = await ToDos.edit({
                                        userId: toDo.userId,
                                        title: toDo.title,
                                        completed: false
                                    }, toDo.id);
                                    console.log(toDo.id);
                                    if (response.status == 200) {
                                        toDo.completed = false;
                                        setList([...toDos]);
                                    }
                                })
                            )
                            setDataLoaded(true);
                        }
                    }
                    style={styles.chip}
                    textStyle={styles.textChip}

                >
                    All
                </Chip>
            </View>
            {dataLoaded && !refreshing &&
                <SafeAreaView style={styles.container}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        {list.filter((toDo) => toDo.title.toLowerCase().includes(searchQuery.toLowerCase())).length > 0
                            ? list.filter((toDo) => toDo.title.toLowerCase().includes(searchQuery.toLowerCase())
                            ).map((toDo) => {
                                return <List.Item
                                    key={toDo.id}
                                    title={`Id: ${toDo.id}`}
                                    description={`Title: ${toDo.title}`}
                                    right={() =>
                                        <TouchableOpacity style={styles.iconList}
                                            onPress={async () => {
                                                const response = await ToDos.edit({
                                                    userId: toDo.userId,
                                                    title: toDo.title,
                                                    completed: !toDo.completed
                                                }, toDo.id);
                                                if (response.status == 200) {
                                                    toDo.completed = !toDo.completed;
                                                    setList([...toDos]);
                                                } else {
                                                    Alert.alert('Não foi possível realizar a atualização!')
                                                }
                                            }}
                                        >
                                            <List.Icon
                                                icon={toDo.completed ? "check-bold" : "close-thick"}
                                                color={toDo.completed ? "green" : "red"}
                                            />
                                        </TouchableOpacity>
                                    }
                                    style={styles.listItem}
                                />

                            })
                            : <List.Item
                                title={'Warning'}
                                description={'No records found'}
                                right={props => <List.Icon {...props} icon={"alert"} color={"orange"} />}
                                style={styles.listItem}
                            />
                        }
                    </ScrollView>
                </SafeAreaView>
            }
            {!dataLoaded && !refreshing
                && <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator animating={true} size={'large'} />
                </View>

            }
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
    },
    chip: {
        flex: 1, margin: 3, height: 40, backgroundColor: '#3498DB'
    },
    iconChip: {
        backgroundColor: '#FFFFFF'
    },
    textChip: {
        fontWeight: 'bold'
    },
    listItem: {
        backgroundColor: '#FFFFFF',
        margin: 5
    },
    iconList: {
        // flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        maxWidth: 50,
        height: 50,
        borderRadius: 50
    }
});

export default SceneList;