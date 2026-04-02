# Hướng dẫn: Tự động thu thập Lead từ Chatbot vào Google Sheets

Hệ thống này giúp AI tự động nhận diện thông tin khách hàng (Tên, SĐT, Email), bóc tách và gửi về Google Sheets trong khi vẫn duy trì hội thoại tự nhiên.

---

## Bước 1: Thiết lập Google Sheets & Apps Script

1. Truy cập [Google Sheets](https://sheets.new) và tạo một bảng tính mới.
2. Đặt tên các cột tại dòng 1: `Thời gian`, `Tên`, `Số điện thoại`, `Email`, `Nguồn`, `Session ID`, `Lịch sử Chat`.
3. Vào **Extensions (Tiện ích mở rộng)** > **Apps Script**.
4. Xóa hết code cũ và dán đoạn mã sau vào file `Code.gs`:

```javascript
/* --- Code.gs (Phiên bản Chống Trùng Lặp) --- */

const SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();
const SHEET_NAME = 'Sheet1'; 

/**
 * CẤU TRÚC CỘT: 
 * A: Thời gian | B: Tên | C: SĐT | D: Email | E: Nguồn | F: Session ID | G: Lịch sử Chat
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    
    // Lấy toàn bộ dữ liệu cột F (Session ID) để tìm kiếm
    const lastRow = sheet.getLastRow();
    let rowIndex = -1;
    
    if (lastRow > 1) {
      const sessionIds = sheet.getRange(2, 6, lastRow - 1, 1).getValues();
      for (let i = 0; i < sessionIds.length; i++) {
        if (sessionIds[i][0] === data.sessionId) {
          rowIndex = i + 2; // +2 vì index bắt đầu từ 0 và bỏ qua tiêu đề
          break;
        }
      }
    }

    if (rowIndex > 0) {
      // NẾU ĐÃ CÓ: Cập nhật thông tin mới nhất và nối dài Lịch sử Chat
      // Cập nhật Tên, SĐT, Email nếu data mới có thông tin
      if (data.name) sheet.getRange(rowIndex, 2).setValue(data.name);
      if (data.phone) sheet.getRange(rowIndex, 3).setValue(data.phone);
      if (data.email) sheet.getRange(rowIndex, 4).setValue(data.email);
      
      // Update Lịch sử Chat và Thời gian mới nhất
      sheet.getRange(rowIndex, 1).setValue(new Date().toLocaleString('vi-VN'));
      sheet.getRange(rowIndex, 7).setValue(data.chatHistory);
      
      return ContentService.createTextOutput(JSON.stringify({ status: "success", info: "Updated existing lead" }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      // NẾU CHƯA CÓ: Tạo dòng mới
      sheet.appendRow([
        new Date().toLocaleString('vi-VN'),
        data.name || 'N/A',
        data.phone || 'N/A',
        data.email || 'N/A',
        data.source || 'N/A',
        data.sessionId || 'N/A',
        data.chatHistory || 'N/A'
      ]);
      
      return ContentService.createTextOutput(JSON.stringify({ status: "success", info: "Created new lead" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
      
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput("API Lead Capture (Duplicate Prevention) is active!")
    .setMimeType(ContentService.MimeType.TEXT);
}
```

---

## Bước 2: Deploy mã lên Web App (QUAN TRỌNG)

1. Nhấn nút **Deploy (Triển khai)** ở góc trên bên phải > **New deployment**.
2. Chọn loại: **Web app**.
3. Tại phần **Execute as (Thực hiện dưới danh nghĩa)**: Chọn **Me (Tôi)**.
4. Tại phần **Who has access (Ai có quyền truy cập)**: Chọn **Anyone (Bất kỳ ai)**. *Đây là bước bắt buộc để Frontend có thể gửi data mà không cần login.*
5. Nhấn **Deploy**. Nếu Google yêu cầu cấp quyền, hãy nhấn "Allow/Cho phép".
6. **Copy URL của Web App** vừa tạo (Có định dạng `https://script.google.com/macros/s/.../exec`).

---

## Bước 3: Cập nhật Frontend (Next.js)

Tại dự án của bạn, hãy cập nhật file `src/components/ui/Chatbot.tsx` và dán URL vừa copy vào biến `GOOGLE_SCRIPT_URL`.

### Logic xử lý Lead tại Frontend:

Mã nguồn frontend hiện tại của bạn đã có sẵn các hàm `processAIResponse` và `sendLeadToGoogleSheets`. Bạn chỉ cần đảm bảo:

1.  **Tag ẩn được bóc tách:** Dùng Regex để tìm thẻ `||LEAD_DATA:...||`.
2.  **Chế độ `no-cors`:** Vì Google Apps Script không hỗ trợ CORS đầy đủ cho các yêu cầu POST trực tiếp, chúng ta dùng `mode: 'no-cors'`. Dữ liệu vẫn được gửi đi thành công dù browser báo lỗi "Opaque response".

---

## Bước 4: Cách Chatbot lấy Lead (System Prompt)

Tôi đã cập nhật file `src/app/api/chat/route.ts` của bạn với một System Prompt thông minh hơn. 

**Quy trình hội thoại:**
1. AI sẽ bắt đầu bằng cách hỏi nhu cầu của khách (Học AI để làm gì? Vấn đề vận hành là gì?).
2. Sau khi tư vấn 1-2 câu, AI sẽ khéo léo gợi ý khách để lại thông tin để "gửi tài liệu" hoặc "tư vấn 1-1".
3. Ngay khi khách cung cấp thông tin, AI sẽ âm thầm chèn thẻ dữ liệu vào response.

---

## Kết quả mong đợi

1. Khách chat: "Chào bạn, mình là Hùng, SĐT: 0901234xxx, mình muốn hỏi về khóa K12".
2. AI trả lời: "Chào anh Hùng! Cảm ơn anh đã quan tâm đến khóa K12... ||LEAD_DATA: {"name": "Hùng", "phone": "0901234xxx", "email": null}||"
3. UI khách hàng: Chỉ thấy câu trả lời của AI.
4. Google Sheets: Tự động xuất hiện dòng dữ liệu mới kèm toàn bộ lịch sử hội thoại để bạn nắm bắt ngữ cảnh trước khi gọi lại cho khách.

> [!TIP]
> Bạn hãy test thử bằng cách chat trực tiếp với bot trên trình duyệt và kiểm tra xem Google Sheets có nhảy dữ liệu không nhé!
