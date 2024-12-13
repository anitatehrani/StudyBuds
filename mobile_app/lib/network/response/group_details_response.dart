import '../../network/base_http_response.dart';
import 'package:study_buds/models/group_details_model.dart';

// Converts the JSON response into a GroupDetails object.
class GroupDetailsResponseBuilder
    extends BaseHttpResponseBuilder<GroupDetails> {
  GroupDetailsResponseBuilder()
      : super(dataFactory: (jsonObject) {
    return GroupDetails.fromJson(jsonObject);
  });
}
