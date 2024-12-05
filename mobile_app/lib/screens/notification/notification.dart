import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:study_buds/blocs/notification_list/bloc/notification_list_bloc.dart';
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
        createdAt: DateTime.now()),
    NotificationModel(
        id: 4,
        studentId: 10,
        joinRequestId: 1,
        notificationType: 'Join Request',
        message: 'Nona wants to join to the Capstone Project',
        createdAt: DateTime.parse("2024-11-29")),
    NotificationModel(
        id: 3,
        studentId: 10,
        joinRequestId: 1,
        notificationType: 'Rejected',
        message: 'Your request to join the Capstone Project was declined',
        createdAt: DateTime.now()),
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
        body: BlocProvider(
            create: (_) =>
                NotificationListBloc()..add(FetchNotificationListEvent(10)),
            child: Scaffold(
                body: BlocConsumer<NotificationListBloc, NotificationListState>(
                    listener: (context, state) {
              if (state is NotificationListSuccess)
                notifs = state.results;
              else if (state is NotificationListFailure) {
                notifs = [];
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                      content: Text(state.error), backgroundColor: Colors.red),
                );
              }
            }, builder: (context, state) {
              if (state.isLoading) {
                return const Center(child: CircularProgressIndicator());
              }
              return Center(
                child: ListView.builder(
                  itemCount: notifs.length,
                  itemBuilder: (context, index) {
                    final notification = notifs[index];
                    return Padding(
                      padding: const EdgeInsets.symmetric(
                          vertical: 2.0, horizontal: 16.0),
                      // Add vertical and horizontal padding
                      child: NotificationCard(
                        backgroundColor: Colors.white,
                        notification: notification,
                      ),
                    );
                  },
                ),
              );
            }))));
  }
}
