import React from 'react';
import {connect} from 'react-redux';
import {AppState} from '../store';
import {View, ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';

interface Props {
    loading: {[name: string]: boolean};
    children: JSX.Element;
}

function Loading(p: Props) {
    return (
        <View style={{flex: 1}}>
            {p.children}
            <Modal isVisible={p.loading.email ? true : false}>
                <ActivityIndicator size="large" />
            </Modal>
        </View>
    );
}

const mapStateToProps = (state: AppState) => ({
    loading: state.loading,
});

export default connect(mapStateToProps)(Loading);
