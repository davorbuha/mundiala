import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';

type Props = {
    onPress: () => any;
};

const DefaultModalContent: React.FC<Props> = () => (
    <View style={styles.content}>
        <Text style={styles.contentTitle}>Email uspješno poslan</Text>
    </View>
);

function EmailSentModal(props: any) {
    return (
        <Modal onBackdropPress={props.close} isVisible={props.visible}>
            <DefaultModalContent onPress={props.close} />
        </Modal>
    );
}
const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
        fontSize: 20,
        marginVertical: 12,
    },
});

export default EmailSentModal;
