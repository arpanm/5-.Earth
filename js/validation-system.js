// Define impact levels for validation forms
const IMPACT_LEVELS = {
    LOW: {
        name: 'Low Impact',
        description: 'Minor positive environmental impact',
        points: 5
    },
    MEDIUM: {
        name: 'Medium Impact',
        description: 'Moderate positive environmental impact',
        points: 10
    },
    HIGH: {
        name: 'High Impact',
        description: 'Significant positive environmental impact',
        points: 20
    },
    EXCEPTIONAL: {
        name: 'Exceptional Impact',
        description: 'Outstanding positive environmental impact',
        points: 30
    }
};
// Validation Types and their weights
const VALIDATION_TYPES = {
    SELF: { weight: 1, name: 'Self Validation' },
    CROWDSOURCE: { weight: 2, name: 'Community Validation' },
    AI: { weight: 3, name: 'AI Validation' },
    EXPERT: { weight: 4, name: 'Expert Validation' }
};


// User levels configuration
const USER_LEVELS = {
    BRONZE: { minPoints: 0, name: 'Bronze', multiplier: 1 },
    SILVER: { minPoints: 1000, name: 'Silver', multiplier: 1.2 },
    GOLD: { minPoints: 5000, name: 'Gold', multiplier: 1.5 },
    PLATINUM: { minPoints: 20000, name: 'Platinum', multiplier: 2 }
};

// Badges configuration
const BADGES = {
    WATER_SAVER: {
        id: 'water_saver',
        name: 'Water Saver',
        description: 'Saved significant amount of water through conservation efforts',
        requirement: { type: 'WATER_CONSERVATION', points: 500 }
    },
    RAINWATER_CHAMPION: {
        id: 'rainwater_champion',
        name: 'Rainwater Champion',
        description: 'Implemented effective rainwater harvesting systems',
        requirement: { type: 'RAINWATER_HARVESTING', points: 1000 }
    },
    COMMUNITY_LEADER: {
        id: 'community_leader',
        name: 'Community Leader',
        description: 'Actively engaged in community water conservation efforts',
        requirement: { type: 'COMMUNITY_ENGAGEMENT', points: 2000 }
    }
};

// Make constants available globally
window.VALIDATION_TYPES = VALIDATION_TYPES;
window.IMPACT_LEVELS = IMPACT_LEVELS;
window.USER_LEVELS = USER_LEVELS;
window.BADGES = BADGES;

// Validation UI Handler
// Initialize validation UI when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    this.modal = document.getElementById('validationModal');
    // Event listener for opening the modal
    document.getElementById('validateBtn').addEventListener('click', () => {
        this.modal.style.display = 'block';
    });
    // Event listener for closing the modal
    document.getElementById('closeBtn').addEventListener('click', () => {
        this.modal.style.display = 'none';
    });
});

class ValidationSystem {
    constructor() {
        this.validationQueue = new Map();
        this.validatedActivities = new Map();
    }

    // Submit an activity for validation
    submitForValidation(activity, validationType) {
        const validationRequest = {
            id: Date.now(),
            activity: activity,
            validationType: validationType,
            status: 'pending',
            validations: [],
            timestamp: new Date()
        };

        this.validationQueue.set(validationRequest.id, validationRequest);
        return validationRequest.id;
    }

    // Add a validation to an activity
    addValidation(requestId, validator, isValid, comments = '') {
        const request = this.validationQueue.get(requestId);
        if (!request) return false;

        request.validations.push({
            validator: validator,
            isValid: isValid,
            comments: comments,
            timestamp: new Date()
        });

        this.updateValidationStatus(requestId);
        return true;
    }

    // Update validation status based on validation type
    updateValidationStatus(requestId) {
        const request = this.validationQueue.get(requestId);
        if (!request) return;

        let points = 0;
        let validationStatus = 'pending';

        switch (request.validationType) {
            case VALIDATION_TYPES.SELF.name:
                points = this.processSelfValidation(request);
                break;
            case VALIDATION_TYPES.CROWDSOURCE.name:
                points = this.processCrowdsourceValidation(request);
                break;
            case VALIDATION_TYPES.AI.name:
                points = this.processAIValidation(request);
                break;
            case VALIDATION_TYPES.EXPERT.name:
                points = this.processExpertValidation(request);
                break;
        }

        if (points > 0) {
            validationStatus = 'validated';
            this.updateUserPoints(request.activity.userId, points);
            this.checkAndAwardBadges(request.activity.userId);
        }

        request.status = validationStatus;
        request.points = points;
        this.validationQueue.set(requestId, request);
        
        // Update UI
        this.updateValidationUI(requestId);
        return points;
    }

    // Process self-validation
    processSelfValidation(request) {
        if (request.validations.length > 0) {
            request.status = 'validated';
            this.calculatePoints(request);
        }
    }

    // Process crowdsource validation
    processCrowdsourceValidation(request) {
        const validations = request.validations;
        if (validations.length >= 5) { // Require minimum 5 community validations
            const positiveValidations = validations.filter(v => v.isValid).length;
            const validationRatio = positiveValidations / validations.length;

            if (validationRatio >= 0.7) { // 70% positive validations required
                request.status = 'validated';
                this.calculatePoints(request);
            } else if (validationRatio < 0.3) { // Less than 30% positive validations
                request.status = 'rejected';
            }
        }
    }

    // Process AI validation
    processAIValidation(request) {
        const aiValidation = request.validations.find(v => v.validator.type === 'AI');
        if (aiValidation) {
            request.status = aiValidation.isValid ? 'validated' : 'rejected';
            if (aiValidation.isValid) {
                this.calculatePoints(request);
            }
        }
    }

    // Process expert validation
    processExpertValidation(request) {
        const expertValidation = request.validations.find(v => v.validator.type === 'EXPERT');
        if (expertValidation) {
            request.status = expertValidation.isValid ? 'validated' : 'rejected';
            if (expertValidation.isValid) {
                this.calculatePoints(request);
            }
        }
    }

    // Calculate points for a validated activity
    calculatePoints(request) {
        const activity = request.activity;
        const basePoints = IMPACT_LEVELS[activity.impactLevel].points;
        const validationMultiplier = VALIDATION_TYPES[request.validationType].weight;
        
        // Calculate engagement bonus (likes, comments, shares)
        const engagementBonus = this.calculateEngagementBonus(activity);
        
        // Calculate consistency bonus
        const consistencyBonus = this.calculateConsistencyBonus(activity.userId);

        const totalPoints = basePoints * validationMultiplier * (1 + engagementBonus + consistencyBonus);

        this.validatedActivities.set(request.id, {
            ...request,
            points: totalPoints
        });

        this.updateUserProgress(activity.userId, totalPoints);
    }

    // Calculate bonus points based on community engagement
    calculateEngagementBonus(activity) {
        const likesBonus = Math.min(activity.likes * 0.01, 0.5); // Max 50% bonus from likes
        const commentsBonus = Math.min(activity.comments.length * 0.02, 0.3); // Max 30% bonus from comments
        return likesBonus + commentsBonus;
    }

    // Calculate bonus points based on user's consistency
    calculateConsistencyBonus(userId) {
        // Implementation would track user's activity frequency and calculate bonus
        return 0.1; // Placeholder: 10% bonus for consistent participation
    }

    // Update user's progress and check for level/badge updates
    updateUserProgress(userId, points) {
        // Implementation would update user's total points and check for new levels/badges
        // This would integrate with the user profile system
    }

    // Get user's current level based on total points
    getUserLevel(totalPoints) {
        return Object.entries(USER_LEVELS)
            .reverse()
            .find(([_, level]) => totalPoints >= level.minPoints)?.[0] || 'BRONZE';
    }

    // Check and award badges based on activity type and points
    checkBadges(userId, activityType, totalPoints) {
        return Object.values(BADGES)
            .filter(badge => 
                badge.requirement.type === activityType && 
                totalPoints >= badge.requirement.points
            );
    }
}

// Export the validation system
const validationSystem = new ValidationSystem();

// Initialize validation system globally
window.validationSystem = new ValidationSystem();