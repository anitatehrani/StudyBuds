import 'dart:convert';

import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:http/http.dart' as http;
import 'package:study_buds/models/group.dart';
import 'package:study_buds/utils/static_env.dart';

part 'group_creation_event.dart';
part 'group_creation_state.dart';

class GroupCreationBloc extends Bloc<GroupCreationEvent, GroupCreationState> {
  GroupCreationBloc() : super(const GroupCreationState()) {
    on<FetchCoursesListEvent>(_onFetchCourses);
    on<CreateGroupEvent>(_onCreateGroup);
  }

  Future<void> _onFetchCourses(
      FetchCoursesListEvent event, Emitter<GroupCreationState> emit) async {
    emit(state.copyWith(isLoading: true));
    final url = Uri.parse('$API_URL/courses/all');
    try {
      final response = await http.get(url);
      if (response.statusCode == 200) {
        final responseData = jsonDecode(response.body);
        final courses = List<String>.from(responseData['courses']);
        emit(state.copyWith(courses: courses, isLoading: false));
      } else {
        print('Error fetching courses: ${response.statusCode}');
        emit(state.copyWith(
          errorMessage: 'Failed to load courses.',
          isLoading: false,
        ));
      }
    } catch (error) {
      print('Error fetching courses: $error');
      emit(state.copyWith(
        errorMessage: 'An error occurred: $error',
        isLoading: false,
      ));
    }
  }

  Future<void> _onCreateGroup(
      CreateGroupEvent event, Emitter<GroupCreationState> emit) async {
    emit(state.copyWith(isLoading: true));
    final url = Uri.parse('$API_URL/groups/create');
    final body = event.group.toJson();

    try {
      final response = await http.post(url, body: body, headers: {
        'Content-Type': 'application/json',
      });
      if (response.statusCode == 201) {
        emit(state.copyWith(isLoading: false));
      } else {
        final errorData = jsonDecode(response.body);
        emit(state.copyWith(
          errorMessage: errorData['message'],
          isLoading: false,
        ));
      }
    } catch (error) {
      emit(state.copyWith(
        errorMessage: 'Failed to create group.',
        isLoading: false,
      ));
    }
  }
}
