part of 'group_creation_bloc.dart';

sealed class GroupCreationEvent extends Equatable {

  const GroupCreationEvent();
}

class CreateGroupEvent extends GroupCreationEvent {
  final Group group;
  
  const CreateGroupEvent(this.group);
  
  @override
  List<Object?> get props => throw UnimplementedError();
}
