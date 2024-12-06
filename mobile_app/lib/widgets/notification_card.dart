import 'package:flutter/material.dart';
import 'package:study_buds/models/notification_model.dart';
import 'package:study_buds/utils/date_utils.dart';
import 'package:study_buds/widgets/custom_icon_button.dart';

class NotificationCard extends StatelessWidget {
  final Color? backgroundColor;
  final String? buttonLabel;
  final NotificationModel notification;

  const NotificationCard(
      {super.key,
      this.backgroundColor,
      this.buttonLabel,
      required this.notification});

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
                        notification.notificationType == 'join_request'
                            ? Icons.group
                            : (notification.notificationType == 'accepted'
                                ? Icons.check_circle
                                : Icons.cancel),
                        size: 18,
                      ),
                    ),
                    SizedBox(width: 4),
                    Text(
                      DateTimeUtils.dateDiffToString(notification.createdAt),
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
            SizedBox(width: 8),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        notification.message,
                        style: TextStyle(
                          fontSize: 16,
                          color: Theme.of(context).colorScheme.primary,
                        ),
                        softWrap: true,
                      ),
                    ],
                  ),
                ),
                SizedBox(width: 8),
                CustomIconButton(
                  onPressed: () {
                    print('Icon button pressed');
                  },
                  iconData: Icons.chevron_right_outlined,
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}
