import '../../network/base_http_response.dart';

// converts the json object from the response to a group object
class FetchCoursesResponseBuilder extends BaseHttpResponseBuilder<List<String>> {
  FetchCoursesResponseBuilder()
      : super(dataFactory: (jsonObject) {
        if (jsonObject != null) {
          return List<String>.from(jsonObject);
        }
        return [];
      });
}