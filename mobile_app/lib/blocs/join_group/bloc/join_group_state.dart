part of 'join_group_bloc.dart';

@immutable
sealed class JoinGroupState {}

final class JoinGroupInitial extends JoinGroupState {}

final class JoinGroupRequestLoading extends JoinGroupState {}

final class JoinGroupRequestSuccess extends JoinGroupState {
  final String message;
  JoinGroupRequestSuccess(this.message);
}

final class JoinGroupRequestFailed extends JoinGroupState {
  final String error;
  JoinGroupRequestFailed(this.error);
}
