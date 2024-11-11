
import 'dart:async';
import 'dart:developer';

import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:studybuds/common/shared_refrence_helper.dart';

class PushNotificationService {
  // final _firebaseMessaging = FirebaseMessaging.instance;
  static PushNotificationService instance = PushNotificationService();
  bool _hasToSendTokenToServer = true;
  StreamSubscription? foregroundNotifSubscription;

  // Future<void> initNotifications() async {
  //   await _firebaseMessaging.requestPermission();

  //   final fCMToken = await _firebaseMessaging.getToken();

  //   print('Token: $fCMToken');
  // }

  void registerToForegroundNotificationStream(){
    if(foregroundNotifSubscription != null){
      foregroundNotifSubscription!.cancel();
    }
    foregroundNotifSubscription = FirebaseMessaging.onMessage.listen(_OnMessageArrived);
  }

  void unregisterToForegroundNotificationStream(){
    if(foregroundNotifSubscription != null){
      foregroundNotifSubscription!.cancel();
    }
    foregroundNotifSubscription = null;
  }

  void _OnMessageArrived(RemoteMessage message){
    if (message.notification != null) {
      Fluttertoast.showToast(msg: message.notification!.body!, backgroundColor: const Color.fromRGBO(15,107,255, 1),
                              textColor: Colors.white, gravity: ToastGravity.TOP, toastLength: Toast.LENGTH_LONG);
    }
  }


  Future<void> retrievePushNotificationToken() async {
    await FirebaseMessaging.instance.requestPermission();

    // For apple platforms, ensure the APNS token is available before making any FCM plugin API calls
    // final apnsToken = await FirebaseMessaging.instance.getAPNSToken();
    // if (apnsToken == null)
    //   return;

    var token = await FirebaseMessaging.instance.getToken();
    if(token != null){
      log(token.toString());
      var oldToken = await SharedPreferencesHelper.getPushNotificationToken();
      if(oldToken != token){
        _hasToSendTokenToServer = true;
        SharedPreferencesHelper.setPushNotificationToken(token);
      }
    }
  }

  void refreshToken(){
    sendNotificationTokenToServer();
  }

  void sendNotificationTokenToServer() async {
    _hasToSendTokenToServer = false;
    var token = await SharedPreferencesHelper.getPushNotificationToken();
    if(token == null)
      return;

    // TODO: send update notification token request
    // var response = await UpdateNotificationTokenRequest(token: token).send();
    var response;
    if(response.statusCode == 200)
      print("TOKEN SAVED");
  }

  Future<bool> deleteNotificationTokenFromServer() async{
    var token = await SharedPreferencesHelper.getPushNotificationToken();
    if(token == null)
      return true;

    // TODO:  send delete notification token request
    // var response = await DeleteNotificationTokenRequest(token: token).send();
    var response;
    if(response.statusCode == 200)
      print("TOKEN DELETED");
    return response.statusCode == 200;
  }

}