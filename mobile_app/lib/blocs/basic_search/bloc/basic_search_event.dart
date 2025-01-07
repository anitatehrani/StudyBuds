part of 'basic_search_bloc.dart';

sealed class BasicSearchEvent extends Equatable {}

class SuggestedGroupsEvent extends BasicSearchEvent {
  final int studentId;

  SuggestedGroupsEvent(this.studentId);

  @override
  List<Object?> get props => [studentId];
}

class SearchQueryChanged extends BasicSearchEvent {
  final String queryString;
  final int studentId;

  SearchQueryChanged(this.queryString, this.studentId);

  @override
  List<Object?> get props => [queryString, studentId];
}
