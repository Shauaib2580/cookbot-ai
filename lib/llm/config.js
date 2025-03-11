// This file will contain configuration for your LLM model
// Replace placeholder values with your actual configuration

export const config = {
  // API endpoints
  apiEndpoint: process.env.NEXT_PUBLIC_LLM_API_ENDPOINT || '',
  
  // Default model settings
  defaultModel: 'gpt-4',
  temperature: 0.7,
  maxTokens: 2000,
  
  // Streaming settings
  enableStreaming: true,
  
  // Models configuration
  models: {
    'gpt-4': {
      name: 'GPT-4',
      provider: 'openai',
      contextWindow: 8192,
      maxOutputTokens: 4096,
    },
    'gpt-3.5-turbo': {
      name: 'GPT-3.5 Turbo',
      provider: 'openai',
      contextWindow: 4096,
      maxOutputTokens: 2048,
    },
    'claude-3-opus': {
      name: 'Claude 3 Opus',
      provider: 'anthropic',
      contextWindow: 200000,
      maxOutputTokens: 4096,
    },
    'claude-3-sonnet': {
      name: 'Claude 3 Sonnet',
      provider: 'anthropic',
      contextWindow: 180000,
      maxOutputTokens: 4096,
    },
    'llama-3': {
      name: 'Llama 3',
      provider: 'meta',
      contextWindow: 8192,
      maxOutputTokens: 2048,
    },
  },
  
  // System prompt configuration
  systemPrompt: "You are a helpful, accurate, and friendly AI assistant.",
};

// Function to get model configuration
export function getModelConfig(modelId) {
  return config.models[modelId] || config.models[config.defaultModel];
}