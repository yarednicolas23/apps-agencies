 /**
 * Summary. JTR Grupo AVIATUR app, webview
 * https://github.com/yarednicolas23/apps-agencies/
 * Description. Update to react native
 * @author yarednicolas23 stivenlozano
 */
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Modal,
  Image,
  ActivityIndicator
} from 'react-native';
import {WebView} from 'react-native-webview'

export default class App extends Component {
  state={
    visible:true,
    scripts:"document.getElementsByClassName('smartbanner')[0].classList.add('hide')",
    url:"https://www.jtr.com.co",
    logo:"https://www.jtr.com.co/version/201/assets/jtr_assets/img/custom/icons-jtr.png",
    color:"#f77700"
  }
  constructor(props){
    super(props)
    fetch('https://firebasestorage.googleapis.com/v0/b/whitemark-54535.appspot.com/o/mobile.json?alt=media')
    .then((response) => response.json().then((r) =>{
      if (r.jtr!=null) {
        this.setState({url:r.jtr.url,scripts:r.jtr.scripts,color:r.jtr.color})
        if (r.jtr.logo!='') {
          this.setState({logo:r.jtr.logo})
        }
      }
    }))
    .then()
    .catch((error) => {})
  }
  injectedScripts(){
    return(this.state.scripts)
  }
  render(){
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor={this.state.color} />
        <SafeAreaView style={{flex: 1, backgroundColor: this.state.color}}>
         <WebView source={{uri: this.state.url}} onLoad={()=>this.setState({visible:false})} onLoadStart={()=>this.setState({visible:true})} injectedJavaScript={this.injectedScripts()}/>
         <Modal
           animationType="fade"
           transparent={true}
           visible={this.state.visible}>
           <View style={[styles.container,styles.horizontal]}>
             <Image source={{uri:this.state.logo}} style={styles.image}/>
             <ActivityIndicator size="small" color="white" style={styles.loader}/>
           </View>
         </Modal>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(0,0,0,1)"
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
});
