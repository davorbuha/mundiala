import React from 'react';
import {connect} from 'react-redux';
import {AppState} from '../store';
import {ImageBackground} from 'react-native';

interface Props {
    visible: boolean;
    children: JSX.Element;
}

function Background(p: Props) {
    if (!p.visible) return p.children;
    return (
        <ImageBackground
            style={{
                flex: 1,
            }}
            source={require('../res/images/background.png')}>
            {p.children}
        </ImageBackground>
    );
}

const mapStateToProps = (state: AppState) => ({
    visible: state.background.background,
});

export default connect(mapStateToProps)(Background);
