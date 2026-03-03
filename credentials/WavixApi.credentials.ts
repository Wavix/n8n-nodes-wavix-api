import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class WavixApi implements ICredentialType {
	name = 'wavixApi';

	displayName = 'Wavix API';

	icon = 'file:logo.svg' as const;

	// Link to your community node's README
	documentationUrl = 'https://github.com/wavix/n8n-nodes-wavix-api?tab=readme-ov-file';

	properties: INodeProperties[] = [
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.accessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.wavix.com',
			url: '/v1/profile',
		},
	};
}
