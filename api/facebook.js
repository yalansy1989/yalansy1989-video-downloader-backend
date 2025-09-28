export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      success: false,
      message: "يرجى إرسال رابط فيديو Facebook"
    });
  }

  try {
    // 🔥 واجهة مجانية للتجربة
    const apiUrl = `https://facebook-video-download1.p.rapidapi.com/?url=${encodeURIComponent(url)}`;

    const response = await fetch(apiUrl, {
      headers: {
        "x-rapidapi-host": "facebook-video-download1.p.rapidapi.com",
        // إذا احتجت مفتاح API مجاني ضعه هنا
        // "x-rapidapi-key": "ضع مفتاح RapidAPI الخاص بك هنا"
      }
    });

    const data = await response.json();

    if (data && data.sd) {
      return res.status(200).json({
        success: true,
        message: "✅ تم إنشاء رابط التحميل بنجاح",
        downloadUrl: data.hd || data.sd
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "تعذر الحصول على رابط التحميل من Facebook"
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء معالجة رابط Facebook"
    });
  }
}
