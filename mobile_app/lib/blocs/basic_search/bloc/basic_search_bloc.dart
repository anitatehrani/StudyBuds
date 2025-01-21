import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';
import 'package:study_buds/models/group.dart';
import 'package:study_buds/network/request/basic_search_request.dart';
import 'package:study_buds/network/request/profile_request.dart';
import 'package:study_buds/network/request/sugged_groups_request.dart';


part 'basic_search_event.dart';
part 'basic_search_state.dart';

class BasicSearchBloc extends Bloc<BasicSearchEvent, BasicSearchState> {
  BasicSearchBloc() : super(BasicSearchInitial()) {
    on<TelegramIdCheckEvent>(_onTelegramIdCheck);
    on<SuggestedGroupsEvent>(_onSuggestedGroupEvent);
    on<SearchQueryChanged>(_onSearchQueryChangedEvent);

  }

    // Handle Suggested Group Event
    Future<void> _onSuggestedGroupEvent(
      SuggestedGroupsEvent event, Emitter<BasicSearchState> emit) async {
      emit(SuggestedGroupListLoading());
      try {
        final suggestedGroupsRequest =
            SuggestedGroupsRequest();
        final response = await suggestedGroupsRequest.send();
        if (response.isSuccess) {
          final List<Group> suggestedGroups =
              Group.fromJsonList(response.data ?? []);
          emit(SuggestedGroupListSuccess(suggestedGroups));
        } else {
          emit(SuggestedGroupListFailure(
              'Failed to get Suggested Group list'));
        }
      } catch (e) {
        print(e);
        emit(SuggestedGroupListFailure(
            'Failed to send Suggested Group list request'));
      }
    }


      Future<void> _onTelegramIdCheck(
      TelegramIdCheckEvent event, Emitter<BasicSearchState> emit) async {
        emit(TelegramIdCheckLoadingInsideBasicSearch());
        try {
          final profileRequest = ProfileRequest();
          final response = await profileRequest.send();
          if (response.isSuccess) {
            if (response.data != null) {
              if (response.data.telegramId != null) {
                print("emit telegram id check passed");
                emit(TelegramIdCheckPassedInsideBasicSearch());
              } else {
                print("emit telegram id check not passed");
                emit(TelegramIdCheckNotPassedInsideBasicSearch());
              }
            }
          } else {
            emit(TelegramIdCheckFailedInsideBasicSearch(
                'Failed to load the telegram id of the user'));
          }
        } catch (error) {
          print('Error getting the telegram id of the user: $error');
          emit(TelegramIdCheckFailedInsideBasicSearch('Failed to get the telegram id of the user'));
        }
      }

    // Handle SearchQueryChanged
    Future<void> _onSearchQueryChangedEvent(
      SearchQueryChanged event, Emitter<BasicSearchState> emit) async {
        emit(SearchLoading());
        try {
          final basicSearchRequest = BasicSearchRequest(
              query: event.queryString);
          final response = await basicSearchRequest.send();
          if (response.isSuccess) {
            final List<Group> groups = Group.fromJsonList(response.data ?? []);
            emit(SearchSuccess(groups));
          } else {
            emit(SearchFailure('Failed to search'));
          }
        } catch (e) {
          print(e);
          emit(SearchFailure('Failed to send request'));
        }
    }
}
