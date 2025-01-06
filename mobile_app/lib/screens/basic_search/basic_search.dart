import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:study_buds/blocs/basic_search/bloc/basic_search_bloc.dart';
import 'package:study_buds/blocs/join_group/bloc/join_group_bloc.dart';
import 'package:study_buds/widgets/group_card.dart';
import 'package:provider/provider.dart';
import '../../blocs/group_details/bloc/group_details_bloc.dart';
import 'package:card_swiper/card_swiper.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: BasicSearchPage(key: Key('search_page'), title: "heyy"),
    );
  }
}

class BasicSearchPage extends StatelessWidget {
  const BasicSearchPage({super.key, required this.title});
  final String title;
  // final bool is_searched;

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => BasicSearchBloc(),
      child: Scaffold(
        appBar: AppBar(
          title: const Text(
            'Search for a study group',
            style: TextStyle(fontWeight: FontWeight.w600),
          ),
          centerTitle: true,
          backgroundColor: Theme.of(context).scaffoldBackgroundColor,
          elevation: 0,
          foregroundColor: Theme.of(context).primaryColor,
        ),
        body: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            children: [
              _SearchBar(),
              const SizedBox(height: 20),
              Expanded(
                child: MultiProvider(
                  providers: [
                    Provider<GroupDetailsBloc>(
                        create: (_) => GroupDetailsBloc()),
                    Provider<JoinGroupBloc>(create: (_) => JoinGroupBloc()),
                  ],
                  child: _SearchResults(),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _SearchBar extends StatelessWidget {
  final TextEditingController _searchController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return TextField(
      key: Key('search_bar'),
      controller: _searchController,
      onSubmitted: (String query) {
        context.read<BasicSearchBloc>().add(SearchQueryChanged(query, 10));
      },
      decoration: InputDecoration(
        hintText: 'Search...',
        suffixIcon: IconButton(
          icon: Icon(Icons.clear),
          onPressed: () => _searchController.clear(),
        ),
        prefixIcon: IconButton(
          key: Key('search_button'),
          icon: Icon(Icons.search),
          onPressed: () {
            context
                .read<BasicSearchBloc>()
                .add(SearchQueryChanged(_searchController.text, 10));
          },
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(20.0),
        ),
      ),
    );
  }
}

class _SearchResults extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<BasicSearchBloc, BasicSearchState>(
      builder: (context, state) {
        if (state is SuggestedGroup) {
          return Center(
              child: Column(children: [
            Text("Suggested groups for you",
                style: TextStyle(color: Colors.orange)),
            const SizedBox(height: 20),
            Text("this will be the swiper")
          ]));
        }
        if (state is SearchInitial) {
          return Center(child: Text('Enter a query to search for groups.'));
        } else if (state is SearchLoading) {
          return Center(child: CircularProgressIndicator());
        } else if (state is SearchSuccess) {
          final groups = state.groups;
          if (groups.isEmpty) {
            return Column(
              key: Key('no_results_column'),
              children: [
                Center(
                  key: Key('no_results_message'),
                  child: Text('No results found.'),
                ),
                Expanded(
                  child: ListView.builder(
                    key: Key('search_results'),
                    itemCount: 0,
                    itemBuilder: (context, index) {
                      return SizedBox.shrink();
                    },
                  ),
                ),
              ],
            );
          }
          return ListView.builder(
            key: Key('search_results'),
            itemCount: groups.length,
            itemBuilder: (context, index) {
              final group = groups[index];
              return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  GroupCard(group: group, index: index),
                  Divider(),
                ],
              );
            },
          );
        } else if (state is SearchFailure) {
          return Center(child: Text('Error: ${state.error}'));
        } else {
          return Center(child: Text(''));
        }
      },
    );
  }
}

class _SuggestedGroups extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<BasicSearchBloc, BasicSearchState>(
      builder: (context, state) {
        if (state is SuggestedGroup) {
          return Center(
              child: Column(children: [
            Text("Suggested groups for you",
                style: TextStyle(color: Colors.orange)),
            const SizedBox(height: 20),
            Text("this will be the swiper")
          ]));
        } else if (state is SearchLoading) {
          return Center(child: CircularProgressIndicator());
        } else if (state is SearchSuccess) {
          final groups = state.groups;
          if (groups.isEmpty) {
            return Column(
              key: Key('no_results_column'),
              children: [
                Center(
                  key: Key('no_results_message'),
                  child: Text('No results found.'),
                ),
                Expanded(
                  child: ListView.builder(
                    key: Key('search_results'),
                    itemCount: 0,
                    itemBuilder: (context, index) {
                      return SizedBox.shrink();
                    },
                  ),
                ),
              ],
            );
          }
          return ListView.builder(
            key: Key('search_results'),
            itemCount: groups.length,
            itemBuilder: (context, index) {
              final group = groups[index];
              return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  GroupCard(group: group, index: index),
                  Divider(),
                ],
              );
            },
          );
        } else if (state is SearchFailure) {
          return Center(child: Text('Error: ${state.error}'));
        } else {
          return Center(child: Text(''));
        }
      },
    );
  }
}
