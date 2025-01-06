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

class SuggestedGroup extends BasicSearchState {
  final List<Group> suggested_groups;
  SuggestedGroup(this.suggested_groups);
}
