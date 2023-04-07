import React from 'react';
import {TailwindProvider} from 'tailwind-rn';
import Navigation from './src/screens';
import utilities from './tailwind.json';
import {RecoilRoot} from 'recoil';
import {Provider as PaperProvider} from 'react-native-paper';

function App() {
  return (
    <PaperProvider>
      <RecoilRoot>
        <TailwindProvider utilities={utilities}>
          <Navigation />
        </TailwindProvider>
      </RecoilRoot>
    </PaperProvider>
  );
}

export default App;
