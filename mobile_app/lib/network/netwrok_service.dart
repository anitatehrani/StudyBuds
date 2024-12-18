import 'dart:convert';

import 'package:http/http.dart'
    as http;
import 'package:study_buds/utils/static_env.dart'; // it abstracts the low level details to make http requests

enum HttpVerb { GET, POST }

class NetworkService {
  static final NetworkService instance = NetworkService._internal();
  final String _baseUrl = API_URL;

  NetworkService._internal();

  // send the http request and returns the http response
  Future<http.Response> sendHTTPRequest(
      String endPoint, HttpVerb httpVerb, Map<String, dynamic> parameters) {
    final Uri url = Uri.parse("$_baseUrl$endPoint");

    if (httpVerb == HttpVerb.GET) {
      return http.get(url);
    } else if (httpVerb == HttpVerb.POST) {
      return http.post(url,
          headers: {"Content-Type": "application/json"},
          body: jsonEncode(parameters));
    } else {
      throw Exception("Unsupported HTTP verb");
    }
  }
}
