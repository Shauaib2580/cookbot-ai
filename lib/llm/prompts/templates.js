// Message templates for common scenarios

/**
 * Generate a greeting message based on user information
 * @param {Object} user - User information
 * @returns {string} - Personalized greeting message
 */
export function generateGreeting(user = {}) {
  const name = user.name || 'there';
  const timeOfDay = getTimeOfDay();
  
  return `Good ${timeOfDay}, ${name}! How can I assist you today?`;
}

/**
 * Generate an error message for API failures
 * @param {Object} error - Error information
 * @returns {string} - User-friendly error message
 */
export function generateErrorMessage(error = {}) {
  const defaultMessage = "I'm sorry, but I encountered an error while processing your request.";
  
  // Map common error types to user-friendly messages
  const errorMessages = {
    'rate_limit': "I've reached my request limit. Please try again in a moment.",
    'context_length': "Your conversation is too long for me to process. Consider starting a new chat.",
    'content_filter': "I can't respond to that request due to content restrictions.",
    'connection': "I'm having trouble connecting to my knowledge source. Please check your internet connection and try again.",
  };
  
  return errorMessages[error.type] || error.message || defaultMessage;
}

/**
 * Generate a clarification request when user input is ambiguous
 * @param {string} topic - The topic needing clarification
 * @returns {string} - Clarification request message
 */
export function generateClarificationRequest(topic) {
  return `I'd like to help you with ${topic}, but I need a bit more information. Could you please provide more details about what you're looking for?`;
}

/**
 * Generate a follow-up question to continue the conversation
 * @param {string} context - The current conversation context
 * @returns {string} - Follow-up question
 */
export function generateFollowUp(context) {
  const followUps = [
    "Is there anything else you'd like to know about this topic?",
    "Would you like me to elaborate on any part of my response?",
    "Do you have any follow-up questions?",
    "Is there a specific aspect of this you'd like to explore further?",
    "How else can I assist you with this?"
  ];
  
  // In a real implementation, you might choose based on context
  return followUps[Math.floor(Math.random() * followUps.length)];
}

// Helper function to determine time of day
function getTimeOfDay() {
  const hour = new Date().getHours();
  
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
}