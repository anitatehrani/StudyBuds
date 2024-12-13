import 'package:study_buds/network/netwrok_service.dart';
import 'package:study_buds/network/response/group_details_response.dart';

import '../../network/base_http_request.dart';

class GroupDetailsRequest
    extends BaseHttpRequest<GroupDetailsResponseBuilder, dynamic> {
  GroupDetailsRequest(int groupId)
      : super(
    httpVerb: HttpVerb.GET,
    endPoint: "/groups/group_details/$groupId",
    responseBuilder: GroupDetailsResponseBuilder(),
  );
}
