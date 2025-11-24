import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// @route   GET /api/classes
// @desc    Get all classes
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { class_type, upcoming } = req.query;

        let query = `
      SELECT c.*,
             CONCAT(u.first_name, ' ', u.last_name) as trainer_name,
             u.profile_image as trainer_image
      FROM classes c
      JOIN trainers t ON c.trainer_id = t.id
      JOIN users u ON t.user_id = u.id
      WHERE c.is_cancelled = FALSE
    `;
        const params = [];

        if (class_type) {
            query += ' AND c.class_type = ?';
            params.push(class_type);
        }

        if (upcoming === 'true') {
            query += ' AND c.start_time > NOW()';
        }

        query += ' ORDER BY c.start_time ASC';

        const [classes] = await db.query(query, params);

        res.json({
            success: true,
            count: classes.length,
            classes
        });
    } catch (error) {
        console.error('Get classes error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   GET /api/classes/:id
// @desc    Get single class
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const [classes] = await db.query(
            `SELECT c.*,
              CONCAT(u.first_name, ' ', u.last_name) as trainer_name,
              u.profile_image as trainer_image,
              t.specialization,
              t.rating as trainer_rating
       FROM classes c
       JOIN trainers t ON c.trainer_id = t.id
       JOIN users u ON t.user_id = u.id
       WHERE c.id = ?`,
            [req.params.id]
        );

        if (classes.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Class not found'
            });
        }

        res.json({
            success: true,
            class: classes[0]
        });
    } catch (error) {
        console.error('Get class error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

export default router;
