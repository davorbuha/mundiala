import React from 'react';
import {Modal, Image, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';

interface Props {
    barcode: undefined | string;
    hide: () => void;
}

function BarcodeModal(props: Props) {
    return (
        <Modal visible={props.barcode ? true : false}>
            <SafeAreaView>
                <TouchableOpacity onPress={props.hide}>
                    <MaterialIcons
                        name="close"
                        size={30}
                        style={{position: 'absolute', top: 20, right: 20}}
                    />
                </TouchableOpacity>
                {props.barcode ? (
                    <Image
                        width={200}
                        height={200}
                        source={{uri: props.barcode}}
                    />
                ) : null}
            </SafeAreaView>
        </Modal>
    );
}

export default BarcodeModal;
