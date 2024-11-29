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
