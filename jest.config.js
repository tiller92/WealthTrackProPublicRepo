const nextJest = require('next/jest')

const createJestConfig = nextJest({dir:'.'})

const customJestConfig = {
	clearMocks:true,
	moduleDirectories:['node_modules', 'src'],
	testEnvironment: 'jest-environment-jsdom',
} 

module.exports = createJestConfig(createJestConfig) 
