import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import BackgroundImage from './assets/app_bg.jpg';
import SearchInput from './components/SearchInput';
import { Ionicons } from '@expo/vector-icons';
import { fetchReport } from './utils/Api';
import { AuthSession } from 'expo';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      Country: 'India',
      Confirmed: 0,
      Recovered: 0,
      Deaths: 0,
    };
  }
  componentDidMount() {
    this.handleUpdateLocation('India');
  }

  handleUpdateLocation = async country => {
    if (!country) return;

    this.setState({ loading: true }, async () => {
      try {
        const { Confirmed, Recovered, Deaths, Country } = await fetchReport(
          country,
        );

        this.setState({
          loading: false,
          error: false,
          Country,
          Confirmed,
          Recovered,
          Deaths,
        });
      } catch (e) {
        this.setState({
          loading: false,
          error: true,
        });
      }
    });
  };
  render() {
    const { loading, error, Country, Confirmed, Recovered, Deaths } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ImageBackground source={BackgroundImage}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" size="large" />
            <SearchInput
              placeholder="Search Your Country"
              onSubmit={this.handleUpdateLocation}
            />
            {error && (
              <Text style={[styles.textStyle]}>
                Could not load Data, please try a different country.
              </Text>
            )}
            {!error && (
              <View style={styles.resultContainer}>
                <View style={styles.resultInfo}>
                  <Ionicons style={styles.icons} name="md-flag" size={24} color='orange' />
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {Country}
                  </Text>
                </View>
                <View style={styles.resultInfo}>
                  <Ionicons style={[styles.icons]}  name="md-bed" size={24} color='orange' />
                  <Text style={[styles.textStyle]}>
                    Confirmed:
                    {Confirmed}
                  </Text>
                </View>
                <View style={styles.resultInfo}>
                  <Ionicons style={[styles.icons]} name="md-medkit" size={24} color='#007872' />
                  <Text style={[ styles.textStyle]}>
                    Recovered:
                {Recovered}
                  </Text>
                </View>
                <View style={styles.resultInfo}>
                  <Ionicons style={[styles.icons]}  name="md-pulse" size={24} color='red' />
                  <Text style={[styles.textStyle]}>
                    Deaths:
                {Deaths}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  resultContainer: {
    justifyContent: 'center',
    marginTop: 40,
  },
  resultInfo: {
    borderColor: '#fff',
    borderWidth: 1,
    margin: 1,
    alignItems:'center' 
  },
  textStyle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',

  },
  
});
