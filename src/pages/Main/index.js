/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

import api from '../../services/api';

import {
    Container,
    Form,
    Input,
    SubmitButton,
    List,
    User,
    Avatar,
    Name,
    Bio,
    ProfileButtom,
    ProfileButtomText,
} from './styles';

export default class Main extends Component {
    state = {
        newUser: '',
        users: [],
        loading: false,
    };

    async componentDidMount() {
        const users = await AsyncStorage.getItem('users');
        if (users) {
            this.setState({ users: JSON.parse(users) });
        }
    }

    async componentDidUpdate(_, prevState) {
        const { users } = this.state;

        if (prevState.users !== users) {
            AsyncStorage.setItem('users', JSON.stringify(users));
        }
    }

    handleAddUser = async () => {
        this.setState({ loading: true });

        const { users, newUser } = this.state;
        const response = await api.get(`/users/${newUser}`);

        const data = {
            name: response.data.name,
            login: response.data.login,
            bio: response.data.bio,
            avatar: response.data.avatar_url,
        };

        this.setState({
            users: [...users, data],
            newUser: '',
            loading: false,
        });

        Keyboard.dismiss();
    };

    handleNavigate = (user) => {
        const { navigation } = this.props;
        navigation.navigate('User', { user });
    };

    render() {
        const { users, newUser, loading } = this.state;

        return (
            <Container>
                <Form>
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Adicionar Usuário"
                        value={newUser}
                        onChangeText={(text) =>
                            this.setState({ newUser: text })
                        }
                        returnKeyType="send"
                        onSubmitEditing={this.handleAddUser}
                    />
                    <SubmitButton
                        loading={loading}
                        onPress={this.handleAddUser}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <Icon name="add" size={20} color="#FFF" />
                        )}
                    </SubmitButton>
                </Form>
                <List
                    data={users}
                    keyExtractor={(user) => user.login}
                    renderItem={({ item }) => (
                        <User>
                            <Avatar source={{ uri: item.avatar }} />
                            <Name>{item.name}</Name>
                            <Bio>{item.bio}</Bio>
                            <ProfileButtom
                                onPress={() => this.handleNavigate(item)}
                            >
                                <ProfileButtomText>
                                    Ver Perfil
                                </ProfileButtomText>
                            </ProfileButtom>
                        </User>
                    )}
                />
            </Container>
        );
    }
}

Main.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }).isRequired,
};
