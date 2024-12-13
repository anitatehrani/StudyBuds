import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'package:flutter/material.dart';
import 'package:study_buds/screens/basic_search/basic_search.dart';
import 'package:study_buds/screens/group_creation/group_creation.dart';
import 'package:study_buds/screens/group_list/group_list.dart';
import 'package:study_buds/screens/notification/notification.dart';
import 'package:study_buds/screens/profile/profile.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({Key? key}) : super(key: key);

  @override
  _MainScreenState createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _selectedIndex = 0;

  static const List<Widget> _widgetOptions = <Widget>[
    GroupList(key: Key("home_page")),
    BasicSearchPage(title: 'Basic Search',key: Key("search_page")),
    GroupCreationScreen(key: Key("add_page")),
    NotificationScreen(key: Key("notifications_page")),
    ProfileScreen(key: Key("profile_page"))
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: _widgetOptions.elementAt(_selectedIndex),
      ),
      bottomNavigationBar: CurvedNavigationBar(
        backgroundColor: Colors.white,
        items: const <Widget>[
          Icon(
            Icons.home_rounded,
            size: 30,
            color: Colors.white,
            key: Key('icon_home'),
          ),
          Icon(
            Icons.search_rounded,
            size: 30,
            color: Colors.white,
            key: Key('icon_search'),
          ),
          Icon(
            Icons.group_add_rounded,
            size: 30,
            color: Colors.white,
            key: Key('icon_add'),
          ),
          Icon(
            Icons.notifications_rounded,
            size: 30,
            color: Colors.white,
            key: Key('icon_notifications'),
          ),
          Icon(
            Icons.person_rounded,
            size: 30,
            color: Colors.white,
            key: Key('icon_profile'),
          ),
        ],
        onTap: _onItemTapped,
        index: _selectedIndex,
        color: Theme.of(context).colorScheme.primary,
        buttonBackgroundColor: Theme.of(context).colorScheme.primary,
        animationDuration: const Duration(milliseconds: 300),
      ),
    );
  }
}
