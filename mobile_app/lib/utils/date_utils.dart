class DateTimeUtils {

  static String dateDiffToString(DateTime value) {
    DateTime nowDate = DateTime.now();
    Duration difference = nowDate.difference(value);
    int days = difference.inDays;
    if (days == 0)
      return 'New';
    if (days == 1)
      return 'Yesterday';
    else if (days <= 7)
      return 'Last 7 days';
    else if (days > 30){
      var m = days / 30;
      return 'Last ${m} months';
    }
    return 'New';
  }
}