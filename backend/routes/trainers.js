import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// @route   GET /api/trainers
// @desc    Get all trainers
// @access  Public
router.get('/', async (req, res) => {
    try {
        const [trainers] = await db.query(
            `SELECT t.*, 
              u.first_name, 
              u.last_name, 
              u.email,
              u.profile_image,
              CONCAT(u.first_name, ' ', u.last_name) as full_name
       FROM trainers t
       JOIN users u ON t.user_id = u.id
       ORDER BY t.rating DESC, t.total_sessions DESC`
        );

        res.json({
            success: true,
            count: trainers.length,
            trainers
        });
    } catch (error) {
        console.error('Get trainers error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   GET /api/trainers/:id
// @desc    Get single trainer
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const [trainers] = await db.query(
            `SELECT t.*, 
              u.first_name, 
              u.last_name, 
              u.email,
              u.phone,
              u.profile_image,
              CONCAT(u.first_name, ' ', u.last_name) as full_name
       FROM trainers t
       JOIN users u ON t.user_id = u.id
       WHERE t.id = ?`,
            [req.params.id]
        );

        if (trainers.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Trainer not found'
            });
        }

        res.json({
            success: true,
            trainer: trainers[0]
        });
    } catch (error) {
        console.error('Get trainer error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

export default router;
