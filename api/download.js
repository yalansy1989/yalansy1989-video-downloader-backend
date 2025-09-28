export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // 👈 يسمح لكل المواقع بالوصول
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      success: false,
      message: "يرجى إرسال رابط الفيديو"
    });
  }

  // هنا حاليًا مجرد رد تجريبي
  res.status(200).json({
    success: true,
    message: "تم استقبال الرابط بنجاح",
    downloadUrl: url // فقط عشان نتأكد إن الاتصال شغال
  });
}
