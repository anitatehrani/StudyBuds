part of 'profile_bloc.dart';

abstract class ProfileEvent extends Equatable {
  const ProfileEvent();

  @override
  List<Object> get props => [];
}

class FetchProfileDetailsEvent extends ProfileEvent {
  final int studentId;
  FetchProfileDetailsEvent(this.studentId);
}

class SaveProfileDetailsEvent extends ProfileEvent {
  final String telegramAccountId;

  const SaveProfileDetailsEvent(this.telegramAccountId);

  @override
  List<Object> get props => [telegramAccountId];
}
