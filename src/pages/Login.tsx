import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    Image,
    Alert,
    BackHandler,
    ScrollView,
} from 'react-native';

import { useNavigation } from '@react-navigation/core';
import SplashScreen from 'react-native-splash-screen';
import { Button } from '../components/Button';
import logo from '../assets/img/logo.jpg';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes/stack.routes';
import { TextInput } from 'react-native-paper';

type loginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;

export function Login() {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [carregando, setCarregando] = useState<boolean>(false);
    const navigation = useNavigation<loginScreenProp>();

    useEffect(() => {
        SplashScreen.hide();
        BackHandler.addEventListener('hardwareBackPress', () => true);
        setUsername(undefined);
        setPassword(undefined);
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', () => true);
    }, []);

    function handleInputChangeUsername(value: string) {
        setUsername(value);
    }

    function handleInputChangePassword(value: string) {
        setPassword(value);
    }

    async function signIn(formData: FormData) {
        return new Promise((resolve, reject) => {
            try {
                //TODO: Criar Autenticação
                setUsername(undefined);
                setPassword(undefined);
                resolve(0);
            } catch (error) {
                console.log(error);
            }
        });
    }

    async function handleSubmit() {
        setCarregando(true);
        let formData = new FormData();

        formData.append('username', username);
        formData.append('password', password);

        // if (!username || !password) {
        //     setCarregando(false);
        //     return Alert.alert('Digite as informações para Login');
        // }

        try {
            await signIn(formData);
            setCarregando(false);
            navigation.navigate('Home');
        } catch {
            Alert.alert('Não foi possível efetuar o Login!');
            setCarregando(false);
        }
    }

    return (
        <View>
            <ScrollView>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={
                        Platform.OS === 'ios'
                            ? Dimensions.get('screen').height * 0.25
                            : Dimensions.get('screen').height * 0.5
                    }
                    style={styles.container}>
                    <Image source={logo} style={styles.logo} resizeMode="contain" />

                    <TextInput
                        mode='outlined'
                        label={'Usuário'}
                        placeholder="Digite o Usuário"
                        onChangeText={handleInputChangeUsername}
                        placeholderTextColor={'#C6C6C6'}
                        clearButtonMode="always"
                        value={username}
                        autoCapitalize='none'
                        autoComplete='off'
                        autoCorrect={false}
                        style={[
                            styles.input
                        ]}
                    />

                    <TextInput
                        mode='outlined'
                        label={'Senha'}
                        placeholder="Digite a senha"
                        onChangeText={handleInputChangePassword}
                        placeholderTextColor={'#C6C6C6'}
                        secureTextEntry
                        clearButtonMode="always"
                        value={password}
                        autoCapitalize='none'
                        autoComplete='off'
                        autoCorrect={false}
                        style={[
                            styles.input
                        ]}
                    />

                    <View style={styles.footer}>
                        <Button
                            title="FAZER LOGIN"
                            loading={carregando}
                            backgroundColor={'#3498DB'}
                            onPress={handleSubmit}
                        />
                    </View>

                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 28,
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height,
    },
    logo: {
        height: Dimensions.get('window').width * 0.6,
        marginTop: 0,
    },
    input: {
        width: '100%',
        fontSize: 18,
        marginTop: 10,
    },
    footer: {
        paddingTop: 30,
        width: '100%',
    },
});
