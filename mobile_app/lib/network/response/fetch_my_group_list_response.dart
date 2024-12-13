import '../../network/base_http_response.dart';

class FetchMyGroupListResponseBuilder
    extends BaseHttpResponseBuilder<dynamic> {
  FetchMyGroupListResponseBuilder()
      : super(dataFactory: (jsonObject) {
          return jsonObject;
        });
}
