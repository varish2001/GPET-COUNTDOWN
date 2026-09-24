// Vercel Serverless Function for PIN validation
// Compatible with Vercel Node.js runtime

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { pin } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const expectedPin = (process.env.LAUNCH_PIN || '786').trim();

    if (typeof pin !== 'string') {
      return res.status(400).json({ success: false, message: 'Invalid payload' });
    }

    const cleanPin = pin.trim();
    const isMatch = cleanPin.length === 3 && cleanPin === expectedPin;

    return res.status(200).json({
      success: isMatch,
      message: isMatch ? 'PIN verified successfully' : 'Invalid launch PIN. Please try again.',
    });
  } catch {
    return res.status(500).json({ success: false, message: 'Server error during verification' });
  }
}
