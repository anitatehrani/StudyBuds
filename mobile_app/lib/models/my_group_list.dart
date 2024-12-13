import 'package:study_buds/models/group.dart';

class MyGroupList {
  final List<Group> ownedGroup;
  final List<Group> joinedGroups;

  const MyGroupList({
    required this.ownedGroup,
    required this.joinedGroups
  });


  factory MyGroupList.fromJson(Map<String, dynamic> json) {

    int parseInt(String? value, [int defaultValue = 0]) {
      return int.tryParse(value ?? '') ?? defaultValue;
    }

    return MyGroupList(ownedGroup: Group.fromJsonList(json['ownedGroups']),
    joinedGroups: Group.fromJsonList(json['joinedGroups']));
  }
}


