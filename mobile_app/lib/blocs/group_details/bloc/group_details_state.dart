part of 'group_details_bloc.dart';

@immutable
abstract class GroupDetailsState {}

class GroupDetailsInitial extends GroupDetailsState {}

class GroupDetailsLoading extends GroupDetailsState {}

class GroupDetailsSuccess extends GroupDetailsState {
  final GroupDetails groupDetails;

  GroupDetailsSuccess(this.groupDetails);
}

class GroupDetailsFailure extends GroupDetailsState {
  final String error;

  GroupDetailsFailure(this.error);
}
