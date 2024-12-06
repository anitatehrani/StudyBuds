part of 'notification_list_bloc.dart';

sealed class NotificationListEvent extends Equatable {
  const NotificationListEvent();
}

class FetchNotificationListEvent extends NotificationListEvent {
  final int studentId;

  const FetchNotificationListEvent(this.studentId);

  @override
  // TODO: implement props
  List<Object?> get props => throw UnimplementedError();
}
