package spring.todolist.utility;

import java.text.SimpleDateFormat;
import java.util.Date;

public class UtilityMethods {
    public String getTime() {
        String pattern = "yyyy-MM-dd'T'HH:mm:ss";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        String date = simpleDateFormat.format(new Date());
        return date;
    }
}
