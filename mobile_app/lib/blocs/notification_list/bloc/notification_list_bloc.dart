import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';
import 'package:study_buds/models/notification_model.dart';
import 'package:study_buds/network/request/notification_list_request.dart';

part 'notification_list_event.dart';
part 'notification_list_state.dart';

class NotificationListBloc
    extends Bloc<NotificationListEvent, NotificationListState> {
  NotificationListBloc() : super(NotificationListInitial()) {
    on<FetchNotificationListEvent>(_fetchNotificationList);
  }

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
          emit(NotificationListSuccess(
              response.data! as List<NotificationModel>));
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
