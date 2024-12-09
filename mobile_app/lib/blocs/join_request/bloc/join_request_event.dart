part of 'join_request_bloc.dart';

sealed class JoinRequestEvent extends Equatable {
  const JoinRequestEvent();
}

class ChangeJoinRequestStatusEvent extends JoinRequestEvent {
  final int studentId;
  final int joinRequestId;
  final bool isAccepted;

  const ChangeJoinRequestStatusEvent(
      this.studentId, this.joinRequestId, this.isAccepted);

  @override
  // TODO: implement props
  List<Object?> get props => throw UnimplementedError();
}
