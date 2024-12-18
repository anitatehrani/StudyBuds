import '../../network/base_http_response.dart';

// converts the json object from the response to a group object
class GroupCreationResponseBuilder extends BaseHttpResponseBuilder<dynamic> {
  GroupCreationResponseBuilder()
      : super(dataFactory: (jsonObject) {
          return jsonObject;
        });
}