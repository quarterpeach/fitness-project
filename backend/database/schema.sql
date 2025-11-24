-- Luxury Fitness Platform Database Schema

CREATE DATABASE IF NOT EXISTS luxury_fitness;
USE luxury_fitness;

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role ENUM('user', 'trainer', 'admin') DEFAULT 'user',
    profile_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- Membership plans
CREATE TABLE memberships (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    duration_days INT NOT NULL,
    features JSON,
    tier ENUM('basic', 'premium', 'elite') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- User memberships (active subscriptions)
CREATE TABLE user_memberships (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    membership_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status ENUM('active', 'expired', 'cancelled') DEFAULT 'active',
    payment_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (membership_id) REFERENCES memberships(id),
    INDEX idx_user_status (user_id, status),
    INDEX idx_dates (start_date, end_date)
);

-- Trainers
CREATE TABLE trainers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    specialization VARCHAR(255),
    bio TEXT,
    certifications JSON,
    experience_years INT,
    hourly_rate DECIMAL(10, 2),
    rating DECIMAL(3, 2) DEFAULT 0.00,
    total_sessions INT DEFAULT 0,
    availability JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_rating (rating),
    INDEX idx_specialization (specialization)
);

-- Workout programs
CREATE TABLE workouts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    difficulty ENUM('beginner', 'intermediate', 'advanced') NOT NULL,
    duration_minutes INT NOT NULL,
    category VARCHAR(100),
    image_url VARCHAR(255),
    video_url VARCHAR(255),
    exercises JSON,
    trainer_id INT,
    is_premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (trainer_id) REFERENCES trainers(id) ON DELETE SET NULL,
    INDEX idx_difficulty (difficulty),
    INDEX idx_category (category),
    INDEX idx_premium (is_premium)
);

-- Fitness classes
CREATE TABLE classes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    trainer_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    capacity INT NOT NULL,
    enrolled_count INT DEFAULT 0,
    location VARCHAR(255),
    class_type VARCHAR(100),
    price DECIMAL(10, 2),
    image_url VARCHAR(255),
    is_cancelled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (trainer_id) REFERENCES trainers(id),
    INDEX idx_start_time (start_time),
    INDEX idx_trainer (trainer_id),
    INDEX idx_type (class_type)
);

-- Bookings
CREATE TABLE bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    booking_type ENUM('class', 'personal_training') NOT NULL,
    class_id INT,
    trainer_id INT,
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE SET NULL,
    FOREIGN KEY (trainer_id) REFERENCES trainers(id) ON DELETE SET NULL,
    INDEX idx_user_date (user_id, booking_date),
    INDEX idx_status (status)
);

-- Payments
CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_type ENUM('membership', 'class', 'personal_training') NOT NULL,
    payment_method VARCHAR(50),
    transaction_id VARCHAR(255),
    status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_transaction (transaction_id)
);

-- Insert sample membership plans
INSERT INTO memberships (name, description, price, duration_days, features, tier) VALUES
('Basic Membership', 'Perfect for getting started on your fitness journey', 99.00, 30, 
    '["Access to gym facilities", "Basic workout programs", "Locker room access", "Free fitness assessment"]', 
    'basic'),
('Premium Membership', 'Elevate your training with premium features', 199.00, 30, 
    '["All Basic features", "Unlimited group classes", "1 personal training session/month", "Nutrition consultation", "Premium locker", "Access to spa facilities"]', 
    'premium'),
('Elite Membership', 'The ultimate luxury fitness experience', 499.00, 30, 
    '["All Premium features", "Unlimited personal training", "Custom meal plans", "Priority class booking", "Exclusive member events", "Massage therapy", "Private training area access", "Concierge service"]', 
    'elite');
