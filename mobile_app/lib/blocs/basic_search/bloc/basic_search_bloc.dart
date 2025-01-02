import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';
import 'package:study_buds/models/group.dart';
import 'package:study_buds/network/request/basic_search_request.dart';

part 'basic_search_event.dart';
part 'basic_search_state.dart';

class BasicSearchBloc extends Bloc<BasicSearchEvent, BasicSearchState> {
  BasicSearchBloc() : super(BasicSearchInitial()) {
    on<BasicSearchEvent>((event, emit) async {
      if (event is SearchQueryChanged) {
        emit(SearchLoading());
        try {
          final basicSearchRequest = BasicSearchRequest(query: event.queryString);
          final response = await basicSearchRequest.send();
          if (response.isSuccess) {
            final List<Group> groups = Group.fromJsonList(response.data ?? []);
            emit(SearchSuccess(groups));
          } else {
            emit(SearchFailure('Failed to search'));
          }
        } catch (e){
          emit(SearchFailure('Failed to send request'));
        }
      }
    });
  }
}
