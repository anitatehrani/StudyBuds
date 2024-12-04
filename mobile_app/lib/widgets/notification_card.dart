import 'package:flutter/material.dart';
import 'package:study_buds/widgets/custom_filled_button.dart';
import 'package:study_buds/widgets/custom_text_button.dart';
import 'package:study_buds/models/notification_model.dart';


class NotificationCard extends StatelessWidget {
  
  final Color? backgroundColor;
  final String? buttonLabel;
  final NotificationModel notification;

  const NotificationCard({
    super.key,
    this.backgroundColor,
    this.buttonLabel,
    required this.notification
  });

  String dateToString(){
    DateTime nowDate = DateTime.now();
    Duration difference = nowDate.difference(notification.createdAt);
    int days = difference.inDays;
    if (days == 1)
      return 'Yesterday';
    else if (days <= 7)
    return 'Last 7 days';
    else if (days > 30){
      var m = days / 30;
      return 'Last ${m} months';
    }
    return 'New';
  }
  @override
  Widget build(BuildContext context) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      elevation: 2,
      margin: EdgeInsets.symmetric(vertical: 8),
      color: backgroundColor,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    IconTheme(
                      data: IconThemeData(
                        color: Theme.of(context).colorScheme.primary,
                      ),
                      child: Icon(
                        notification.notificationType == 'Join Request' ? Icons.group : (notification.notificationType == 'Accepted' ? Icons.check_circle : Icons.cancel),
                        size: 18,
                      ),
                    ),
                    Text(
                      dateToString(),
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(width: 4),
                  ],
                ),
              ],
            ),
            SizedBox(height: 8),
            Text(
              notification.message,
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Theme.of(context).colorScheme.primary,
              ),
            ),
            SizedBox(height: 8),
          
          ],
        ),
      ),
    );
  }
}