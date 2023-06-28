import * as React from 'react';
import { Searchbar, useTheme } from 'react-native-paper';

const MyComponent = ({ onChangeSearch } ) => {
  const theme = useTheme()

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
       value={onChangeSearch}
      //  style={{backgroundColor: theme.colors.tertiary}}
    />
  );
};

export default MyComponent;