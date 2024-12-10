import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:study_buds/models/profile.dart';
import 'package:study_buds/network/request/profile_request.dart';

part 'profile_event.dart';
part 'profile_state.dart';

class ProfileBloc extends Bloc<ProfileEvent, ProfileState> {
  ProfileBloc() : super(ProfileInitial()) {
    on<FetchProfileDetailsEvent>(_onFetchProfileDetails);
    on<SaveProfileDetailsEvent>(_onSaveProfileDetails);
  }

  Future<void> _onFetchProfileDetails(
      FetchProfileDetailsEvent event, Emitter<ProfileState> emit) async {
    try {
      emit(ProfileLoading());
      // Simulate a delay for fetching data (replace with actual API call)
      final profile = await ProfileRequest(event.studentId);
      final response = profile.send();

      if (response.isSuccess) {
        emit(ProfileLoaded(profile: Profile.fromJson(response.data)));
      }
    } catch (e) {
      emit(ProfileError(error: 'Failed to fetch profile details.'));
    }
  }

  Future<void> _onSaveProfileDetails(
      SaveProfileDetailsEvent event, Emitter<ProfileState> emit) async {
    try {
      emit(ProfileSaving());
      // Simulate a delay for saving data (replace with actual API call)
      await Future.delayed(const Duration(seconds: 2));

      // Mock successful save
      emit(ProfileSaveSuccess());
    } catch (e) {
      emit(ProfileSaveFailed(error: 'Failed to save profile details.'));
    }
  }
}
