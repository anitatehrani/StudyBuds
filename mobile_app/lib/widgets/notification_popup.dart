import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:study_buds/blocs/join_request/bloc/join_request_bloc.dart';
import 'package:study_buds/models/notification.dart';
import 'package:study_buds/widgets/custom_filled_button.dart';
import 'package:study_buds/widgets/custom_text_button.dart';

class NotificationPopup extends StatelessWidget {
  final String acceptButtonLabel;
  final String rejectButtonLabel;
  final NotificationModel notification;
  final Function listChanged;

  const NotificationPopup({
    super.key,
    required this.acceptButtonLabel,
    required this.rejectButtonLabel,
    required this.notification,
    required this.listChanged,
  });

  @override
  Widget build(BuildContext context) {
    return BlocListener<JoinRequestBloc, JoinRequestState>(
      listener: (context, state) {
        if (state is JoinRequestLoading) {
          // do nothing
        } else if (state is JoinRequestSuccess) {
          ScaffoldMessenger.of(ScaffoldMessenger.maybeOf(context)!.context)
              .showSnackBar(
            SnackBar(
                content: Text(key: Key("success_toast"), state.message),
                backgroundColor: Colors.green),
          );
          listChanged.call();
        } else if (state is JoinRequestFailed) {
          ScaffoldMessenger.of(ScaffoldMessenger.maybeOf(context)!.context)
              .showSnackBar(
            SnackBar(
                content: Text(key: Key("fail_toast"), state.error),
                backgroundColor: Colors.red),
          );
          listChanged.call();
        }
      },
      child: AlertDialog(
        title: Text(notification.notificationType),
        content: Text(notification.message),
        actions: [
          CustomTextButton(
            key: ValueKey("reject"),
            onPressed: () {
              context.read<JoinRequestBloc>().add(ChangeJoinRequestStatusEvent(
                  notification.joinRequestId, false));
              Navigator.of(context).pop();
            },
            label: rejectButtonLabel,
            iconData: Icons.cancel_rounded,
            foregroundColor: Colors.red,
          ),
          SizedBox(width: 2),
          CustomFilledButton(
            key: ValueKey("accept"),
            onPressed: () {
              context.read<JoinRequestBloc>().add(ChangeJoinRequestStatusEvent(
                  notification.joinRequestId, true));
              Navigator.of(context).pop();
            },
            iconData: Icons.check_circle_rounded,
            label: acceptButtonLabel,
          ),
        ],
      ),
    );
  }
}
