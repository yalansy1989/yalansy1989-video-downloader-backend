export default function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ success: false, message: "يرجى إرسال رابط الفيديو" });

  // 🔹 هنا تضع منطق تحميل الفيديو الحقيقي لاحقًا
  res.status(200).json({
    success: true,
    downloadUrl: url, // مجرد اختبار
    message: "✅ تم إنشاء رابط التحميل بنجاح"
  });
}
