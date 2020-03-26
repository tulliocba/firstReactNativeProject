/* eslint-disable react/state-in-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';
// import { Container } from './styles';

export default class User extends Component {
    state = {
        stars: [],
    };

    async componentDidMount() {
        const { route } = this.props;
        const response = await api.get(
            `/users/${route.params.user.login}/starred`
        );

        this.setState({ stars: response.data });
    }

    render() {
        return <View />;
    }
}

User.propTypes = {
    route: PropTypes.shape().isRequired,
};
