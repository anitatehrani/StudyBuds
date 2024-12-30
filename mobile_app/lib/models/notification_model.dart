class NotificationModel {
  final DateTime createdAt;
  final int id;
  final int studentId;
  final int joinRequestId;
  final String notificationType;
  final String message;
  final String joinRequestStatus;

  NotificationModel(
      {required this.createdAt,
      required this.id,
      required this.studentId,
      required this.joinRequestId,
      required this.notificationType,
      required this.message,
      required this.joinRequestStatus
      });

  static List<NotificationModel> fromJsonList(List<dynamic> jsonArray) {
    print(jsonArray);
    List<NotificationModel> res =
        jsonArray.map((model) => NotificationModel.fromJson(model)).toList();
    return res;
  }

  // Factory constructor to create a Group from JSON
  factory NotificationModel.fromJson(Map<String, dynamic> json) {
    int parseInt(String? value, [int defaultValue = 0]) {
      return int.tryParse(value ?? '') ?? defaultValue;
    }

    return NotificationModel(
        id: json['id'],
        studentId: json['studentId'],
        joinRequestId: json['joinRequestId'],
        message: json['message'] ?? ' ',
        joinRequestStatus: json['joinRequestStatus'] ?? ' ',
        notificationType: json['notificationType'] ?? ' ',
        createdAt: DateTime.parse(json['createdAt']));
  }
}
