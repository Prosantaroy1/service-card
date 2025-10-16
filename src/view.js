import { createRoot } from 'react-dom/client';
import './style.scss';
import Style from './Components/Common/Style';
import ThemeSwitch from './Components/Theme/ThemeSwitch/ThemeSwitch';


document.addEventListener('DOMContentLoaded', () => {
	const blockEls = document.querySelectorAll('.wp-block-scd-service-card');

	blockEls.forEach(blockEl => {
		const attributes = JSON.parse(blockEl.dataset.attributes);
		const isPremium = scdIsPipeChecker;
		console.log('check pro', isPremium)
		const activeTheme = attributes?.theme || 'default';
		const proThemes = ['themeTwo', 'themeThree'];
		const showOverlay = !isPremium && proThemes.includes(activeTheme);

		const siteLocation = `/wp-admin/edit.php?post_type=service_card&page=service_card_Dashboard#/pricing`;

		createRoot(blockEl).render(
			<>
				<Style attributes={attributes} id={blockEl.id} />

				<div className="service-card-wrapper" style={{ position: 'relative' }}>
					<ThemeSwitch {...{ attributes }} />
					{showOverlay && (
						<div className="scd-pro-overlay">
							<div className="overlay-inner">
								<h3>🚫 Premium Feature</h3>
								<p>This theme requires a Pro license.</p>
								<a href={siteLocation} rel="noreferrer" target="_blank" className="upgrade-btn">
									Upgrade Now
								</a>
							</div>
						</div>
					)}
				</div>
			</>
		);

		blockEl.removeAttribute('data-attributes');
	});
});

