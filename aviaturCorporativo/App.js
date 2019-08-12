/**
 * Summary. New Update Project of Aviatur Corporative
 * https://github.com/yarednicolas23/apps-agencies/
 * Description. Updateof xamarin to react native of prohect aviatur coporative
 * @author yarednicolas23
 */

import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View, WebView, StatusBar, Modal, ActivityIndicator, Image} from 'react-native'
import { SafeAreaView } from 'react-navigation'

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props)
    this.state = {
      visible:true
    }
  }
  render() {
    return (
      <SafeAreaView style={styles.safearea}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#3949ab"
        />
        <WebView
          source={{uri: 'https://sbvcwebmobile.azurewebsites.net/'}}
          domStorageEnabled={true}
          thirdPartyCookiesEnabled={true}
          onLoad={()=>this.setState({visible:false})}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.visible}>
          <View style={[styles.container,styles.horizontal]}>
            <Image source={require('./src/assets/aviatur-corp-blanco.png')} style={styles.image}/>
            <ActivityIndicator size="small" color="white" style={styles.loader}/>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safearea:{
    flex: 1,
    backgroundColor: '#3949ab'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  horizontal: {
    flexDirection:'column',
    justifyContent:'space-around',
    padding:10
  },
  image:{
    width:'100%',
    height:'40%',
    resizeMode:'contain'
  }
})
