import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../assets/colors';
import Button from './SingleColorButton';
const windowHeight = Dimensions.get('window').height;

const Card = ({title, description, image, action}) => {
  const tw = useTailwind();
  return (
    <View style={(tw('relative'), styles.card)}>
      <Image
        source={image}
        style={{height: '100%', width: '100%', borderRadius: 6}}
      />
      <View style={styles.details}>
        <View style={tw('flex items-start justify-between')}>
          {title && (
            <Text style={[tw('font-bold'), styles.title]}>{title}</Text>
          )}
          <Text style={[tw('font-medium mt-2'), styles.description]}>
            {description}
          </Text>
          <TouchableOpacity
            style={[tw('mt-3'), styles.button]}
            onPress={action}>
            <Button />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    marginTop: 6,
    marginBottom: 6,
    borderRadius: 6,
    height: windowHeight * 0.35,
  },
  title: {
    fontSize: 24,
    lineHeight: 31,
    color: Colors.white,
  },
  description: {
    width: 249,
    fontSize: 14,
    lineHeight: 21,
    color: Colors.white,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 6,
  },
  details: {position: 'absolute', top: 20, left: 15},
});
