/**
* Summary. New Update Project of AVIATUR.com
* https://github.com/yarednicolas23/apps-agencies/
* Description. Update to react native of prohect mobile.aviatur.com
* @author yarednicolas23
*/

import React, {Component} from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Modal,
  Image,
  ActivityIndicator,
  ImageBackground
} from 'react-native'
import {
  WebView
} from 'react-native-webview'

export default class App extends Component<Props> {
  constructor(props){
    super(props)
    this.state = {
      visible:true
    }
  }
  render(){
    return (
      <SafeAreaView style={styles.safeareaview}>
        <StatusBar barStyle="light-content" translucent={true}/>
        <WebView
          source={{uri: 'https://mobile.aviatur.com'}}
          onLoad={()=>this.setState({visible:false})}
          onLoadStart={()=>this.setState({visible:true})}/>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.visible}>
            <View style={[styles.container,styles.horizontal]}>
                <Image source={require('./src/assets/aviatur-icon.png')} style={styles.image}/>
                <ActivityIndicator size="small" color="white" style={styles.loader}/>
            </View>
          </Modal>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  safeareaview:{
    flex: 1,
    backgroundColor: '#009bf8',
    color:'white'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(0,0,0,0.8)"
  },
  horizontal: {
    flexDirection:'column',
    justifyContent:'space-around',
    padding:0
  },
  image:{
    width:'70%',
    height:'40%',
    resizeMode:'contain'
  }
})
