-- Sample data for luxury fitness platform

USE luxury_fitness;

-- Insert sample trainers
INSERT INTO users (email, password_hash, first_name, last_name, phone, role) VALUES
('sarah.fitness@luxuryfitness.com', '$2a$10$rO8g3K9N.DxXmXGZ8yXjUeK4r7XqZ6oQx4wT6xZ5yKjVnL9mP8n2S', 'Sarah', 'Johnson', '+1 (555) 100-0001', 'trainer'),
('mike.trainer@luxuryfitness.com', '$2a$10$rO8g3K9N.DxXmXGZ8yXjUeK4r7XqZ6oQx4wT6xZ5yKjVnL9mP8n2S', 'Mike', 'Chen', '+1 (555) 100-0002', 'trainer'),
('alex.coach@luxuryfitness.com', '$2a$10$rO8g3K9N.DxXmXGZ8yXjUeK4r7XqZ6oQx4wT6xZ5yKjVnL9mP8n2S', 'Alex', 'Martinez', '+1 (555) 100-0003', 'trainer');

-- Get trainer user IDs
SET @sarah_id = (SELECT id FROM users WHERE email = 'sarah.fitness@luxuryfitness.com');
SET @mike_id = (SELECT id FROM users WHERE email = 'mike.trainer@luxuryfitness.com');
SET @alex_id = (SELECT id FROM users WHERE email = 'alex.coach@luxuryfitness.com');

-- Insert trainer profiles
INSERT INTO trainers (user_id, specialization, bio, certifications, experience_years, hourly_rate, rating, total_sessions) VALUES
(@sarah_id, 'Strength & Conditioning', 'Specialized in transforming bodies through science-based strength training and nutrition. Former Olympic athlete with a passion for helping clients achieve their peak performance.', 
 '["NASM-CPT", "CSCS", "Precision Nutrition L2"]', 8, 150.00, 4.9, 500),

(@mike_id, 'HIIT & Cardio', 'High-intensity interval training expert dedicated to maximizing calorie burn and cardiovascular health. Known for challenging yet fun workout sessions.', 
 '["ACE-CPT", "CrossFit L2", "TRX Certified"]', 6, 120.00, 4.8, 350),

(@alex_id, 'Yoga & Mindfulness', 'Bringing balance to body and mind through yoga, meditation, and holistic wellness. Trained in multiple yoga disciplines with focus on injury prevention and flexibility.', 
 '["RYT-500", "Meditation Teacher", "Sports Yoga Specialist"]', 10, 130.00, 4.95, 450);

-- Insert sample workouts
INSERT INTO workouts (title, description, difficulty, duration_minutes, category, trainer_id, is_premium) VALUES
('Total Body Strength', 'Complete full-body strength training workout targeting all major muscle groups. Perfect for building lean muscle and increasing metabolism.', 
 'intermediate', 45, 'Strength', 1, FALSE),

('HIIT Inferno', 'High-intensity interval training designed to torch calories and boost endurance. Fast-paced and challenging.', 
 'advanced', 30, 'HIIT', 2, TRUE),

('Morning Flow Yoga', 'Gentle yet energizing yoga sequence to start your day. Improves flexibility and mental clarity.', 
 'beginner', 60, 'Yoga', 3, FALSE),

('Advanced Powerlifting', 'Elite powerlifting program for serious strength athletes. Focus on squat, bench, and deadlift progression.', 
 'advanced', 90, 'Strength', 1, TRUE),

('Core Blast', 'Intense core-focused workout building functional strength and stability. Great for all fitness levels.', 
 'beginner', 20, 'Strength', 2, FALSE),

('Restorative Yoga', 'Deep relaxation and muscle recovery through gentle poses and breathing techniques. Perfect for rest days.', 
 'beginner', 45, 'Yoga', 3, FALSE),

('Cardio Kickboxing', 'High-energy kickboxing workout combining martial arts techniques with cardio conditioning.', 
 'intermediate', 50, 'Cardio', 2, FALSE),

('Pilates Core Power', 'Build core strength and improve posture with this challenging Pilates-inspired workout.', 
 'intermediate', 40, 'Pilates', 3, TRUE);

-- Insert sample classes
INSERT INTO classes (name, description, trainer_id, start_time, end_time, capacity, enrolled_count, location, class_type, price) VALUES
('Morning Power Hour', 'Start your day with an energizing full-body workout', 1, 
 DATE_ADD(NOW(), INTERVAL 1 DAY) + INTERVAL 6 HOUR, 
 DATE_ADD(NOW(), INTERVAL 1 DAY) + INTERVAL 7 HOUR, 
 20, 12, 'Studio A', 'Strength', 35.00),

('Sunset Yoga', 'Wind down with a relaxing evening yoga session', 3, 
 DATE_ADD(NOW(), INTERVAL 1 DAY) + INTERVAL 18 HOUR, 
 DATE_ADD(NOW(), INTERVAL 1 DAY) + INTERVAL 19 HOUR, 
 15, 8, 'Yoga Studio', 'Yoga', 30.00),

('HIIT Blast', 'High-intensity interval training to maximize calorie burn', 2, 
 DATE_ADD(NOW(), INTERVAL 2 DAY) + INTERVAL 12 HOUR, 
 DATE_ADD(NOW(), INTERVAL 2 DAY) + INTERVAL 13 HOUR, 
 25, 18, 'Studio B', 'HIIT', 40.00),

('Strength & Conditioning', 'Build muscle and increase strength with expert guidance', 1, 
 DATE_ADD(NOW(), INTERVAL 3 DAY) + INTERVAL 9 HOUR, 
 DATE_ADD(NOW(), INTERVAL 3 DAY) + INTERVAL 10 HOUR + INTERVAL 30 MINUTE, 
 15, 10, 'Weight Room', 'Strength', 45.00),

('Meditation & Mindfulness', 'Find inner peace and reduce stress through guided meditation', 3, 
 DATE_ADD(NOW(), INTERVAL 4 DAY) + INTERVAL 7 HOUR, 
 DATE_ADD(NOW(), INTERVAL 4 DAY) + INTERVAL 8 HOUR, 
 20, 5, 'Meditation Room', 'Yoga', 25.00);

-- Sample demo user (password: demo123)
INSERT INTO users (email, password_hash, first_name, last_name, phone, role) VALUES
('demo@luxuryfitness.com', '$2a$10$rO8g3K9N.DxXmXGZ8yXjUeK4r7XqZ6oQx4wT6xZ5yKjVnL9mP8n2S', 'Demo', 'User', '+1 (555) 123-4567', 'user');

SELECT 'Sample data inserted successfully!' AS message;
