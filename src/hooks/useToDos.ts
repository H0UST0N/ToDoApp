import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import ToDos, { IGetToDo } from '../services/ToDos';

export default function useToDos() {
    const [dataIsLoaded, setDataIsLoaded] = useState<boolean>(false);
    const [toDos, setToDos] = useState<IGetToDo[]>([]);

    const fetchData = async () => {
        setDataIsLoaded(false);
        const response = await ToDos.get();
        setToDos(response);
        setDataIsLoaded(true);
    }

    useEffect(() => {
        (async () => {
            try {
                await fetchData();
            } catch (e: any) {
                Alert.alert(e.message);
            }
        })()
    }, []);

    const onRefresh = useCallback(async () => {
        try {
            await fetchData();
        } catch (e: any) {
            Alert.alert(e.message);
        }
    }, []);

    return { dataIsLoaded, toDos, onRefresh }
}
