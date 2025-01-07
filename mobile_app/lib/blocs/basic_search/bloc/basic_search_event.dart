part of 'basic_search_bloc.dart';

sealed class BasicSearchEvent extends Equatable {
  final int studentId;

  const BasicSearchEvent(this.studentId);
}

class SearchQueryChanged extends BasicSearchEvent {
  final String queryString;


  const SearchQueryChanged(this.queryString, super.studentId);

  @override
  // TODO: implement props
  List<Object?> get props => throw UnimplementedError();
}
