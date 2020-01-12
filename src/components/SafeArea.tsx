import React from 'react';
import {SafeAreaView, SafeAreaViewProps} from 'react-navigation';

interface Props extends SafeAreaViewProps {
    children: JSX.Element;
}

function CustomSafeArea(p: Props) {
    return <SafeAreaView {...p}>{p.children}</SafeAreaView>;
}

export default CustomSafeArea;
