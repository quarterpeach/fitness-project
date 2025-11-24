import express from 'express';
import db from '../config/db.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/memberships
// @desc    Get all membership plans
// @access  Public
router.get('/', async (req, res) => {
    try {
        const [memberships] = await db.query(
            'SELECT * FROM memberships WHERE is_active = TRUE ORDER BY price ASC'
        );

        res.json({
            success: true,
            count: memberships.length,
            memberships
        });
    } catch (error) {
        console.error('Get memberships error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   GET /api/memberships/:id
// @desc    Get single membership plan
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const [memberships] = await db.query(
            'SELECT * FROM memberships WHERE id = ?',
            [req.params.id]
        );

        if (memberships.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Membership plan not found'
            });
        }

        res.json({
            success: true,
            membership: memberships[0]
        });
    } catch (error) {
        console.error('Get membership error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   POST /api/memberships/subscribe
// @desc    Subscribe to a membership plan
// @access  Private
router.post('/subscribe', authenticate, async (req, res) => {
    try {
        const { membership_id } = req.body;
        const user_id = req.user.id;

        // Get membership details
        const [memberships] = await db.query(
            'SELECT * FROM memberships WHERE id = ? AND is_active = TRUE',
            [membership_id]
        );

        if (memberships.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Membership plan not found'
            });
        }

        const membership = memberships[0];

        // Check for active subscription
        const [activeSubs] = await db.query(
            'SELECT * FROM user_memberships WHERE user_id = ? AND status = "active" AND end_date > CURDATE()',
            [user_id]
        );

        if (activeSubs.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'You already have an active membership'
            });
        }

        // Calculate dates
        const start_date = new Date();
        const end_date = new Date();
        end_date.setDate(end_date.getDate() + membership.duration_days);

        // Create subscription
        const [result] = await db.query(
            'INSERT INTO user_memberships (user_id, membership_id, start_date, end_date, status) VALUES (?, ?, ?, ?, "active")',
            [user_id, membership_id, start_date, end_date]
        );

        res.status(201).json({
            success: true,
            message: 'Successfully subscribed to membership',
            subscription: {
                id: result.insertId,
                membership_id,
                start_date,
                end_date,
                status: 'active'
            }
        });
    } catch (error) {
        console.error('Subscribe error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   GET /api/memberships/my-subscription
// @desc    Get user's current subscription
// @access  Private
router.get('/my/subscription', authenticate, async (req, res) => {
    try {
        const [subscriptions] = await db.query(
            `SELECT um.*, m.name, m.description, m.price, m.tier, m.features
       FROM user_memberships um
       JOIN memberships m ON um.membership_id = m.id
       WHERE um.user_id = ? AND um.status = 'active' AND um.end_date > CURDATE()
       ORDER BY um.created_at DESC
       LIMIT 1`,
            [req.user.id]
        );

        if (subscriptions.length === 0) {
            return res.json({
                success: true,
                subscription: null
            });
        }

        res.json({
            success: true,
            subscription: subscriptions[0]
        });
    } catch (error) {
        console.error('Get subscription error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

export default router;
