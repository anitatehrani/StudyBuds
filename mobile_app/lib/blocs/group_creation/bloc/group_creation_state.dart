part of 'group_creation_bloc.dart';

class GroupCreationState extends Equatable {
  final List<String> courses;
  final bool isLoading;
  final String? errorMessage;

  const GroupCreationState({
    this.courses = const <String>[],
    this.isLoading = false,
    this.errorMessage,
  });

  GroupCreationState copyWith({
    List<String>? courses,
    bool? isLoading,
    String? errorMessage,
  }) {
    return GroupCreationState(
      courses: courses ?? this.courses,
      isLoading: isLoading ?? this.isLoading,
      errorMessage: errorMessage,
    );
  }

  @override
  List<Object?> get props => [courses, isLoading, errorMessage];
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
  final String message;
  GroupCreationSuccess(this.message);
}

class GroupCreationFailed extends GroupCreationState {
  final String error;
  GroupCreationFailed(this.error);
}
