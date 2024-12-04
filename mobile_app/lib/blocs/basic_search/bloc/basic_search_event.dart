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