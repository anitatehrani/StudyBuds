part of 'join_group_bloc.dart';

sealed class JoinGroupEvent extends Equatable {
  

  const JoinGroupEvent();
}


class JoinGroupRequestEvent extends JoinGroupEvent {
  final int studentId;
  final int groupId;
  
  const JoinGroupRequestEvent(this.studentId, this.groupId);
  
  @override
  // TODO: implement props
  List<Object?> get props => throw UnimplementedError();
}