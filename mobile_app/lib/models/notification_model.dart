class NotificationModel {
  final DateTime createdAt;
  final int id;
  final int studentId;
  final int joinRequestId;
  final String notificationType;
  final String message;

  NotificationModel({
    required this.createdAt,
    required this.id,
    required this.studentId,
    required this.joinRequestId,
    required this.notificationType,
    required this.message
  });

   static List<NotificationModel> fromJsonList(List<dynamic> jsonArray) {
    print(jsonArray);
    List<NotificationModel> res = jsonArray.map((model) => NotificationModel.fromJson(model)).toList();
    return res;
  }

  // Factory constructor to create a Group from JSON
  factory NotificationModel.fromJson(Map<String, dynamic> json) {

    int parseInt(String? value, [int defaultValue = 0]) {
      return int.tryParse(value ?? '') ?? defaultValue;
    }

    return NotificationModel(
      id: parseInt(json['id']),
      studentId: parseInt(json['student_id']),
      joinRequestId: parseInt(json['join_request_id']),
      message: json['message'] ?? ' ',
      notificationType: json['notification_type'] ?? ' ',
      createdAt: DateTime.parse(json['created_at'])
    );
  }
}
