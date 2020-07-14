import React, {useState, useLayoutEffect, SFC} from 'react';
import {Image} from 'react-native';

interface INetworkImage {
    targetHeight: number;
    uri: string;
    maxWidth: number;
}

const NetworkImage: SFC<INetworkImage> = ({uri, targetHeight, maxWidth}) => {
    useLayoutEffect(() => setNaturalDimensions(uri), []);

    const [imageWidth, setWidth] = useState(0);
    const [imageHeight, setHeight] = useState(0);
    const [scaleFactor, setScale] = useState(1);

    function setNaturalDimensions(uri: string) {
        Image.getSize(
            uri,
            (width: number, height: number) => {
                if (width > maxWidth) {
                    // too wide case
                    setScale(maxWidth / width);
                } else {
                    // scale to height case
                    setScale(targetHeight / height);
                }
                setWidth(width);
                setHeight(height);
            },
            (error: any) => {
                console.log('error', error);
            },
        );
    }
    function adjustView(e) {
        if (e.nativeEvent.layout.width > maxWidth) {
            setScale(scaleFactor * (maxWidth / e.nativeEvent.layout.width));
        }
    }
    return imageHeight ? (
        <Image
            onLayout={e => adjustView(e)}
            source={{uri: uri}}
            style={{
                width: imageWidth * scaleFactor,
                height: imageHeight * scaleFactor,
                resizeMode: 'contain',
            }}
        />
    ) : null;
};
export default NetworkImage;
