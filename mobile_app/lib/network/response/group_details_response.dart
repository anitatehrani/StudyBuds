import '../../network/base_http_response.dart';

// Converts the JSON response into a GroupDetails object.
class GroupDetailsResponseBuilder
    extends BaseHttpResponseBuilder<dynamic> {
  GroupDetailsResponseBuilder()
      : super(dataFactory: (jsonObject) {
    return jsonObject;
  });
}
