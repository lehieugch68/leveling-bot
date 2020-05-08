# Leveling Bot

Hệ thống cấp bậc cơ bản cho Bot Discord.

Bot sử dụng SQLite và yêu cầu [SQLite3](https://www.npmjs.com/package/sqlite3) (có thể thay thành bất cứ Database nào cùng thư viện tương ứng nào bạn muốn như MySQL, PostgreSQL,...)

Nếu người dùng gửi tin nhắn trong một khoảng thời gian cụ thể (mặc định 1 phút) thì sẽ cộng một lượng điểm ngẫu nhiên (mặc định 10-20), mặc định đủ 500 điểm có thể lên cấp.

Có thể thay đổi ở biến options trong tệp index.js

```
const options = {
  cooldown: 60, //tính theo giây
  xpmin: 10,
  xpmax: 20,
  lvlupXp: 500
}
```
