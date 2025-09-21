import { createRoot } from 'react-dom/client';
import './style.scss';
import Style from './Components/Common/Style';
import ThemeSwitch from './Components/Theme/ThemeSwitch/ThemeSwitch';


document.addEventListener('DOMContentLoaded', () => {
	const blockNameEls = document.querySelectorAll('.wp-block-scd-service-card');
	blockNameEls.forEach(blockNameEl => {
		const attributes = JSON.parse(blockNameEl.dataset.attributes);

		createRoot(blockNameEl).render(<>
			<Style attributes={attributes} id={blockNameEl.id} />

			<div className='service-card-wrapper'>
				<ThemeSwitch {...{ attributes }} />
			</div>
		</>);

		blockNameEl?.removeAttribute('data-attributes');
	});
});