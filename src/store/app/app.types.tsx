export interface IAppState{
	isInitialized : boolean;
	content : any;
	siteStatus : string;
	sitePages : any[];
	showNav : boolean;
	settings : object;

	testingOn : boolean;
	testCode : number;

	mixes : any[];
	heroMessage : string|null;

	emailData : any;
}

export enum appActionTypes {
	INITIALIZE_SITE = 'app/INITIALIZE_SITE',
	INITIALIZE_SITE_SUCCESS = 'app/INITIALIZE_SITE_SUCCESS',
	INITIALIZE_SITE_ERROR = 'app/INITIALIZE_SITE_ERROR',

	TOGGLE_NAV = 'app/TOGGLE_NAV',

	LOAD_CONTENT_DATA = 'app/LOAD_HERO_DATA',
	LOAD_CONTENT_DATA_SUCCESS = 'app/LOAD_HERO_DATA_SUCCESS',
	LOAD_CONTENT_SUCCESS = 'app/LOAD_CONTENT_SUCCESS',
	LOAD_CONTENT = 'app/LOAD_CONTENT',
	LOAD_CONTENT_ERROR = 'app/LOAD_CONTENT_ERROR',

	LOAD_MIXES = 'app/LOAD_MIXES',
	LOAD_MIXES_SUCCESS = 'app/LOAD_MIXES_SUCCESS',
	LOAD_MIXES_ERROR = 'app/LOAD_MIXES_ERROR',

	UPDATE_SETTINGS = 'app/UPDATE_SETTINGS',
	UPDATE_SETTINGS_SUCCESS = 'app/UPDATE_SETTINGS_SUCCESS',
	UPDATE_SETTINGS_ERROR = 'app/UPDATE_SETTINGS_ERROR',

	UNLOCK_SITE = 'app/UNLOCK_SITE',
	SAVE_EMAIL = 'app/SAVE_EMAIL',
	RESEND_EMAIL = 'app/RESEND_EMAIL'
}