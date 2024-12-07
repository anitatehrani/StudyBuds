import 'package:flutter/material.dart';
import 'package:study_buds/models/notification_model.dart';
import 'package:study_buds/utils/date_utils.dart';
import 'package:study_buds/widgets/custom_icon_button.dart';

class PopUp extends StatelessWidget {
  final Color? backgroundColor;
  final String? acceptButtonLabel;
  final String? rejectButtonLabel;

  final NotificationModel notification;

  const PopUp(
      {super.key,
      this.backgroundColor,
      this.acceptButtonLabel,
      this.rejectButtonLabel,
      required this.notification});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: backgroundColor,
        body: Container(
            height: MediaQuery.of(context).size.height,
            width: MediaQuery.of(context).size.width,
            child: Center(
                child: Container(
              width: 300,
              decoration:
                  BoxDecoration(borderRadius: BorderRadius.circular(10)),
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
                                    : (notification.notificationType == 'accept'
                                        ? Icons.check_circle
                                        : Icons.cancel),
                                size: 18,
                              ),
                            ),
                            SizedBox(width: 4),
                            Text(
                              notification.notificationType,
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
            ))));
  }
}
