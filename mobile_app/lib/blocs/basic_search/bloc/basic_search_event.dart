part of 'basic_search_bloc.dart';

sealed class BasicSearchEvent extends Equatable {
  const BasicSearchEvent();
}

class SearchQueryChanged extends BasicSearchEvent {

  final String queryString;

  const SearchQueryChanged(this.queryString);
  
  @override
  // TODO: implement props
  List<Object?> get props => throw UnimplementedError();
}