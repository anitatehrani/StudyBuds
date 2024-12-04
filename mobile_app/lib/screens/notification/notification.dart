import 'package:flutter/material.dart';
import 'package:study_buds/models/notification_model.dart';
import 'package:study_buds/widgets/notification_card.dart';

class NotificationScreen extends StatefulWidget {
  const NotificationScreen({Key? key}) : super(key: key);

  @override
  _NotificationScreenState createState() => _NotificationScreenState();
}

class _NotificationScreenState extends State<NotificationScreen> {
    List<NotificationModel> notifs = [
      NotificationModel(
        id: 1,
        studentId: 10,
        joinRequestId: 1,
        notificationType: 'Accepted',
        message: 'Your request to join the Capstone Project was approved',
        createdAt: DateTime.now()
      ),
      NotificationModel(
        id: 4,
        studentId: 10,
        joinRequestId: 1,
        notificationType: 'Join Request',
        message: 'Nona wants to join to the Capstone Project',
        createdAt: DateTime.parse("2024-11-29")
      ),
      NotificationModel(
        id: 3,
        studentId: 10,
        joinRequestId: 1,
        notificationType: 'Rejected',
        message: 'Your request to join the Capstone Project was declined',
        createdAt: DateTime.now()
      ),
    ];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text(
            'Notifications',
            style: TextStyle(fontWeight: FontWeight.w600),
          ),
          centerTitle: true,
          backgroundColor: Theme.of(context).scaffoldBackgroundColor,
          elevation: 0,
          foregroundColor: Theme.of(context).primaryColor,
        ),
      body: Center(
        child: ListView.builder(
          itemCount: notifs.length,
          itemBuilder: (context, index) {
            final notification = notifs[index];
            return Padding(
              padding:
                  const EdgeInsets.symmetric(vertical: 2.0, horizontal: 16.0),
              // Add vertical and horizontal padding
              child: NotificationCard(
                backgroundColor: Colors.white,
                notification: notification,
              ),
            );
        },
      ),
      ),
    );
  }
}

