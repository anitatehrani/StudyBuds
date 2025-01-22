part of 'group_creation_bloc.dart';

sealed class GroupCreationEvent extends Equatable {
  const GroupCreationEvent();
}

class CreateGroupEvent extends GroupCreationEvent {
  final Group group;

  const CreateGroupEvent(this.group);

  @override
  List<Object?> get props => throw UnimplementedError();
}

class TelegramIdCheckEvent extends GroupCreationEvent {
  @override
  List<Object?> get props => throw UnimplementedError();
}

class ValidateFieldsEvent extends GroupCreationEvent {
  final String name;
  final String description;
  final String membersLimit;
  final String telegramGroupId;

  const ValidateFieldsEvent({
    required this.name,
    required this.description,
    required this.membersLimit,
    required this.telegramGroupId,
  });

  @override
  List<Object?> get props => [name, description, membersLimit, telegramGroupId];
}