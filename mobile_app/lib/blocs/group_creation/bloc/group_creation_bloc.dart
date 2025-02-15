import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:study_buds/models/group.dart';
import 'package:study_buds/network/request/fetch_courses_request.dart';
import 'package:study_buds/network/request/group_creation_request.dart';
import 'package:study_buds/network/request/profile_request.dart';


part 'group_creation_event.dart';
part 'group_creation_state.dart';


class GroupCreationBloc extends Bloc<GroupCreationEvent, GroupCreationState> {
  GroupCreationBloc() : super(const GroupCreationState()) {
    on<TelegramIdCheckEvent>(_onTelegramIdCheck);
    on<FetchCoursesListEvent>(_onFetchCourses);
    on<CreateGroupEvent>(_onCreateGroup);
    on<ValidateFieldsEvent>(_onValidateFields);
  }


  Future<void> _onTelegramIdCheck(
      TelegramIdCheckEvent event, Emitter<GroupCreationState> emit) async {
    emit(TelegramIdCheckLoading());
    try {
      final profileRequest = ProfileRequest();
      final response = await profileRequest.send();
      if (response.isSuccess) {
        if (response.data != null) {
          if (response.data.telegramId != null) {
            print("emit telegram id check passed");
            emit(TelegramIdCheckPassed());
          } else {
            print("emit telegram id check not passed");
            emit(TelegramIdCheckNotPassed());
          }
        }
      } else {
        emit(TelegramIdCheckFailed(
            'Failed to load the telegram id of the user'));
      }
    } catch (error) {
      print('Error getting the telegram id of the user: $error');
      emit(TelegramIdCheckFailed('Failed to get the telegram id of the user'));
    }
  }


  Future<void> _onFetchCourses(
      FetchCoursesListEvent event, Emitter<GroupCreationState> emit) async {
    emit(FetchCoursesListLoading());
    try {
      final fetchCoursesRequest = FetchCoursesRequest();
      final response = await fetchCoursesRequest.send();
      if (response.isSuccess) {
        if (response.data != null && response.data!.isNotEmpty) {
          emit(FetchCoursesListSuccess(response.data! as List<String>));
        }
      } else {
        emit(FetchCoursesListFailed('Failed to load courses'));
      }
    } catch (error) {
      print('Error fetching courses: $error');
      emit(FetchCoursesListFailed('Failed to fetch course list'));
    }
  }


  Future<void> _onCreateGroup(
      CreateGroupEvent event, Emitter<GroupCreationState> emit) async {
    emit(GroupCreationLoading());
    try {
      final groupCreation = GroupCreationRequest(event.group);
      final response = await groupCreation.send();


      if (response.isSuccess) {
        emit(GroupCreationSuccess('The group created successfully.'));
      } else {
        emit(GroupCreationFailed(response.data['message']));
      }
    } catch (error) {
      emit(GroupCreationFailed('Failed to create group.'));
    }
  }


  Future<void> _onValidateFields(
    ValidateFieldsEvent event, Emitter<GroupCreationState> emit) async {
    final errors = <String, String>{};


    if (event.name.isEmpty) {
      errors['name'] = 'Name cannot be empty';
    }
    if (event.description.isEmpty) {
      errors['description'] = 'Description cannot be empty';
    }
    final membersLimit = int.tryParse(event.membersLimit);
    if (membersLimit == null || membersLimit < 2 || membersLimit > 100) {
      errors['membersLimit'] = 'Members limit must be between 2 and 100';
    }
    if (event.telegramGroupId.isEmpty) {
    errors['telegramId'] = 'Telegram Group ID must contain only digits';  // validation of TelegramGroupId field
  }
  if (event.courseList.isEmpty) {
    errors['courseList'] = 'Course cannot be empty. Please select a course from the list';
  }
    emit(state.copyWith(
      validationErrors: errors,
      isFormValid: errors.isEmpty,
    ));


}
}