import '../../network/base_http_response.dart';

// converts the json object from the response to a group object
class FetchCoursesResponseBuilder extends BaseHttpResponseBuilder<List<String>> {
  FetchCoursesResponseBuilder()
      : super(dataFactory: (jsonObject) {
        if (jsonObject != null && jsonObject['courses'] is List<dynamic>) {
          return (jsonObject['courses'] as List<dynamic>)
            .map((course) => course.toString())
            .toList();
        }
        return [];
      });
}