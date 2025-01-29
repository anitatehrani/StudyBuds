part of 'group_creation_bloc.dart';

class GroupCreationState extends Equatable {
  final List<String> courses;
  final bool isLoading;
  final bool isTelegramIdChecked;
  final String? errorMessage;

  final Map<String, String> validationErrors;
final bool isFormValid;


  const GroupCreationState({
    this.courses = const <String>[],
    this.isLoading = false,
    this.isTelegramIdChecked = true,
    this.errorMessage,
    this.validationErrors = const <String, String>{},
    this.isFormValid = false,
  });

  GroupCreationState copyWith({
    List<String>? courses,
    bool? isLoading,
    bool? isTelegramIdChecked,
    String? errorMessage,

    Map<String, String>? validationErrors,
    bool? isFormValid,
  }) {
    return GroupCreationState(
      courses: courses ?? this.courses,
      isLoading: isLoading ?? this.isLoading,
      isTelegramIdChecked: isTelegramIdChecked ?? this.isTelegramIdChecked,
      errorMessage: errorMessage,

      validationErrors: validationErrors ?? this.validationErrors,
      isFormValid: isFormValid ?? this.isFormValid,

    );
  }

  @override
  List<Object?> get props =>
      [courses, isLoading, isTelegramIdChecked, errorMessage,
      validationErrors, isFormValid];
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

class TelegramIdCheckLoading extends GroupCreationState {}

class TelegramIdCheckInitial extends GroupCreationState {}

class TelegramIdCheckPassed extends GroupCreationState {
  TelegramIdCheckPassed() : super(isTelegramIdChecked: true);
}

class TelegramIdCheckNotPassed extends GroupCreationState {
  TelegramIdCheckNotPassed() : super(isTelegramIdChecked: false);
}

class TelegramIdCheckFailed extends GroupCreationState {
  final String error;
  TelegramIdCheckFailed(this.error);
}