import ytdl from "ytdl-core";

export default async function handler(req, res) {
  // سماح بـ CORS إذا الواجهة أمامية منفصلة
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // معاملة الطلب المسبق
  }

  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ success: false, message: "يرجى إرسال رابط الفيديو" });
  }

  // تحقق إن الرابط صالح لي هذا الرابط يوتيوب
  if (!ytdl.validateURL(url)) {
    return res.status(400).json({ success: false, message: "رابط يوتيوب غير صالح" });
  }

  try {
    const info = await ytdl.getInfo(url);
    // اختيار أفضل جودة فيديو + صوت
    const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });
    if (!format || !format.url) {
      return res.status(500).json({ success: false, message: "لم أتمكن من الحصول على رابط التحميل" });
    }
    return res.status(200).json({
      success: true,
      downloadUrl: format.url,
      message: "تم تجهيز رابط التحميل بنجاح"
    });
  } catch (err) {
    console.error("خطأ في ytdl:", err);
    return res.status(500).json({ success: false, message: "حدث خطأ في السيرفر" });
  }
}
