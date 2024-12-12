part of 'group_details_bloc.dart';

@immutable
abstract class GroupDetailsEvent extends Equatable {
  const GroupDetailsEvent();
}

class FetchGroupDetailsEvent extends GroupDetailsEvent {
  final int groupId;

  const FetchGroupDetailsEvent(this.groupId);

  @override
  List<Object?> get props => [groupId];
}
