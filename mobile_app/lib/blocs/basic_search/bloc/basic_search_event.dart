part of 'basic_search_bloc.dart';

sealed class BasicSearchEvent extends Equatable {
  const BasicSearchEvent();
}

class SearchQueryChanged extends BasicSearchEvent {
  final String queryString;
  final int studentId;

  const SearchQueryChanged(this.queryString, this.studentId);

  @override
  // TODO: implement props
  List<Object?> get props => throw UnimplementedError();
}

class ShowSuggestedGroups extends BasicSearchEvent {
  final int studentId;

  const ShowSuggestedGroups(this.studentId);

  @override
  // TODO: implement props
  List<Object?> get props => throw UnimplementedError();
}
