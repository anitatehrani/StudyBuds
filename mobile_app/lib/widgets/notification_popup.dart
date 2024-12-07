import 'package:flutter/material.dart';
import 'package:study_buds/models/notification_model.dart';
import 'package:study_buds/widgets/custom_filled_button.dart';

class NotificationPopup extends StatelessWidget {
  final String acceptButtonLabel;
  final String rejectButtonLabel;
  final NotificationModel notification;

  const NotificationPopup({
    Key? key,
    required this.acceptButtonLabel,
    required this.rejectButtonLabel,
    required this.notification,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: Container(
        width: 360,
        height: 189,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Stack(
          alignment: Alignment.center,
          children: [
            Positioned(
              top: 16,
              child: Text(
                notification.notificationType,
                style: const TextStyle(
                  color: Color(0xFF252B33),
                  fontSize: 18,
                  fontFamily: 'Quicksand',
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            Positioned(
              top: 60,
              width: 240,
              child: Text(
                notification.message,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  color: Color(0xFF252B33),
                  fontSize: 14,
                  fontFamily: 'Quicksand',
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
            // Reject Button (Left)
            Positioned(
              right: 200,
              child: Transform.rotate(
                angle: -1.57, // Rotate -90 degrees
                child: CustomFilledButton(
                  label: rejectButtonLabel,
                  onPressed: () {
                    Navigator.of(context).pop(); // Close dialog
                  },
                  backgroundColor: const Color(0xFFD90429),
                  foregroundColor: Colors.white,
                  width: 189, // Narrower button
                  height: 20, // Same height as popup
                  fontSize: 14,
                ),
              ),
            ),
            // Accept Button (Right)
            Positioned(
              // right: 0,
              left: 200,
              child: Transform.rotate(
                angle: 1.57,
                child: CustomFilledButton(
                  label: acceptButtonLabel,
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  backgroundColor: const Color(0xFF252B33),
                  foregroundColor: Colors.white,
                  width: 189,
                  height: 20,
                  fontSize: 14,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
