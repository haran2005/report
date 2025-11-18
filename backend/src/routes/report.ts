import express from 'express';
import Report from '../models/Report';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/submit', authMiddleware, async (req: express.Request, res: express.Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized - No user data' });
    }

    const { date, report } = req.body as { date?: string; report: string };

    if (!report?.trim()) {
      return res.status(400).json({ message: 'Report content is required' });
    }

    const newReport = new Report({
      userId: req.user.id,
      username: req.user.email,
      date: date ? new Date(date) : new Date(),
      report: report.trim(),
    });

    await newReport.save();

    res.status(201).json({ 
      message: 'Report submitted successfully!',
      data: { date: newReport.date, username: newReport.username }
    });

  } catch (err: any) {
    console.error('Report submit error:', err);
    res.status(500).json({ 
      message: 'Server error', 
      error: err.message || 'Unknown error'
    });
  }
});

router.get('/all', authMiddleware, async (req: express.Request, res: express.Response) => {
  try {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const reports = await Report.find().sort({ date: -1 }); // newest first
    res.json({ reports });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;