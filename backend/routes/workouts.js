import express from 'express';
import db from '../config/db.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/workouts
// @desc    Get all workouts with filtering
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { difficulty, category, is_premium } = req.query;

        let query = `
      SELECT w.*, 
             CONCAT(u.first_name, ' ', u.last_name) as trainer_name
      FROM workouts w
      LEFT JOIN trainers t ON w.trainer_id = t.id
      LEFT JOIN users u ON t.user_id = u.id
      WHERE 1=1
    `;
        const params = [];

        if (difficulty) {
            query += ' AND w.difficulty = ?';
            params.push(difficulty);
        }

        if (category) {
            query += ' AND w.category = ?';
            params.push(category);
        }

        if (is_premium !== undefined) {
            query += ' AND w.is_premium = ?';
            params.push(is_premium === 'true' ? 1 : 0);
        }

        query += ' ORDER BY w.created_at DESC';

        const [workouts] = await db.query(query, params);

        res.json({
            success: true,
            count: workouts.length,
            workouts
        });
    } catch (error) {
        console.error('Get workouts error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   GET /api/workouts/:id
// @desc    Get single workout
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const [workouts] = await db.query(
            `SELECT w.*, 
              CONCAT(u.first_name, ' ', u.last_name) as trainer_name,
              u.profile_image as trainer_image
       FROM workouts w
       LEFT JOIN trainers t ON w.trainer_id = t.id
       LEFT JOIN users u ON t.user_id = u.id
       WHERE w.id = ?`,
            [req.params.id]
        );

        if (workouts.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Workout not found'
            });
        }

        res.json({
            success: true,
            workout: workouts[0]
        });
    } catch (error) {
        console.error('Get workout error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   GET /api/workouts/categories
// @desc    Get all workout categories
// @access  Public
router.get('/meta/categories', async (req, res) => {
    try {
        const [categories] = await db.query(
            'SELECT DISTINCT category FROM workouts WHERE category IS NOT NULL ORDER BY category'
        );

        res.json({
            success: true,
            categories: categories.map(c => c.category)
        });
    } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

export default router;
