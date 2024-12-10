part of 'join_request_bloc.dart';

@immutable
sealed class JoinRequestState {}

final class JoinRequestInitial extends JoinRequestState {}

final class JoinRequestLoading extends JoinRequestState {}

final class JoinRequestSuccess extends JoinRequestState {
  final String message;
  JoinRequestSuccess(this.message);
}

final class JoinRequestFailed extends JoinRequestState {
  final String error;
  JoinRequestFailed(this.error);
}
