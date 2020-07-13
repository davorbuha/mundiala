import React from 'react';
import {connect} from 'react-redux';
import {AppState} from '../store';
import {ImageBackground} from 'react-native';

interface Props {
    visible: boolean;
}

function Background(p: Props) {
    if (p.visible)
        return (
            <ImageBackground
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
                source={require('../res/images/background.png')}
            />
        );
    return null;
}

const mapStateToProps = (state: AppState) => ({
    visible: state.background.background,
});

export default connect(mapStateToProps)(Background);
