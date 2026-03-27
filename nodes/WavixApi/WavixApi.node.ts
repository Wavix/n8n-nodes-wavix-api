import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { smsDescription } from './resources/sms';

export class WavixApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Wavix',
		name: 'wavixApi',
		icon: 'file:logo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Send and retrieve SMS messages',
		defaults: {
			name: 'Wavix',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'wavixApi', required: true }],
		requestDefaults: {
			baseURL: '={{$parameter.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Base URL',
				name: 'baseUrl',
				type: 'string',
				default: 'https://api.wavix.com',
				placeholder: 'https://api.wavix.com',
				description: 'Base URL of the Wavix API',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
					name: 'SMS',
					value: 'sms',
					},
				],
				default: 'sms',
			},
			...smsDescription
		],
	};
}
