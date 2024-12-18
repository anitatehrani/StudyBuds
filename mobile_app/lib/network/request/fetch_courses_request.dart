import 'package:study_buds/network/network_service.dart';
import 'package:study_buds/network/response/fetch_courses_response.dart';

import '../../network/base_http_request.dart';

class FetchCoursesRequest
    extends BaseHttpRequest<FetchCoursesResponseBuilder, List<dynamic>> {
  FetchCoursesRequest()
      : super(
          httpVerb: HttpVerb.GET,
          endPoint: "/courses/all",
          responseBuilder: FetchCoursesResponseBuilder(),
        );
}
