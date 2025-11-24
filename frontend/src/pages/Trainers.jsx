import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiAward } from 'react-icons/fi';
import api from '../api/axios';
import './Trainers.css';

const Trainers = () => {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTrainers();
    }, []);

    const fetchTrainers = async () => {
        try {
            const response = await api.get('/trainers');
            setTrainers(response.data.trainers);
        } catch (error) {
            console.error('Error fetching trainers:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="trainers-page">
            <div className="trainers-hero" style={{ backgroundImage: "url('/assets/images/trainer-male.png')" }}>
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        OUR EXPERTS
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        GUIDING YOUR TRANSFORMATION
                    </motion.p>
                </div>
            </div>

            <section className="trainers-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-subtitle">WORLD-CLASS COACHING</span>
                        <h2>MEET THE TEAM</h2>
                    </div>

                    <div className="trainers-grid">
                        {trainers.map((trainer, index) => (
                            <motion.div
                                key={trainer.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="trainer-card"
                            >
                                <div className="trainer-image-wrapper">
                                    {trainer.profile_image ? (
                                        <img src={trainer.profile_image} alt={trainer.full_name} className="trainer-image" />
                                    ) : (
                                        <div className="trainer-image-placeholder">
                                            {trainer.first_name[0]}{trainer.last_name[0]}
                                        </div>
                                    )}
                                </div>

                                <div className="trainer-content">
                                    <h3 className="trainer-name">{trainer.full_name}</h3>
                                    <div className="trainer-specialization">{trainer.specialization}</div>

                                    {trainer.bio && (
                                        <p className="trainer-bio">{trainer.bio}</p>
                                    )}

                                    <div className="trainer-stats">
                                        <div className="stat-item">
                                            <span className="stat-value">{trainer.experience_years}+</span>
                                            <span className="stat-label">Years Exp</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-value">{trainer.rating.toFixed(1)}</span>
                                            <span className="stat-label">Rating</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-value">{trainer.total_sessions}</span>
                                            <span className="stat-label">Sessions</span>
                                        </div>
                                    </div>

                                    <div className="trainer-actions">
                                        <button className="btn-book">
                                            Book Session
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Trainers;
