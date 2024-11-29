

class Group {
  final String name;
  final String course;
  final String description;
  final int members;
  final bool isPublic;
  final String telegramLink;

  Group({
    required this.name,
    required this.course,
    required this.description,
    required this.members,
    required this.isPublic,
    required this.telegramLink
  });

  // Factory constructor to create a Group from JSON
  factory Group.fromJson(Map<String, dynamic> json) {
    return Group(
      name: json['name'] ?? 'No Name',
      course: json['course'] ?? 'No Course',
      description: json['description'] ?? 'No Description',
      members: int.parse(json['member_count']) ?? 0,
      isPublic: json['is_public'] ?? false,
      telegramLink: json['telegram_link'] ?? ''
    );
  }

  Map<String, dynamic> toJson(){
    return {
      'name': this.name,
      'description': this.description,
      'course': this.course,
      'isPublic': this.isPublic,
      'membersLimit': this.members,
      'telegramLink': this.telegramLink,
      'studentId': 123,
    };
  }
}

  // Static method to parse a JSON string into a list of Group instances
//   static List<Group> fromJsonList(String jsonString) {
//     final List<dynamic> jsonList = json.decode(jsonString);
//     print(jsonList);
//     return jsonList.map((json) => Group.fromJson(json)).toList();
//   }
// }
