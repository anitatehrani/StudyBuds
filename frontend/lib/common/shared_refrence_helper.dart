import 'package:shared_preferences/shared_preferences.dart';

class SharedPreferencesHelper {
  static const String _pushNotifTokenKey = "push_notification_token";
  static const String _useBiometricKey = "use_biometric";

  static Future<void> clear() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.remove(_useBiometricKey);
  }

  static Future<void> setPushNotificationToken(String token) async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString(_pushNotifTokenKey, token);
  }

  static Future<String?> getPushNotificationToken() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString(_pushNotifTokenKey);
  }
}