// /api/youtube.js

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ success: false, message: "يرجى إرسال رابط الفيديو" });
  }

  try {
    // ✅ استخدام خدمة Y2Mate Rapid API (تحتاج مفتاح API مجاني)
    const rapidApiKey = process.env.RAPID_API_KEY; // ضع المفتاح في إعدادات Vercel
    const response = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${encodeURIComponent(url)}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com',
        'X-RapidAPI-Key': rapidApiKey
      }
    });
    const data = await response.json();

    if (data && data.link) {
      return res.status(200).json({
        success: true,
        message: "تم إنشاء رابط التحميل بنجاح ✅",
        downloadUrl: data.link
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "تعذر الحصول على رابط التحميل من YouTube"
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء معالجة الطلب",
      error: error.message
    });
  }
}
