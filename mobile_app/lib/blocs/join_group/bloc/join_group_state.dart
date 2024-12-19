part of 'join_group_bloc.dart';

@immutable
sealed class JoinGroupState {}

final class JoinGroupInitial extends JoinGroupState {}

final class JoinGroupRequestLoading extends JoinGroupState {}

final class JoinGroupRequestSuccess extends JoinGroupState {
  final String message;
  final int groupId;
  JoinGroupRequestSuccess(this.message, this.groupId);
}

final class JoinGroupRequestFailed extends JoinGroupState {
  final String error;
  final int groupId;
  JoinGroupRequestFailed(this.error, this.groupId);
}
