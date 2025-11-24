import express from 'express';
import db from '../config/db.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Private
router.post('/', authenticate, async (req, res) => {
    try {
        const { booking_type, class_id, trainer_id, booking_date, start_time, end_time, notes } = req.body;
        const user_id = req.user.id;

        // Validation
        if (!booking_type || !booking_date || !start_time || !end_time) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        if (booking_type === 'class' && !class_id) {
            return res.status(400).json({
                success: false,
                message: 'Class ID is required for class bookings'
            });
        }

        if (booking_type === 'personal_training' && !trainer_id) {
            return res.status(400).json({
                success: false,
                message: 'Trainer ID is required for personal training bookings'
            });
        }

        // Check class capacity if booking a class
        if (booking_type === 'class') {
            const [classes] = await db.query(
                'SELECT * FROM classes WHERE id = ? AND is_cancelled = FALSE',
                [class_id]
            );

            if (classes.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Class not found or cancelled'
                });
            }

            const classData = classes[0];
            if (classData.enrolled_count >= classData.capacity) {
                return res.status(400).json({
                    success: false,
                    message: 'Class is fully booked'
                });
            }

            // Increment enrolled count
            await db.query(
                'UPDATE classes SET enrolled_count = enrolled_count + 1 WHERE id = ?',
                [class_id]
            );
        }

        // Create booking
        const [result] = await db.query(
            `INSERT INTO bookings 
       (user_id, booking_type, class_id, trainer_id, booking_date, start_time, end_time, notes, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'confirmed')`,
            [user_id, booking_type, class_id || null, trainer_id || null, booking_date, start_time, end_time, notes || null]
        );

        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            booking: {
                id: result.insertId,
                user_id,
                booking_type,
                class_id,
                trainer_id,
                booking_date,
                start_time,
                end_time,
                status: 'confirmed'
            }
        });
    } catch (error) {
        console.error('Create booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   GET /api/bookings/my-bookings
// @desc    Get user's bookings
// @access  Private
router.get('/my-bookings', authenticate, async (req, res) => {
    try {
        const [bookings] = await db.query(
            `SELECT b.*,
              c.name as class_name,
              c.class_type,
              CONCAT(u.first_name, ' ', u.last_name) as trainer_name
       FROM bookings b
       LEFT JOIN classes c ON b.class_id = c.id
       LEFT JOIN trainers t ON b.trainer_id = t.id
       LEFT JOIN users u ON t.user_id = u.id
       WHERE b.user_id = ?
       ORDER BY b.booking_date DESC, b.start_time DESC`,
            [req.user.id]
        );

        res.json({
            success: true,
            count: bookings.length,
            bookings
        });
    } catch (error) {
        console.error('Get bookings error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   DELETE /api/bookings/:id
// @desc    Cancel a booking
// @access  Private
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const [bookings] = await db.query(
            'SELECT * FROM bookings WHERE id = ? AND user_id = ?',
            [req.params.id, req.user.id]
        );

        if (bookings.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        const booking = bookings[0];

        // If class booking, decrement enrolled count
        if (booking.class_id) {
            await db.query(
                'UPDATE classes SET enrolled_count = enrolled_count - 1 WHERE id = ?',
                [booking.class_id]
            );
        }

        // Update booking status
        await db.query(
            'UPDATE bookings SET status = "cancelled" WHERE id = ?',
            [req.params.id]
        );

        res.json({
            success: true,
            message: 'Booking cancelled successfully'
        });
    } catch (error) {
        console.error('Cancel booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

export default router;
