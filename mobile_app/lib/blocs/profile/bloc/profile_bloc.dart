import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';

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
      await Future.delayed(const Duration(seconds: 2));

      // Mock data
      const profileDetails = {
        'studentName': 'Noah White',
        'studentId': '10',
        'telegramAccountId': ''
      };

      emit(ProfileLoaded(
        studentName: profileDetails['studentName']!,
        studentId: profileDetails['studentId']!,
        telegramAccountId: profileDetails['telegramAccountId']!,
      ));
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
