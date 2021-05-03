import React, {useCallback, useMemo} from 'react';
import Animated, {interpolateColors} from 'react-native-reanimated';
import Text from '../../components/text';
import TouchableOpacity from '../../components/touchableOpacity';
import {TextStyle, StyleSheet} from 'react-native';
import {Colors, Spacings} from '../../../src/style';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedText = Animated.createAnimatedComponent(Text);

export interface ItemProps {
  label: string;
  value: string | number;
}

interface InternalProps extends ItemProps {
  index: number;
  offset: any;
  itemHeight: number;
  activeColor?: string;
  inactiveColor?: string;
  style?: TextStyle;
  onSelect: (index: number) => void;
  testID?: string;
  centerH?: boolean;
}

export default ({
  index,
  label,
  itemHeight,
  onSelect,
  offset,
  activeColor = Colors.primary,
  inactiveColor = Colors.grey20,
  style,
  testID,
  centerH = true
}: InternalProps) => {
  const selectItem = useCallback(() => onSelect(index), [index]);
  const itemOffset = index * itemHeight;

  const color = useMemo(() => {
    return interpolateColors(offset, {
      inputRange: [itemOffset - itemHeight, itemOffset, itemOffset + itemHeight],
      outputColorRange: [inactiveColor, activeColor, inactiveColor]
    });
  }, [itemHeight]);

  const containerStyle = useMemo(() => {
    return [{height: itemHeight}, styles.container];
  }, [itemHeight]);

  return (
    <AnimatedTouchableOpacity
      activeOpacity={1}
      style={containerStyle}
      key={index}
      centerV
      centerH={centerH}
      right={!centerH}
      onPress={selectItem}
      // @ts-ignore reanimated2
      index={index}
      testID={testID}
    >
      {/* @ts-ignore reanimated2*/}
      <AnimatedText text60R style={{color, ...style}}>
        {label}
      </AnimatedText>
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: Spacings.s10
  }
});
