// Externas
import React from 'react';
import { YellowBox } from 'react-native'

// Internas
import Routes from './src/routes';

//

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);
export default function App() {
  return <Routes/>
}

