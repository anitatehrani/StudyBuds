import 'package:study_buds/models/group.dart';
import 'package:study_buds/network/network_service.dart';
import 'package:study_buds/network/response/group_creation_response.dart';

import '../../network/base_http_request.dart';

class GroupCreationRequest
    extends BaseHttpRequest<GroupCreationResponseBuilder, dynamic> {
  GroupCreationRequest(Group group) : super(
          httpVerb: HttpVerb.POST,
          endPoint:"/groups/create",
          responseBuilder: GroupCreationResponseBuilder(),
          parameters: {
            'name': group.name,
            'description': group.description,
            'course': group.course,
            'isPublic': group.isPublic,
            'membersLimit': group.members,
            'telegramLink': group.telegramLink,
            'studentId': group.studentId,
          },
        );
}
