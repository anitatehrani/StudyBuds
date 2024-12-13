import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:study_buds/blocs/join_request/bloc/join_request_bloc.dart';
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
    pressButton(isAccepted) {
      context.read<JoinRequestBloc>().add(ChangeJoinRequestStatusEvent(
          10, notification.joinRequestId, isAccepted));
    }

    return BlocListener<JoinRequestBloc, JoinRequestState>(
      listener: (context, state) {
        if (state is JoinRequestLoading) {
          // loading
        } else if (state is JoinRequestSuccess) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
                key: Key("success_toast"),
                content: Text(state.message),
                backgroundColor: Colors.green),
          );
        } else if (state is JoinRequestFailed)
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
                key: Key("fail_toast"),
                content: Text(state.error),
                backgroundColor: Colors.red),
          );
        // Navigator.of(context).pop();
      },
      child: Dialog(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        child: Container(
          width: 320,
          height: 200,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Decline Button
              Container(
                width: 60,
                child: CustomFilledButton(
                  key: ValueKey("reject"),
                  label: rejectButtonLabel,
                  iconData: Icons.cancel,
                  onPressed: () {
                    pressButton(false);
                    // Navigator.of(context).pop();
                  },
                  rotationAngle: -1.57,
                  backgroundColor: const Color(0xFFD90429),
                  foregroundColor: Colors.white,
                  width: 80,
                  height: double.infinity,
                ),
              ),

              Expanded(
                child: Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text(
                        notification.notificationType,
                        style: const TextStyle(
                          color: Color(0xFF252B33),
                          fontSize: 18,
                          fontFamily: 'Quicksand',
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 12),
                      Text(
                        notification.message,
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          color: Color(0xFF252B33),
                          fontSize: 14,
                          fontFamily: 'Quicksand',
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              Container(
                width: 60,
                child: CustomFilledButton(
                  key: ValueKey("accept"),
                  label: acceptButtonLabel,
                  iconData: Icons.check_circle,
                  onPressed: () {
                    pressButton(true);
                  },
                  rotationAngle: 1.57,
                  backgroundColor: const Color(0xFF252B33),
                  foregroundColor: Colors.white,
                  width: 80,
                  height: double.infinity,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
