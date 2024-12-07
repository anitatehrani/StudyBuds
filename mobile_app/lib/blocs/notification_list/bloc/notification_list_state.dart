part of 'notification_list_bloc.dart';

@immutable
sealed class NotificationListState {
  final bool isLoading = false;
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

