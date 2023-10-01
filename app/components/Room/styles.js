import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    containerRoom:{
        margin:10
    },
    image: {
        width: 200, // Điều chỉnh kích thước chiều rộng theo nhu cầu của bạn
        aspectRatio: 3 / 2,
        resizeMode: 'cover',
        borderRadius: 10,
      },
});

export default styles;