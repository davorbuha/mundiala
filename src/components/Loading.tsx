import React from 'react';
import {connect} from 'react-redux';
import {AppState} from '../store';
import {View, Modal, ActivityIndicator} from 'react-native';

interface Props {
    loading: {[name: string]: boolean};
    children: JSX.Element;
}

function Loading(p: Props) {
    let shouldShowLoading = false;
    Object.keys(p.loading).forEach(key => {
        if (p.loading[key]) shouldShowLoading = true;
    });
    if (!shouldShowLoading) return p.children;
    return (
        <View style={{flex: 1}}>
            {p.children}
            <Modal visible transparent>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'grey',
                    }}>
                    <ActivityIndicator size="large"></ActivityIndicator>
                </View>
            </Modal>
        </View>
    );
}

const mapStateToProps = (state: AppState) => ({
    loading: state.loading,
});

export default connect(mapStateToProps)(Loading);
