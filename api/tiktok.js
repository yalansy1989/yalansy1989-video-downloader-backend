// /api/tiktok.js

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ success: false, message: "يرجى إرسال رابط الفيديو" });
  }

  try {
    // ✅ استدعاء API مجاني (Tikwm)
    const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data && data.data && data.data.play) {
      return res.status(200).json({
        success: true,
        message: "تم إنشاء رابط التحميل بنجاح ✅",
        downloadUrl: data.data.play
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "تعذر الحصول على رابط التحميل من TikTok"
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
