part of 'basic_search_bloc.dart';

@immutable
sealed class BasicSearchState {}

final class BasicSearchInitial extends BasicSearchState {}


class SearchInitial extends BasicSearchState{}

class SearchLoading extends BasicSearchState {
}

class SearchSuccess extends BasicSearchState {
  final List<Group> results;
  SearchSuccess(this.results);
}

class SearchFailure extends BasicSearchState {
  final String error;
  SearchFailure(this.error);
}