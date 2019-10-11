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

import firebase from 'react-native-firebase'
import type { RemoteMessage,Notification,NotificationOpen } from 'react-native-firebase'

export default class App extends Component<Props> {
  constructor(props){
    super(props)
    this.state = {
      url:'https://mobile.aviatur.com',
      urlnotification:'https://mobile.aviatur.com',
      scripts:"",
      visible:true
    }
    fetch('https://firebasestorage.googleapis.com/v0/b/whitemark-54535.appspot.com/o/mobile.json?alt=media')
    .then((response) => response.json().then((r) =>{
      console.log(r)
      this.setState({scripts:r.css.url+'?'})
      if (r.aviatur!=null) {
        this.setState({url:r.aviatur.url})
      }
    }))
    .then()
    .catch((error) => {
      console.error(error);
    })

    firebase.messaging().getToken()
    .then(fcmToken => {
       //console.log(fcmToken);
      if (fcmToken) {
        // user has a device token
      } else {
        // user doesn't have a device token yet
      }
    })
    .catch(error => {
      // User has rejected permissions
    })
  }
  componentDidMount = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        // user has permissions
    } else {
        // user doesn't have permission
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
        } catch (error) {
            // User has rejected permissions
            //alert('No permission for notification');
        }
    }

    const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        // App was opened by a notification
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification: Notification = notificationOpen.notification;
        if (notification.body!==undefined) {
            console.log(notification)
            alert(notification);
        } else {
            console.log(notification)
        }
        firebase.notifications().removeDeliveredNotification(notification.notificationId);
    }

    const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
        .setDescription('My apps test channel');

    // Create the channel
    firebase.notifications().android.createChannel(channel);
    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    });
    this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
        // Process your notification as required
        firebase.notifications()
            .displayNotification(notification);
    });
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification: Notification = notificationOpen.notification;
        if (notification.body!==undefined) {
          console.log(notification)
          //alert(notification.body)
          this.setState({url:this.state.urlnotification + notification.data['google.c.a.c_l']})
          console.log(this.state);
        } else {
          console.log(notification);
        }
        firebase.notifications().removeDeliveredNotification(notification.notificationId);
    });
}
  componentWillUnmount() {
      this.notificationDisplayedListener();
      this.notificationListener();
      this.notificationOpenedListener();
  }
  injectedScripts(){
    return("var style= document.createElement('link');"+
    "style.href ='"+this.state.scripts+"';"+
    "style.type='text/css';"+
    "style.rel='stylesheet';"+
    "document.getElementsByTagName('head')[0].append(style);")
  }
  render(){
    return (
      <SafeAreaView style={styles.safeareaview}>
        <StatusBar barStyle="light-content" translucent={true}/>
        <WebView
          source={{uri: this.state.url}}
          onLoad={()=>this.setState({visible:false})}
          onLoadStart={()=>this.setState({visible:true})}

          injectedJavaScript={this.injectedScripts()}
          />
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
