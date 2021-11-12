/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import branch, { BranchEvent } from 'react-native-branch'

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    let branchUnsubscribe = null;
    const initializeBranch = async () => {
      branchUnsubscribe = branch.subscribe(({error, params, uri}) => {
        if (error) {
          console.error('Error from Branch: ' + error);
          return;
        }
        if (params.key && params.clientId) {
          alert(
            `in params the key is, ${params.key} and clientId is, ${params.clientId}`,
          );
          console.log(
            'the key is, ',
            params.key,
            'clientId is, ',
            params.clientId,
          );
        }
        // params will never be null if error is null
      });

      let lastParams = await branch.getLatestReferringParams(); // params from last open
      if (lastParams.key && lastParams.clientId) {
        alert(
          `in getLatestReferringParams the key is, ${lastParams.key} and clientId is, ${lastParams.clientId}`,
        );
        console.log(
          'the key is, ',
          lastParams.key,
          'clientId is, ',
          lastParams.clientId,
        );
      }
      console.log('getLatestReferringParams, ', lastParams);
    };
    initializeBranch();
    return () => {
      if (branchUnsubscribe) {
        branchUnsubscribe();
      }
    };
  }, []);
  
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
