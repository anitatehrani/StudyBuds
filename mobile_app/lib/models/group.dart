import 'dart:convert';

class Group {
  final String name;
  final String description;
  final int members;
  final bool isPrivate;

  Group({
    required this.name,
    required this.description,
    required this.members,
    required this.isPrivate,
  });

  // Factory constructor to create a Group from JSON
  factory Group.fromJson(Map<String, dynamic> json) {
    return Group(
      name: json['name'] ?? 'No Name',
      description: json['description'] ?? 'No Description',
      members: json['members'] ?? 0,
      isPrivate: json['isPrivate'] ?? false,
    );
  }
}

  // Static method to parse a JSON string into a list of Group instances
//   static List<Group> fromJsonList(String jsonString) {
//     final List<dynamic> jsonList = json.decode(jsonString);
//     print(jsonList);
//     return jsonList.map((json) => Group.fromJson(json)).toList();
//   }
// }
