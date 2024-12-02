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

class FetchCoursesListEvent extends GroupCreationEvent {
  @override
  List<Object?> get props => throw UnimplementedError();
}

class FetchCoursesListLoading extends GroupCreationState {}

class FetchCoursesListInitial extends GroupCreationState {}

class FetchCoursesListSuccess extends GroupCreationState {
  final List<String> courses;
  FetchCoursesListSuccess(this.courses);
}

class FetchCoursesListFailed extends GroupCreationState {
  final String error;
  FetchCoursesListFailed(this.error);
}

class GroupCreationLoading extends GroupCreationState {}

class GroupCreationInitial extends GroupCreationState {}

class GroupCreationSuccess extends GroupCreationState {
  final Group group;
  GroupCreationSuccess(this.group);
}

class GroupCreationFailed extends GroupCreationState {
  final String error;
  GroupCreationFailed(this.error);
}