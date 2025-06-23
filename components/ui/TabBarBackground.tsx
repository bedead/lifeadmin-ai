import { View } from 'react-native';
import { useThemeColor } from '../../hooks/useThemeColor';

const TabBarBackground = () => {
  const backgroundColor = useThemeColor({}, 'background');
  return <View style={{}} />;
};

export default TabBarBackground;

export function useBottomTabOverflow() {
  return 0;
}
