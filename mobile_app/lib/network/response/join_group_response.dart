import '../../network/base_http_response.dart';

// converts the json object from the response to a group object
class JoinGroupResponseBuilder extends BaseHttpResponseBuilder<String> {
  JoinGroupResponseBuilder()
      : super(dataFactory: (jsonObject) {
          return jsonObject['message'];
        });
}