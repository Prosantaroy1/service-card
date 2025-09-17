import { __ } from '@wordpress/i18n';

export const generalStyleTabs = [
	{ name: 'general', title: __('General', 'textdomain') },
	{ name: 'style', title: __('Style', 'textdomain') }
];
export const purposeTypeOptions = [
	{ label: "Default", value: "default" },
	{ label: "Primary", value: "primary" }
];

export const themeOption = [
	{ label: "Default", value: "default" },
	{ label: "ThemeTwo", value: "themeTwo" },
	{ label: "ThemeThree", value: "themeThree" }
];

export const blocks = [
	{
		label: 'Default',
		value: 'default',
		content: `<!-- wp:scd/service-card /-->`
	},
	{
		label: 'ThemeTwo',
		value: 'themeTwo',
		content: `<!-- wp:scd/service-card {"theme":"themeTwo","Styles":{"SectionContainer":{"bg":{"color":"#fff"},"padding":{"desktop":{"top":"32px","left":"24px","bottom":"32px","right":"24px"},"tablet":{"top":"32px","left":"24px","bottom":"32px","right":"24px"},"mobile":{"top":"32px","left":"24px","bottom":"32px","right":"24px"}},"border":{"width":"","color":"","style":"","side":"","radius":"16px"}},"cardBody":{"title":{"bg":{"color":"#fff"},"colors":"#1a202c","typo":{"fontWeight":600,"fontSize":{"desktop":24,"tablet":16,"mobile":12},"lineHeight":1.5,"fontFamily":"Montserrat, sans-serif"}},"description":{"bg":{"color":"#fff"},"colors":"#4a5568","typo":{"fontWeight":500,"fontSize":{"desktop":16,"tablet":14,"mobile":12},"lineHeight":1.5,"fontFamily":"Montserrat, sans-serif"}},"icon":{"width":"40px","height":"40px","colors":"#4a5568"}}},"column":{"type":"object","default":{"desktop":3,"tablet":2,"mobile":1,"gap":"16px"}}} /-->`
	},
	{
		label: 'ThemeThree',
		value: 'themeThree',
		content: `<!-- wp:scd/service-card {"theme":"themeThree","Styles":{"SectionContainer":{"bg":{"color":"#fff"},"padding":{"desktop":{"top":"32px","left":"24px","bottom":"32px","right":"24px"},"tablet":{"top":"32px","left":"24px","bottom":"32px","right":"24px"},"mobile":{"top":"32px","left":"24px","bottom":"32px","right":"24px"}},"border":{"width":"","color":"","style":"","side":"","radius":"16px"}},"cardBody":{"title":{"bg":{"color":"#fff"},"colors":"#1a202c","typo":{"fontWeight":600,"fontSize":{"desktop":24,"tablet":16,"mobile":12},"lineHeight":1.5,"fontFamily":"Montserrat, sans-serif"}},"description":{"bg":{"color":"#fff"},"colors":"#4a5568","typo":{"fontWeight":500,"fontSize":{"desktop":16,"tablet":14,"mobile":12},"lineHeight":1.5,"fontFamily":"Montserrat, sans-serif"}},"icon":{"width":"40px","height":"40px","colors":"#4a5568"}}},"column":{"type":"object","default":{"desktop":3,"tablet":2,"mobile":1,"gap":"16px"}}} /-->`
	}
]

