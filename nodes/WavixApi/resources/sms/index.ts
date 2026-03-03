import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSms = {
	resource: ['sms'],
};

const showOnlyForSendSms = {
	resource: ['sms'],
	operation: ['sendSms'],
};

const showOnlyForGetSms = {
	resource: ['sms'],
	operation: ['getSmsByUuid'],
};

export const smsDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForSms,
		},
		options: [
			{
				name: 'Send SMS',
				value: 'sendSms',
				action: 'Send SMS',
				routing: {
					request: {
						method: 'POST',
						url: '/v3/messages/idempotent',
					},
				},
			},
			{
				name: 'Get SMS',
				value: 'getSmsByUuid',
				action: 'Get SMS by UUID',
				description: 'Get SMS by UUID',
				routing: {
					request: {
						method: 'GET',
						url: '=/v3/messages/{{$parameter.uuid}}',
					},
				},
			}
		],
		default: 'sendSms',
	},
	{
		displayName: 'SMS UUID',
		name: 'uuid',
		type: 'string',
		required: true,
		displayOptions: {
			show: showOnlyForGetSms,
		},
		default: '',
		placeholder: 'e.g. 123e4567-e89b-12d3-a456-426614174000',
		description: 'UUID of the SMS message to retrieve',
	},
	{
		displayName: 'Idempotency',
		name: 'idempotencyMode',
		type: 'options',
		displayOptions: {
			show: showOnlyForSendSms,
		},
		options: [
			{
				name: 'Off',
				value: 'off',
			},
			{
				name: 'Custom',
				value: 'custom',
			},
		],
		default: 'off',
		description: 'Idempotency handling mode for Send SMS',
	},
	{
		displayName: 'Custom Idempotency Key',
		name: 'idempotencyCustomKey',
		type: 'string',
		displayOptions: {
			show: {
				...showOnlyForSendSms,
				idempotencyMode: ['custom'],
			},
		},
		default: '',
		placeholder: 'Enter your idempotency key',
		routing: {
			request: {
				headers: {
					'Idempotency-Key': '={{$value}}',
				},
			},
		},
		description: 'Custom idempotency key sent in the request header',
	},
	{
		displayName: 'From',
		name: 'from',
		type: 'string',
		required: true,
		displayOptions: {
			show: showOnlyForSendSms,
		},
		default: '',
		placeholder: '15072429497',
		routing: {
			send: {
				type: 'body',
				property: 'from',
			},
		},
		description: 'Sender phone number or sender ID',
	},
	{
		displayName: 'To',
		name: 'to',
		type: 'string',
		required: true,
		displayOptions: {
			show: showOnlyForSendSms,
		},
		default: '',
		placeholder: '16419252149',
		routing: {
			send: {
				type: 'body',
				property: 'to',
			},
		},
		description: 'Recipient phone number',
	},
	{
		displayName: 'Message Text',
		name: 'messageBodyText',
		type: 'string',
		required: true,
		displayOptions: {
			show: showOnlyForSendSms,
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'message_body.text',
			},
		},
		description: 'Text content of the message body',
	},
	{
		displayName: 'Message Media',
		name: 'messageBodyMedia',
		type: 'json',
		displayOptions: {
			show: showOnlyForSendSms,
		},
		default: '[]',
		routing: {
			send: {
				type: 'body',
				property: 'message_body.media',
				value: '={{$value && JSON.parse($value).length ? JSON.parse($value) : undefined}}',
			},
		},
		description: 'Media payload for the message body',
	},
	{
		displayName: 'Smart Encoding',
		name: 'smartEncoding',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForSendSms,
		},
		default: false,
		routing: {
			send: {
				type: 'body',
				property: 'smart_encoding',
				value: '={{$value || undefined}}',
			},
		},
		description: 'Whether to enable smart encoding for the message',
	},
	{
		displayName: 'Callback URL',
		name: 'callbackUrl',
		type: 'string',
		displayOptions: {
			show: showOnlyForSendSms,
		},
		default: '',
		placeholder: 'https://example.com/webhooks/sms-status',
		routing: {
			send: {
				type: 'body',
				property: 'callback_url',
				value: '={{$value || undefined}}',
			},
		},
		description: 'Webhook URL for message status callbacks',
	},
	{
		displayName: 'Validity',
		name: 'validity',
		type: 'number',
		displayOptions: {
			show: showOnlyForSendSms,
		},
		default: 0,
		routing: {
			send: {
				type: 'body',
				property: 'validity',
				value: '={{$value || undefined}}',
			},
		},
		description: 'Message validity period in minutes',
	},
	{
		displayName: 'Tag',
		name: 'tag',
		type: 'string',
		displayOptions: {
			show: showOnlyForSendSms,
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'tag',
				value: '={{$value || undefined}}',
			},
		},
		description: 'Custom tag to associate with the message',
	},
];
