import React, { useState, useEffect } from 'react';
import { Spin, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import MentorOnboarding from './MentorOnboarding';

/**
 * Controller component that manages the mentor onboarding flow.
 * This component checks if the user already has a mentor profile,
 * and if not, shows the onboarding process.
 */
const MentorOnboardingController = () => {
    const [loading, setLoading] = useState(true);
    const [hasMentorProfile, setHasMentorProfile] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkMentorProfile = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/mentors/me', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setHasMentorProfile(!!data.mentor);
                } else {
                    // If we get a 404 or other error, assume no mentor profile
                    setHasMentorProfile(false);
                }
            } catch (error) {
                console.error('Error checking mentor profile:', error);
                setHasMentorProfile(false);
            } finally {
                setLoading(false);
            }
        };

        checkMentorProfile();
    }, []);

    const handleOnboardingComplete = (mentorData) => {
        message.success('Your mentor profile has been created successfully!');
        navigate('/profile');
    };

    const handleSkipOnboarding = () => {
        message.info('You can set up your mentor profile later from your profile page.');
        navigate('/mentors');
    };

    // If already loading or has mentor profile, don't show onboarding
    if (loading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                height: '100vh',
                background: 'linear-gradient(135deg, #EDE9FE 0%, #F5F3FF 50%, #FEF2F2 100%)'
            }}>
                <Spin size="large" tip="Loading..." />
            </div>
        );
    }

    // If user already has a mentor profile, redirect to dashboard
    if (hasMentorProfile) {
        navigate('/mentors');
        return null;
    }

    // Otherwise show the onboarding
    return (
        <MentorOnboarding 
            onComplete={handleOnboardingComplete}
            onSkip={handleSkipOnboarding}
        />
    );
};

export default MentorOnboardingController;