import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';
import 'package:study_buds/models/notification_model.dart';
import 'package:study_buds/network/request/notification_list_request.dart';

part 'notification_list_event.dart';
part 'notification_list_state.dart';

// NotificationListBloc is the class representing the Bloc for managing notifications
// NotificationListEvent represents the events that this Bloc will handle
// NotificationListState represents the states that this Bloc will emit
class NotificationListBloc
    extends Bloc<NotificationListEvent, NotificationListState> {
  // initialize the Bloc with an initial state
  NotificationListBloc() : super(NotificationListInitial()) {
    // associate an event handler to the event
    on<FetchNotificationListEvent>(_fetchNotificationList);
  }

  // fetch notification list event handler
  // the event object contains any associated data
  // emit is a function to update the state of the bloc
  Future<void> _fetchNotificationList(FetchNotificationListEvent event,
      Emitter<NotificationListState> emit) async {
    emit(NotificationListLoading());
    try {
      print("====Nona was here:");

      final fetchNotificationRequest = NotificationListRequest(event.studentId);
      final response = await fetchNotificationRequest.send();
      print("yeah");
      if (response.isSuccess) {
        if (response.data != null && response.data!.isNotEmpty) {
          final List<NotificationModel> result =
              NotificationModel.fromJsonList(response.data ?? []);
          emit(NotificationListSuccess(result! as List<NotificationModel>));
        }
      } else {
        emit(NotificationListFailure('Failed to load notification list'));
      }
    } catch (error) {
      print('Error fetching notification list: $error');
      emit(NotificationListFailure('Failed to fetch notification list'));
    }
  }
}
