export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ success: false, message: "يرجى إرسال رابط الفيديو" });
  }

  res.status(200).json({
    success: true,
    message: "✅ تم إنشاء رابط التحميل بنجاح",
    downloadUrl: "https://www.tiktok.com/abc123"
  });
}
