import 'package:study_buds/models/notification_model.dart';

import '../../network/base_http_response.dart';

class NotificationListResponseBuilder
    extends BaseHttpResponseBuilder<List<dynamic>> {
  NotificationListResponseBuilder()
      : super(dataFactory: (jsonObject) {
          return jsonObject;
        });
}
