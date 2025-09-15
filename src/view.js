import { createRoot } from 'react-dom/client';
import './style.scss';
import Style from './Components/Common/Style';


document.addEventListener('DOMContentLoaded', () => {
	const blockNameEls = document.querySelectorAll('.wp-block-scd-service-card');
	blockNameEls.forEach(blockNameEl => {
		const attributes = JSON.parse(blockNameEl.dataset.attributes);

		createRoot(blockNameEl).render(<>
			<Style attributes={attributes} id={blockNameEl.id} />

			<div>
				<h3>save Part</h3>
			</div>
		</>);

		blockNameEl?.removeAttribute('data-attributes');
	});
});