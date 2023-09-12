import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context'

//SafeAreaView p dar espaço em cima do bar status 
export const Container = styled(SafeAreaView)`

  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  padding: 24px;
`;