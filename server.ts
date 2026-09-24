import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Security: PIN validation endpoint
  // Validates PIN against server environment variable LAUNCH_PIN (default 786)
  // Never exposes or echoes the actual PIN back to client
  app.post('/api/validate-pin', (req, res) => {
    try {
      const { pin } = req.body || {};
      const expectedPin = (process.env.LAUNCH_PIN || '786').trim();

      if (typeof pin !== 'string') {
        return res.status(400).json({ success: false, message: 'Invalid payload' });
      }

      const cleanPin = pin.trim();
      const isMatch = cleanPin.length === 3 && cleanPin === expectedPin;

      // Return boolean status only
      return res.status(200).json({
        success: isMatch,
        message: isMatch ? 'PIN verified successfully' : 'Invalid launch PIN. Please try again.',
      });
    } catch {
      return res.status(500).json({ success: false, message: 'Verification error' });
    }
  });

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', launchTarget: '2026-09-25T11:25:00+05:30' });
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GPET 2026 Launch Gate server listening on port ${PORT}`);
  });
}

startServer();
