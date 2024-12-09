import '../../network/base_http_response.dart';

// converts the json object from the response to a group object
class UpdateJoinRequestResponseBuilder extends BaseHttpResponseBuilder<String> {
  UpdateJoinRequestResponseBuilder()
      : super(dataFactory: (jsonObject) {
          return jsonObject['message'];
        });
}
