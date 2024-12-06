import 'package:study_buds/network/base_http_request.dart';
import 'package:study_buds/network/netwrok_service.dart';
import 'package:study_buds/network/response/notification_list_response.dart';

class NotificationListRequest
    extends BaseHttpRequest<NotificationListResponseBuilder, List<dynamic>> {
  NotificationListRequest(int studentId)
      : super(
          httpVerb: HttpVerb.GET,
          endPoint: "/notification/list/$studentId",
          responseBuilder: NotificationListResponseBuilder(),
        );
}
