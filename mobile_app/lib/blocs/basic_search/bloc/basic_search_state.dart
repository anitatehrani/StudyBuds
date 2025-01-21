part of 'basic_search_bloc.dart';

@immutable
sealed class BasicSearchState {}

final class BasicSearchInitial extends BasicSearchState {}

class SearchInitial extends BasicSearchState {}

class SearchLoading extends BasicSearchState {}

class SearchSuccess extends BasicSearchState {
  final List<Group> groups;
  SearchSuccess(this.groups);
}

class SearchFailure extends BasicSearchState {
  final String error;
  SearchFailure(this.error);
}

class SuggestedGroupListInitial extends BasicSearchState {}

class SuggestedGroupListLoading extends BasicSearchState {}

class SuggestedGroupListSuccess extends BasicSearchState {
  final List<Group> suggested_groups;
  SuggestedGroupListSuccess(this.suggested_groups);
}

class SuggestedGroupListFailure extends BasicSearchState {
  final String error;
  SuggestedGroupListFailure(this.error);
}

class TelegramIdCheckInitialInsideBasicSearch extends BasicSearchState {}

class TelegramIdCheckLoadingInsideBasicSearch extends BasicSearchState {}

class TelegramIdCheckPassedInsideBasicSearch extends BasicSearchState {
  final bool isTelegramIdChecked = true;
  TelegramIdCheckPassedInsideBasicSearch();
}

class TelegramIdCheckNotPassedInsideBasicSearch extends BasicSearchState {
  final bool isTelegramIdChecked = false;
  TelegramIdCheckNotPassedInsideBasicSearch();
}

class TelegramIdCheckFailedInsideBasicSearch extends BasicSearchState {
  final String error;
  TelegramIdCheckFailedInsideBasicSearch(this.error);
}
