import React from 'react';
import {Modal, Image, TouchableOpacity, Dimensions} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import RNFetchBlob from 'rn-fetch-blob';
import NetworkImage from './NetworkImage';
interface Props {
    barcode: undefined | string;
    hide: () => void;
}

function BarcodeModal(props: Props) {
    const [data, setData] = React.useState('');
    React.useEffect(() => {
        if (props.barcode)
            RNFetchBlob.fetch('GET', props.barcode).then(res => {
                setData(res.data);
            });
    }, [props.barcode]);
    return (
        <Modal visible={props.barcode ? true : false}>
            <SafeAreaView
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <TouchableOpacity
                    style={{position: 'absolute', top: 60, right: 20}}
                    onPress={props.hide}>
                    <MaterialIcons name="close" size={30} />
                </TouchableOpacity>
                {props.barcode ? (
                    <Image
                        source={{uri: `data:image/jpeg;base64,${data}`}}
                        style={{
                            width: Dimensions.get('window').width * 0.85,
                            height:
                                (Dimensions.get('window').width * 0.85) / 1.92,
                        }}
                    />
                ) : null}
            </SafeAreaView>
        </Modal>
    );
}

export default BarcodeModal;
