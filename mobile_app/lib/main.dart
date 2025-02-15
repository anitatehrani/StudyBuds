import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_driver/driver_extension.dart';
import 'package:study_buds/firebase_options.dart';
import 'package:study_buds/screens/login/login.dart';
import 'package:study_buds/screens/main.dart';
import 'package:study_buds/utils/auth_utils.dart';
import 'package:study_buds/utils/push_notification.dart';
import 'package:study_buds/utils/static_env.dart';

void main() async {
  if (DRIVER) enableFlutterDriverExtension(); // Keep DRIVER testing logic
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);

  // Initialize Push Notifications
  PushNotificationService.instance.retrievePushNotificationToken();

  // Check if the user is authenticated
  final isAuthenticated = await AuthUtils.isAuthenticated();

  WidgetsFlutterBinding.ensureInitialized();
  PushNotificationService.catchNotification();
  runApp(MyApp(isAuthenticated: isAuthenticated));
}

final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();


class MyApp extends StatelessWidget {
  final bool isAuthenticated;

  const MyApp({Key? key, required this.isAuthenticated}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'StudyBuds',
      navigatorKey: navigatorKey,
      theme: ThemeData(
        primaryColor: const Color(0xFF252B33),
        primaryColorDark: const Color(0XFF000814),
        colorScheme: ColorScheme.fromSwatch().copyWith(
          primary: const Color(0xFF252B33),
          primaryContainer: const Color(0XFF000814),
          secondary: const Color(0XFFFF6600),
          secondaryContainer: const Color(0XFFF06000),
        ),
        fontFamily: 'Quicksand',
        useMaterial3: false,
      ),
      // Dynamically set the initial route based on authentication state
      initialRoute: isAuthenticated ? '/home' : '/login',
      routes: {
        '/home': (context) => const MainScreen(selectedIndex: 0),
        '/login': (context) =>
            const Login(key: Key("login_page"), title: "Login"),
        '/notifications': (context) => const MainScreen(selectedIndex: 3,),
        '/profile': (context) => const MainScreen(selectedIndex: 4),
      },
    );
  }
}
