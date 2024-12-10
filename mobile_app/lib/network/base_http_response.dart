import 'dart:convert';

import 'package:http/http.dart';

/// Parses raw HTTP responses into structured BaseHttpResponse objects.
class BaseHttpResponseBuilder<T> {
  final T Function(dynamic jsonObject)? _dataFactory;

  BaseHttpResponseBuilder({T Function(dynamic)? dataFactory})
      : _dataFactory = dataFactory;

  BaseHttpResponse<T> generateResponse(Response? response,
      {required Map<String, dynamic> requestParams}) {
    if (response == null) {
      print("No response received.");
      return BaseHttpResponse<T>(
        isSuccess: false,
        requestParams: requestParams,
      );
    }

    try {
      print(response.body);
      final parsedJson = jsonDecode(response.body);
      var isSuccessRes= false;
      if (response.statusCode == 200 || response.statusCode == 201) {
        isSuccessRes = true;
        return BaseHttpResponse<T>(
          isSuccess: isSuccessRes,
          requestParams: requestParams,
          statusCode: response.statusCode,
          data: _dataFactory != null ? _dataFactory!(parsedJson) : null,
        );
      } else {
        return BaseHttpResponse<T>(
          isSuccess: isSuccessRes,
          requestParams: requestParams,
          statusCode: response.statusCode,
          data: _dataFactory != null ? _dataFactory!(parsedJson['error']) : null,
        );
      }
    } catch (e) {
      print("Error decoding JSON: $e");
      return BaseHttpResponse<T>(
        isSuccess: false,
        requestParams: requestParams,
        statusCode: response.statusCode,
      );
    }
  }
}

/// Represents a structured HTTP response.
class BaseHttpResponse<T> {
  bool isSuccess;
  Map<String, dynamic> requestParams;
  int? statusCode;
  T? data;

  BaseHttpResponse({
    required this.isSuccess,
    required this.requestParams,
    this.statusCode,
    this.data,
  });
}