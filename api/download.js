export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'يجب إرسال رابط الفيديو في المتغير url' });
  }

  try {
    return res.status(200).json({
      success: true,
      message: 'تم استقبال الرابط بنجاح 👌',
      videoUrl: url
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'حدث خطأ أثناء معالجة الرابط' });
  }
}
