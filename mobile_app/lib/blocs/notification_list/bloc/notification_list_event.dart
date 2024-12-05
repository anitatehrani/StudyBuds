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

class NotificationListInitial extends NotificationListState {}

class NotificationListLoading extends NotificationListState {}

class NotificationListSuccess extends NotificationListState {
  final List<NotificationModel> results;
  NotificationListSuccess(this.results);
}

class NotificationListFailure extends NotificationListState {
  final String error;
  NotificationListFailure(this.error);
}
