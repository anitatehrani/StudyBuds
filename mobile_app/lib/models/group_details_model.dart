class GroupDetails {
  final int groupId;
  final String name;
  final String description;
  final bool isPublic;
  final String telegramLink;
  final int studentId;
  final int members;
  final int membersLimit;
  final List<GroupMember> groupMembers;

  GroupDetails({
    required this.groupId,
    required this.name,
    required this.description,
    required this.isPublic,
    required this.telegramLink,
    required this.studentId,
    required this.members,
    required this.membersLimit,
    required this.groupMembers,
  });

  factory GroupDetails.fromJson(Map<String, dynamic> json) {
    return GroupDetails(
      groupId: json['groupId'],
      name: json['name'],
      description: json['description'] ?? '',
      isPublic: json['isPublic'],
      telegramLink: json['telegramLink'] ?? '',
      studentId: json['studentId'],
      members: json['members'],
      membersLimit: json['membersLimit'],
      groupMembers: json['groupMembers'] != null
          ? (json['groupMembers'] as List<dynamic>)
          .map((member) => GroupMember.fromJson(member))
          .toList()
          : [],
    );
  }
}

class GroupMember {
  final int studentId;
  final String firstName;
  final String lastName;

  GroupMember({
    required this.studentId,
    required this.firstName,
    required this.lastName,
  });

  factory GroupMember.fromJson(Map<String, dynamic> json) {
    return GroupMember(
      studentId: json['studentId'],
      firstName: json['firstName'],
      lastName: json['lastName'],
    );
  }
}
